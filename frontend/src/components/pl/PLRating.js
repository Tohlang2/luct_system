import React from 'react';
import { Container, Row, Col, Card, Table, Badge, ProgressBar, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PLRating = () => {
  const navigate = useNavigate();

  const programRatings = [
    { stream: 'Computer Science', studentRating: 4.5, lecturerRating: 4.3, prlRating: 4.6, overall: 4.5, reviews: 156 },
    { stream: 'Information Technology', studentRating: 4.2, lecturerRating: 4.1, prlRating: 4.3, overall: 4.2, reviews: 89 },
    { stream: 'Software Engineering', studentRating: 4.7, lecturerRating: 4.5, prlRating: 4.8, overall: 4.7, reviews: 67 },
    { stream: 'Data Science', studentRating: 4.0, lecturerRating: 4.2, prlRating: 4.1, overall: 4.1, reviews: 45 }
  ];

  const topCourses = [
    { course: 'CS101 - Intro to Programming', lecturer: 'Dr. Smith', rating: 4.8, students: 150, reviews: 45 },
    { course: 'SE401 - Software Architecture', lecturer: 'Dr. Wilson', rating: 4.7, students: 80, reviews: 28 },
    { course: 'CS303 - Web Development', lecturer: 'Prof. Brown', rating: 4.5, students: 100, reviews: 32 },
    { course: 'IT301 - Network Fundamentals', lecturer: 'Prof. Davis', rating: 4.4, students: 75, reviews: 22 }
  ];

  const recentFeedback = [
    { student: 'Alice Johnson', course: 'CS101', rating: 5, comment: 'Excellent course structure and teaching!', date: '2024-01-15' },
    { student: 'Bob Smith', course: 'SE401', rating: 4, comment: 'Very practical and industry-relevant content', date: '2024-01-14' },
    { student: 'Carol Davis', course: 'CS303', rating: 5, comment: 'Best web development course I have taken', date: '2024-01-13' },
    { student: 'David Wilson', course: 'IT301', rating: 4, comment: 'Good content but could use more hands-on labs', date: '2024-01-12' }
  ];

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>Program Ratings & Feedback</h2>
              <p className="text-muted">Comprehensive program performance ratings and student feedback</p>
            </div>
            <Button variant="primary" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={12}>
          <Card className="bg-gradient-primary text-white">
            <Card.Body className="text-center">
              <h1 className="display-4">4.4/5</h1>
              <h4>Overall Program Rating</h4>
              <p className="mb-0">Based on 357 reviews across all streams</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>
              <h4 className="mb-0">Stream Ratings Comparison</h4>
            </Card.Header>
            <Card.Body>
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>Stream</th>
                    <th>Student Rating</th>
                    <th>Lecturer Rating</th>
                    <th>PRL Rating</th>
                    <th>Overall</th>
                    <th>Reviews</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {programRatings.map((stream, index) => (
                    <tr key={index}>
                      <td>
                        <strong>{stream.stream}</strong>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="me-2">{stream.studentRating}/5</span>
                          <ProgressBar 
                            now={(stream.studentRating / 5) * 100} 
                            variant={stream.studentRating >= 4 ? 'success' : stream.studentRating >= 3 ? 'warning' : 'danger'}
                            style={{ width: '80px' }}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="me-2">{stream.lecturerRating}/5</span>
                          <ProgressBar 
                            now={(stream.lecturerRating / 5) * 100} 
                            variant={stream.lecturerRating >= 4 ? 'success' : stream.lecturerRating >= 3 ? 'warning' : 'danger'}
                            style={{ width: '80px' }}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="me-2">{stream.prlRating}/5</span>
                          <ProgressBar 
                            now={(stream.prlRating / 5) * 100} 
                            variant={stream.prlRating >= 4 ? 'success' : stream.prlRating >= 3 ? 'warning' : 'danger'}
                            style={{ width: '80px' }}
                          />
                        </div>
                      </td>
                      <td>
                        <Badge bg={
                          stream.overall >= 4.5 ? 'success' : 
                          stream.overall >= 4.0 ? 'warning' : 'danger'
                        }>
                          {stream.overall}/5
                        </Badge>
                      </td>
                      <td>{stream.reviews}</td>
                      <td>
                        <Badge bg={stream.overall >= 4.0 ? 'success' : 'warning'}>
                          {stream.overall >= 4.0 ? 'Excellent' : 'Good'}
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
          <Card className="mb-4">
            <Card.Header>
              <h4 className="mb-0">Top Rated Courses</h4>
            </Card.Header>
            <Card.Body>
              {topCourses.map((course, index) => (
                <div key={index} className="border-bottom pb-2 mb-2">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <strong>{course.course}</strong>
                      <br />
                      <small className="text-muted">{course.lecturer}</small>
                    </div>
                    <Badge bg="success">{course.rating}/5</Badge>
                  </div>
                  <div className="d-flex justify-content-between mt-1">
                    <small>{course.students} students</small>
                    <small>{course.reviews} reviews</small>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <h4 className="mb-0">Recent Feedback</h4>
            </Card.Header>
            <Card.Body>
              {recentFeedback.map((feedback, index) => (
                <div key={index} className="border-bottom pb-2 mb-2">
                  <div className="d-flex justify-content-between">
                    <strong>{feedback.student}</strong>
                    <Badge bg={feedback.rating >= 4 ? 'success' : 'warning'}>
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

      <Row className="mt-4">
        <Col md={12}>
          <Card>
            <Card.Header>
              <h4 className="mb-0">Rating Distribution</h4>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={2} className="text-center">
                  <h3 className="text-success">⭐️⭐️⭐️⭐️⭐️</h3>
                  <h4>65%</h4>
                  <p>Excellent</p>
                </Col>
                <Col md={2} className="text-center">
                  <h3 className="text-info">⭐️⭐️⭐️⭐️</h3>
                  <h4>22%</h4>
                  <p>Good</p>
                </Col>
                <Col md={2} className="text-center">
                  <h3 className="text-warning">⭐️⭐️⭐️</h3>
                  <h4>8%</h4>
                  <p>Average</p>
                </Col>
                <Col md={2} className="text-center">
                  <h3 className="text-danger">⭐️⭐️</h3>
                  <h4>3%</h4>
                  <p>Poor</p>
                </Col>
                <Col md={2} className="text-center">
                  <h3 className="text-secondary">⭐️</h3>
                  <h4>2%</h4>
                  <p>Very Poor</p>
                </Col>
                <Col md={2} className="text-center">
                  <Button variant="outline-primary">
                    <i className="fas fa-download me-2"></i>
                    Export Ratings
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

export default PLRating;