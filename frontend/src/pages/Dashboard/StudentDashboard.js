import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const StudentDashboard = ({ user }) => {
  const { backendOnline } = useAuth();

  return (
    <div>
      {/* Backend Status Indicator */}
      <div className={`alert ${backendOnline ? 'alert-success' : 'alert-warning'} mb-3`}>
        <i className={`bi ${backendOnline ? 'bi-check-circle' : 'bi-exclamation-triangle'} me-2`}></i>
        {backendOnline ? 'Connected to live database' : 'Demo mode - using sample data'}
      </div>

      {/* Welcome Card */}
      <div className="card bg-gradient-info text-white mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
              <h3 className="card-title">Hello, {user.first_name}!</h3>
              <p className="card-text">Welcome to your student portal.</p>
            </div>
            <div className="col-md-4 text-end">
              <i className="bi bi-person display-4 opacity-50"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card dashboard-card text-center">
            <div className="card-body">
              <i className="bi bi-book fs-1 text-primary"></i>
              <h3 className="mt-2">5</h3>
              <p className="text-muted">Enrolled Courses</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card dashboard-card text-center">
            <div className="card-body">
              <i className="bi bi-calendar-check fs-1 text-success"></i>
              <h3 className="mt-2">12</h3>
              <p className="text-muted">Lectures Attended</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card dashboard-card text-center">
            <div className="card-body">
              <i className="bi bi-star fs-1 text-warning"></i>
              <h3 className="mt-2">3</h3>
              <p className="text-muted">Pending Ratings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Student Info */}
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">
            <i className="bi bi-person-lines-fill me-2"></i>
            Student Information
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td><strong>Student Name:</strong></td>
                    <td>{user.first_name} {user.last_name}</td>
                  </tr>
                  <tr>
                    <td><strong>Student ID:</strong></td>
                    <td>STU{user.id?.toString().padStart(5, '0') || '00123'}</td>
                  </tr>
                  <tr>
                    <td><strong>Email:</strong></td>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <td><strong>Mode:</strong></td>
                    <td>
                      <span className={`badge ${backendOnline ? 'bg-success' : 'bg-warning'}`}>
                        {backendOnline ? 'Live Mode' : 'Demo Mode'}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-6">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td><strong>Faculty:</strong></td>
                    <td>{user.faculty || 'Computer Science'}</td>
                  </tr>
                  <tr>
                    <td><strong>Program:</strong></td>
                    <td>Bachelor of Science</td>
                  </tr>
                  <tr>
                    <td><strong>Year:</strong></td>
                    <td>Year 2</td>
                  </tr>
                  <tr>
                    <td><strong>Status:</strong></td>
                    <td><span className="badge bg-success">Active</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions for Students */}
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="bi bi-rocket me-2"></i>
                Quick Access
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <button className="btn btn-outline-primary w-100 mb-2">
                    <i className="bi bi-book me-2"></i>My Courses
                  </button>
                </div>
                <div className="col-md-4">
                  <button className="btn btn-outline-success w-100 mb-2">
                    <i className="bi bi-calendar me-2"></i>Class Schedule
                  </button>
                </div>
                <div className="col-md-4">
                  <button className="btn btn-outline-warning w-100 mb-2">
                    <i className="bi bi-star me-2"></i>Rate Lectures
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;