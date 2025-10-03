import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const ProgramLeaderDashboard = ({ user }) => {
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
              <h3 className="card-title">Welcome, {user.first_name}!</h3>
              <p className="card-text">Program Leader Dashboard - System Administration</p>
            </div>
            <div className="col-md-4 text-end">
              <i className="bi bi-graph-up display-4 opacity-50"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card dashboard-card text-center">
            <div className="card-body">
              <i className="bi bi-journal-bookmark fs-1 text-primary"></i>
              <h3 className="mt-2">45</h3>
              <p className="text-muted">Total Courses</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card dashboard-card text-center">
            <div className="card-body">
              <i className="bi bi-person-check fs-1 text-success"></i>
              <h3 className="mt-2">38</h3>
              <p className="text-muted">Assigned Courses</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card dashboard-card text-center">
            <div className="card-body">
              <i className="bi bi-people fs-1 text-info"></i>
              <h3 className="mt-2">15</h3>
              <p className="text-muted">Lecturers</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card dashboard-card text-center">
            <div className="card-body">
              <i className="bi bi-graph-up fs-1 text-warning"></i>
              <h3 className="mt-2">156</h3>
              <p className="text-muted">Total Reports</p>
            </div>
          </div>
        </div>
      </div>

      {/* Program Leader Information */}
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="bi bi-person-vcard me-2"></i>
                Program Leader Information
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-4">
                  <div className="text-center">
                    <i className="bi bi-person-gear display-4 text-info"></i>
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
                        <td><span className="badge bg-info">Program Leader</span></td>
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
                <i className="bi bi-tools me-2"></i>
                Administration Tools
              </h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <button className="btn btn-info">
                  <i className="bi bi-journal-plus me-2"></i>Manage Courses
                </button>
                <button className="btn btn-outline-info">
                  <i className="bi bi-buildings me-2"></i>Manage Classes
                </button>
                <button className="btn btn-outline-secondary">
                  <i className="bi bi-graph-up me-2"></i>System Analytics
                </button>
                {!backendOnline && (
                  <button className="btn btn-outline-warning">
                    <i className="bi bi-server me-2"></i>Connect to Backend
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="bi bi-heart-pulse me-2"></i>
                System Status
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-3 text-center">
                  <i className="bi bi-database fs-1 text-success"></i>
                  <h5>Database</h5>
                  <span className={`badge ${backendOnline ? 'bg-success' : 'bg-warning'}`}>
                    {backendOnline ? 'Online' : 'Offline'}
                  </span>
                </div>
                <div className="col-md-3 text-center">
                  <i className="bi bi-server fs-1 text-success"></i>
                  <h5>Backend API</h5>
                  <span className={`badge ${backendOnline ? 'bg-success' : 'bg-warning'}`}>
                    {backendOnline ? 'Online' : 'Offline'}
                  </span>
                </div>
                <div className="col-md-3 text-center">
                  <i className="bi bi-shield-check fs-1 text-success"></i>
                  <h5>Security</h5>
                  <span className="badge bg-success">Active</span>
                </div>
                <div className="col-md-3 text-center">
                  <i className="bi bi-cloud-check fs-1 text-success"></i>
                  <h5>Cloud Services</h5>
                  <span className="badge bg-success">Connected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramLeaderDashboard;