import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-light bg-white border-bottom">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h6">LUCT Reporting System</span>
        
        <div className="d-flex align-items-center">
          <span className="me-3">
            Welcome, {user?.first_name} {user?.last_name}
          </span>
          <button className="btn btn-outline-secondary btn-sm" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;