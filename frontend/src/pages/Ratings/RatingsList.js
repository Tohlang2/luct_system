import React from 'react';

const RatingsList = ({ lectures, onRateLecture }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title mb-0">Lectures Available for Rating</h5>
      </div>
      <div className="card-body">
        {lectures.length === 0 ? (
          <p className="text-muted text-center py-4">No lectures available for rating.</p>
        ) : (
          <div className="row">
            {lectures.map(lecture => (
              <div key={lecture.id} className="col-md-6 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h6 className="card-title">{lecture.course_code} - {lecture.course_name}</h6>
                    <p className="card-text">
                      <strong>Lecturer:</strong> {lecture.lecturer_name}<br/>
                      <strong>Date:</strong> {new Date(lecture.date).toLocaleDateString()}<br/>
                      <strong>Topic:</strong> {lecture.topic}
                    </p>
                  </div>
                  <div className="card-footer">
                    <button 
                      className="btn btn-primary w-100"
                      onClick={() => onRateLecture(lecture)}
                    >
                      <i className="bi bi-star me-2"></i>Rate This Lecture
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingsList;