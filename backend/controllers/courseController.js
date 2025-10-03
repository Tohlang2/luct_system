const Course = require('../models/Course');

const courseController = {
  getAllCourses: async (req, res) => {
    try {
      const courses = await Course.findAll();
      
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
  },

  getCourseById: async (req, res) => {
    try {
      const { id } = req.params;
      const course = await Course.findById(id);
      
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
  },

  getCoursesByFaculty: async (req, res) => {
    try {
      const { faculty } = req.params;
      const courses = await Course.findByFaculty(faculty);
      
      res.json({
        success: true,
        courses
      });
    } catch (error) {
      console.error('Get courses by faculty error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to fetch courses' 
      });
    }
  },

  createCourse: async (req, res) => {
    try {
      const courseData = req.body;
      const newCourse = await Course.create(courseData);
      
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
  },

  updateCourse: async (req, res) => {
    try {
      const { id } = req.params;
      const courseData = req.body;
      
      const updatedCourse = await Course.update(id, courseData);
      
      if (!updatedCourse) {
        return res.status(404).json({ 
          success: false,
          message: 'Course not found' 
        });
      }

      res.json({
        success: true,
        message: 'Course updated successfully',
        course: updatedCourse
      });
    } catch (error) {
      console.error('Update course error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to update course' 
      });
    }
  },

  deleteCourse: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Course.delete(id);
      
      if (!deleted) {
        return res.status(404).json({ 
          success: false,
          message: 'Course not found' 
        });
      }

      res.json({
        success: true,
        message: 'Course deleted successfully'
      });
    } catch (error) {
      console.error('Delete course error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to delete course' 
      });
    }
  }
};

module.exports = courseController;