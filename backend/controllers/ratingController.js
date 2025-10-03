const Rating = require('../models/Rating');

const ratingController = {
  getAllRatings: async (req, res) => {
    try {
      const ratings = await Rating.findAll();
      
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
  },

  getRatingById: async (req, res) => {
    try {
      const { id } = req.params;
      const rating = await Rating.findById(id);
      
      if (!rating) {
        return res.status(404).json({ 
          success: false,
          message: 'Rating not found' 
        });
      }

      res.json({
        success: true,
        rating
      });
    } catch (error) {
      console.error('Get rating error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to fetch rating' 
      });
    }
  },

  getRatingsByReport: async (req, res) => {
    try {
      const { reportId } = req.params;
      const ratings = await Rating.findByReport(reportId);
      
      res.json({
        success: true,
        ratings
      });
    } catch (error) {
      console.error('Get ratings by report error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to fetch ratings' 
      });
    }
  },

  getMyRatings: async (req, res) => {
    try {
      if (req.user.role !== 'student') {
        return res.status(403).json({ 
          success: false,
          message: 'Access denied. Students only.' 
        });
      }

      const ratings = await Rating.findByStudent(req.user.id);
      
      res.json({
        success: true,
        ratings
      });
    } catch (error) {
      console.error('Get my ratings error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to fetch ratings' 
      });
    }
  },

  createRating: async (req, res) => {
    try {
      const ratingData = {
        ...req.body,
        student_id: req.user.id
      };
      
      const newRating = await Rating.create(ratingData);
      
      res.status(201).json({
        success: true,
        message: 'Rating submitted successfully',
        rating: newRating
      });
    } catch (error) {
      console.error('Create rating error:', error);
      if (error.message.includes('already rated')) {
        return res.status(400).json({ 
          success: false,
          message: error.message 
        });
      }
      res.status(500).json({ 
        success: false,
        message: 'Failed to submit rating' 
      });
    }
  },

  updateRating: async (req, res) => {
    try {
      const { id } = req.params;
      const ratingData = req.body;
      
      const updatedRating = await Rating.update(id, ratingData);
      
      if (!updatedRating) {
        return res.status(404).json({ 
          success: false,
          message: 'Rating not found' 
        });
      }

      res.json({
        success: true,
        message: 'Rating updated successfully',
        rating: updatedRating
      });
    } catch (error) {
      console.error('Update rating error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to update rating' 
      });
    }
  },

  deleteRating: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Rating.delete(id);
      
      if (!deleted) {
        return res.status(404).json({ 
          success: false,
          message: 'Rating not found' 
        });
      }

      res.json({
        success: true,
        message: 'Rating deleted successfully'
      });
    } catch (error) {
      console.error('Delete rating error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to delete rating' 
      });
    }
  },

  getAverageRating: async (req, res) => {
    try {
      const { reportId } = req.params;
      const stats = await Rating.getAverageRating(reportId);
      
      res.json({
        success: true,
        stats
      });
    } catch (error) {
      console.error('Get average rating error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to fetch rating statistics' 
      });
    }
  },

  getLecturerRatingStats: async (req, res) => {
    try {
      const { lecturerName } = req.params;
      const stats = await Rating.getLecturerStats(lecturerName);
      
      res.json({
        success: true,
        stats
      });
    } catch (error) {
      console.error('Get lecturer rating stats error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to fetch lecturer rating statistics' 
      });
    }
  }
};

module.exports = ratingController;