import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ConnectionTest = () => {
  const [status, setStatus] = useState('checking...');
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test backend health endpoint
        const response = await api.get('/actuator/health');
        setStatus('✅ Connected');
        setDetails({
          status: response.status,
          data: response.data,
          baseURL: api.defaults.baseURL
        });
      } catch (error) {
        setStatus('❌ Connection Failed');
        setDetails({
          error: error.message,
          baseURL: api.defaults.baseURL,
          status: error.response?.status
        });
      }
    };

    testConnection();
  }, []);

  return (
    <div style={{ 
      padding: '20px', 
      margin: '20px', 
      border: '1px solid #ddd', 
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>Backend Connection Test</h3>
      <p><strong>Status:</strong> {status}</p>
      {details && (
        <div>
          <p><strong>Base URL:</strong> {details.baseURL}</p>
          {details.status && <p><strong>HTTP Status:</strong> {details.status}</p>}
          {details.error && <p><strong>Error:</strong> {details.error}</p>}
          {details.data && (
            <div>
              <strong>Response:</strong>
              <pre>{JSON.stringify(details.data, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConnectionTest;
