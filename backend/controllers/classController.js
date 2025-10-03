const Class = require('../models/Class');

const classController = {
  getAllClasses: async (req, res) => {
    try {
      const classes = await Class.findAll();
      
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
  },

  getClassById: async (req, res) => {
    try {
      const { id } = req.params;
      const classItem = await Class.findById(id);
      
      if (!classItem) {
        return res.status(404).json({ 
          success: false,
          message: 'Class not found' 
        });
      }

      res.json({
        success: true,
        class: classItem
      });
    } catch (error) {
      console.error('Get class error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to fetch class' 
      });
    }
  },

  getClassesByLecturer: async (req, res) => {
    try {
      const { lecturerId } = req.params;
      const classes = await Class.findByLecturer(lecturerId);
      
      res.json({
        success: true,
        classes
      });
    } catch (error) {
      console.error('Get classes by lecturer error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to fetch classes' 
      });
    }
  },

  getClassesByFaculty: async (req, res) => {
    try {
      const { faculty } = req.params;
      const classes = await Class.findByFaculty(faculty);
      
      res.json({
        success: true,
        classes
      });
    } catch (error) {
      console.error('Get classes by faculty error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to fetch classes' 
      });
    }
  },

  getMyClasses: async (req, res) => {
    try {
      if (req.user.role !== 'lecturer') {
        return res.status(403).json({ 
          success: false,
          message: 'Access denied. Lecturers only.' 
        });
      }

      const classes = await Class.findByLecturer(req.user.id);
      
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
  },

  createClass: async (req, res) => {
    try {
      const classData = req.body;
      const newClass = await Class.create(classData);
      
      res.status(201).json({
        success: true,
        message: 'Class created successfully',
        class: newClass
      });
    } catch (error) {
      console.error('Create class error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to create class' 
      });
    }
  },

  updateClass: async (req, res) => {
    try {
      const { id } = req.params;
      const classData = req.body;
      
      const updatedClass = await Class.update(id, classData);
      
      if (!updatedClass) {
        return res.status(404).json({ 
          success: false,
          message: 'Class not found' 
        });
      }

      res.json({
        success: true,
        message: 'Class updated successfully',
        class: updatedClass
      });
    } catch (error) {
      console.error('Update class error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to update class' 
      });
    }
  },

  deleteClass: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Class.delete(id);
      
      if (!deleted) {
        return res.status(404).json({ 
          success: false,
          message: 'Class not found' 
        });
      }

      res.json({
        success: true,
        message: 'Class deleted successfully'
      });
    } catch (error) {
      console.error('Delete class error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to delete class' 
      });
    }
  }
};

module.exports = classController;