import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PLLectures = () => {
  const navigate = useNavigate();
  const [showLecturerModal, setShowLecturerModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const lecturers = [
    { 
      id: 1, 
      name: 'Dr. John Smith', 
      email: 'john.smith@luct.edu', 
      stream: 'Computer Science', 
      courses: ['CS101', 'CS102'], 
      status: 'Active',
      rating: '4.5/5',
      reports: 15
    },
    { 
      id: 2, 
      name: 'Dr. Sarah Johnson', 
      email: 'sarah.johnson@luct.edu', 
      stream: 'Computer Science', 
      courses: ['CS202', 'CS203'], 
      status: 'Active',
      rating: '4.2/5',
      reports: 12
    },
    { 
      id: 3, 
      name: 'Prof. Michael Brown', 
      email: 'michael.brown@luct.edu', 
      stream: 'Information Technology', 
      courses: ['IT301'], 
      status: 'Active',
      rating: '3.8/5',
      reports: 8
    },
    { 
      id: 4, 
      name: 'Dr. Emily Wilson', 
      email: 'emily.wilson@luct.edu', 
      stream: 'Software Engineering', 
      courses: ['SE401'], 
      status: 'On Leave',
      rating: '4.7/5',
      reports: 10
    }
  ];

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>Lecturers Management</h2>
              <p className="text-muted">Manage teaching staff and course assignments</p>
            </div>
            <div>
              <Button variant="primary" onClick={() => navigate('/dashboard')} className="me-2">
                Back to Dashboard
              </Button>
              <Button variant="success" onClick={() => setShowLecturerModal(true)}>
                <i className="fas fa-plus me-2"></i>
                Add Lecturer
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={12}>
          <Card>
            <Card.Header>
              <h4 className="mb-0">Teaching Staff</h4>
            </Card.Header>
            <Card.Body>
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Stream</th>
                    <th>Courses</th>
                    <th>Rating</th>
                    <th>Reports</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {lecturers.map(lecturer => (
                    <tr key={lecturer.id}>
                      <td>
                        <strong>{lecturer.name}</strong>
                      </td>
                      <td>{lecturer.email}</td>
                      <td>
                        <Badge bg="secondary">{lecturer.stream}</Badge>
                      </td>
                      <td>
                        {lecturer.courses.map((course, index) => (
                          <Badge key={index} bg="primary" className="me-1">
                            {course}
                          </Badge>
                        ))}
                      </td>
                      <td>
                        <Badge bg={lecturer.rating >= '4.0' ? 'success' : lecturer.rating >= '3.0' ? 'warning' : 'danger'}>
                          {lecturer.rating}
                        </Badge>
                      </td>
                      <td>{lecturer.reports}</td>
                      <td>
                        <Badge bg={lecturer.status === 'Active' ? 'success' : 'warning'}>
                          {lecturer.status}
                        </Badge>
                      </td>
                      <td>
                        <Button variant="outline-primary" size="sm" className="me-1">
                          Edit
                        </Button>
                        <Button 
                          variant="outline-success" 
                          size="sm"
                          onClick={() => setShowAssignModal(true)}
                        >
                          Assign
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

      <Row className="mt-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h5>Total Lecturers</h5>
              <h3 className="text-primary">25</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h5>Active</h5>
              <h3 className="text-success">23</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h5>On Leave</h5>
              <h3 className="text-warning">2</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h5>Avg Rating</h5>
              <h3 className="text-info">4.3/5</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showLecturerModal} onHide={() => setShowLecturerModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Lecturer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter lecturer's full name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email address" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stream</Form.Label>
              <Form.Select>
                <option>Computer Science</option>
                <option>Information Technology</option>
                <option>Software Engineering</option>
                <option>Data Science</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Qualifications</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter qualifications" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLecturerModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setShowLecturerModal(false)}>
            Add Lecturer
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAssignModal} onHide={() => setShowAssignModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Course to Lecturer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Select Lecturer</Form.Label>
              <Form.Select>
                <option>Select Lecturer</option>
                {lecturers.map(lecturer => (
                  <option key={lecturer.id} value={lecturer.id}>{lecturer.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Select Course</Form.Label>
              <Form.Select>
                <option>Select Course</option>
                <option>CS101 - Introduction to Programming</option>
                <option>CS202 - Database Systems</option>
                <option>CS303 - Web Development</option>
                <option>IT301 - Network Fundamentals</option>
                <option>SE401 - Software Architecture</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Academic Year</Form.Label>
              <Form.Control type="text" placeholder="e.g., 2024-2025" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAssignModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setShowAssignModal(false)}>
            Assign Course
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PLLectures;