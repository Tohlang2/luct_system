import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PRLCourses = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const courses = [
    { id: 1, code: 'CS101', name: 'Introduction to Programming', lecturer: 'Dr. Smith', students: 150, status: 'Active' },
    { id: 2, code: 'CS202', name: 'Database Systems', lecturer: 'Dr. Johnson', students: 120, status: 'Active' },
    { id: 3, code: 'CS303', name: 'Web Development', lecturer: 'Prof. Brown', students: 100, status: 'Active' },
    { id: 4, code: 'CS404', name: 'Software Engineering', lecturer: 'Dr. Wilson', students: 80, status: 'Planning' }
  ];

  const filteredCourses = filter === 'all' ? courses : courses.filter(course => course.status === filter);

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>Stream Courses Management</h2>
              <p className="text-muted">Manage courses under your academic stream</p>
            </div>
            <Button variant="primary" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={12}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Courses List</h4>
              <div>
                <Form.Select 
                  size="sm" 
                  style={{width: '200px'}} 
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Courses</option>
                  <option value="Active">Active</option>
                  <option value="Planning">Planning</option>
                  <option value="Archived">Archived</option>
                </Form.Select>
              </div>
            </Card.Header>
            <Card.Body>
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>Course Code</th>
                    <th>Course Name</th>
                    <th>Lecturer</th>
                    <th>Students</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map(course => (
                    <tr key={course.id}>
                      <td>
                        <strong>{course.code}</strong>
                      </td>
                      <td>{course.name}</td>
                      <td>{course.lecturer}</td>
                      <td>{course.students}</td>
                      <td>
                        <Badge bg={course.status === 'Active' ? 'success' : 'warning'}>
                          {course.status}
                        </Badge>
                      </td>
                      <td>
                        <Button variant="outline-primary" size="sm" className="me-1">
                          View
                        </Button>
                        <Button variant="outline-success" size="sm" className="me-1">
                          Reports
                        </Button>
                        <Button variant="outline-info" size="sm">
                          Analytics
                        </Button>
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

export default PRLCourses;