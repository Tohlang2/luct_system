import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LecturerDashboard = () => {
  const navigate = useNavigate();

  const stats = {
    totalClasses: 4,
    reportsSubmitted: 12,
    averageRating: '4.2/5',
    students: 150
  };

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col>
          <h2>Lecturer Dashboard</h2>
          <p className="text-muted">Manage your classes and academic reporting</p>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={3}>
          <Card className="text-center border-primary">
            <Card.Body>
              <Card.Title>Classes</Card.Title>
              <h2 className="text-primary">{stats.totalClasses}</h2>
              <Button variant="primary" onClick={() => navigate('/lecturer/classes')}>
                Manage Classes
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-success">
            <Card.Body>
              <Card.Title>Reports</Card.Title>
              <h2 className="text-success">{stats.reportsSubmitted}</h2>
              <Button variant="success" onClick={() => navigate('/lecturer/reports')}>
                View Reports
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-info">
            <Card.Body>
              <Card.Title>Rating</Card.Title>
              <h2 className="text-info">{stats.averageRating}</h2>
              <Button variant="info" onClick={() => navigate('/lecturer/rating')}>
                View Ratings
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-warning">
            <Card.Body>
              <Card.Title>Monitoring</Card.Title>
              <h2 className="text-warning">{stats.students}</h2>
              <Button variant="warning" onClick={() => navigate('/lecturer/monitoring')}>
                Monitor Progress
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={12}>
          <Card>
            <Card.Header>
              <h4 className="mb-0">Lecturer Modules</h4>
            </Card.Header>
            <Card.Body>
              <Row className="text-center">
                <Col md={3}>
                  <Button variant="primary" size="lg" className="mb-3 w-100" onClick={() => navigate('/lecturer/classes')}>
                    Classes
                  </Button>
                </Col>
                <Col md={3}>
                  <Button variant="success" size="lg" className="mb-3 w-100" onClick={() => navigate('/lecturer/reports')}>
                    Reports
                  </Button>
                </Col>
                <Col md={3}>
                  <Button variant="info" size="lg" className="mb-3 w-100" onClick={() => navigate('/lecturer/monitoring')}>
                    Monitoring
                  </Button>
                </Col>
                <Col md={3}>
                  <Button variant="warning" size="lg" className="mb-3 w-100" onClick={() => navigate('/lecturer/rating')}>
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

export default LecturerDashboard;