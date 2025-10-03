import React from 'react';
import { Container, Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PRLClasses = () => {
  const navigate = useNavigate();

  const classes = [
    { id: 1, name: 'CS101-A', course: 'Introduction to Programming', lecturer: 'Dr. Smith', schedule: 'Mon, Wed 9:00-10:30', students: 50, status: 'Active' },
    { id: 2, name: 'CS101-B', course: 'Introduction to Programming', lecturer: 'Dr. Smith', schedule: 'Tue, Thu 14:00-15:30', students: 45, status: 'Active' },
    { id: 3, name: 'CS202-A', course: 'Database Systems', lecturer: 'Dr. Johnson', schedule: 'Mon, Wed 11:00-12:30', students: 40, status: 'Active' },
    { id: 4, name: 'CS303-A', course: 'Web Development', lecturer: 'Prof. Brown', schedule: 'Fri 9:00-12:00', students: 35, status: 'Active' }
  ];

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>Stream Classes Overview</h2>
              <p className="text-muted">Monitor all classes under your academic stream</p>
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
            <Card.Header>
              <h4 className="mb-0">Class Schedule & Details</h4>
            </Card.Header>
            <Card.Body>
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>Class Name</th>
                    <th>Course</th>
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
    </Container>
  );
};

export default PRLClasses;