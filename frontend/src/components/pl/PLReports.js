import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PLReports = () => {
  const navigate = useNavigate();
  const [selectedReport, setSelectedReport] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const reports = [
    { 
      id: 1, 
      course: 'CS101 - Intro to Programming', 
      lecturer: 'Dr. Smith', 
      prl: 'Dr. Anderson',
      date: '2024-01-15', 
      status: 'Approved',
      prlFeedback: 'Excellent coverage of algorithms',
      attendance: '45/50'
    },
    { 
      id: 2, 
      course: 'CS202 - Database Systems', 
      lecturer: 'Dr. Johnson', 
      prl: 'Dr. Anderson',
      date: '2024-01-16', 
      status: 'Pending PL Review',
      prlFeedback: 'Good practical examples',
      attendance: '38/45'
    },
    { 
      id: 3, 
      course: 'CS303 - Web Development', 
      lecturer: 'Prof. Brown', 
      prl: 'Dr. Anderson',
      date: '2024-01-17', 
      status: 'Needs Revision',
      prlFeedback: 'Please include more interactive examples',
      attendance: '35/35'
    }
  ];

  const viewReportDetails = (report) => {
    setSelectedReport(report);
    setShowDetailModal(true);
  };

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>Program Reports Overview</h2>
              <p className="text-muted">Review reports from Principal Lecturers</p>
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
              <h4 className="mb-0">Reports Summary</h4>
            </Card.Header>
            <Card.Body>
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>Report ID</th>
                    <th>Course</th>
                    <th>Lecturer</th>
                    <th>PRL</th>
                    <th>Date</th>
                    <th>Attendance</th>
                    <th>PRL Feedback</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map(report => (
                    <tr key={report.id}>
                      <td>#{report.id}</td>
                      <td>{report.course}</td>
                      <td>{report.lecturer}</td>
                      <td>{report.prl}</td>
                      <td>{report.date}</td>
                      <td>{report.attendance}</td>
                      <td>
                        <small>{report.prlFeedback}</small>
                      </td>
                      <td>
                        <Badge bg={
                          report.status === 'Approved' ? 'success' : 
                          report.status === 'Pending PL Review' ? 'warning' : 'danger'
                        }>
                          {report.status}
                        </Badge>
                      </td>
                      <td>
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          onClick={() => viewReportDetails(report)}
                        >
                          Details
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

      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Report Details - #{selectedReport?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReport && (
            <Row>
              <Col md={6}>
                <h6>Course Information</h6>
                <p><strong>Course:</strong> {selectedReport.course}</p>
                <p><strong>Lecturer:</strong> {selectedReport.lecturer}</p>
                <p><strong>PRL:</strong> {selectedReport.prl}</p>
              </Col>
              <Col md={6}>
                <h6>Report Details</h6>
                <p><strong>Date:</strong> {selectedReport.date}</p>
                <p><strong>Attendance:</strong> {selectedReport.attendance}</p>
                <p><strong>Status:</strong> 
                  <Badge bg={
                    selectedReport.status === 'Approved' ? 'success' : 
                    selectedReport.status === 'Pending PL Review' ? 'warning' : 'danger'
                  } className="ms-2">
                    {selectedReport.status}
                  </Badge>
                </p>
              </Col>
              <Col md={12}>
                <h6>PRL Feedback</h6>
                <Card>
                  <Card.Body>
                    {selectedReport.prlFeedback}
                  </Card.Body>
                </Card>
              </Col>
              <Col md={12} className="mt-3">
                <h6>PL Action</h6>
                <Form.Group>
                  <Form.Label>PL Comments</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Enter your comments..." />
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>Final Decision</Form.Label>
                  <Form.Select>
                    <option>Approve Report</option>
                    <option>Request Revision</option>
                    <option>Escalate to Department</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setShowDetailModal(false)}>
            Submit Decision
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PLReports;