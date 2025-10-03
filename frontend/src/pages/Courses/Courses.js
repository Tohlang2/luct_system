import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { coursesAPI } from '../../services/api';
import CoursesList from './CoursesList';
import CourseForm from './CourseForm';
import { toast } from 'react-toastify';

const Courses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await coursesAPI.getAll();
      setCourses(response.data.courses || []);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      toast.error('Failed to load courses');
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = () => {
    setView('create');
  };

  const handleBackToList = () => {
    setView('list');
    fetchCourses();
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCourses = courses.filter(course =>
    course.course_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.course_code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.faculty?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading courses...</span>
        </div>
        <p className="text-muted mt-2">Loading courses...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Courses Management</h2>
        {user.role === 'program_leader' && view === 'list' && (
          <button className="btn btn-primary" onClick={handleCreateCourse}>
            <i className="bi bi-plus-circle me-2"></i>Add Course
          </button>
        )}
      </div>

      {view === 'list' && (
        <CoursesList
          courses={filteredCourses}
          userRole={user.role}
          searchTerm={searchTerm}
          onSearch={handleSearch}
        />
      )}

      {view === 'create' && (
        <CourseForm onBack={handleBackToList} onSuccess={handleBackToList} />
      )}
    </div>
  );
};

export default Courses;