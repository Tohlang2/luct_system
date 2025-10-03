const express = require('express');
const { authenticateToken, authorize } = require('../middleware/auth');
const { validateReport } = require('../middleware/validation');
const { dbAll, dbRun, dbGet } = require('../config/database');

const router = express.Router();

// Get all reports
router.get('/', authenticateToken, async (req, res) => {
  try {
    let query = `
      SELECT r.*, c.course_code, c.course_name 
      FROM reports r 
      JOIN courses c ON r.course_id = c.id
    `;
    let params = [];

    // Filter based on user role
    if (req.user.role === 'lecturer') {
      query += ` WHERE r.lecturer_name LIKE '%' || ? || '%'`;
      params.push(`${req.user.first_name} ${req.user.last_name}`);
    } else if (req.user.role === 'principal_lecturer') {
      query += ` WHERE c.faculty = ?`;
      params.push(req.user.faculty);
    }

    query += ` ORDER BY r.date_of_lecture DESC, r.created_at DESC`;

    const reports = await dbAll(query, params);

    res.json({
      success: true,
      reports
    });
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch reports' 
    });
  }
});

// Get report by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const report = await dbGet(`
      SELECT r.*, c.course_code, c.course_name 
      FROM reports r 
      JOIN courses c ON r.course_id = c.id 
      WHERE r.id = ?
    `, [id]);

    if (!report) {
      return res.status(404).json({ 
        success: false,
        message: 'Report not found' 
      });
    }

    res.json({
      success: true,
      report
    });
  } catch (error) {
    console.error('Get report error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch report' 
    });
  }
});

// Create new report
router.post('/', authenticateToken, validateReport, async (req, res) => {
  try {
    const {
      faculty_name, class_name, week_of_reporting, date_of_lecture, course_id,
      actual_students_present, total_registered_students, venue, scheduled_lecture_time,
      topic_taught, lecturer_name, learning_outcomes, challenges, recommendations
    } = req.body;

    const result = await dbRun(
      `INSERT INTO reports (
        faculty_name, class_name, week_of_reporting, date_of_lecture, course_id,
        actual_students_present, total_registered_students, venue, scheduled_lecture_time,
        topic_taught, lecturer_name, learning_outcomes, challenges, recommendations
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        faculty_name, class_name, week_of_reporting, date_of_lecture, course_id,
        actual_students_present, total_registered_students, venue, scheduled_lecture_time,
        topic_taught, lecturer_name || `${req.user.first_name} ${req.user.last_name}`,
        learning_outcomes, challenges, recommendations
      ]
    );

    const newReport = await dbGet(`
      SELECT r.*, c.course_code, c.course_name 
      FROM reports r 
      JOIN courses c ON r.course_id = c.id 
      WHERE r.id = ?
    `, [result.id]);

    res.status(201).json({
      success: true,
      message: 'Report submitted successfully',
      report: newReport
    });
  } catch (error) {
    console.error('Create report error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to submit report' 
    });
  }
});

// Add feedback to report (PRL only)
router.put('/:id/feedback', authenticateToken, authorize('principal_lecturer'), async (req, res) => {
  try {
    const { id } = req.params;
    const { feedback_text } = req.body;

    const result = await dbRun(
      `UPDATE reports SET feedback_text = ?, feedback_by = ?, feedback_at = CURRENT_TIMESTAMP, status = 'reviewed' WHERE id = ?`,
      [feedback_text, req.user.id, id]
    );

    if (result.changes === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'Report not found' 
      });
    }

    const updatedReport = await dbGet(`
      SELECT r.*, c.course_code, c.course_name 
      FROM reports r 
      JOIN courses c ON r.course_id = c.id 
      WHERE r.id = ?
    `, [id]);

    res.json({
      success: true,
      message: 'Feedback added successfully',
      report: updatedReport
    });
  } catch (error) {
    console.error('Add feedback error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to add feedback' 
    });
  }
});

module.exports = router;