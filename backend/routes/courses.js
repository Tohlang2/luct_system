const express = require('express');
const { authenticateToken, authorize } = require('../middleware/auth');
const { dbAll, dbRun, dbGet } = require('../config/database');

const router = express.Router();

// Get all courses
router.get('/', authenticateToken, async (req, res) => {
  try {
    const courses = await dbAll(`
      SELECT c.*, u.first_name || ' ' || u.last_name as program_leader_name 
      FROM courses c 
      LEFT JOIN users u ON c.program_leader_id = u.id
      ORDER BY c.course_code
    `);

    res.json({
      success: true,
      courses
    });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch courses' 
    });
  }
});

// Get course by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const course = await dbGet(`
      SELECT c.*, u.first_name || ' ' || u.last_name as program_leader_name 
      FROM courses c 
      LEFT JOIN users u ON c.program_leader_id = u.id 
      WHERE c.id = ?
    `, [id]);

    if (!course) {
      return res.status(404).json({ 
        success: false,
        message: 'Course not found' 
      });
    }

    res.json({
      success: true,
      course
    });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch course' 
    });
  }
});

// Create new course (Program Leader only)
router.post('/', authenticateToken, authorize('program_leader'), async (req, res) => {
  try {
    const { course_code, course_name, faculty, credits, program_leader_id } = req.body;

    const result = await dbRun(
      `INSERT INTO courses (course_code, course_name, faculty, credits, program_leader_id) 
       VALUES (?, ?, ?, ?, ?)`,
      [course_code, course_name, faculty, credits, program_leader_id || req.user.id]
    );

    const newCourse = await dbGet(`
      SELECT c.*, u.first_name || ' ' || u.last_name as program_leader_name 
      FROM courses c 
      LEFT JOIN users u ON c.program_leader_id = u.id 
      WHERE c.id = ?
    `, [result.id]);

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      course: newCourse
    });
  } catch (error) {
    console.error('Create course error:', error);
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ 
        success: false,
        message: 'Course code already exists' 
      });
    }
    res.status(500).json({ 
      success: false,
      message: 'Failed to create course' 
    });
  }
});

module.exports = router;