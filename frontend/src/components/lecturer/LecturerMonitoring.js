import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, ProgressBar, Badge, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LecturerMonitoring = () => {
  const navigate = useNavigate();
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [showStudentsModal, setShowStudentsModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const classPerformance = [
    { 
      id: 1,
      class: 'CS101-A', 
      course: 'Intro to Programming', 
      avgAttendance: 90, 
      avgGrade: 'B+', 
      completion: 75,
      students: 50,
      assignments: 8,
      performance: 'Excellent'
    },
    { 
      id: 2,
      class: 'CS202-B', 
      course: 'Database Systems', 
      avgAttendance: 85, 
      avgGrade: 'A-', 
      completion: 80,
      students: 45,
      assignments: 6,
      performance: 'Good'
    },
    { 
      id: 3,
      class: 'CS303-C', 
      course: 'Web Development', 
      avgAttendance: 88, 
      avgGrade: 'B', 
      completion: 70,
      students: 35,
      assignments: 7,
      performance: 'Good'
    }
  ];

  const handleViewDetails = (classItem) => {
    setSelectedClass(classItem);
    setShowDetailsModal(true);
  };

  const handleViewReports = (classItem) => {
    setSelectedClass(classItem);
    setShowReportsModal(true);
  };

  const handleViewStudents = () => {
    alert(`Student List for ${selectedClass?.class}\n\nTotal Students: ${selectedClass?.students}\n\nStudent management interface would open here with:\n- Student profiles\n- Individual performance\n- Contact information`);
  };

  const handleSendAnnouncement = () => {
    alert(`Send Announcement to ${selectedClass?.class}\n\nAnnouncement interface would open here with:\n- Message composition\n- Attachment options\n- Scheduling features`);
  };

  const handleScheduleClass = () => {
    alert(`Schedule Extra Class for ${selectedClass?.class}\n\nScheduling interface would open here with:\n- Date and time selection\n- Venue booking\n- Notification settings`);
  };

  const handleGenerateReport = (type) => {
    alert(`Generating ${type} report for ${selectedClass?.class}...\n\nReport will include:\n- Student performance analytics\n- Attendance trends\n- Assignment completion rates\n- Grade distribution\n\nReport generation complete!`);
  };

  const handleDownloadReport = (type) => {
    const filename = `${type.toLowerCase()}_report_${selectedClass?.class}.pdf`;
    alert(`Downloading ${filename}\n\nFile saved to your Downloads folder.`);
  };

  const handleViewRecentReport = (reportName) => {
    alert(`Viewing Report: ${reportName}\n\nClass: ${selectedClass?.class}\nCourse: ${selectedClass?.course}\n\nReport content would be displayed here.`);
  };

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>Class Monitoring</h2>
              <p className="text-muted">Monitor class performance and student progress</p>
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
              <h4 className="mb-0">Class Performance Overview</h4>
            </Card.Header>
            <Card.Body>
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Course</th>
                    <th>Avg Attendance</th>
                    <th>Avg Grade</th>
                    <th>Course Completion</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {classPerformance.map((classItem, index) => (
                    <tr key={classItem.id}>
                      <td>
                        <strong>{classItem.class}</strong>
                      </td>
                      <td>{classItem.course}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <ProgressBar 
                            now={classItem.avgAttendance} 
                            variant={classItem.avgAttendance >= 85 ? 'success' : 'warning'}
                            style={{ width: '80px' }}
                            className="me-2"
                          />
                          {classItem.avgAttendance}%
                        </div>
                      </td>
                      <td>
                        <Badge bg={classItem.avgGrade.includes('A') ? 'success' : classItem.avgGrade.includes('B') ? 'warning' : 'danger'}>
                          {classItem.avgGrade}
                        </Badge>
                      </td>
                      <td>
                        <ProgressBar 
                          now={classItem.completion} 
                          variant={classItem.completion >= 80 ? 'success' : classItem.completion >= 60 ? 'warning' : 'danger'}
                          label={`${classItem.completion}%`}
                        />
                      </td>
                      <td>
                        <Badge bg={classItem.completion >= 70 ? 'success' : 'warning'}>
                          {classItem.completion >= 70 ? 'On Track' : 'Needs Attention'}
                        </Badge>
                      </td>
                      <td>
                        <Button 
                          variant="primary" 
                          size="sm" 
                          className="me-1"
                          onClick={() => handleViewDetails(classItem)}
                        >
                          Details
                        </Button>
                        <Button 
                          variant="success" 
                          size="sm"
                          onClick={() => handleViewReports(classItem)}
                        >
                          Reports
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

      {/* Class Details Modal */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Class Details - {selectedClass?.class}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedClass && (
            <div>
              <Row className="mb-4">
                <Col md={6}>
                  <Card className="text-center">
                    <Card.Body>
                      <h5>Total Students</h5>
                      <h3 className="text-primary">{selectedClass.students}</h3>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="text-center">
                    <Card.Body>
                      <h5>Assignments</h5>
                      <h3 className="text-info">{selectedClass.assignments}</h3>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <h6>Performance Metrics</h6>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span>Attendance Rate</span>
                      <strong>{selectedClass.avgAttendance}%</strong>
                    </div>
                    <ProgressBar variant="success" now={selectedClass.avgAttendance} />
                  </div>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span>Course Completion</span>
                      <strong>{selectedClass.completion}%</strong>
                    </div>
                    <ProgressBar variant="info" now={selectedClass.completion} />
                  </div>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span>Student Engagement</span>
                      <strong>78%</strong>
                    </div>
                    <ProgressBar variant="warning" now={78} />
                  </div>
                </Col>

                <Col md={6}>
                  <h6>Recent Activity</h6>
                  <div className="border-bottom pb-2 mb-2">
                    <strong>Last Assignment Submitted</strong>
                    <p className="mb-1 small text-muted">Database Design Project</p>
                    <p className="mb-1 small">Average Score: 82%</p>
                  </div>
                  <div className="border-bottom pb-2 mb-2">
                    <strong>Recent Attendance</strong>
                    <p className="mb-1 small text-muted">Last Week: {selectedClass.avgAttendance}%</p>
                    <p className="mb-1 small">Trend: Stable</p>
                  </div>
                  <div className="pb-2">
                    <strong>Student Performance</strong>
                    <p className="mb-1 small text-muted">Top 10%: 5 students</p>
                    <p className="mb-1 small">Needs Support: 3 students</p>
                  </div>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col md={12}>
                  <h6>Quick Actions</h6>
                  <div className="d-grid gap-2 d-md-flex">
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={handleViewStudents}
                    >
                      View Student List
                    </Button>
                    <Button 
                      variant="success" 
                      size="sm"
                      onClick={handleSendAnnouncement}
                    >
                      Send Class Announcement
                    </Button>
                    <Button 
                      variant="info" 
                      size="sm"
                      onClick={handleScheduleClass}
                    >
                      Schedule Extra Class
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Reports Modal */}
      <Modal show={showReportsModal} onHide={() => setShowReportsModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Class Reports - {selectedClass?.class}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedClass && (
            <div>
              <p><strong>Course:</strong> {selectedClass.course}</p>
              
              <Row className="mb-4">
                <Col md={6}>
                  <Card className="text-center h-100">
                    <Card.Body>
                      <h6>Performance Report</h6>
                      <p className="small">Student performance analytics and grade distribution</p>
                      <div className="d-grid gap-2">
                        <Button 
                          variant="primary" 
                          size="sm"
                          onClick={() => handleGenerateReport('Performance')}
                        >
                          Generate
                        </Button>
                        <Button 
                          variant="success" 
                          size="sm"
                          onClick={() => handleDownloadReport('Performance')}
                        >
                          Download
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="text-center h-100">
                    <Card.Body>
                      <h6>Attendance Report</h6>
                      <p className="small">Attendance trends and patterns analysis</p>
                      <div className="d-grid gap-2">
                        <Button 
                          variant="primary" 
                          size="sm"
                          onClick={() => handleGenerateReport('Attendance')}
                        >
                          Generate
                        </Button>
                        <Button 
                          variant="success" 
                          size="sm"
                          onClick={() => handleDownloadReport('Attendance')}
                        >
                          Download
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Card className="text-center h-100">
                    <Card.Body>
                      <h6>Progress Report</h6>
                      <p className="small">Course completion and learning progress</p>
                      <div className="d-grid gap-2">
                        <Button 
                          variant="primary" 
                          size="sm"
                          onClick={() => handleGenerateReport('Progress')}
                        >
                          Generate
                        </Button>
                        <Button 
                          variant="success" 
                          size="sm"
                          onClick={() => handleDownloadReport('Progress')}
                        >
                          Download
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="text-center h-100">
                    <Card.Body>
                      <h6>Comprehensive Report</h6>
                      <p className="small">Complete class overview and analytics</p>
                      <div className="d-grid gap-2">
                        <Button 
                          variant="primary" 
                          size="sm"
                          onClick={() => handleGenerateReport('Comprehensive')}
                        >
                          Generate
                        </Button>
                        <Button 
                          variant="success" 
                          size="sm"
                          onClick={() => handleDownloadReport('Comprehensive')}
                        >
                          Download
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <div className="mt-4">
                <h6>Recent Reports</h6>
                <Table striped size="sm">
                  <thead>
                    <tr>
                      <th>Report Name</th>
                      <th>Type</th>
                      <th>Generated</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Weekly Performance</td>
                      <td>Performance</td>
                      <td>2024-01-20</td>
                      <td>
                        <Button 
                          variant="primary" 
                          size="sm"
                          onClick={() => handleViewRecentReport('Weekly Performance')}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>Monthly Attendance</td>
                      <td>Attendance</td>
                      <td>2024-01-15</td>
                      <td>
                        <Button 
                          variant="primary" 
                          size="sm"
                          onClick={() => handleViewRecentReport('Monthly Attendance')}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReportsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default LecturerMonitoring;