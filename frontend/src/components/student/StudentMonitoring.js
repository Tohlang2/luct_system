import React from 'react';
import { Container, Row, Col, Card, Table, ProgressBar, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const StudentMonitoring = () => {
  const navigate = useNavigate();

  const courses = [
    { id: 1, name: 'Introduction to Programming', code: 'CS101', attendance: 90, grade: 'A-', status: 'Active', lecturer: 'Dr. Smith' },
    { id: 2, name: 'Database Systems', code: 'CS202', attendance: 85, grade: 'B+', status: 'Active', lecturer: 'Dr. Johnson' },
    { id: 3, name: 'Web Development', code: 'CS303', attendance: 78, grade: 'B', status: 'Active', lecturer: 'Prof. Brown' },
    { id: 4, name: 'Software Engineering', code: 'CS404', attendance: 92, grade: 'A', status: 'Completed', lecturer: 'Dr. Wilson' }
  ];

  const handleViewDetails = (course) => {
    alert(`Course Details: ${course.code} - ${course.name}\n\nLecturer: ${course.lecturer}\nAttendance: ${course.attendance}%\nCurrent Grade: ${course.grade}\nStatus: ${course.status}\n\nDetailed progress report and analytics would be shown here.`);
  };

  const handleViewMaterials = (course) => {
    alert(`Course Materials: ${course.code} - ${course.name}\n\nAvailable Materials:\n- Lecture Slides\n- Video Recordings\n- Reading Materials\n- Assignment Sheets\n- Code Examples\n\nAll materials are accessible through the course portal.`);
  };

  const handleViewAssignments = (course) => {
    alert(`Assignments for: ${course.code} - ${course.name}\n\nUpcoming Assignments:\n- Project 1 (Due: 2024-02-15)\n- Quiz 2 (Due: 2024-02-20)\n\nCompleted Assignments:\n- Assignment 1: 85%\n- Quiz 1: 92%`);
  };

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>Student Monitoring</h2>
              <p className="text-muted">Track your academic progress and attendance</p>
            </div>
            <Button variant="primary" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={12}>
          <Card className="dashboard-card">
            <Card.Header>
              <h4 className="mb-0">Course Progress Overview</h4>
            </Card.Header>
            <Card.Body>
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>Course Code</th>
                    <th>Course Name</th>
                    <th>Lecturer</th>
                    <th>Attendance</th>
                    <th>Current Grade</th>
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
                      <td>{course.lecturer}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <ProgressBar 
                            now={course.attendance} 
                            variant={course.attendance >= 80 ? 'success' : course.attendance >= 70 ? 'warning' : 'danger'}
                            style={{ width: '100px', height: '8px' }}
                            className="me-2"
                          />
                          <span>{course.attendance}%</span>
                        </div>
                      </td>
                      <td>
                        <Badge bg={course.grade.includes('A') ? 'success' : course.grade.includes('B') ? 'warning' : 'danger'}>
                          {course.grade}
                        </Badge>
                      </td>
                      <td>
                        <Badge bg={course.status === 'Active' ? 'success' : 'primary'}>
                          {course.status}
                        </Badge>
                      </td>
                      <td>
                        <div className="btn-group">
                          <Button 
                            variant="primary" 
                            size="sm" 
                            className="me-1"
                            onClick={() => handleViewDetails(course)}
                          >
                            Details
                          </Button>
                          <Button 
                            variant="success" 
                            size="sm" 
                            className="me-1"
                            onClick={() => handleViewMaterials(course)}
                          >
                            Materials
                          </Button>
                          <Button 
                            variant="info" 
                            size="sm"
                            onClick={() => handleViewAssignments(course)}
                          >
                            Assignments
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Additional Statistics Section */}
      <Row className="mt-4">
        <Col md={4}>
          <Card className="text-center dashboard-card card-success">
            <Card.Body>
              <h5>Overall Attendance</h5>
              <h3 className="text-success">86%</h3>
              <p className="mb-0">Across all courses</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center dashboard-card card-info">
            <Card.Body>
              <h5>Average Grade</h5>
              <h3 className="text-info">B+</h3>
              <p className="mb-0">Current semester</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center dashboard-card card-warning">
            <Card.Body>
              <h5>Pending Tasks</h5>
              <h3 className="text-warning">3</h3>
              <p className="mb-0">Assignments & Quizzes</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Activity Section */}
      <Row className="mt-4">
        <Col md={12}>
          <Card className="dashboard-card">
            <Card.Header>
              <h4 className="mb-0">Recent Activity</h4>
            </Card.Header>
            <Card.Body>
              <div className="border-bottom pb-2 mb-2">
                <strong>Assignment Submitted</strong>
                <p className="mb-1 small text-muted">CS202 - Database Project | 2025-01-18</p>
                <p className="mb-1 small">Database design document submitted successfully</p>
              </div>
              <div className="border-bottom pb-2 mb-2">
                <strong>Quiz Completed</strong>
                <p className="mb-1 small text-muted">CS101 - Programming Quiz | 2025-01-16</p>
                <p className="mb-1 small">Scored 88% on programming fundamentals quiz</p>
              </div>
              <div className="pb-2">
                <strong>Attendance Recorded</strong>
                <p className="mb-1 small text-muted">CS303 - Web Development | 2025-01-15</p>
                <p className="mb-1 small">Present in today's lecture on React components</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentMonitoring;