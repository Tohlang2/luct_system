import React, { useState, useEffect } from 'react';
import { getClasses, getStudents, getAttendance } from '../../services/api';

const LecturerMonitoring = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Remove unused state variables or use them
  const [showStudentsModal, setShowStudentsModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const response = await getClasses();
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewStudents = async (classId) => {
    try {
      setShowStudentsModal(true);
      const response = await getStudents(classId);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleMakeAnnouncement = (classId) => {
    setShowAnnouncementModal(true);
    // Implementation for announcements
  };

  const handleViewSchedule = (classId) => {
    setShowScheduleModal(true);
    // Implementation for schedule
  };

  return (
    <div className="lecturer-monitoring">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Class Monitoring</h2>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          {classes.map(classItem => (
            <div key={classItem.id} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{classItem.class_name}</h5>
                  <p className="card-text">
                    <strong>Course:</strong> {classItem.course_name}<br/>
                    <strong>Students:</strong> {classItem.student_count}<br/>
                    <strong>Schedule:</strong> {classItem.schedule?.day_of_week} {classItem.schedule?.start_time}
                  </p>
                  <div className="btn-group">
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => handleViewStudents(classItem.id)}
                    >
                      View Students
                    </button>
                    <button 
                      className="btn btn-info btn-sm"
                      onClick={() => handleMakeAnnouncement(classItem.id)}
                    >
                      Announcement
                    </button>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleViewSchedule(classItem.id)}
                    >
                      Schedule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Students Modal */}
      {showStudentsModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Class Students</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowStudentsModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {students.length === 0 ? (
                  <p>No students found.</p>
                ) : (
                  <ul className="list-group">
                    {students.map(student => (
                      <li key={student.id} className="list-group-item">
                        {student.name} - {student.email}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Announcement Modal */}
      {showAnnouncementModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Make Announcement</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowAnnouncementModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Announcement functionality would be implemented here.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Class Schedule</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowScheduleModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Schedule viewing functionality would be implemented here.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LecturerMonitoring;