import React, { useState, useEffect } from 'react';
import { reportsAPI, classesAPI, coursesAPI } from '../../services/api';
import { toast } from 'react-toastify';

const ReportForm = ({ onBack, onSuccess }) => {
  const [formData, setFormData] = useState({
    class_id: '',
    week_of_reporting: '',
    date_of_lecture: '',
    course_id: '',
    actual_students_present: '',
    venue: '',
    scheduled_lecture_time: '',
    topic_taught: '',
    learning_outcomes: '',
    recommendations: ''
  });
  const [classes, setClasses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(true);

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      const [classesResponse, coursesResponse] = await Promise.all([
        classesAPI.getMyClasses(),
        coursesAPI.getMyCourses()
      ]);
      
      setClasses(classesResponse.data.classes || []);
      setCourses(coursesResponse.data.courses || []);
    } catch (error) {
      console.error('Failed to fetch form data:', error);
      toast.error('Failed to load form data');
      // Set empty arrays as fallback
      setClasses([]);
      setCourses([]);
    } finally {
      setFormLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await reportsAPI.create(formData);
      toast.success('Report submitted successfully!');
      onSuccess();
    } catch (error) {
      console.error('Failed to submit report:', error);
      const message = error.response?.data?.message || 'Failed to submit report';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const selectedClass = classes.find(cls => cls.id == formData.class_id);
  const totalStudents = selectedClass ? selectedClass.total_registered_students : 0;

  if (formLoading) {
    return (
      <div className="card">
        <div className="card-body text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading form...</span>
          </div>
          <p className="text-muted mt-2">Loading form data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title mb-0">New Lecture Report</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Class *</label>
                <select 
                  className="form-select"
                  name="class_id"
                  value={formData.class_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Class</option>
                  {classes.map(cls => (
                    <option key={cls.id} value={cls.id}>
                      {cls.class_name} ({cls.total_registered_students} students)
                    </option>
                  ))}
                </select>
                {classes.length === 0 && (
                  <small className="text-danger">No classes available. Please contact administrator.</small>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Week of Reporting *</label>
                <input
                  type="text"
                  className="form-control"
                  name="week_of_reporting"
                  value={formData.week_of_reporting}
                  onChange={handleChange}
                  placeholder="e.g., Week 1, Semester 1"
                  required
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Date of Lecture *</label>
                <input
                  type="date"
                  className="form-control"
                  name="date_of_lecture"
                  value={formData.date_of_lecture}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Course *</label>
                <select 
                  className="form-select"
                  name="course_id"
                  value={formData.course_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Course</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.course_code} - {course.course_name}
                    </option>
                  ))}
                </select>
                {courses.length === 0 && (
                  <small className="text-danger">No courses available. Please contact administrator.</small>
                )}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Students Present *</label>
                <input
                  type="number"
                  className="form-control"
                  name="actual_students_present"
                  value={formData.actual_students_present}
                  onChange={handleChange}
                  min="0"
                  max={totalStudents}
                  required
                />
                <small className="text-muted">Total registered students: {totalStudents}</small>
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Venue *</label>
                <input
                  type="text"
                  className="form-control"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Scheduled Time *</label>
                <input
                  type="time"
                  className="form-control"
                  name="scheduled_lecture_time"
                  value={formData.scheduled_lecture_time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Topic Taught *</label>
            <textarea
              className="form-control"
              name="topic_taught"
              value={formData.topic_taught}
              onChange={handleChange}
              rows="3"
              placeholder="Describe the topic covered in this lecture..."
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Learning Outcomes *</label>
            <textarea
              className="form-control"
              name="learning_outcomes"
              value={formData.learning_outcomes}
              onChange={handleChange}
              rows="3"
              placeholder="What should students be able to do after this lecture?"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Recommendations</label>
            <textarea
              className="form-control"
              name="recommendations"
              value={formData.recommendations}
              onChange={handleChange}
              rows="2"
              placeholder="Any suggestions for improvement..."
            />
          </div>

          <div className="d-flex gap-2">
            <button type="button" className="btn btn-secondary" onClick={onBack}>
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={loading || classes.length === 0 || courses.length === 0}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Submitting...
                </>
              ) : (
                'Submit Report'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;