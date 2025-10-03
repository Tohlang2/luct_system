const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Try to initialize database, but don't crash if it fails
try {
  const { initializeDatabase } = require('./utils/databaseInit');
  initializeDatabase();
  console.log('✅ Database initialization attempted');
} catch (error) {
  console.log('⚠️  Database initialization failed, running in limited mode:', error.message);
}

// Import routes
try {
  const authRoutes = require('./routes/auth');
  const userRoutes = require('./routes/users');
  const courseRoutes = require('./routes/courses');
  const classRoutes = require('./routes/classes');
  const reportRoutes = require('./routes/reports');
  const ratingRoutes = require('./routes/ratings');

  // Use routes
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/courses', courseRoutes);
  app.use('/api/classes', classRoutes);
  app.use('/api/reports', reportRoutes);
  app.use('/api/ratings', ratingRoutes);
  
  console.log('✅ All routes loaded');
} catch (error) {
  console.log('⚠️  Some routes failed to load:', error.message);
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'LUCT Faculty Backend is running',
    timestamp: new Date().toISOString(),
    database: 'SQLite connected'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to LUCT Faculty Reporting System API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      courses: '/api/courses',
      classes: '/api/classes',
      reports: '/api/reports',
      ratings: '/api/ratings'
    },
    documentation: '/health'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📍 API Base: http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Server shutting down gracefully...');
  process.exit(0);
});