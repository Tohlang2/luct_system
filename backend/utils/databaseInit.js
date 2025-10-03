const { db, dbRun, dbGet } = require('../config/database');
const bcrypt = require('bcryptjs');

const initializeDatabase = async () => {
  try {
    // Users table
    await dbRun(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      role TEXT NOT NULL,
      faculty TEXT,
      department TEXT,
      student_id TEXT,
      employee_id TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Courses table
    await dbRun(`CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      course_code TEXT UNIQUE NOT NULL,
      course_name TEXT NOT NULL,
      faculty TEXT NOT NULL,
      credits INTEGER DEFAULT 3,
      program_leader_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (program_leader_id) REFERENCES users (id)
    )`);

    // Classes table
    await dbRun(`CREATE TABLE IF NOT EXISTS classes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      class_name TEXT NOT NULL,
      faculty TEXT NOT NULL,
      total_registered_students INTEGER DEFAULT 0,
      venue TEXT,
      lecturer_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (lecturer_id) REFERENCES users (id)
    )`);

    // Reports table
    await dbRun(`CREATE TABLE IF NOT EXISTS reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      faculty_name TEXT NOT NULL,
      class_name TEXT NOT NULL,
      week_of_reporting TEXT NOT NULL,
      date_of_lecture DATE NOT NULL,
      course_id INTEGER NOT NULL,
      actual_students_present INTEGER NOT NULL,
      total_registered_students INTEGER NOT NULL,
      venue TEXT NOT NULL,
      scheduled_lecture_time TIME NOT NULL,
      topic_taught TEXT NOT NULL,
      lecturer_name TEXT NOT NULL,
      learning_outcomes TEXT NOT NULL,
      challenges TEXT,
      recommendations TEXT,
      status TEXT DEFAULT 'submitted',
      feedback_text TEXT,
      feedback_by INTEGER,
      feedback_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (course_id) REFERENCES courses (id),
      FOREIGN KEY (feedback_by) REFERENCES users (id)
    )`);

    // Ratings table
    await dbRun(`CREATE TABLE IF NOT EXISTS ratings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      report_id INTEGER NOT NULL,
      student_id INTEGER NOT NULL,
      rating_value INTEGER NOT NULL CHECK (rating_value >= 1 AND rating_value <= 5),
      comment TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (report_id) REFERENCES reports (id),
      FOREIGN KEY (student_id) REFERENCES users (id),
      UNIQUE(report_id, student_id)
    )`);

    // Insert sample data
    await insertSampleData();
    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
  }
};

const insertSampleData = async () => {
  try {
    // Check if sample data already exists
    const userCount = await dbGet("SELECT COUNT(*) as count FROM users");
    
    if (userCount.count === 0) {
      console.log('📥 Inserting sample data...');
      
      // Hash password for all users
      const hashedPassword = bcrypt.hashSync('password', 10);
      
      // Insert sample users
      const users = [
        ['student1@luct.com', hashedPassword, 'John', 'Student', 'student', 'Computer Science', 'Software Engineering', 'STU001', null],
        ['student2@luct.com', hashedPassword, 'Sarah', 'Johnson', 'student', 'Business Administration', 'Marketing', 'STU002', null],
        ['lecturer1@luct.com', hashedPassword, 'Dr. Jane', 'Smith', 'lecturer', 'Computer Science', 'Computer Systems', null, 'LEC001'],
        ['lecturer2@luct.com', hashedPassword, 'Prof. Michael', 'Brown', 'lecturer', 'Business Administration', 'Management', null, 'LEC002'],
        ['prl@luct.com', hashedPassword, 'Dr. Robert', 'Wilson', 'principal_lecturer', 'Computer Science', 'Academic Affairs', null, 'PRL001'],
        ['prl_business@luct.com', hashedPassword, 'Dr. Elizabeth', 'Davis', 'principal_lecturer', 'Business Administration', 'Academic Affairs', null, 'PRL002'],
        ['admin@luct.com', hashedPassword, 'Admin', 'User', 'program_leader', 'Administration', 'IT Services', null, 'ADM001'],
        ['director@luct.com', hashedPassword, 'Dr. James', 'Anderson', 'program_leader', 'Academic Affairs', 'Administration', null, 'DIR001']
      ];

      for (const user of users) {
        await dbRun(
          `INSERT INTO users (email, password, first_name, last_name, role, faculty, department, student_id, employee_id) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          user
        );
      }

      // Insert sample courses
      const courses = [
        ['CS101', 'Introduction to Programming', 'Computer Science', 3, 7],
        ['CS202', 'Database Systems', 'Computer Science', 4, 7],
        ['CS303', 'Web Development', 'Computer Science', 3, 7],
        ['BUS101', 'Business Fundamentals', 'Business Administration', 3, 8],
        ['MKT201', 'Marketing Principles', 'Business Administration', 4, 8]
      ];

      for (const course of courses) {
        await dbRun(
          `INSERT INTO courses (course_code, course_name, faculty, credits, program_leader_id) 
           VALUES (?, ?, ?, ?, ?)`,
          course
        );
      }

      // Insert sample classes
      const classes = [
        ['CS Year 1', 'Computer Science', 50, 'Building A, Room 101', 3],
        ['CS Year 2', 'Computer Science', 42, 'Building A, Room 102', 3],
        ['Business Year 1', 'Business Administration', 65, 'Building B, Room 201', 4]
      ];

      for (const cls of classes) {
        await dbRun(
          `INSERT INTO classes (class_name, faculty, total_registered_students, venue, lecturer_id) 
           VALUES (?, ?, ?, ?, ?)`,
          cls
        );
      }

      console.log('✅ Sample data inserted successfully!');
    }
  } catch (error) {
    console.error('❌ Sample data insertion error:', error);
  }
};

module.exports = {
  initializeDatabase
};