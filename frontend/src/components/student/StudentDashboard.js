import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();

  const quickStats = {
    enrolledCourses: 4,
    attendance: '85%',
    averageGrade: 'B+',
    pendingAssignments: 2
  };

  const handleViewAssignments = () => {
    alert('Viewing assignments...\n\nPending Assignments:\n- Database Project (Due: 2024-02-15)\n- Web Development Assignment (Due: 2024-02-20)');
  };

  const handleCourseMaterials = () => {
    alert('Opening Course Materials...\n\nAvailable Materials:\n- CS101: Lecture Slides, Code Examples\n- CS202: Database Diagrams, SQL Exercises\n- CS303: HTML/CSS Templates, JavaScript Tutorials');
  };

  const handleViewGrades = () => {
    alert('Opening Grades Overview...\n\nCurrent Grades:\n- CS101: A-\n- CS202: B+\n- CS303: B\n- CS404: A');
  };

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col>
          <h2>Student Dashboard</h2>
          <p className="text-muted">Welcome to your learning portal</p>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={3}>
          <Card className="text-center dashboard-card card-primary">
            <Card.Body>
              <Card.Title>Enrolled Courses</Card.Title>
              <h3 className="text-primary">{quickStats.enrolledCourses}</h3>
              <Button variant="primary" onClick={() => navigate('/student/monitoring')}>
                View Courses
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center dashboard-card card-success">
            <Card.Body>
              <Card.Title>Attendance</Card.Title>
              <h3 className="text-success">{quickStats.attendance}</h3>
              <Button variant="success" onClick={() => navigate('/student/monitoring')}>
                View Attendance
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center dashboard-card card-info">
            <Card.Body>
              <Card.Title>Average Grade</Card.Title>
              <h3 className="text-info">{quickStats.averageGrade}</h3>
              <Button variant="info" onClick={handleViewGrades}>
                View Grades
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center dashboard-card card-warning">
            <Card.Body>
              <Card.Title>Pending Assignments</Card.Title>
              <h3 className="text-warning">{quickStats.pendingAssignments}</h3>
              <Button variant="warning" onClick={handleViewAssignments}>
                View Assignments
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={12}>
          <Card className="dashboard-card">
            <Card.Header>
              <h4 className="mb-0">Quick Actions</h4>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={4} className="text-center">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="mb-2 w-75" 
                    onClick={() => navigate('/student/monitoring')}
                  >
                    Monitoring
                  </Button>
                  <p>Track your academic progress and attendance</p>
                </Col>
                <Col md={4} className="text-center">
                  <Button 
                    variant="success" 
                    size="lg" 
                    className="mb-2 w-75" 
                    onClick={() => navigate('/student/rating')}
                  >
                    Rating & Feedback
                  </Button>
                  <p>Rate courses and provide feedback</p>
                </Col>
                <Col md={4} className="text-center">
                  <Button 
                    variant="info" 
                    size="lg" 
                    className="mb-2 w-75"
                    onClick={handleCourseMaterials}
                  >
                    Course Materials
                  </Button>
                  <p>Access learning materials and resources</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6}>
          <Card className="dashboard-card">
            <Card.Header>
              <h5 className="mb-0">Recent Announcements</h5>
            </Card.Header>
            <Card.Body>
              <div className="border-bottom pb-2 mb-2">
                <strong>Midterm Schedule Posted</strong>
                <p className="mb-1 small text-muted">Posted: 2025-01-20</p>
                <p className="mb-1 small">Midterm examinations schedule has been published. Check your course pages.</p>
              </div>
              <div className="border-bottom pb-2 mb-2">
                <strong>Library Hours Extended</strong>
                <p className="mb-1 small text-muted">Posted: 2025-01-18</p>
                <p className="mb-1 small">Library will remain open until 10 PM during examination period.</p>
              </div>
              <div className="pb-2">
                <strong>New Online Resources Available</strong>
                <p className="mb-1 small text-muted">Posted: 2025-01-15</p>
                <p className="mb-1 small">Additional learning materials have been added to the portal.</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="dashboard-card">
            <Card.Header>
              <h5 className="mb-0">Upcoming Deadlines</h5>
            </Card.Header>
            <Card.Body>
              <div className="border-bottom pb-2 mb-2">
                <strong>Database Project Submission</strong>
                <p className="mb-1 small text-muted">Due: 2025-03-15</p>
                <p className="mb-1 small">CS202 - Database Systems</p>
                <span className="badge bg-warning">Pending</span>
              </div>
              <div className="border-bottom pb-2 mb-2">
                <strong>Web Development Assignment</strong>
                <p className="mb-1 small text-muted">Due: 2025-02-20</p>
                <p className="mb-1 small">CS303 - Web Development</p>
                <span className="badge bg-warning">Pending</span>
              </div>
              <div className="pb-2">
                <strong>Software Engineering Report</strong>
                <p className="mb-1 small text-muted">Due: 2025-02-25</p>
                <p className="mb-1 small">CS404 - Software Engineering</p>
                <span className="badge bg-success">Submitted</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentDashboard;