// Test component to verify API connection
import { useState, useEffect } from 'react';
import { ApiService } from '../services/api';

export function ApiTest() {
  const [healthStatus, setHealthStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      const response = await ApiService.healthCheck();
      setHealthStatus(response);
    } catch (error) {
      setHealthStatus({ error: 'Connection failed' });
    }
    setLoading(false);
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-2">API Connection Test</h3>
      <button 
        onClick={testConnection}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test Connection'}
      </button>
      
      {healthStatus && (
        <div className="mt-4 p-3 bg-white rounded border">
          <h4 className="font-medium">API Status:</h4>
          <pre className="text-sm mt-2 overflow-auto">
            {JSON.stringify(healthStatus, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
