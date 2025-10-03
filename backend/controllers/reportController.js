const Report = require('../models/Report');

const reportController = {
  getAllReports: async (req, res) => {
    try {
      const options = {};
      
      // Apply filters based on user role
      if (req.user.role === 'lecturer') {
        options.lecturerId = req.user.id;
      } else if (req.user.role === 'principal_lecturer') {
        options.faculty = req.user.faculty;
      }

      const reports = await Report.findAll(options);
      
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
  },

  getReportById: async (req, res) => {
    try {
      const { id } = req.params;
      const report = await Report.findById(id);
      
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
  },

  getReportsByCourse: async (req, res) => {
    try {
      const { courseId } = req.params;
      const reports = await Report.findByCourse(courseId);
      
      res.json({
        success: true,
        reports
      });
    } catch (error) {
      console.error('Get reports by course error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to fetch reports' 
      });
    }
  },

  createReport: async (req, res) => {
    try {
      const reportData = {
        ...req.body,
        lecturer_name: req.body.lecturer_name || `${req.user.first_name} ${req.user.last_name}`
      };
      
      const newReport = await Report.create(reportData);
      
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
  },

  updateReport: async (req, res) => {
    try {
      const { id } = req.params;
      const reportData = req.body;
      
      const updatedReport = await Report.update(id, reportData);
      
      if (!updatedReport) {
        return res.status(404).json({ 
          success: false,
          message: 'Report not found' 
        });
      }

      res.json({
        success: true,
        message: 'Report updated successfully',
        report: updatedReport
      });
    } catch (error) {
      console.error('Update report error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to update report' 
      });
    }
  },

  addFeedback: async (req, res) => {
    try {
      const { id } = req.params;
      const { feedback_text } = req.body;
      
      const updatedReport = await Report.addFeedback(id, feedback_text, req.user.id);
      
      if (!updatedReport) {
        return res.status(404).json({ 
          success: false,
          message: 'Report not found' 
        });
      }

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
  },

  deleteReport: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Report.delete(id);
      
      if (!deleted) {
        return res.status(404).json({ 
          success: false,
          message: 'Report not found' 
        });
      }

      res.json({
        success: true,
        message: 'Report deleted successfully'
      });
    } catch (error) {
      console.error('Delete report error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to delete report' 
      });
    }
  },

  getReportStats: async (req, res) => {
    try {
      const stats = await Report.getStats();
      
      res.json({
        success: true,
        stats
      });
    } catch (error) {
      console.error('Get report stats error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to fetch report statistics' 
      });
    }
  }
};

module.exports = reportController;