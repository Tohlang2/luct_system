import React from 'react';

const CoursesList = ({ courses, userRole, searchTerm, onSearch }) => {
  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">All Courses</h5>
        <div className="w-25">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={onSearch}
          />
        </div>
      </div>
      <div className="card-body">
        {courses.length === 0 ? (
          <p className="text-muted text-center py-4">No courses found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Faculty</th>
                  <th>Credits</th>
                  <th>Program Leader</th>
                  {userRole === 'program_leader' && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {courses.map(course => (
                  <tr key={course.id}>
                    <td>
                      <strong>{course.course_code}</strong>
                    </td>
                    <td>{course.course_name}</td>
                    <td>
                      <span className="badge bg-secondary">{course.faculty}</span>
                    </td>
                    <td>
                      <span className="badge bg-info">{course.credits} credits</span>
                    </td>
                    <td>{course.program_leader_name || 'Not assigned'}</td>
                    {userRole === 'program_leader' && (
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary me-1"
                          title="Edit Course"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-success"
                          title="Assign Lecturer"
                        >
                          <i className="bi bi-person-plus"></i>
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesList;