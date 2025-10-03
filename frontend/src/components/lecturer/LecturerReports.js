import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Modal, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { reportsAPI, coursesAPI } from '../../services/api';

const LecturerReports = () => {
  const navigate = useNavigate();
  const [showReportModal, setShowReportModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reports, setReports] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    faculty_name: '',
    class_name: '',
    week_of_reporting: '',
    date_of_lecture: '',
    course_id: '',
    actual_students_present: '',
    total_registered_students: '',
    venue: '',
    scheduled_lecture_time: '',
    topic_taught: '',
    lecturer_name: '',
    learning_outcomes: '',
    challenges: '',
    recommendations: ''
  });

  useEffect(() => {
    fetchReports();
    fetchCourses();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const result = await reportsAPI.getAll();
      if (result.success) {
        setReports(result.data);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      setMessage('Error loading reports');
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const result = await coursesAPI.getAll();
      if (result.success) {
        setCourses(result.data);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const getStatusVariant = (status) => {
    switch(status) {
      case 'submitted': return 'warning';
      case 'under_review': return 'info';
      case 'approved': return 'success';
      case 'rejected': return 'danger';
      case 'draft': return 'secondary';
      default: return 'secondary';
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log('Submitting report:', formData);
      const result = await reportsAPI.create(formData);
      
      if (result.success) {
        setMessage('Report submitted successfully!');
        setShowReportModal(false);
        resetForm();
        fetchReports();
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      faculty_name: '',
      class_name: '',
      week_of_reporting: '',
      date_of_lecture: '',
      course_id: '',
      actual_students_present: '',
      total_registered_students: '',
      venue: '',
      scheduled_lecture_time: '',
      topic_taught: '',
      lecturer_name: '',
      learning_outcomes: '',
      challenges: '',
      recommendations: ''
    });
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setShowViewModal(true);
  };

  const handlePrintReport = (report) => {
    const printContent = `
      <html>
        <head>
          <title>Lecture Report - ${report.course_code}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
            .section { margin: 15px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
            .field { margin: 8px 0; }
            .field label { font-weight: bold; display: inline-block; width: 200px; }
            .status { padding: 4px 8px; border-radius: 4px; font-weight: bold; }
            .status-draft { background: #6c757d; color: white; }
            .status-submitted { background: #ffc107; color: black; }
            .status-under_review { background: #0dcaf0; color: black; }
            .status-approved { background: #198754; color: white; }
            .status-rejected { background: #dc3545; color: white; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>LUCT FACULTY REPORTING SYSTEM</h1>
            <h2>LECTURE REPORT</h2>
          </div>
          
          <div class="section">
            <h3>Basic Information</h3>
            <div class="field"><label>Faculty Name:</label> ${report.faculty_name}</div>
            <div class="field"><label>Class Name:</label> ${report.class_name}</div>
            <div class="field"><label>Week of Reporting:</label> ${report.week_of_reporting}</div>
            <div class="field"><label>Date of Lecture:</label> ${report.date_of_lecture}</div>
            <div class="field"><label>Course:</label> ${report.course_code} - ${report.course_name}</div>
            <div class="field"><label>Lecturer:</label> ${report.lecturer_name}</div>
          </div>

          <div class="section">
            <h3>Attendance & Venue</h3>
            <div class="field"><label>Actual Students Present:</label> ${report.actual_students_present}</div>
            <div class="field"><label>Total Registered Students:</label> ${report.total_registered_students}</div>
            <div class="field"><label>Attendance Percentage:</label> ${Math.round((report.actual_students_present / report.total_registered_students) * 100)}%</div>
            <div class="field"><label>Venue:</label> ${report.venue}</div>
            <div class="field"><label>Scheduled Time:</label> ${report.scheduled_lecture_time}</div>
          </div>

          <div class="section">
            <h3>Teaching Content</h3>
            <div class="field"><label>Topic Taught:</label> ${report.topic_taught}</div>
            <div class="field"><label>Learning Outcomes:</label> ${report.learning_outcomes}</div>
            ${report.challenges ? `<div class="field"><label>Challenges:</label> ${report.challenges}</div>` : ''}
            ${report.recommendations ? `<div class="field"><label>Recommendations:</label> ${report.recommendations}</div>` : ''}
          </div>

          <div class="section">
            <h3>Report Status</h3>
            <div class="field">
              <label>Status:</label> 
              <span class="status status-${report.status}">${report.status.toUpperCase().replace('_', ' ')}</span>
            </div>
            <div class="field"><label>Report ID:</label> #${report.id}</div>
            <div class="field"><label>Generated On:</label> ${new Date().toLocaleDateString()}</div>
          </div>
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  // NEW: Excel Download Function
  const handleDownloadExcel = (report) => {
    // Create CSV content (Excel compatible)
    const excelContent = `
Faculty Name,Class Name,Week of Reporting,Date of Lecture,Course Code,Course Name,Lecturer,Actual Students Present,Total Registered Students,Attendance Percentage,Venue,Scheduled Time,Topic Taught,Learning Outcomes,Challenges,Recommendations,Status,Report ID
"${report.faculty_name}","${report.class_name}","${report.week_of_reporting}","${report.date_of_lecture}","${report.course_code}","${report.course_name}","${report.lecturer_name}",${report.actual_students_present},${report.total_registered_students},${Math.round((report.actual_students_present / report.total_registered_students) * 100)}%,"${report.venue}","${report.scheduled_lecture_time}","${report.topic_taught}","${report.learning_outcomes}","${report.challenges || ''}","${report.recommendations || ''}","${report.status.toUpperCase().replace('_', ' ')}",${report.id}
    `.trim();

    const blob = new Blob([excelContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lecture_report_${report.course_code}_${report.date_of_lecture}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setMessage('Excel file downloaded successfully!');
  };

  // NEW: Download All Reports as Excel
  const handleDownloadAllExcel = () => {
    if (reports.length === 0) {
      setMessage('No reports available to download');
      return;
    }

    // Create Excel header
    let excelContent = 'Faculty Name,Class Name,Week of Reporting,Date of Lecture,Course Code,Course Name,Lecturer,Actual Students Present,Total Registered Students,Attendance Percentage,Venue,Scheduled Time,Topic Taught,Learning Outcomes,Challenges,Recommendations,Status,Report ID,Created Date\n';
    
    // Add each report as a row
    reports.forEach(report => {
      const row = `"${report.faculty_name}","${report.class_name}","${report.week_of_reporting}","${report.date_of_lecture}","${report.course_code}","${report.course_name}","${report.lecturer_name}",${report.actual_students_present},${report.total_registered_students},${Math.round((report.actual_students_present / report.total_registered_students) * 100)}%,"${report.venue}","${report.scheduled_lecture_time}","${report.topic_taught}","${report.learning_outcomes}","${report.challenges || ''}","${report.recommendations || ''}","${report.status.toUpperCase().replace('_', ' ')}",${report.id},"${new Date(report.created_at).toLocaleDateString()}"`;
      excelContent += row + '\n';
    });

    const blob = new Blob([excelContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `all_lecture_reports_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setMessage(`All ${reports.length} reports downloaded as Excel file!`);
  };

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>Lecture Reports</h2>
              <p className="text-muted">Submit and manage your lecture reports</p>
            </div>
            <div>
              <Button variant="primary" onClick={() => navigate('/dashboard')} className="me-2">
                Back to Dashboard
              </Button>
              <Button variant="outline-secondary" onClick={handleDownloadAllExcel} className="me-2">
                Download All Excel
              </Button>
              <Button variant="success" onClick={() => setShowReportModal(true)}>
                New Report
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {message && (
        <Row className="mt-3">
          <Col>
            <Alert variant={message.includes('successfully') ? 'success' : 'danger'} 
                   onClose={() => setMessage('')} dismissible>
              {message}
            </Alert>
          </Col>
        </Row>
      )}

      <Row className="mt-4">
        <Col md={12}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h4 className="mb-0">My Reports ({reports.length})</h4>
              <Badge bg="light" text="dark">
                Last updated: {new Date().toLocaleTimeString()}
              </Badge>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="text-center p-4">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2">Loading reports...</p>
                </div>
              ) : (
                <Table responsive striped hover>
                  <thead>
                    <tr>
                      <th>Report ID</th>
                      <th>Course</th>
                      <th>Class</th>
                      <th>Date</th>
                      <th>Attendance</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center text-muted py-4">
                          No reports found. Create your first report!
                        </td>
                      </tr>
                    ) : (
                      reports.map(report => (
                        <tr key={report.id}>
                          <td>#{report.id}</td>
                          <td>
                            <strong>{report.course_code}</strong><br/>
                            <small className="text-muted">{report.course_name}</small>
                          </td>
                          <td>{report.class_name}</td>
                          <td>{report.date_of_lecture}</td>
                          <td>
                            {report.actual_students_present}/{report.total_registered_students}<br/>
                            <small>
                              ({Math.round((report.actual_students_present / report.total_registered_students) * 100)}%)
                            </small>
                          </td>
                          <td>
                            <Badge bg={getStatusVariant(report.status)}>
                              {report.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                          </td>
                          <td>
                            <Button variant="outline-primary" size="sm" className="me-1 mb-1" 
                                    onClick={() => handleViewReport(report)}>
                              View
                            </Button>
                            <Button variant="outline-info" size="sm" className="me-1 mb-1" 
                                    onClick={() => handlePrintReport(report)}>
                              Print
                            </Button>
                            <Button variant="outline-success" size="sm" className="mb-1" 
                                    onClick={() => handleDownloadExcel(report)}>
                              Excel
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* New Report Modal - FIXED WITH ALL FIELDS AND VISIBLE SUBMIT BUTTON */}
      <Modal show={showReportModal} onHide={() => setShowReportModal(false)} size="lg" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Submit New Lecture Report</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmitReport}>
          <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Faculty Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="faculty_name"
                    value={formData.faculty_name}
                    onChange={handleFormChange}
                    required
                    placeholder="e.g., Faculty of Science"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Class Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="class_name"
                    value={formData.class_name}
                    onChange={handleFormChange}
                    required
                    placeholder="e.g., CS101-A"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Week of Reporting *</Form.Label>
                  <Form.Control
                    type="text"
                    name="week_of_reporting"
                    value={formData.week_of_reporting}
                    onChange={handleFormChange}
                    required
                    placeholder="e.g., Week 5"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Date of Lecture *</Form.Label>
                  <Form.Control
                    type="date"
                    name="date_of_lecture"
                    value={formData.date_of_lecture}
                    onChange={handleFormChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Course *</Form.Label>
                  <Form.Select
                    name="course_id"
                    value={formData.course_id}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="">Select Course</option>
                    {courses.map(course => (
                      <option key={course.id} value={course.id}>
                        {course.course_code} - {course.course_name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Venue *</Form.Label>
                  <Form.Control
                    type="text"
                    name="venue"
                    value={formData.venue}
                    onChange={handleFormChange}
                    required
                    placeholder="e.g., Room 101, Building A"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Scheduled Lecture Time *</Form.Label>
                  <Form.Control
                    type="time"
                    name="scheduled_lecture_time"
                    value={formData.scheduled_lecture_time}
                    onChange={handleFormChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Actual Students Present *</Form.Label>
                  <Form.Control
                    type="number"
                    name="actual_students_present"
                    value={formData.actual_students_present}
                    onChange={handleFormChange}
                    required
                    min="0"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Total Registered Students *</Form.Label>
                  <Form.Control
                    type="number"
                    name="total_registered_students"
                    value={formData.total_registered_students}
                    onChange={handleFormChange}
                    required
                    min="0"
                  />
                </Form.Group>
              </Col>
            </Row>

            {formData.actual_students_present && formData.total_registered_students && (
              <Row>
                <Col md={12}>
                  <Alert variant="info">
                    Attendance: {formData.actual_students_present}/{formData.total_registered_students} 
                    ({Math.round((formData.actual_students_present / formData.total_registered_students) * 100)}%)
                  </Alert>
                </Col>
              </Row>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Topic Taught *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="topic_taught"
                value={formData.topic_taught}
                onChange={handleFormChange}
                required
                placeholder="Describe the main topics covered in this lecture..."
              />
            </Form.Group>

            {/* ADDED: Learning Outcomes Field */}
            <Form.Group className="mb-3">
              <Form.Label>Learning Outcomes of the Topic *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="learning_outcomes"
                value={formData.learning_outcomes}
                onChange={handleFormChange}
                required
                placeholder="What should students be able to do/understand after this lecture?..."
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Challenges Faced (Optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="challenges"
                value={formData.challenges}
                onChange={handleFormChange}
                placeholder="Any challenges encountered during the lecture..."
              />
            </Form.Group>

            {/* ADDED: Lecturer's Recommendations Field */}
            <Form.Group className="mb-3">
              <Form.Label>Lecturer's Recommendations (Optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="recommendations"
                value={formData.recommendations}
                onChange={handleFormChange}
                placeholder="Recommendations for improvement or follow-up actions..."
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowReportModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Report'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* View Report Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>View Report - #{selectedReport?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReport && (
            <div>
              <Row>
                <Col md={6}>
                  <h6>Basic Information</h6>
                  <p><strong>Faculty:</strong> {selectedReport.faculty_name}</p>
                  <p><strong>Class:</strong> {selectedReport.class_name}</p>
                  <p><strong>Week:</strong> {selectedReport.week_of_reporting}</p>
                  <p><strong>Date:</strong> {selectedReport.date_of_lecture}</p>
                </Col>
                <Col md={6}>
                  <h6>Course Information</h6>
                  <p><strong>Course:</strong> {selectedReport.course_code} - {selectedReport.course_name}</p>
                  <p><strong>Lecturer:</strong> {selectedReport.lecturer_name}</p>
                  <p><strong>Venue:</strong> {selectedReport.venue}</p>
                  <p><strong>Time:</strong> {selectedReport.scheduled_lecture_time}</p>
                </Col>
              </Row>
              
              <Row className="mt-3">
                <Col md={6}>
                  <h6>Attendance</h6>
                  <p><strong>Present:</strong> {selectedReport.actual_students_present}</p>
                  <p><strong>Total:</strong> {selectedReport.total_registered_students}</p>
                  <p><strong>Percentage:</strong> {Math.round((selectedReport.actual_students_present / selectedReport.total_registered_students) * 100)}%</p>
                </Col>
                <Col md={6}>
                  <h6>Status</h6>
                  <p>
                    <strong>Status:</strong>{' '}
                    <Badge bg={getStatusVariant(selectedReport.status)}>
                      {selectedReport.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </p>
                  <p><strong>Created:</strong> {new Date(selectedReport.created_at).toLocaleDateString()}</p>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col md={12}>
                  <h6>Teaching Content</h6>
                  <Card>
                    <Card.Body>
                      <p><strong>Topic Taught:</strong></p>
                      <p>{selectedReport.topic_taught}</p>
                      
                      <p><strong>Learning Outcomes:</strong></p>
                      <p>{selectedReport.learning_outcomes}</p>
                      
                      {selectedReport.challenges && (
                        <>
                          <p><strong>Challenges:</strong></p>
                          <p>{selectedReport.challenges}</p>
                        </>
                      )}
                      
                      {selectedReport.recommendations && (
                        <>
                          <p><strong>Recommendations:</strong></p>
                          <p>{selectedReport.recommendations}</p>
                        </>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handlePrintReport(selectedReport)}>
            Print
          </Button>
          <Button variant="success" onClick={() => handleDownloadExcel(selectedReport)}>
            Excel
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default LecturerReports;