import React, { useState } from 'react';
import { toast } from 'react-toastify';

const RatingForm = ({ lecture, onBack, onSuccess }) => {
  const [formData, setFormData] = useState({
    rating_value: 5,
    comment: ''
  });
  const [loading, setLoading] = useState(false);

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
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Rating submitted successfully!');
      onSuccess();
    } catch (error) {
      toast.error('Failed to submit rating');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title mb-0">Rate Lecture</h5>
      </div>
      <div className="card-body">
        <div className="mb-4 p-3 bg-light rounded">
          <h6>Lecture Details</h6>
          <p className="mb-1"><strong>Course:</strong> {lecture.course_code} - {lecture.course_name}</p>
          <p className="mb-1"><strong>Lecturer:</strong> {lecture.lecturer_name}</p>
          <p className="mb-1"><strong>Date:</strong> {new Date(lecture.date).toLocaleDateString()}</p>
          <p className="mb-0"><strong>Topic:</strong> {lecture.topic}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label">Rating *</label>
            <div>
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  className={`btn btn-star me-1 ${star <= formData.rating_value ? 'text-warning' : 'text-secondary'}`}
                  onClick={() => setFormData({...formData, rating_value: star})}
                >
                  <i className="bi bi-star-fill fs-2"></i>
                </button>
              ))}
              <span className="ms-2 fw-semibold">{formData.rating_value}/5</span>
            </div>
            <input type="hidden" name="rating_value" value={formData.rating_value} />
          </div>

          <div className="mb-4">
            <label className="form-label">Comments</label>
            <textarea
              className="form-control"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              rows="4"
              placeholder="Share your feedback about this lecture..."
            />
          </div>

          <div className="d-flex gap-2">
            <button type="button" className="btn btn-secondary" onClick={onBack}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Submitting...
                </>
              ) : (
                'Submit Rating'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RatingForm;