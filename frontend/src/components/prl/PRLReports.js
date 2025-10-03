import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PRLReports = () => {
  const navigate = useNavigate();
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const reports = [
    { 
      id: 1, 
      lecturer: 'Dr. Smith', 
      course: 'CS101 - Intro to Programming', 
      class: 'CS101-A', 
      date: '2024-01-15', 
      attendance: '45/50', 
      status: 'Pending Review',
      topic: 'Introduction to Algorithms'
    },
    { 
      id: 2, 
      lecturer: 'Dr. Johnson', 
      course: 'CS202 - Database Systems', 
      class: 'CS202-B', 
      date: '2024-01-16', 
      attendance: '38/45', 
      status: 'Reviewed',
      topic: 'SQL Queries and Optimization'
    }
  ];

  const handleAddFeedback = (report) => {
    setSelectedReport(report);
    setShowFeedbackModal(true);
  };

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>Lecture Reports Review</h2>
              <p className="text-muted">Review and provide feedback on lecture reports</p>
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
              <h4 className="mb-0">Reports for Review</h4>
            </Card.Header>
            <Card.Body>
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>Report ID</th>
                    <th>Lecturer</th>
                    <th>Course</th>
                    <th>Class</th>
                    <th>Date</th>
                    <th>Attendance</th>
                    <th>Topic</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map(report => (
                    <tr key={report.id}>
                      <td>#{report.id}</td>
                      <td>{report.lecturer}</td>
                      <td>{report.course}</td>
                      <td>{report.class}</td>
                      <td>{report.date}</td>
                      <td>{report.attendance}</td>
                      <td>
                        <small>{report.topic}</small>
                      </td>
                      <td>
                        <Badge bg={report.status === 'Pending Review' ? 'warning' : 'success'}>
                          {report.status}
                        </Badge>
                      </td>
                      <td>
                        <Button variant="outline-primary" size="sm" className="me-1">
                          View
                        </Button>
                        <Button 
                          variant="outline-success" 
                          size="sm"
                          onClick={() => handleAddFeedback(report)}
                        >
                          Feedback
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

      <Modal show={showFeedbackModal} onHide={() => setShowFeedbackModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Feedback for Report #{selectedReport?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Feedback Type</Form.Label>
              <Form.Select>
                <option>Positive Feedback</option>
                <option>Suggestions for Improvement</option>
                <option>Critical Feedback</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Feedback Comments</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Enter your feedback..." />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <Form.Select>
                <option value="5">Excellent ⭐️⭐️⭐️⭐️⭐️</option>
                <option value="4">Good ⭐️⭐️⭐️⭐️</option>
                <option value="3">Average ⭐️⭐️⭐️</option>
                <option value="2">Needs Improvement ⭐️⭐️</option>
                <option value="1">Poor ⭐️</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFeedbackModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setShowFeedbackModal(false)}>
            Submit Feedback
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PRLReports;