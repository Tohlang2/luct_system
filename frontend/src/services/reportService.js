import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Add auth header to requests
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const reportService = {
  // Existing methods
  createReport: (reportData) => axios.post(`${API_URL}/reports`, reportData, {
    headers: getAuthHeader()
  }),
  getReports: () => axios.get(`${API_URL}/reports`, {
    headers: getAuthHeader()
  }),
  getReport: (id) => axios.get(`${API_URL}/reports/${id}`, {
    headers: getAuthHeader()
  }),
  
  // New methods for feedback
  addFeedback: (reportId, feedbackData) => 
    axios.put(`${API_URL}/reports/${reportId}/feedback`, feedbackData, {
      headers: getAuthHeader()
    }),
  
  addStudentFeedback: (reportId, feedbackData) => 
    axios.post(`${API_URL}/reports/${reportId}/student-feedback`, feedbackData, {
      headers: getAuthHeader()
    }),
  
  getReportsByStream: (stream) => 
    axios.get(`${API_URL}/reports/stream/${stream}`, {
      headers: getAuthHeader()
    }),
  
  getLecturerReports: (lecturerId) => 
    axios.get(`${API_URL}/reports/lecturer/${lecturerId}`, {
      headers: getAuthHeader()
    })
};