const API_BASE_URL = 'http://localhost:5001/api';

// Helper function for API calls
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  // Add auth token if available
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// Auth API calls
export const authAPI = {
  login: (email, password) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  
  getMe: () => apiRequest('/auth/me'),
};

// Reports API calls
export const reportsAPI = {
  getAll: () => apiRequest('/reports'),
  
  getById: (id) => apiRequest(`/reports/${id}`),
  
  create: (reportData) => {
    return apiRequest('/reports', {
      method: 'POST',
      body: JSON.stringify(reportData),
    });
  },
};

// Courses API calls
export const coursesAPI = {
  getAll: () => apiRequest('/courses'),
};

// Users API calls
export const usersAPI = {
  getAll: () => apiRequest('/users'),
};

export default apiRequest;