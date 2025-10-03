import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import ClassesList from './ClassesList';
import { toast } from 'react-toastify';

const Classes = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const mockClasses = [
    {
      id: 1,
      class_name: 'CS Year 1',
      faculty: 'Computer Science',
      total_registered_students: 50,
      venue: 'Building A, Room 101',
      lecturer_name: 'Dr. Jane Smith'
    },
    {
      id: 2,
      class_name: 'CS Year 2',
      faculty: 'Computer Science',
      total_registered_students: 42,
      venue: 'Building A, Room 102',
      lecturer_name: 'Prof. John Doe'
    },
    {
      id: 3,
      class_name: 'Business Year 1',
      faculty: 'Business Administration',
      total_registered_students: 65,
      venue: 'Building B, Room 201',
      lecturer_name: 'Dr. Sarah Johnson'
    }
  ];

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      setTimeout(() => {
        setClasses(mockClasses);
        setLoading(false);
      }, 1000);
    } catch (error) {
      toast.error('Failed to load classes');
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredClasses = classes.filter(cls =>
    cls.class_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.faculty?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.lecturer_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading classes...</span>
        </div>
        <p className="text-muted mt-2">Loading classes...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          {user.role === 'lecturer' ? 'My Classes' : 
           user.role === 'program_leader' ? 'Manage Classes' : 'Classes'}
        </h2>
        {user.role === 'program_leader' && (
          <button className="btn btn-primary" disabled title="Feature coming soon">
            <i className="bi bi-plus-circle me-2"></i>Add Class
          </button>
        )}
      </div>

      <ClassesList 
        classes={filteredClasses} 
        userRole={user.role}
        searchTerm={searchTerm}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default Classes;