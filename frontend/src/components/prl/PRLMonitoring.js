import React from 'react';
import { Container, Row, Col, Card, Table, ProgressBar, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PRLMonitoring = () => {
  const navigate = useNavigate();

  const streamPerformance = [
    { course: 'CS101 - Intro to Programming', lecturer: 'Dr. Smith', avgAttendance: 92, avgGrade: 'B+', completion: 78 },
    { course: 'CS202 - Database Systems', lecturer: 'Dr. Johnson', avgAttendance: 88, avgGrade: 'A-', completion: 82 },
    { course: 'CS303 - Web Development', lecturer: 'Prof. Brown', avgAttendance: 85, avgGrade: 'B', completion: 75 },
    { course: 'CS404 - Software Engineering', lecturer: 'Dr. Wilson', avgAttendance: 90, avgGrade: 'A', completion: 80 }
  ];

  const lecturerPerformance = [
    { name: 'Dr. Smith', courses: 3, avgRating: 4.5, reports: 15, status: 'Excellent' },
    { name: 'Dr. Johnson', courses: 2, avgRating: 4.2, reports: 12, status: 'Good' },
    { name: 'Prof. Brown', courses: 2, avgRating: 3.8, reports: 10, status: 'Good' },
    { name: 'Dr. Wilson', courses: 1, avgRating: 4.7, reports: 8, status: 'Excellent' }
  ];

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>Stream Monitoring</h2>
              <p className="text-muted">Monitor overall stream performance and lecturer effectiveness</p>
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
              <h4 className="mb-0">Course Performance Overview</h4>
            </Card.Header>
            <Card.Body>
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Lecturer</th>
                    <th>Avg Attendance</th>
                    <th>Avg Grade</th>
                    <th>Completion</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {streamPerformance.map((course, index) => (
                    <tr key={index}>
                      <td>
                        <strong>{course.course}</strong>
                      </td>
                      <td>{course.lecturer}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <ProgressBar 
                            now={course.avgAttendance} 
                            variant={course.avgAttendance >= 90 ? 'success' : course.avgAttendance >= 80 ? 'warning' : 'danger'}
                            style={{ width: '80px' }}
                            className="me-2"
                          />
                          {course.avgAttendance}%
                        </div>
                      </td>
                      <td>
                        <Badge bg={course.avgGrade.includes('A') ? 'success' : course.avgGrade.includes('B') ? 'warning' : 'danger'}>
                          {course.avgGrade}
                        </Badge>
                      </td>
                      <td>
                        <ProgressBar 
                          now={course.completion} 
                          variant={course.completion >= 80 ? 'success' : course.completion >= 60 ? 'warning' : 'danger'}
                          label={`${course.completion}%`}
                        />
                      </td>
                      <td>
                        <Badge bg={course.completion >= 75 ? 'success' : 'warning'}>
                          {course.completion >= 75 ? 'On Track' : 'Needs Attention'}
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
              <h4 className="mb-0">Lecturer Performance</h4>
            </Card.Header>
            <Card.Body>
              {lecturerPerformance.map((lecturer, index) => (
                <div key={index} className="border-bottom pb-3 mb-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <strong>{lecturer.name}</strong>
                      <br />
                      <small className="text-muted">{lecturer.courses} courses</small>
                    </div>
                    <Badge bg={lecturer.status === 'Excellent' ? 'success' : 'warning'}>
                      {lecturer.avgRating}/5
                    </Badge>
                  </div>
                  <ProgressBar 
                    now={(lecturer.avgRating / 5) * 100} 
                    variant={lecturer.avgRating >= 4 ? 'success' : lecturer.avgRating >= 3 ? 'warning' : 'danger'}
                    className="mt-2"
                  />
                  <small>{lecturer.reports} reports submitted</small>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PRLMonitoring;