import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const StudentRating = () => {
  const navigate = useNavigate();
  const [ratings, setRatings] = useState({});

  const courses = [
    { id: 1, name: 'Introduction to Programming', code: 'CS101', lecturer: 'Dr. Smith' },
    { id: 2, name: 'Database Systems', code: 'CS202', lecturer: 'Dr. Johnson' },
    { id: 3, name: 'Web Development', code: 'CS303', lecturer: 'Prof. Brown' }
  ];

  const handleRatingChange = (courseId, rating) => {
    setRatings(prev => ({ ...prev, [courseId]: rating }));
  };

  const submitRating = (courseId) => {
    alert(`Rating ${ratings[courseId]} submitted for ${courses.find(c => c.id === courseId)?.name}`);
  };

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>Course Rating & Feedback</h2>
              <p className="text-muted">Rate your courses and provide feedback</p>
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
              <h4 className="mb-0">Rate Your Courses</h4>
            </Card.Header>
            <Card.Body>
              <Table responsive striped>
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Lecturer</th>
                    <th>Your Rating</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map(course => (
                    <tr key={course.id}>
                      <td>
                        <strong>{course.code}</strong><br/>
                        {course.name}
                      </td>
                      <td>{course.lecturer}</td>
                      <td>
                        <Form.Select 
                          value={ratings[course.id] || ''} 
                          onChange={(e) => handleRatingChange(course.id, e.target.value)}
                          size="sm"
                        >
                          <option value="">Select Rating</option>
                          <option value="5">⭐️⭐️⭐️⭐️⭐️ (5/5)</option>
                          <option value="4">⭐️⭐️⭐️⭐️ (4/5)</option>
                          <option value="3">⭐️⭐️⭐️ (3/5)</option>
                          <option value="2">⭐️⭐️ (2/5)</option>
                          <option value="1">⭐️ (1/5)</option>
                        </Form.Select>
                      </td>
                      <td>
                        <Badge bg={ratings[course.id] ? 'success' : 'warning'}>
                          {ratings[course.id] ? 'Rated' : 'Pending'}
                        </Badge>
                      </td>
                      <td>
                        <Button 
                          size="sm" 
                          disabled={!ratings[course.id]}
                          onClick={() => submitRating(course.id)}
                        >
                          Submit Rating
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

export default StudentRating;