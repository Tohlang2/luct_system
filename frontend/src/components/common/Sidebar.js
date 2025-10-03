import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const getNavLinks = () => {
    const baseLinks = [
      { path: '/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' }
    ];

    if (user?.role === 'student') {
      return [
        ...baseLinks,
        { path: '/ratings', icon: 'bi-star', label: 'Rate Lectures' }
      ];
    }

    if (user?.role === 'lecturer') {
      return [
        ...baseLinks,
        { path: '/reports', icon: 'bi-clipboard-data', label: 'Reports' },
        { path: '/classes', icon: 'bi-people', label: 'My Classes' }
      ];
    }

    if (user?.role === 'principal_lecturer') {
      return [
        ...baseLinks,
        { path: '/reports', icon: 'bi-clipboard-check', label: 'Review Reports' },
        { path: '/courses', icon: 'bi-book', label: 'Courses' },
        { path: '/classes', icon: 'bi-building', label: 'Classes' }
      ];
    }

    if (user?.role === 'program_leader') {
      return [
        ...baseLinks,
        { path: '/courses', icon: 'bi-journal-bookmark', label: 'Manage Courses' },
        { path: '/classes', icon: 'bi-buildings', label: 'Manage Classes' },
        { path: '/reports', icon: 'bi-graph-up', label: 'View Reports' }
      ];
    }

    return baseLinks;
  };

  return (
    <div className="sidebar bg-primary text-white" style={{ width: '250px', minHeight: '100vh' }}>
      <div className="p-3">
        <h5 className="text-white">Navigation</h5>
      </div>
      
      <nav className="nav flex-column p-2">
        {getNavLinks().map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={`nav-link text-white ${location.pathname === link.path ? 'bg-white-25' : ''}`}
          >
            <i className={`${link.icon} me-2`}></i>
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;