import React from 'react';
import { Container, Row, Col, Card, Table, Badge, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PRLRating = () => {
  const navigate = useNavigate();

  const streamRatings = [
    { course: 'CS101 - Intro to Programming', lecturer: 'Dr. Smith', studentRating: 4.5, prlRating: 4.8, overall: 4.5, reviews: 45 },
    { course: 'CS202 - Database Systems', lecturer: 'Dr. Johnson', studentRating: 4.2, prlRating: 4.5, overall: 4.2, reviews: 38 },
    { course: 'CS303 - Web Development', lecturer: 'Prof. Brown', studentRating: 3.8, prlRating: 4.0, overall: 4.1, reviews: 32 },
    { course: 'CS404 - Software Engineering', lecturer: 'Dr. Wilson', studentRating: 4.7, prlRating: 4.9, overall: 4.8, reviews: 28 }
  ];

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>Stream Ratings & Feedback</h2>
              <p className="text-muted">View ratings and feedback for courses in your stream</p>
            </div>
            <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </button>
          </div>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={12}>
          <Card>
            <Card.Header>
              <h4 className="mb-0">Course Ratings Summary</h4>
            </Card.Header>
            <Card.Body>
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Lecturer</th>
                    <th>Student Rating</th>
                    <th>PRL Rating</th>
                    <th>Overall</th>
                    <th>Reviews</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {streamRatings.map((course, index) => (
                    <tr key={index}>
                      <td>
                        <strong>{course.course}</strong>
                      </td>
                      <td>{course.lecturer}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="me-2">{course.studentRating}/5</span>
                          <ProgressBar 
                            now={(course.studentRating / 5) * 100} 
                            variant={course.studentRating >= 4 ? 'success' : course.studentRating >= 3 ? 'warning' : 'danger'}
                            style={{ width: '100px' }}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="me-2">{course.prlRating}/5</span>
                          <ProgressBar 
                            now={(course.prlRating / 5) * 100} 
                            variant={course.prlRating >= 4 ? 'success' : course.prlRating >= 3 ? 'warning' : 'danger'}
                            style={{ width: '100px' }}
                          />
                        </div>
                      </td>
                      <td>
                        <Badge bg={
                          course.overall >= 4.5 ? 'success' : 
                          course.overall >= 4.0 ? 'warning' : 'danger'
                        }>
                          {course.overall}/5
                        </Badge>
                      </td>
                      <td>{course.reviews}</td>
                      <td>
                        <Badge bg={
                          (course.studentRating >= 4 && course.prlRating >= 4) ? 'success' : 
                          (course.studentRating >= 3 && course.prlRating >= 3) ? 'warning' : 'danger'
                        }>
                          {(course.studentRating >= 4 && course.prlRating >= 4) ? 'Excellent' : 
                           (course.studentRating >= 3 && course.prlRating >= 3) ? 'Good' : 'Needs Improvement'}
                        </Badge>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-1">Details</button>
                        <button className="btn btn-sm btn-outline-success">Feedback</button>
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

export default PRLRating;