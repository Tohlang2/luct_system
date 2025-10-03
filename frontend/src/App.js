import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Import components
import Login from './components/Login';
import Navigation from './components/Navigation';

// Student Components
import StudentDashboard from './components/student/StudentDashboard';
import StudentMonitoring from './components/student/StudentMonitoring';
import StudentRating from './components/student/StudentRating';

// Lecturer Components
import LecturerDashboard from './components/lecturer/LecturerDashboard';
import LecturerClasses from './components/lecturer/LecturerClasses';
import LecturerReports from './components/lecturer/LecturerReports';
import LecturerMonitoring from './components/lecturer/LecturerMonitoring';
import LecturerRating from './components/lecturer/LecturerRating';

// PRL Components
import PRLDashboard from './components/prl/PRLDashboard';
import PRLCourses from './components/prl/PRLCourses';
import PRLReports from './components/prl/PRLReports';
import PRLMonitoring from './components/prl/PRLMonitoring';
import PRLRating from './components/prl/PRLRating';
import PRLClasses from './components/prl/PRLClasses';

// PL Components
import PLDashboard from './components/pl/PLDashboard';
import PLCourses from './components/pl/PLCourses';
import PLReports from './components/pl/PLReports';
import PLMonitoring from './components/pl/PLMonitoring';
import PLClasses from './components/pl/PLClasses';
import PLLectures from './components/pl/PLLectures';
import PLRating from './components/pl/PLRating';

const ProtectedRoute = ({ children }) => {
  const userRole = localStorage.getItem('userRole');
  return userRole ? children : <Navigate to="/login" />;
};

const RoleSpecificDashboard = () => {
  const userRole = localStorage.getItem('userRole');
  
  switch(userRole) {
    case 'student': return <StudentDashboard />;
    case 'lecturer': return <LecturerDashboard />;
    case 'prl': return <PRLDashboard />;
    case 'pl': return <PLDashboard />;
    default: return <Navigate to="/login" />;
  }
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Navigation />
              <RoleSpecificDashboard />
            </ProtectedRoute>
          } />
          
          {/* Student Routes */}
          <Route path="/student/monitoring" element={
            <ProtectedRoute>
              <Navigation />
              <StudentMonitoring />
            </ProtectedRoute>
          } />
          <Route path="/student/rating" element={
            <ProtectedRoute>
              <Navigation />
              <StudentRating />
            </ProtectedRoute>
          } />

          {/* Lecturer Routes */}
          <Route path="/lecturer/classes" element={
            <ProtectedRoute>
              <Navigation />
              <LecturerClasses />
            </ProtectedRoute>
          } />
          <Route path="/lecturer/reports" element={
            <ProtectedRoute>
              <Navigation />
              <LecturerReports />
            </ProtectedRoute>
          } />
          <Route path="/lecturer/monitoring" element={
            <ProtectedRoute>
              <Navigation />
              <LecturerMonitoring />
            </ProtectedRoute>
          } />
          <Route path="/lecturer/rating" element={
            <ProtectedRoute>
              <Navigation />
              <LecturerRating />
            </ProtectedRoute>
          } />

          {/* PRL Routes */}
          <Route path="/prl/courses" element={
            <ProtectedRoute>
              <Navigation />
              <PRLCourses />
            </ProtectedRoute>
          } />
          <Route path="/prl/reports" element={
            <ProtectedRoute>
              <Navigation />
              <PRLReports />
            </ProtectedRoute>
          } />
          <Route path="/prl/monitoring" element={
            <ProtectedRoute>
              <Navigation />
              <PRLMonitoring />
            </ProtectedRoute>
          } />
          <Route path="/prl/rating" element={
            <ProtectedRoute>
              <Navigation />
              <PRLRating />
            </ProtectedRoute>
          } />
          <Route path="/prl/classes" element={
            <ProtectedRoute>
              <Navigation />
              <PRLClasses />
            </ProtectedRoute>
          } />

          {/* PL Routes */}
          <Route path="/pl/courses" element={
            <ProtectedRoute>
              <Navigation />
              <PLCourses />
            </ProtectedRoute>
          } />
          <Route path="/pl/reports" element={
            <ProtectedRoute>
              <Navigation />
              <PLReports />
            </ProtectedRoute>
          } />
          <Route path="/pl/monitoring" element={
            <ProtectedRoute>
              <Navigation />
              <PLMonitoring />
            </ProtectedRoute>
          } />
          <Route path="/pl/classes" element={
            <ProtectedRoute>
              <Navigation />
              <PLClasses />
            </ProtectedRoute>
          } />
          <Route path="/pl/lectures" element={
            <ProtectedRoute>
              <Navigation />
              <PLLectures />
            </ProtectedRoute>
          } />
          <Route path="/pl/rating" element={
            <ProtectedRoute>
              <Navigation />
              <PLRating />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;