import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import RatingsList from './RatingsList';
import RatingForm from './RatingForm';
import { toast } from 'react-toastify';

const Ratings = () => {
  const { user } = useAuth();
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [view, setView] = useState('list');

  const mockLectures = [
    {
      id: 1,
      course_code: 'CS101',
      course_name: 'Introduction to Programming',
      lecturer_name: 'Dr. Jane Smith',
      date: '2024-01-15',
      topic: 'Variables and Data Types',
      report_id: 1
    },
    {
      id: 2,
      course_code: 'MA202',
      course_name: 'Calculus II',
      lecturer_name: 'Prof. John Doe',
      date: '2024-01-16',
      topic: 'Integration Techniques',
      report_id: 2
    },
    {
      id: 3,
      course_code: 'PHY101',
      course_name: 'Physics Fundamentals',
      lecturer_name: 'Dr. Sarah Wilson',
      date: '2024-01-17',
      topic: 'Newtonian Mechanics',
      report_id: 3
    }
  ];

  useEffect(() => {
    fetchLecturesToRate();
  }, []);

  const fetchLecturesToRate = async () => {
    try {
      setTimeout(() => {
        setLectures(mockLectures);
        setLoading(false);
      }, 1000);
    } catch (error) {
      toast.error('Failed to load lectures');
      setLoading(false);
    }
  };

  const handleRateLecture = (lecture) => {
    setSelectedLecture(lecture);
    setView('rate');
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedLecture(null);
    fetchLecturesToRate();
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading lectures...</span>
        </div>
        <p className="text-muted mt-2">Loading lectures...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Rate Lectures</h2>
        <span className="badge bg-info">Student: {user.first_name} {user.last_name}</span>
      </div>

      {view === 'list' && (
        <RatingsList 
          lectures={lectures} 
          onRateLecture={handleRateLecture}
        />
      )}

      {view === 'rate' && selectedLecture && (
        <RatingForm 
          lecture={selectedLecture}
          onBack={handleBackToList}
          onSuccess={handleBackToList}
        />
      )}
    </div>
  );
};

export default Ratings;