import React from 'react';

const ClassesList = ({ classes, userRole, searchTerm, onSearch }) => {
  const getStudentCountColor = (count) => {
    if (count > 50) return 'success';
    if (count > 25) return 'warning';
    return 'danger';
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">
          {userRole === 'program_leader' ? 'All Classes' : 'Class List'}
        </h5>
        <div className="w-25">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search classes..."
            value={searchTerm}
            onChange={onSearch}
          />
        </div>
      </div>
      <div className="card-body">
        {classes.length === 0 ? (
          <p className="text-muted text-center py-4">No classes found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Class Name</th>
                  <th>Faculty</th>
                  <th>Students</th>
                  <th>Lecturer</th>
                  {userRole === 'program_leader' && <th>Venue</th>}
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {classes.map(cls => (
                  <tr key={cls.id}>
                    <td>
                      <strong>{cls.class_name}</strong>
                    </td>
                    <td>
                      <span className="badge bg-secondary">{cls.faculty}</span>
                    </td>
                    <td>
                      <span className={`badge bg-${getStudentCountColor(cls.total_registered_students)}`}>
                        {cls.total_registered_students} students
                      </span>
                    </td>
                    <td>
                      {cls.lecturer_name ? (
                        <span>{cls.lecturer_name}</span>
                      ) : (
                        <span className="text-muted">Not assigned</span>
                      )}
                    </td>
                    {userRole === 'program_leader' && (
                      <td>{cls.venue || 'Not specified'}</td>
                    )}
                    <td>
                      <span className="badge bg-success">Active</span>
                    </td>
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

export default ClassesList;