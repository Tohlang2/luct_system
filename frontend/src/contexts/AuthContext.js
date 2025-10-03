import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backendOnline, setBackendOnline] = useState(false);

  // Check backend connection on app start
  useEffect(() => {
    checkBackendConnection();
  }, []);

  const checkBackendConnection = async () => {
    try {
      const response = await fetch('http://localhost:5001/health');
      if (response.ok) {
        setBackendOnline(true);
        checkExistingAuth();
      } else {
        setBackendOnline(false);
        setLoading(false);
      }
    } catch (error) {
      console.log('Backend offline, using demo mode');
      setBackendOnline(false);
      setLoading(false);
    }
  };

  const checkExistingAuth = async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const result = await authAPI.getMe();
        if (result.success) {
          setUser(result.user);
        }
      } catch (error) {
        localStorage.removeItem('authToken');
      }
    }
    setLoading(false);
  };

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      
      if (!backendOnline) {
        // Fallback to demo mode
        return demoLogin(email, password);
      }

      const result = await authAPI.login(email, password);
      
      if (result.success) {
        localStorage.setItem('authToken', result.token);
        setUser(result.user);
        return { success: true, user: result.user };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.message || 'Login failed. Please try again.' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Demo login fallback
  const demoLogin = (email, password) => {
    const demoUsers = {
      'student1@luct.com': {
        id: 1,
        email: 'student1@luct.com',
        first_name: 'John',
        last_name: 'Student',
        role: 'student',
        faculty: 'Computer Science',
        student_id: 'STU001'
      },
      'lecturer1@luct.com': {
        id: 2,
        email: 'lecturer1@luct.com',
        first_name: 'Dr. Jane',
        last_name: 'Smith',
        role: 'lecturer',
        faculty: 'Computer Science',
        employee_id: 'LEC001'
      },
      'prl@luct.com': {
        id: 3,
        email: 'prl@luct.com',
        first_name: 'Dr. Robert',
        last_name: 'Wilson',
        role: 'principal_lecturer',
        faculty: 'Computer Science',
        employee_id: 'PRL001'
      },
      'admin@luct.com': {
        id: 4,
        email: 'admin@luct.com',
        first_name: 'Admin',
        last_name: 'User',
        role: 'program_leader',
        faculty: 'Administration',
        employee_id: 'ADM001'
      }
    };

    const user = demoUsers[email];
    if (user && password === 'password') {
      setUser(user);
      return { success: true, user };
    } else {
      return { success: false, message: 'Invalid email or password' };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    backendOnline
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};