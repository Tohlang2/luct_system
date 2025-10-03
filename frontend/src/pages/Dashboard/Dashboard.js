import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import StudentDashboard from './StudentDashboard';
import LecturerDashboard from './LecturerDashboard';
import PrincipalLecturerDashboard from './PrincipalLecturerDashboard';
import ProgramLeaderDashboard from './ProgramLeaderDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user.role) {
      case 'student':
        return <StudentDashboard user={user} />;
      case 'lecturer':
        return <LecturerDashboard user={user} />;
      case 'principal_lecturer':
        return <PrincipalLecturerDashboard user={user} />;
      case 'program_leader':
        return <ProgramLeaderDashboard user={user} />;
      default:
        return <DefaultDashboard user={user} />;
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dashboard</h2>
        <span className="badge bg-primary text-uppercase">{user.role} Portal</span>
      </div>
      {renderDashboard()}
    </div>
  );
};

// Default dashboard for unknown roles
const DefaultDashboard = ({ user }) => {
  const { backendOnline } = useAuth();

  return (
    <div className="row">
      <div className="col-12">
        {/* Backend Status Indicator */}
        <div className={`alert ${backendOnline ? 'alert-success' : 'alert-warning'} mb-3`}>
          <i className={`bi ${backendOnline ? 'bi-check-circle' : 'bi-exclamation-triangle'} me-2`}></i>
          {backendOnline ? 'Connected to live database' : 'Demo mode - using sample data'}
        </div>

        <div className="card">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">Welcome, {user.first_name} {user.last_name}!</h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <h5>User Information</h5>
                <table className="table table-bordered">
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
                      <td><strong>Role:</strong></td>
                      <td><span className="badge bg-secondary">{user.role}</span></td>
                    </tr>
                    <tr>
                      <td><strong>Faculty:</strong></td>
                      <td>{user.faculty || 'Not specified'}</td>
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
                <h5>System Status</h5>
                <div className="alert alert-success">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  <strong>System Online</strong>
                </div>
                <p>Welcome to the LUCT Faculty Reporting System.</p>
                <div className="mt-3">
                  <button className="btn btn-outline-primary me-2">View Profile</button>
                  <button className="btn btn-outline-secondary">Get Help</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;