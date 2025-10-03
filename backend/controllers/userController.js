const User = require('../models/User');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      
      res.json({
        success: true,
        users
      });
    } catch (error) {
      console.error('Get users error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to fetch users' 
      });
    }
  },

  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      
      if (!user) {
        return res.status(404).json({ 
          success: false,
          message: 'User not found' 
        });
      }

      res.json({
        success: true,
        user
      });
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to fetch user' 
      });
    }
  },

  getUsersByRole: async (req, res) => {
    try {
      const { role } = req.params;
      const users = await User.findByRole(role);
      
      res.json({
        success: true,
        users
      });
    } catch (error) {
      console.error('Get users by role error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to fetch users' 
      });
    }
  },

  createUser: async (req, res) => {
    try {
      const userData = req.body;
      const newUser = await User.create(userData);
      
      res.status(201).json({
        success: true,
        message: 'User created successfully',
        user: newUser
      });
    } catch (error) {
      console.error('Create user error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to create user' 
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const userData = req.body;
      
      const updatedUser = await User.update(id, userData);
      
      if (!updatedUser) {
        return res.status(404).json({ 
          success: false,
          message: 'User not found' 
        });
      }

      res.json({
        success: true,
        message: 'User updated successfully',
        user: updatedUser
      });
    } catch (error) {
      console.error('Update user error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to update user' 
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await User.delete(id);
      
      if (!deleted) {
        return res.status(404).json({ 
          success: false,
          message: 'User not found' 
        });
      }

      res.json({
        success: true,
        message: 'User deleted successfully'
      });
    } catch (error) {
      console.error('Delete user error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to delete user' 
      });
    }
  }
};

module.exports = userController;