const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { dbAll, dbGet } = require('../config/database');

const router = express.Router();

// Get all classes
router.get('/', authenticateToken, async (req, res) => {
  try {
    const classes = await dbAll(`
      SELECT c.*, u.first_name || ' ' || u.last_name as lecturer_name 
      FROM classes c 
      LEFT JOIN users u ON c.lecturer_id = u.id
      ORDER BY c.class_name
    `);

    res.json({
      success: true,
      classes
    });
  } catch (error) {
    console.error('Get classes error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch classes' 
    });
  }
});

// Get classes by lecturer
router.get('/lecturer/:lecturerId', authenticateToken, async (req, res) => {
  try {
    const { lecturerId } = req.params;
    const classes = await dbAll(`
      SELECT c.*, u.first_name || ' ' || u.last_name as lecturer_name 
      FROM classes c 
      LEFT JOIN users u ON c.lecturer_id = u.id
      WHERE c.lecturer_id = ?
      ORDER BY c.class_name
    `, [lecturerId]);

    res.json({
      success: true,
      classes
    });
  } catch (error) {
    console.error('Get lecturer classes error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch classes' 
    });
  }
});

// Get my classes (for lecturers)
router.get('/my/classes', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'lecturer') {
      return res.status(403).json({ 
        success: false,
        message: 'Access denied. Lecturers only.' 
      });
    }

    const classes = await dbAll(`
      SELECT c.*, u.first_name || ' ' || u.last_name as lecturer_name 
      FROM classes c 
      LEFT JOIN users u ON c.lecturer_id = u.id
      WHERE c.lecturer_id = ?
      ORDER BY c.class_name
    `, [req.user.id]);

    res.json({
      success: true,
      classes
    });
  } catch (error) {
    console.error('Get my classes error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch classes' 
    });
  }
});

module.exports = router;