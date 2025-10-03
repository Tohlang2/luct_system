import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PLCourses = () => {
  const navigate = useNavigate();
  const [showCourseModal, setShowCourseModal] = useState(false);

  const courses = [
    { id: 1, code: 'CS101', name: 'Introduction to Programming', stream: 'Computer Science', credits: 3, status: 'Active', lecturer: 'Dr. Smith' },
    { id: 2, code: 'CS202', name: 'Database Systems', stream: 'Computer Science', credits: 4, status: 'Active', lecturer: 'Dr. Johnson' },
    { id: 3, code: 'CS303', name: 'Web Development', stream: 'Computer Science', credits: 3, status: 'Active', lecturer: 'Prof. Brown' },
    { id: 4, code: 'CS404', name: 'Software Engineering', stream: 'Computer Science', credits: 4, status: 'Planning', lecturer: 'To be assigned' }
  ];

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>Program Courses Management</h2>
              <p className="text-muted">Manage all courses in the academic program</p>
            </div>
            <div>
              <Button variant="primary" onClick={() => navigate('/dashboard')} className="me-2">
                Back to Dashboard
              </Button>
              <Button variant="success" onClick={() => setShowCourseModal(true)}>
                <i className="fas fa-plus me-2"></i>
                Add Course
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={12}>
          <Card>
            <Card.Header>
              <h4 className="mb-0">Program Courses</h4>
            </Card.Header>
            <Card.Body>
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>Course Code</th>
                    <th>Course Name</th>
                    <th>Stream</th>
                    <th>Credits</th>
                    <th>Lecturer</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map(course => (
                    <tr key={course.id}>
                      <td>
                        <strong>{course.code}</strong>
                      </td>
                      <td>{course.name}</td>
                      <td>{course.stream}</td>
                      <td>{course.credits}</td>
                      <td>{course.lecturer}</td>
                      <td>
                        <Badge bg={course.status === 'Active' ? 'success' : 'warning'}>
                          {course.status}
                        </Badge>
                      </td>
                      <td>
                        <Button variant="outline-primary" size="sm" className="me-1">
                          Edit
                        </Button>
                        <Button variant="outline-success" size="sm" className="me-1">
                          Assign
                        </Button>
                        <Button variant="outline-info" size="sm">
                          Modules
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

      <Modal show={showCourseModal} onHide={() => setShowCourseModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Course Code</Form.Label>
                  <Form.Control type="text" placeholder="e.g., CS101" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Course Name</Form.Label>
                  <Form.Control type="text" placeholder="e.g., Introduction to Programming" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Stream</Form.Label>
                  <Form.Select>
                    <option>Computer Science</option>
                    <option>Information Technology</option>
                    <option>Software Engineering</option>
                    <option>Data Science</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Credits</Form.Label>
                  <Form.Select>
                    <option>3</option>
                    <option>4</option>
                    <option>6</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Course Description</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCourseModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setShowCourseModal(false)}>
            Add Course
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PLCourses;