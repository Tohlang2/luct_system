const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { validateRating } = require('../middleware/validation');
const { dbAll, dbRun, dbGet } = require('../config/database');

const router = express.Router();

// Get all ratings
router.get('/', authenticateToken, async (req, res) => {
  try {
    const ratings = await dbAll(`
      SELECT r.*, rep.course_id, c.course_code, c.course_name, 
             u.first_name || ' ' || u.last_name as student_name,
             rep.lecturer_name
      FROM ratings r
      JOIN reports rep ON r.report_id = rep.id
      JOIN courses c ON rep.course_id = c.id
      JOIN users u ON r.student_id = u.id
      ORDER BY r.created_at DESC
    `);

    res.json({
      success: true,
      ratings
    });
  } catch (error) {
    console.error('Get ratings error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch ratings' 
    });
  }
});

// Submit rating
router.post('/', authenticateToken, validateRating, async (req, res) => {
  try {
    const { report_id, rating_value, comment } = req.body;

    // Check if student has already rated this report
    const existingRating = await dbGet(
      'SELECT id FROM ratings WHERE report_id = ? AND student_id = ?',
      [report_id, req.user.id]
    );

    if (existingRating) {
      return res.status(400).json({ 
        success: false,
        message: 'You have already rated this report' 
      });
    }

    const result = await dbRun(
      `INSERT INTO ratings (report_id, student_id, rating_value, comment) 
       VALUES (?, ?, ?, ?)`,
      [report_id, req.user.id, rating_value, comment]
    );

    const newRating = await dbGet(`
      SELECT r.*, rep.course_id, c.course_code, c.course_name, 
             u.first_name || ' ' || u.last_name as student_name,
             rep.lecturer_name
      FROM ratings r
      JOIN reports rep ON r.report_id = rep.id
      JOIN courses c ON rep.course_id = c.id
      JOIN users u ON r.student_id = u.id
      WHERE r.id = ?
    `, [result.id]);

    res.status(201).json({
      success: true,
      message: 'Rating submitted successfully',
      rating: newRating
    });
  } catch (error) {
    console.error('Submit rating error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to submit rating' 
    });
  }
});

// Get ratings by report
router.get('/report/:reportId', authenticateToken, async (req, res) => {
  try {
    const { reportId } = req.params;
    const ratings = await dbAll(`
      SELECT r.*, u.first_name || ' ' || u.last_name as student_name
      FROM ratings r
      JOIN users u ON r.student_id = u.id
      WHERE r.report_id = ?
      ORDER BY r.created_at DESC
    `, [reportId]);

    res.json({
      success: true,
      ratings
    });
  } catch (error) {
    console.error('Get report ratings error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch ratings' 
    });
  }
});

module.exports = router;