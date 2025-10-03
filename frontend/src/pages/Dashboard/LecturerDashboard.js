import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const LecturerDashboard = ({ user }) => {
  const { backendOnline } = useAuth();

  return (
    <div>
      {/* Backend Status Indicator */}
      <div className={`alert ${backendOnline ? 'alert-success' : 'alert-warning'} mb-3`}>
        <i className={`bi ${backendOnline ? 'bi-check-circle' : 'bi-exclamation-triangle'} me-2`}></i>
        {backendOnline ? 'Connected to live database' : 'Demo mode - using sample data'}
      </div>

      {/* Welcome Card */}
      <div className="card bg-gradient-primary text-white mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
              <h3 className="card-title">Welcome back, {user.first_name}!</h3>
              <p className="card-text">Here's your teaching overview for today.</p>
            </div>
            <div className="col-md-4 text-end">
              <i className="bi bi-journal-text display-4 opacity-50"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card dashboard-card text-center">
            <div className="card-body">
              <i className="bi bi-clipboard-data fs-1 text-primary"></i>
              <h3 className="mt-2">15</h3>
              <p className="text-muted">Total Reports</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card dashboard-card text-center">
            <div className="card-body">
              <i className="bi bi-people fs-1 text-success"></i>
              <h3 className="mt-2">3</h3>
              <p className="text-muted">Classes</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card dashboard-card text-center">
            <div className="card-body">
              <i className="bi bi-person-check fs-1 text-info"></i>
              <h3 className="mt-2">85</h3>
              <p className="text-muted">Students</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card dashboard-card text-center">
            <div className="card-body">
              <i className="bi bi-graph-up fs-1 text-warning"></i>
              <h3 className="mt-2">78%</h3>
              <p className="text-muted">Avg Attendance</p>
            </div>
          </div>
        </div>
      </div>

      {/* User Info Card */}
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="bi bi-person-badge me-2"></i>
                Lecturer Information
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-4">
                  <div className="text-center">
                    <i className="bi bi-person-circle display-4 text-primary"></i>
                  </div>
                </div>
                <div className="col-8">
                  <table className="table table-sm">
                    <tbody>
                      <tr>
                        <td><strong>Name:</strong></td>
                        <td>{user.first_name} {user.last_name}</td>
                      </tr>
                      <tr>
                        <td><strong>Email:</strong></td>
                        <td>{user.email}</td>
                      </tr>
                      <tr>
                        <td><strong>Faculty:</strong></td>
                        <td>{user.faculty || 'Computer Science'}</td>
                      </tr>
                      <tr>
                        <td><strong>Department:</strong></td>
                        <td>{user.department || 'Software Engineering'}</td>
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
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="bi bi-lightning-charge me-2"></i>
                Quick Actions
              </h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <button className="btn btn-primary">
                  <i className="bi bi-plus-circle me-2"></i>Submit New Report
                </button>
                <button className="btn btn-outline-primary">
                  <i className="bi bi-people me-2"></i>View My Classes
                </button>
                <button className="btn btn-outline-secondary">
                  <i className="bi bi-graph-up me-2"></i>View Analytics
                </button>
                {!backendOnline && (
                  <button className="btn btn-outline-info">
                    <i className="bi bi-server me-2"></i>Connect to Backend
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerDashboard;