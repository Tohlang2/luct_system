import React, { useState } from 'react';
import { reportsAPI, ratingsAPI } from '../../services/api';
import { toast } from 'react-toastify';

const ReportView = ({ report, onBack, userRole }) => {
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setSubmitting(true);
    try {
      await reportsAPI.post(`/api/reports/${report.id}/feedback`, {
        feedback_text: feedback
      });
      toast.success('Feedback submitted successfully!');
      setFeedback('');
      onBack(); // Go back to refresh the list
    } catch (error) {
      toast.error('Failed to submit feedback');
    } finally {
      setSubmitting(false);
    }
  };

  const attendancePercentage = Math.round(
    (report.actual_students_present / report.total_registered_students) * 100
  );

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">Report Details</h5>
        <button className="btn btn-secondary btn-sm" onClick={onBack}>
          <i className="bi bi-arrow-left me-1"></i>Back
        </button>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <h6>Basic Information</h6>
            <table className="table table-sm">
              <tbody>
                <tr>
                  <td><strong>Faculty:</strong></td>
                  <td>{report.faculty_name}</td>
                </tr>
                <tr>
                  <td><strong>Class:</strong></td>
                  <td>{report.class_name}</td>
                </tr>
                <tr>
                  <td><strong>Week:</strong></td>
                  <td>{report.week_of_reporting}</td>
                </tr>
                <tr>
                  <td><strong>Date:</strong></td>
                  <td>{new Date(report.date_of_lecture).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <td><strong>Course:</strong></td>
                  <td>{report.course_code} - {report.course_name}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-6">
            <h6>Attendance & Venue</h6>
            <table className="table table-sm">
              <tbody>
                <tr>
                  <td><strong>Students Present:</strong></td>
                  <td>
                    {report.actual_students_present}/{report.total_registered_students} 
                    <span className={`badge ms-2 bg-${
                      attendancePercentage >= 80 ? 'success' :
                      attendancePercentage >= 60 ? 'warning' : 'danger'
                    }`}>
                      {attendancePercentage}%
                    </span>
                  </td>
                </tr>
                <tr>
                  <td><strong>Venue:</strong></td>
                  <td>{report.venue}</td>
                </tr>
                <tr>
                  <td><strong>Time:</strong></td>
                  <td>{report.scheduled_lecture_time}</td>
                </tr>
                <tr>
                  <td><strong>Lecturer:</strong></td>
                  <td>{report.lecturer_name}</td>
                </tr>
                <tr>
                  <td><strong>Status:</strong></td>
                  <td>
                    <span className={`badge ${report.feedback_text ? 'bg-success' : 'bg-warning'}`}>
                      {report.feedback_text ? 'Reviewed' : 'Pending Review'}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12">
            <h6>Topic Taught</h6>
            <div className="border p-3 rounded bg-light">
              {report.topic_taught}
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-12">
            <h6>Learning Outcomes</h6>
            <div className="border p-3 rounded bg-light">
              {report.learning_outcomes}
            </div>
          </div>
        </div>

        {report.recommendations && (
          <div className="row mt-3">
            <div className="col-12">
              <h6>Recommendations</h6>
              <div className="border p-3 rounded bg-light">
                {report.recommendations}
              </div>
            </div>
          </div>
        )}

        {report.feedback_text && (
          <div className="row mt-3">
            <div className="col-12">
              <h6>PRL Feedback</h6>
              <div className="border p-3 rounded bg-success text-white">
                {report.feedback_text}
              </div>
            </div>
          </div>
        )}

        {userRole === 'principal_lecturer' && !report.feedback_text && (
          <div className="row mt-4">
            <div className="col-12">
              <h6>Add Feedback</h6>
              <form onSubmit={handleSubmitFeedback}>
                <textarea
                  className="form-control"
                  rows="3"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Provide feedback for this report..."
                  required
                />
                <div className="mt-2">
                  <button 
                    type="submit" 
                    className="btn btn-success"
                    disabled={submitting}
                  >
                    {submitting ? 'Submitting...' : 'Submit Feedback'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportView;