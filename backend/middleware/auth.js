const jwt = require('jsonwebtoken');
const { dbGet } = require('../config/database');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: 'Access token required' 
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await dbGet(
      'SELECT id, email, first_name, last_name, role, faculty, department, student_id, employee_id FROM users WHERE id = ?',
      [decoded.id]
    );

    if (!user) {
      return res.status(403).json({ 
        success: false,
        message: 'Invalid token' 
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ 
      success: false,
      message: 'Invalid token' 
    });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Insufficient permissions.'
      });
    }
    next();
  };
};

module.exports = {
  authenticateToken,
  authorize
};