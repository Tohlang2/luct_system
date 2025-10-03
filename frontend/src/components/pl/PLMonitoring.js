import React from 'react';
import { Container, Row, Col, Card, Table, ProgressBar, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PLMonitoring = () => {
  const navigate = useNavigate();

  const programStats = {
    totalStudents: 1250,
    activeCourses: 15,
    teachingStaff: 25,
    completionRate: 78,
    satisfactionRate: 4.4
  };

  const streamPerformance = [
    { stream: 'Computer Science', courses: 6, students: 450, avgAttendance: 89, avgGrade: 'B+', performance: 'Excellent' },
    { stream: 'Information Technology', courses: 4, students: 320, avgAttendance: 85, avgGrade: 'B', performance: 'Good' },
    { stream: 'Software Engineering', courses: 3, students: 280, avgAttendance: 87, avgGrade: 'A-', performance: 'Excellent' },
    { stream: 'Data Science', courses: 2, students: 200, avgAttendance: 82, avgGrade: 'B+', performance: 'Good' }
  ];

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>Program Monitoring</h2>
              <p className="text-muted">Comprehensive program performance overview</p>
            </div>
            <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </button>
          </div>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={2}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-primary">{programStats.totalStudents}</h3>
              <p className="mb-0">Total Students</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={2}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-success">{programStats.activeCourses}</h3>
              <p className="mb-0">Active Courses</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={2}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-info">{programStats.teachingStaff}</h3>
              <p className="mb-0">Teaching Staff</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={2}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-warning">{programStats.completionRate}%</h3>
              <p className="mb-0">Completion Rate</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={2}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-danger">{programStats.satisfactionRate}/5</h3>
              <p className="mb-0">Satisfaction Rate</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={2}>
          <Card className="text-center bg-primary text-white">
            <Card.Body>
              <h3>85%</h3>
              <p className="mb-0">Overall Performance</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={12}>
          <Card>
            <Card.Header>
              <h4 className="mb-0">Stream Performance Analysis</h4>
            </Card.Header>
            <Card.Body>
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>Stream</th>
                    <th>Courses</th>
                    <th>Students</th>
                    <th>Avg Attendance</th>
                    <th>Avg Grade</th>
                    <th>Performance</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {streamPerformance.map((stream, index) => (
                    <tr key={index}>
                      <td>
                        <strong>{stream.stream}</strong>
                      </td>
                      <td>{stream.courses}</td>
                      <td>{stream.students}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <ProgressBar 
                            now={stream.avgAttendance} 
                            variant={stream.avgAttendance >= 85 ? 'success' : stream.avgAttendance >= 75 ? 'warning' : 'danger'}
                            style={{ width: '80px' }}
                            className="me-2"
                          />
                          {stream.avgAttendance}%
                        </div>
                      </td>
                      <td>
                        <Badge bg={stream.avgGrade.includes('A') ? 'success' : stream.avgGrade.includes('B') ? 'warning' : 'danger'}>
                          {stream.avgGrade}
                        </Badge>
                      </td>
                      <td>
                        <Badge bg={stream.performance === 'Excellent' ? 'success' : 'warning'}>
                          {stream.performance}
                        </Badge>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-1">Details</button>
                        <button className="btn btn-sm btn-outline-success">Reports</button>
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
        <Col md={6}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Program Progress Metrics</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>Academic Performance</span>
                  <strong>82%</strong>
                </div>
                <ProgressBar variant="success" now={82} />
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>Student Engagement</span>
                  <strong>78%</strong>
                </div>
                <ProgressBar variant="info" now={78} />
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>Teaching Quality</span>
                  <strong>88%</strong>
                </div>
                <ProgressBar variant="warning" now={88} />
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>Resource Utilization</span>
                  <strong>75%</strong>
                </div>
                <ProgressBar variant="danger" now={75} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Quick Actions</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                <button className="btn btn-outline-primary text-start">
                  <i className="fas fa-chart-bar me-2"></i>
                  Generate Performance Report
                </button>
                <button className="btn btn-outline-success text-start">
                  <i className="fas fa-download me-2"></i>
                  Export Program Data
                </button>
                <button className="btn btn-outline-info text-start">
                  <i className="fas fa-bell me-2"></i>
                  Set Performance Alerts
                </button>
                <button className="btn btn-outline-warning text-start">
                  <i className="fas fa-cog me-2"></i>
                  Configure Monitoring Settings
                </button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PLMonitoring;