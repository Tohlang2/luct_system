import React from 'react';
import { Container, Row, Col, Card, Table, Badge, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LecturerRating = () => {
  const navigate = useNavigate();

  const ratings = [
    { course: 'CS101 - Intro to Programming', rating: 4.5, reviews: 23, students: 50 },
    { course: 'CS202 - Database Systems', rating: 4.2, reviews: 18, students: 45 },
    { course: 'CS303 - Web Development', rating: 3.8, reviews: 15, students: 35 }
  ];

  const recentFeedback = [
    { student: 'John Smith', course: 'CS101', rating: 5, comment: 'Excellent teaching methodology!', date: '2024-01-15' },
    { student: 'Sarah Johnson', course: 'CS202', rating: 4, comment: 'Very knowledgeable instructor', date: '2024-01-14' },
    { student: 'Mike Brown', course: 'CS303', rating: 3, comment: 'Good content but fast pace', date: '2024-01-13' }
  ];

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>Course Ratings & Feedback</h2>
              <p className="text-muted">View student ratings and feedback for your courses</p>
            </div>
            <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </button>
          </div>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>
              <h4 className="mb-0">Course Ratings Overview</h4>
            </Card.Header>
            <Card.Body>
              <Table responsive striped>
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Average Rating</th>
                    <th>Reviews</th>
                    <th>Students</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ratings.map((item, index) => (
                    <tr key={index}>
                      <td>{item.course}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="me-2">{item.rating}/5</span>
                          <ProgressBar 
                            now={(item.rating / 5) * 100} 
                            variant={item.rating >= 4 ? 'success' : item.rating >= 3 ? 'warning' : 'danger'}
                            style={{ width: '100px', height: '10px' }}
                          />
                        </div>
                      </td>
                      <td>{item.reviews}</td>
                      <td>{item.students}</td>
                      <td>
                        <Badge bg={item.rating >= 4 ? 'success' : item.rating >= 3 ? 'warning' : 'danger'}>
                          {item.rating >= 4 ? 'Excellent' : item.rating >= 3 ? 'Good' : 'Needs Improvement'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card>
            <Card.Header>
              <h4 className="mb-0">Recent Feedback</h4>
            </Card.Header>
            <Card.Body>
              {recentFeedback.map((feedback, index) => (
                <div key={index} className="border-bottom pb-2 mb-2">
                  <div className="d-flex justify-content-between">
                    <strong>{feedback.student}</strong>
                    <Badge bg={feedback.rating >= 4 ? 'success' : feedback.rating >= 3 ? 'warning' : 'danger'}>
                      {feedback.rating}/5
                    </Badge>
                  </div>
                  <small className="text-muted">{feedback.course} • {feedback.date}</small>
                  <p className="mb-1 small">{feedback.comment}</p>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LecturerRating;