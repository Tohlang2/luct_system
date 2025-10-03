import React from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = localStorage.getItem('userRole') || 'student';

  const getRoleName = () => {
    switch(userRole) {
      case 'student': return 'Student';
      case 'lecturer': return 'Lecturer';
      case 'prl': return 'Principal Lecturer';
      case 'pl': return 'Program Leader';
      default: return 'User';
    }
  };

  const getNavItems = () => {
    switch(userRole) {
      case 'student':
        return [
          { path: '/dashboard', label: 'Dashboard' },
          { path: '/student/monitoring', label: 'Monitoring' },
          { path: '/student/rating', label: 'Rating' }
        ];
      case 'lecturer':
        return [
          { path: '/dashboard', label: 'Dashboard' },
          { path: '/lecturer/classes', label: 'Classes' },
          { path: '/lecturer/reports', label: 'Reports' },
          { path: '/lecturer/monitoring', label: 'Monitoring' },
          { path: '/lecturer/rating', label: 'Rating' }
        ];
      case 'prl':
        return [
          { path: '/dashboard', label: 'Dashboard' },
          { path: '/prl/courses', label: 'Courses' },
          { path: '/prl/reports', label: 'Reports' },
          { path: '/prl/monitoring', label: 'Monitoring' },
          { path: '/prl/rating', label: 'Rating' },
          { path: '/prl/classes', label: 'Classes' }
        ];
      case 'pl':
        return [
          { path: '/dashboard', label: 'Dashboard' },
          { path: '/pl/courses', label: 'Courses' },
          { path: '/pl/reports', label: 'Reports' },
          { path: '/pl/monitoring', label: 'Monitoring' },
          { path: '/pl/classes', label: 'Classes' },
          { path: '/pl/lectures', label: 'Lectures' },
          { path: '/pl/rating', label: 'Rating' }
        ];
      default:
        return [];
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="/dashboard">
          LUCT Faculty Portal
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {getNavItems().map(item => (
              <Nav.Link 
                key={item.path} 
                href={item.path}
                active={location.pathname === item.path}
              >
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
          <Nav>
            <Dropdown>
              <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                {getRoleName()}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogout}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;