import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const LecturerReportForm = ({ show, onHide, onSubmit }) => {
  const [formData, setFormData] = useState({
    facultyName: '',
    className: '',
    weekOfReporting: '',
    dateOfLecture: '',
    courseName: '',
    courseCode: '',
    lecturerName: '',
    actualStudentsPresent: '',
    totalRegisteredStudents: '',
    venue: '',
    scheduledLectureTime: '',
    topicTaught: '',
    learningOutcomes: '',
    recommendations: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onHide();
    // Reset form
    setFormData({
      facultyName: '',
      className: '',
      weekOfReporting: '',
      dateOfLecture: '',
      courseName: '',
      courseCode: '',
      lecturerName: '',
      actualStudentsPresent: '',
      totalRegisteredStudents: '',
      venue: '',
      scheduledLectureTime: '',
      topicTaught: '',
      learningOutcomes: '',
      recommendations: ''
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Lecturer Reporting Form</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Faculty Name</Form.Label>
                <Form.Control
                  type="text"
                  name="facultyName"
                  value={formData.facultyName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Class Name</Form.Label>
                <Form.Control
                  type="text"
                  name="className"
                  value={formData.className}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Week of Reporting</Form.Label>
                <Form.Control
                  type="text"
                  name="weekOfReporting"
                  value={formData.weekOfReporting}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Date of Lecture</Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfLecture"
                  value={formData.dateOfLecture}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Course Name</Form.Label>
                <Form.Control
                  type="text"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Course Code</Form.Label>
                <Form.Control
                  type="text"
                  name="courseCode"
                  value={formData.courseCode}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Lecturer's Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lecturerName"
                  value={formData.lecturerName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Actual Students Present</Form.Label>
                <Form.Control
                  type="number"
                  name="actualStudentsPresent"
                  value={formData.actualStudentsPresent}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Total Registered Students</Form.Label>
                <Form.Control
                  type="number"
                  name="totalRegisteredStudents"
                  value={formData.totalRegisteredStudents}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Venue</Form.Label>
                <Form.Control
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Scheduled Lecture Time</Form.Label>
            <Form.Control
              type="time"
              name="scheduledLectureTime"
              value={formData.scheduledLectureTime}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Topic Taught</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="topicTaught"
              value={formData.topicTaught}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Learning Outcomes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="learningOutcomes"
              value={formData.learningOutcomes}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Lecturer's Recommendations</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="recommendations"
              value={formData.recommendations}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Submit Report
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default LecturerReportForm;