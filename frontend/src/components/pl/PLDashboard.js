import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PLDashboard = () => {
  const navigate = useNavigate();

  const stats = {
    totalCourses: 15,
    totalLecturers: 25,
    pendingApprovals: 8,
    programRating: '4.4/5'
  };

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col>
          <h2>Program Leader (PL) Dashboard</h2>
          <p className="text-muted">Program management and academic oversight</p>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={3}>
          <Card className="text-center border-primary">
            <Card.Body>
              <Card.Title>Courses</Card.Title>
              <h2 className="text-primary">{stats.totalCourses}</h2>
              <p>In program</p>
              <Button variant="primary" onClick={() => navigate('/pl/courses')}>
                Manage Courses
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-success">
            <Card.Body>
              <Card.Title>Lecturers</Card.Title>
              <h2 className="text-success">{stats.totalLecturers}</h2>
              <p>Teaching staff</p>
              <Button variant="success" onClick={() => navigate('/pl/lectures')}>
                Manage Staff
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-warning">
            <Card.Body>
              <Card.Title>Approvals</Card.Title>
              <h2 className="text-warning">{stats.pendingApprovals}</h2>
              <p>Pending</p>
              <Button variant="warning" onClick={() => navigate('/pl/reports')}>
                Review
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-info">
            <Card.Body>
              <Card.Title>Program Rating</Card.Title>
              <h2 className="text-info">{stats.programRating}</h2>
              <p>Overall performance</p>
              <Button variant="info" onClick={() => navigate('/pl/rating')}>
                View Ratings
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={12}>
          <Card>
            <Card.Header>
              <h4 className="mb-0">Program Leader Modules</h4>
            </Card.Header>
            <Card.Body>
              <Row className="text-center">
                <Col md={2}>
                  <Button variant="primary" className="mb-3 w-100" onClick={() => navigate('/pl/courses')}>
                    Courses
                  </Button>
                </Col>
                <Col md={2}>
                  <Button variant="success" className="mb-3 w-100" onClick={() => navigate('/pl/reports')}>
                    Reports
                  </Button>
                </Col>
                <Col md={2}>
                  <Button variant="info" className="mb-3 w-100" onClick={() => navigate('/pl/monitoring')}>
                    Monitoring
                  </Button>
                </Col>
                <Col md={2}>
                  <Button variant="warning" className="mb-3 w-100" onClick={() => navigate('/pl/classes')}>
                    Classes
                  </Button>
                </Col>
                <Col md={2}>
                  <Button variant="secondary" className="mb-3 w-100" onClick={() => navigate('/pl/lectures')}>
                    Lectures
                  </Button>
                </Col>
                <Col md={2}>
                  <Button variant="danger" className="mb-3 w-100" onClick={() => navigate('/pl/rating')}>
                    Rating
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PLDashboard;