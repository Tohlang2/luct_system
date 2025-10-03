import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [currentRole, setCurrentRole] = useState('');
  const { login, backendOnline } = useAuth();
  const navigate = useNavigate();

  // Demo credentials
  const demoCredentials = {
    student: { email: 'student1@luct.com', password: 'password' },
    lecturer: { email: 'lecturer1@luct.com', password: 'password' },
    principal_lecturer: { email: 'prl@luct.com', password: 'password' },
    program_leader: { email: 'admin@luct.com', password: 'password' }
  };

  const handleLogin = async (role) => {
    setLoading(true);
    setCurrentRole(role);
    
    const credentials = demoCredentials[role];
    
    try {
      const result = await login(credentials.email, credentials.password);
      
      if (result.success) {
        console.log('Login successful!');
        
        // Redirect to dashboard
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
        
      } else {
        console.log('Login failed:', result.message);
        alert(result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login error. Please try again.');
    } finally {
      setLoading(false);
      setCurrentRole('');
    }
  };

  const roleInfo = [
    {
      role: 'student',
      title: 'Student',
      icon: 'bi-person',
      color: 'primary',
      description: 'View courses, attend lectures, and provide ratings'
    },
    {
      role: 'lecturer',
      title: 'Lecturer', 
      icon: 'bi-person-check',
      color: 'success',
      description: 'Submit reports, manage classes, track attendance'
    },
    {
      role: 'principal_lecturer',
      title: 'Principal Lecturer',
      icon: 'bi-clipboard-check',
      color: 'warning',
      description: 'Review reports, monitor faculty, provide feedback'
    },
    {
      role: 'program_leader',
      title: 'Program Leader',
      icon: 'bi-gear',
      color: 'info',
      description: 'Manage courses, assign lecturers, view analytics'
    }
  ];

  return (
    <div className="min-vh-100 bg-light">
      <div className="container py-5">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="text-primary">LUCT Faculty Reporting System</h1>
          <p className="lead">Select your role to login</p>
          
          <div className={`alert ${backendOnline ? 'alert-success' : 'alert-warning'} mb-3`}>
            <i className={`bi ${backendOnline ? 'bi-check-circle' : 'bi-exclamation-triangle'} me-2`}></i>
            {backendOnline ? 'Backend Connected' : 'Demo Mode - Using Sample Data'}
          </div>
        </div>

        {/* Role Cards */}
        <div className="row g-4">
          {roleInfo.map((item) => (
            <div key={item.role} className="col-lg-3 col-md-6">
              <div className={`card h-100 border-${item.color}`}>
                <div className={`card-header bg-${item.color} text-white text-center`}>
                  <i className={`${item.icon} fs-1`}></i>
                  <h5 className="mt-2">{item.title}</h5>
                </div>
                
                <div className="card-body d-flex flex-column">
                  <p className="flex-grow-1">{item.description}</p>
                  
                  <div className="mt-3">
                    <small className="text-muted d-block">
                      <strong>Email:</strong> {demoCredentials[item.role].email}
                    </small>
                    <small className="text-muted d-block mb-2">
                      <strong>Password:</strong> password
                    </small>
                  </div>

                  <button
                    className={`btn btn-${item.color} mt-auto`}
                    onClick={() => handleLogin(item.role)}
                    disabled={loading}
                  >
                    {loading && currentRole === item.role ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Logging in...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Login as {item.title}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Connection Test */}
        <div className="mt-5">
          <ConnectionTest />
        </div>
      </div>
    </div>
  );
};

export default Login;