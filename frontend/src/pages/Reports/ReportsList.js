import React from 'react';

const ReportsList = ({ reports, userRole, onViewReport, searchTerm, onSearch }) => {
  const getAttendancePercentage = (actual, total) => {
    return Math.round((actual / total) * 100);
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 80) return 'success';
    if (percentage >= 60) return 'warning';
    return 'danger';
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">All Reports</h5>
        <div className="w-25">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={onSearch}
          />
        </div>
      </div>
      <div className="card-body">
        {reports.length === 0 ? (
          <p className="text-muted text-center py-4">No reports found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Course</th>
                  <th>Class</th>
                  <th>Topic</th>
                  <th>Attendance</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map(report => {
                  const attendancePercent = getAttendancePercentage(
                    report.actual_students_present,
                    report.total_registered_students
                  );
                  
                  return (
                    <tr key={report.id}>
                      <td>{new Date(report.date_of_lecture).toLocaleDateString()}</td>
                      <td>
                        <div>
                          <strong>{report.course_code}</strong>
                          <br />
                          <small className="text-muted">{report.course_name}</small>
                        </div>
                      </td>
                      <td>{report.class_name}</td>
                      <td className="text-truncate" style={{maxWidth: '200px'}} title={report.topic_taught}>
                        {report.topic_taught}
                      </td>
                      <td>
                        <span className={`badge bg-${getAttendanceColor(attendancePercent)}`}>
                          {report.actual_students_present}/{report.total_registered_students} ({attendancePercent}%)
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${report.feedback_text ? 'bg-success' : 'bg-warning'}`}>
                          {report.feedback_text ? 'Reviewed' : 'Pending'}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => onViewReport(report)}
                          title="View Report"
                        >
                          <i className="bi bi-eye"></i> View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsList;