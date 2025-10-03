import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const PrincipalLecturerDashboard = ({ user }) => {
  const { backendOnline } = useAuth();

  return (
    <div>
      {/* Backend Status Indicator */}
      <div className={`alert ${backendOnline ? 'alert-success' : 'alert-warning'} mb-3`}>
        <i className={`bi ${backendOnline ? 'bi-check-circle' : 'bi-exclamation-triangle'} me-2`}></i>
        {backendOnline ? 'Connected to live database' : 'Demo mode - using sample data'}
      </div>

      {/* Welcome Card */}
      <div className="card bg-gradient-warning text-white mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
              <h3 className="card-title">Welcome, {user.first_name}!</h3>
              <p className="card-text">Principal Lecturer Dashboard - Faculty Oversight</p>
            </div>
            <div className="col-md-4 text-end">
              <i className="bi bi-clipboard-check display-4 opacity-50"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card dashboard-card text-center">
            <div className="card-body">
              <i className="bi bi-clipboard-check fs-1 text-warning"></i>
              <h3 className="mt-2">8</h3>
              <p className="text-muted">Pending Reviews</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card dashboard-card text-center">
            <div className="card-body">
              <i className="bi bi-people fs-1 text-primary"></i>
              <h3 className="mt-2">12</h3>
              <p className="text-muted">Lecturers</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card dashboard-card text-center">
            <div className="card-body">
              <i className="bi bi-book fs-1 text-success"></i>
              <h3 className="mt-2">25</h3>
              <p className="text-muted">Courses</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card dashboard-card text-center">
            <div className="card-body">
              <i className="bi bi-star fs-1 text-info"></i>
              <h3 className="mt-2">4.2</h3>
              <p className="text-muted">Avg Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* PRL Information */}
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="bi bi-person-gear me-2"></i>
                Principal Lecturer Information
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-4">
                  <div className="text-center">
                    <i className="bi bi-person-badge display-4 text-warning"></i>
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
                        <td><strong>Role:</strong></td>
                        <td><span className="badge bg-warning">Principal Lecturer</span></td>
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
                <i className="bi bi-graph-up me-2"></i>
                Faculty Overview
              </h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <button className="btn btn-warning">
                  <i className="bi bi-clipboard-check me-2"></i>Review Reports
                </button>
                <button className="btn btn-outline-warning">
                  <i className="bi bi-people me-2"></i>Manage Lecturers
                </button>
                <button className="btn btn-outline-secondary">
                  <i className="bi bi-bar-chart me-2"></i>Faculty Analytics
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

export default PrincipalLecturerDashboard;