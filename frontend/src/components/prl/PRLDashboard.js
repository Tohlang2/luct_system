import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PRLDashboard = () => {
  const navigate = useNavigate();

  const stats = {
    totalCourses: 8,
    pendingReports: 5,
    lecturers: 12,
    averageRating: '4.3/5'
  };

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col>
          <h2>Principal Lecturer (PRL) Dashboard</h2>
          <p className="text-muted">Stream management and academic oversight</p>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={3}>
          <Card className="text-center border-primary">
            <Card.Body>
              <Card.Title>Courses</Card.Title>
              <h2 className="text-primary">{stats.totalCourses}</h2>
              <p>Under your stream</p>
              <Button variant="primary" onClick={() => navigate('/prl/courses')}>
                Manage Courses
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-success">
            <Card.Body>
              <Card.Title>Reports</Card.Title>
              <h2 className="text-success">{stats.pendingReports}</h2>
              <p>Pending review</p>
              <Button variant="success" onClick={() => navigate('/prl/reports')}>
                Review Reports
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-info">
            <Card.Body>
              <Card.Title>Lecturers</Card.Title>
              <h2 className="text-info">{stats.lecturers}</h2>
              <p>In your stream</p>
              <Button variant="info" onClick={() => navigate('/prl/classes')}>
                View Staff
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-warning">
            <Card.Body>
              <Card.Title>Stream Rating</Card.Title>
              <h2 className="text-warning">{stats.averageRating}</h2>
              <p>Overall performance</p>
              <Button variant="warning" onClick={() => navigate('/prl/rating')}>
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
              <h4 className="mb-0">PRL Modules</h4>
            </Card.Header>
            <Card.Body>
              <Row className="text-center">
                <Col md={2}>
                  <Button variant="primary" className="mb-3 w-100" onClick={() => navigate('/prl/courses')}>
                    Courses
                  </Button>
                </Col>
                <Col md={2}>
                  <Button variant="success" className="mb-3 w-100" onClick={() => navigate('/prl/reports')}>
                    Reports
                  </Button>
                </Col>
                <Col md={2}>
                  <Button variant="info" className="mb-3 w-100" onClick={() => navigate('/prl/monitoring')}>
                    Monitoring
                  </Button>
                </Col>
                <Col md={2}>
                  <Button variant="warning" className="mb-3 w-100" onClick={() => navigate('/prl/rating')}>
                    Rating
                  </Button>
                </Col>
                <Col md={2}>
                  <Button variant="secondary" className="mb-3 w-100" onClick={() => navigate('/prl/classes')}>
                    Classes
                  </Button>
                </Col>
                <Col md={2}>
                  <Button variant="danger" className="mb-3 w-100" onClick={() => navigate('/prl/monitoring')}>
                    Lecturers
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

export default PRLDashboard;