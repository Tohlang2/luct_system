import React from 'react';
import './CourseDetails.css';

const CourseDetails = ({ course, onClose }) => {
  return (
    <div className="course-details-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Course Details: {course.course_code} - {course.course_name}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="course-info">
          <div className="info-section">
            <h3>Basic Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Course Code:</label>
                <span>{course.course_code}</span>
              </div>
              <div className="info-item">
                <label>Course Name:</label>
                <span>{course.course_name}</span>
              </div>
              <div className="info-item">
                <label>Faculty:</label>
                <span>{course.faculty}</span>
              </div>
              <div className="info-item">
                <label>Stream:</label>
                <span>{course.stream}</span>
              </div>
              <div className="info-item">
                <label>Credits:</label>
                <span>{course.credits}</span>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h3>Your Progress</h3>
            <div className="progress-grid">
              <div className="progress-item">
                <label>Attendance:</label>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '90%'}}></div>
                </div>
                <span>90%</span>
              </div>
              <div className="progress-item">
                <label>Current Grade:</label>
                <span className="grade A-minus">A-</span>
              </div>
              <div className="progress-item">
                <label>Status:</label>
                <span className="status active">Active</span>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h3>Lecturer Information</h3>
            <div className="lecturer-info">
              <p><strong>Name:</strong> Dr. Smith Lecturer</p>
              <p><strong>Email:</strong> lecturer@luct.com</p>
            </div>
          </div>

          <div className="info-section">
            <h3>Recent Lectures</h3>
            <div className="lectures-list">
              <div className="lecture-item">
                <span className="date">2025-09-20</span>
                <span className="topic">Introduction to Python</span>
                <span className="attendance">45/50 present</span>
              </div>
              <div className="lecture-item">
                <span className="date">2025-09-18</span>
                <span className="topic">Variables and Data Types</span>
                <span className="attendance">48/50 present</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;