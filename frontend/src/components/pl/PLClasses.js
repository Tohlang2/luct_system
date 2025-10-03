import React from 'react';
import { Container, Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PLClasses = () => {
  const navigate = useNavigate();

  const classes = [
    { id: 1, name: 'CS101-A', course: 'Introduction to Programming', stream: 'Computer Science', lecturer: 'Dr. Smith', schedule: 'Mon, Wed 9:00-10:30', students: 50, status: 'Active' },
    { id: 2, name: 'CS101-B', course: 'Introduction to Programming', stream: 'Computer Science', lecturer: 'Dr. Smith', schedule: 'Tue, Thu 14:00-15:30', students: 45, status: 'Active' },
    { id: 3, name: 'CS202-A', course: 'Database Systems', stream: 'Computer Science', lecturer: 'Dr. Johnson', schedule: 'Mon, Wed 11:00-12:30', students: 40, status: 'Active' },
    { id: 4, name: 'IT301-A', course: 'Network Fundamentals', stream: 'Information Technology', lecturer: 'Prof. Davis', schedule: 'Tue, Thu 9:00-10:30', students: 35, status: 'Active' },
    { id: 5, name: 'SE401-A', course: 'Software Architecture', stream: 'Software Engineering', lecturer: 'Dr. Wilson', schedule: 'Fri 9:00-12:00', students: 30, status: 'Active' }
  ];

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>Program Classes Overview</h2>
              <p className="text-muted">Manage all classes across the academic program</p>
            </div>
            <Button variant="primary" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={12}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h4 className="mb-0">All Program Classes</h4>
              <div>
                <Button variant="success" size="sm" className="me-2">
                  <i className="fas fa-plus me-1"></i>
                  Add Class
                </Button>
                <Button variant="info" size="sm">
                  <i className="fas fa-download me-1"></i>
                  Export
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>Class Name</th>
                    <th>Course</th>
                    <th>Stream</th>
                    <th>Lecturer</th>
                    <th>Schedule</th>
                    <th>Students</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map(cls => (
                    <tr key={cls.id}>
                      <td>
                        <strong>{cls.name}</strong>
                      </td>
                      <td>{cls.course}</td>
                      <td>
                        <Badge bg="secondary">{cls.stream}</Badge>
                      </td>
                      <td>{cls.lecturer}</td>
                      <td>{cls.schedule}</td>
                      <td>{cls.students}</td>
                      <td>
                        <Badge bg={cls.status === 'Active' ? 'success' : 'secondary'}>
                          {cls.status}
                        </Badge>
                      </td>
                      <td>
                        <div className="btn-group">
                          <Button variant="outline-primary" size="sm">Schedule</Button>
                          <Button variant="outline-success" size="sm">Reports</Button>
                          <Button variant="outline-info" size="sm">Analytics</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={3}>
          <Card className="text-center border-primary">
            <Card.Body>
              <h5>Computer Science</h5>
              <h3 className="text-primary">3</h3>
              <p>Classes</p>
              <p className="mb-0">135 Students</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-success">
            <Card.Body>
              <h5>Info Technology</h5>
              <h3 className="text-success">1</h3>
              <p>Classes</p>
              <p className="mb-0">35 Students</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-warning">
            <Card.Body>
              <h5>Software Eng</h5>
              <h3 className="text-warning">1</h3>
              <p>Classes</p>
              <p className="mb-0">30 Students</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-info">
            <Card.Body>
              <h5>Data Science</h5>
              <h3 className="text-info">0</h3>
              <p>Classes</p>
              <p className="mb-0">0 Students</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PLClasses;