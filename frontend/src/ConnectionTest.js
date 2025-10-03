import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { authAPI, coursesAPI, reportsAPI } from '../services/api';

const ConnectionTest = () => {
  const { backendOnline, user } = useAuth();
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState(false);

  const runTests = async () => {
    setLoading(true);
    const results = {};

    try {
      // Test 1: Health check
      const healthResponse = await fetch('http://localhost:5001/health');
      results.health = healthResponse.ok ? '✅ Connected' : '❌ Failed';
    } catch (error) {
      results.health = '❌ Failed: ' + error.message;
    }

    try {
      // Test 2: Get courses
      const coursesResult = await coursesAPI.getAll();
      results.courses = coursesResult.success ? `✅ ${coursesResult.courses?.length} courses` : '❌ Failed';
    } catch (error) {
      results.courses = '❌ Failed: ' + error.message;
    }

    try {
      // Test 3: Get users (if authenticated)
      if (user) {
        const usersResult = await usersAPI.getAll();
        results.users = usersResult.success ? `✅ ${usersResult.users?.length} users` : '❌ Failed';
      } else {
        results.users = '⚠️ Login required';
      }
    } catch (error) {
      results.users = '❌ Failed: ' + error.message;
    }

    setTestResults(results);
    setLoading(false);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title mb-0">Backend Connection Test</h5>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <strong>Backend Status:</strong>{' '}
          <span className={`badge ${backendOnline ? 'bg-success' : 'bg-warning'}`}>
            {backendOnline ? 'Online' : 'Offline'}
          </span>
        </div>

        <button 
          className="btn btn-primary mb-3" 
          onClick={runTests}
          disabled={loading}
        >
          {loading ? 'Testing...' : 'Run Connection Tests'}
        </button>

        <div>
          <h6>Test Results:</h6>
          <ul className="list-group">
            {Object.entries(testResults).map(([test, result]) => (
              <li key={test} className="list-group-item d-flex justify-content-between align-items-center">
                {test.charAt(0).toUpperCase() + test.slice(1)}:
                <span className={
                  result.includes('✅') ? 'text-success' : 
                  result.includes('❌') ? 'text-danger' : 'text-warning'
                }>
                  {result}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-3">
          <h6>API Endpoints:</h6>
          <ul>
            <li><code>GET http://localhost:5001/health</code></li>
            <li><code>POST http://localhost:5001/api/auth/login</code></li>
            <li><code>GET http://localhost:5001/api/courses</code></li>
            <li><code>GET http://localhost:5001/api/reports</code></li>
            <li><code>GET http://localhost:5001/api/users</code></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConnectionTest;