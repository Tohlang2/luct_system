import React, { useState, useEffect } from 'react';
import { reportsAPI, coursesAPI, exportReportsToExcel } from '../../services/api';

const LecturerReports = () => {
  const [reports, setReports] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // Now used
  const [editingReport, setEditingReport] = useState(null);
  const [formData, setFormData] = useState({
    class_id: '',
    course_id: '',
    week_of_reporting: '',
    date_of_lecture: '',
    actual_students_present: '',
    topic_taught: '',
    learning_outcomes: '',
    recommendations: ''
  });

  useEffect(() => {
    fetchReports();
    fetchCourses();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await reportsAPI.getMyReports();
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await coursesAPI.getAll();
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setCourses([]);
    }
  };

  const handleEditReport = (report) => {
    setEditingReport(report);
    setShowEditModal(true);
    setFormData({
      class_id: report.class_id || '',
      course_id: report.course_id || '',
      week_of_reporting: report.week_of_reporting || '',
      date_of_lecture: report.date_of_lecture || '',
      actual_students_present: report.actual_students_present || '',
      topic_taught: report.topic_taught || '',
      learning_outcomes: report.learning_outcomes || '',
      recommendations: report.recommendations || ''
    });
  };

  const handleUpdateReport = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Implementation for updating report
      console.log('Updating report:', editingReport.id, formData);
      setShowEditModal(false);
      setEditingReport(null);
      fetchReports(); // Refresh the list
    } catch (error) {
      console.error('Error updating report:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateReport = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await reportsAPI.create(formData);
      setShowForm(false);
      setFormData({
        class_id: '',
        course_id: '',
        week_of_reporting: '',
        date_of_lecture: '',
        actual_students_present: '',
        topic_taught: '',
        learning_outcomes: '',
        recommendations: ''
      });
      fetchReports();
    } catch (error) {
      console.error('Error creating report:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const response = await exportReportsToExcel();
      const blob = new Blob([response.data], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `reports-${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting reports:', error);
    }
  };

  return (
    <div className="lecturer-reports">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Reports</h2>
        <div>
          <button 
            className="btn btn-success me-2"
            onClick={handleExport}
            disabled={loading}
          >
            Export to Excel
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
            disabled={loading}
          >
            Create New Report
          </button>
        </div>
      </div>

      {/* Reports list */}
      <div className="card">
        <div className="card-header">
          <h4 className="mb-0">Recent Reports</h4>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : reports.length === 0 ? (
            <p className="text-muted">No reports found.</p>
          ) : (
            <div className="list-group">
              {reports.map(report => (
                <div key={report.id} className="list-group-item">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                      <h6>{report.course_name} - {report.class_name}</h6>
                      <p className="mb-1"><strong>Topic:</strong> {report.topic_taught}</p>
                      <p className="mb-1"><strong>Week:</strong> {report.week_of_reporting}</p>
                      <p className="mb-1"><strong>Date:</strong> {new Date(report.date_of_lecture).toLocaleDateString()}</p>
                      <p className="mb-1"><strong>Attendance:</strong> {report.actual_students_present} students</p>
                      
                      {report.learning_outcomes && (
                        <p className="mb-1"><strong>Outcomes:</strong> {report.learning_outcomes}</p>
                      )}
                      
                      {report.recommendations && (
                        <p className="mb-1"><strong>Recommendations:</strong> {report.recommendations}</p>
                      )}
                    </div>
                    
                    <div className="text-end">
                      <button 
                        className="btn btn-sm btn-outline-primary me-1"
                        onClick={() => handleEditReport(report)}
                      >
                        Edit
                      </button>
                      <span className="badge bg-secondary">
                        {new Date(report.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Report Modal */}
      {showForm && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create New Report</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowForm(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleCreateReport}>
                  {/* Your existing form fields */}
                  <div className="mb-3">
                    <label className="form-label">Course</label>
                    <select
                      className="form-control"
                      name="course_id"
                      value={formData.course_id}
                      onChange={(e) => setFormData({...formData, course_id: e.target.value})}
                      required
                    >
                      <option value="">Select Course</option>
                      {courses.map(course => (
                        <option key={course.id} value={course.id}>
                          {course.course_code} - {course.course_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Add other form fields here */}
                  
                  <div className="d-flex justify-content-end gap-2">
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? 'Creating...' : 'Create Report'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Report Modal */}
      {showEditModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Report</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleUpdateReport}>
                  <div className="mb-3">
                    <label className="form-label">Topic Taught</label>
                    <input
                      type="text"
                      className="form-control"
                      name="topic_taught"
                      value={formData.topic_taught}
                      onChange={(e) => setFormData({...formData, topic_taught: e.target.value})}
                      required
                    />
                  </div>
                  
                  {/* Add other editable fields */}
                  
                  <div className="d-flex justify-content-end gap-2">
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={() => setShowEditModal(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? 'Updating...' : 'Update Report'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LecturerReports;