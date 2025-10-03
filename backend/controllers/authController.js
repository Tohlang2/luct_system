const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';

const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ 
          success: false,
          message: 'Email and password are required' 
        });
      }

      const user = await User.findByEmail(email);

      if (!user) {
        return res.status(401).json({ 
          success: false,
          message: 'Invalid email or password' 
        });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ 
          success: false,
          message: 'Invalid email or password' 
        });
      }

      const token = jwt.sign(
        { 
          id: user.id, 
          email: user.email, 
          role: user.role 
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        success: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          faculty: user.faculty,
          department: user.department,
          student_id: user.student_id,
          employee_id: user.employee_id
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Internal server error' 
      });
    }
  },

  getMe: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      
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
      console.error('Get me error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Internal server error' 
      });
    }
  },

  register: async (req, res) => {
    try {
      const { email, password, first_name, last_name, role, faculty, department, student_id, employee_id } = req.body;

      if (!email || !password || !first_name || !last_name || !role) {
        return res.status(400).json({ 
          success: false,
          message: 'Required fields are missing' 
        });
      }

      // Check if user already exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ 
          success: false,
          message: 'User with this email already exists' 
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const userData = {
        email,
        password: hashedPassword,
        first_name,
        last_name,
        role,
        faculty,
        department,
        student_id,
        employee_id
      };

      const newUser = await User.create(userData);

      // Generate token
      const token = jwt.sign(
        { 
          id: newUser.id, 
          email: newUser.email, 
          role: newUser.role 
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(201).json({
        success: true,
        token,
        user: newUser
      });
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to create user' 
      });
    }
  }
};

module.exports = authController;