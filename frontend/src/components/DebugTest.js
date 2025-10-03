import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const DebugTest = () => {
  const { user, backendOnline, loading } = useAuth();

  return (
    <div className="card mb-4">
      <div className="card-header bg-danger text-white">
        <h5 className="mb-0">Debug Information</h5>
      </div>
      <div className="card-body">
        <pre>
          {JSON.stringify({
            user: user,
            backendOnline: backendOnline,
            loading: loading,
            timestamp: new Date().toISOString()
          }, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default DebugTest;