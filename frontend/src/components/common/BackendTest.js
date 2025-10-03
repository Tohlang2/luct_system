import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BackendTest = () => {
  const [backendStatus, setBackendStatus] = useState('checking');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    testBackendConnection();
  }, []);

  const testBackendConnection = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setBackendStatus('connected');
      setUsers(response.data.users || []);
    } catch (error) {
      setBackendStatus('failed');
      console.error('Backend connection failed:', error);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title mb-0">Backend Connection Test</h5>
      </div>
      <div className="card-body">
        <p>Status: 
          <span className={`badge ${backendStatus === 'connected' ? 'bg-success' : 'bg-danger'}`}>
            {backendStatus}
          </span>
        </p>
        {backendStatus === 'connected' && (
          <div>
            <p>✅ Backend is running successfully!</p>
            <p>Found {users.length} users in database.</p>
          </div>
        )}
        {backendStatus === 'failed' && (
          <div>
            <p>❌ Cannot connect to backend. Make sure:</p>
            <ul>
              <li>Backend server is running on port 5000</li>
              <li>Database is connected</li>
              <li>No CORS issues</li>
            </ul>
            <button className="btn btn-primary btn-sm" onClick={testBackendConnection}>
              Retry Connection
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BackendTest;