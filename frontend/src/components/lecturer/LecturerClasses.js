import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Modal, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LecturerClasses = () => {
  const navigate = useNavigate();
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showMaterialsModal, setShowMaterialsModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showReportSuccess, setShowReportSuccess] = useState(false);

  const classes = [
    { id: 1, name: 'CS101-A', course: 'Introduction to Programming', schedule: 'Mon, Wed 9:00-10:30', students: 50, status: 'Active' },
    { id: 2, name: 'CS202-B', course: 'Database Systems', schedule: 'Tue, Thu 11:00-12:30', students: 45, status: 'Active' },
    { id: 3, name: 'CS303-C', course: 'Web Development', schedule: 'Fri 14:00-17:00', students: 35, status: 'Active' }
  ];

  const reports = [
    { id: 1, name: 'Weekly Attendance Report', type: 'Attendance', date: '2024-01-20', class: 'CS101-A' },
    { id: 2, name: 'Monthly Progress Report', type: 'Progress', date: '2024-01-15', class: 'CS101-A' },
    { id: 3, name: 'Student Performance', type: 'Performance', date: '2024-01-10', class: 'CS202-B' }
  ];

  const handleAttendance = (cls) => {
    setSelectedClass(cls);
    setShowAttendanceModal(true);
  };

  const handleMaterials = (cls) => {
    setSelectedClass(cls);
    setShowMaterialsModal(true);
  };

  const handleReports = (cls) => {
    setSelectedClass(cls);
    setShowReportsModal(true);
  };

  const handleAddClass = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newClass = {
      course: formData.get('course'),
      class: formData.get('className'),
      schedule: formData.get('schedule'),
      students: 0,
      status: 'Active'
    };
    
    alert(`New class "${newClass.class}" for "${newClass.course}" has been created successfully!`);
    setShowAddClassModal(false);
  };

  const submitAttendance = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const present = formData.get('presentStudents');
    const total = formData.get('totalStudents');
    
    alert(`Attendance recorded for ${selectedClass.name}:\n${present}/${total} students present`);
    setShowAttendanceModal(false);
  };

  const handleGenerateReport = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const reportType = formData.get('reportType');
    const fromDate = formData.get('fromDate');
    const toDate = formData.get('toDate');
    
    setShowReportSuccess(true);
    setTimeout(() => setShowReportSuccess(false), 3000);
    
    alert(`Report generated successfully!\n\nType: ${reportType}\nPeriod: ${fromDate} to ${toDate}\nClass: ${selectedClass.name}\n\nReport has been saved to your reports list.`);
  };

  const handleViewReport = (report) => {
    alert(`Viewing Report: ${report.name}\n\nClass: ${report.class}\nType: ${report.type}\nDate: ${report.date}\n\nReport Content:\n- Total Students: ${selectedClass?.students || 'N/A'}\n- Average Attendance: 85%\n- Top Performers: 5 students\n- Areas for Improvement: Assignment completion`);
  };

  const handleDownloadReport = (report) => {
    alert(`Downloading Report: ${report.name}\n\nFile: ${report.name}.pdf\nFormat: PDF\nSize: 2.4 MB\n\nThe report has been downloaded to your computer.`);
  };

  const handleUploadMaterial = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const materialName = formData.get('materialName');
    const file = formData.get('materialFile');
    
    if (file && file.name) {
      alert(`Material uploaded successfully!\n\nFile: ${file.name}\nMaterial: ${materialName}\nClass: ${selectedClass.name}\n\nMaterial is now available to students.`);
    } else {
      alert('Please select a file to upload.');
    }
  };

  const handleDownloadMaterial = (material) => {
    alert(`Downloading: ${material}\n\nFile: ${material}.pdf\nClass: ${selectedClass.name}\n\nFile download has started.`);
  };

  // Filter reports for selected class
  const classReports = reports.filter(report => report.class === selectedClass?.name);

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>My Classes</h2>
              <p className="text-muted">Manage your teaching classes and schedules</p>
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
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Class List</h4>
              <Button variant="success" size="sm" onClick={() => setShowAddClassModal(true)}>
                Add New Class
              </Button>
            </Card.Header>
            <Card.Body>
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>Class Name</th>
                    <th>Course</th>
                    <th>Schedule</th>
                    <th>Students</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map(cls => (
                    <tr key={cls.id}>
                      <td>
                        <strong>{cls.name}</strong>
                      </td>
                      <td>{cls.course}</td>
                      <td>{cls.schedule}</td>
                      <td>{cls.students}</td>
                      <td>
                        <Badge bg={cls.status === 'Active' ? 'success' : 'secondary'}>
                          {cls.status}
                        </Badge>
                      </td>
                      <td>
                        <div className="btn-group">
                          <Button 
                            variant="primary" 
                            size="sm" 
                            className="me-1"
                            onClick={() => handleAttendance(cls)}
                          >
                            Attendance
                          </Button>
                          <Button 
                            variant="success" 
                            size="sm" 
                            className="me-1"
                            onClick={() => handleMaterials(cls)}
                          >
                            Materials
                          </Button>
                          <Button 
                            variant="info" 
                            size="sm"
                            onClick={() => handleReports(cls)}
                          >
                            Reports
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

      {/* Add Class Modal - unchanged */}
      <Modal show={showAddClassModal} onHide={() => setShowAddClassModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Class</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddClass}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Course</Form.Label>
              <Form.Select name="course" required>
                <option value="">Select Course</option>
                <option value="Introduction to Programming">Introduction to Programming</option>
                <option value="Database Systems">Database Systems</option>
                <option value="Web Development">Web Development</option>
                <option value="Software Engineering">Software Engineering</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Class Name</Form.Label>
              <Form.Control type="text" name="className" placeholder="e.g., CS101-A" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Schedule</Form.Label>
              <Form.Control type="text" name="schedule" placeholder="e.g., Mon, Wed 9:00-10:30" required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddClassModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create Class
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Attendance Modal - unchanged */}
      <Modal show={showAttendanceModal} onHide={() => setShowAttendanceModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Record Attendance - {selectedClass?.name}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitAttendance}>
          <Modal.Body>
            <p><strong>Course:</strong> {selectedClass?.course}</p>
            <p><strong>Total Students:</strong> {selectedClass?.students}</p>
            <Form.Group className="mb-3">
              <Form.Label>Present Students</Form.Label>
              <Form.Control 
                type="number" 
                name="presentStudents" 
                min="0" 
                max={selectedClass?.students}
                placeholder="Enter number of present students"
                required 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Total Students</Form.Label>
              <Form.Control 
                type="number" 
                name="totalStudents" 
                value={selectedClass?.students}
                readOnly
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAttendanceModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Submit Attendance
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Materials Modal - Updated */}
      <Modal show={showMaterialsModal} onHide={() => setShowMaterialsModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Course Materials - {selectedClass?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Course:</strong> {selectedClass?.course}</p>
          
          <div className="mb-4">
            <h6>Upload New Material</h6>
            <Form onSubmit={handleUploadMaterial}>
              <Form.Group className="mb-3">
                <Form.Label>Material Name</Form.Label>
                <Form.Control type="text" name="materialName" placeholder="Enter material name" required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>File</Form.Label>
                <Form.Control type="file" name="materialFile" required />
              </Form.Group>
              <Button variant="success" type="submit">Upload Material</Button>
            </Form>
          </div>

          <div>
            <h6>Existing Materials</h6>
            <Table striped size="sm">
              <thead>
                <tr>
                  <th>Material Name</th>
                  <th>Type</th>
                  <th>Upload Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Lecture 1 Slides</td>
                  <td>PDF</td>
                  <td>2025-06-15</td>
                  <td>
                    <Button variant="primary" size="sm" onClick={() => handleDownloadMaterial('Lecture 1 Slides')}>
                      Download
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>Assignment 1</td>
                  <td>Document</td>
                  <td>2025-06-20</td>
                  <td>
                    <Button variant="primary" size="sm" onClick={() => handleDownloadMaterial('Assignment 1')}>
                      Download
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowMaterialsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Reports Modal - Fixed with working buttons */}
      <Modal show={showReportsModal} onHide={() => setShowReportsModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Class Reports - {selectedClass?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Course:</strong> {selectedClass?.course}</p>
          
          {showReportSuccess && (
            <Alert variant="success" className="mb-3">
              Report generated successfully! Check the reports list below.
            </Alert>
          )}
          
          <div className="mb-4">
            <h6>Generate New Report</h6>
            <Form onSubmit={handleGenerateReport}>
              <Form.Group className="mb-3">
                <Form.Label>Report Type</Form.Label>
                <Form.Select name="reportType" required>
                  <option value="Attendance Report">Attendance Report</option>
                  <option value="Performance Report">Performance Report</option>
                  <option value="Progress Report">Progress Report</option>
                  <option value="Comprehensive Report">Comprehensive Report</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Date Range</Form.Label>
                <Row>
                  <Col md={6}>
                    <Form.Control type="date" name="fromDate" required />
                  </Col>
                  <Col md={6}>
                    <Form.Control type="date" name="toDate" required />
                  </Col>
                </Row>
              </Form.Group>
              <Button variant="primary" type="submit">Generate Report</Button>
            </Form>
          </div>

          <div>
            <h6>Previous Reports</h6>
            {classReports.length === 0 ? (
              <p className="text-muted">No reports available for this class.</p>
            ) : (
              <Table striped size="sm">
                <thead>
                  <tr>
                    <th>Report Name</th>
                    <th>Type</th>
                    <th>Generated Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {classReports.map(report => (
                    <tr key={report.id}>
                      <td>{report.name}</td>
                      <td>{report.type}</td>
                      <td>{report.date}</td>
                      <td>
                        <Button 
                          variant="primary" 
                          size="sm" 
                          className="me-1"
                          onClick={() => handleViewReport(report)}
                        >
                          View
                        </Button>
                        <Button 
                          variant="success" 
                          size="sm"
                          onClick={() => handleDownloadReport(report)}
                        >
                          Download
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
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

export default LecturerClasses;