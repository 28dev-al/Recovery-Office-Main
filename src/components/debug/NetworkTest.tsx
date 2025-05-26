import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  margin: 20px;
  font-family: monospace;
  font-size: 13px;
`;

const Button = styled.button`
  background: #0A214F;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 15px;
  
  &:hover {
    background: #1a3160;
  }
`;

const ResultLine = styled.div<{ $status?: 'success' | 'error' | 'info' }>`
  padding: 5px 0;
  color: ${props => 
    props.$status === 'success' ? '#28a745' : 
    props.$status === 'error' ? '#dc3545' : 
    '#333'
  };
`;

export const NetworkTest: React.FC = () => {
  const [results, setResults] = useState<Array<{message: string, status?: 'success' | 'error' | 'info'}>>([]);
  const [isRunning, setIsRunning] = useState(false);

  const addResult = (message: string, status?: 'success' | 'error' | 'info') => {
    setResults(prev => [...prev, { message, status }]);
  };

  const runTests = async () => {
    setIsRunning(true);
    setResults([{ message: '🔍 Starting network diagnostics...', status: 'info' }]);

    // Test 1: Basic connectivity
    try {
      addResult('Testing backend health endpoint...', 'info');
      const response = await fetch('http://localhost:5000/api/health');
      addResult(`✅ Backend health: ${response.status} ${response.statusText}`, 'success');
    } catch (error) {
      addResult(`❌ Backend unreachable: ${(error as Error).message}`, 'error');
    }

    // Test 2: CORS preflight
    try {
      addResult('Testing CORS preflight...', 'info');
      const response = await fetch('http://localhost:5000/api/services', {
        method: 'OPTIONS'
      });
      addResult(`✅ CORS preflight: ${response.status}`, 'success');
    } catch (error) {
      addResult(`❌ CORS preflight failed: ${(error as Error).message}`, 'error');
    }

    // Test 3: Actual data fetch
    try {
      addResult('Fetching services data...', 'info');
      const response = await fetch('http://localhost:5000/api/services');
      const data = await response.json();
      addResult(`✅ Services data: ${data.results} services found`, 'success');
      
      // Show service names
      if (data.data && Array.isArray(data.data)) {
        data.data.forEach((service: { name: string }) => {
          addResult(`  • ${service.name}`, 'info');
        });
      }
    } catch (error) {
      addResult(`❌ Services fetch failed: ${(error as Error).message}`, 'error');
    }

    // Test 4: Check response headers
    try {
      addResult('Checking response headers...', 'info');
      const response = await fetch('http://localhost:5000/api/services');
      const corsHeaders = {
        'access-control-allow-origin': response.headers.get('access-control-allow-origin'),
        'access-control-allow-methods': response.headers.get('access-control-allow-methods'),
        'access-control-allow-headers': response.headers.get('access-control-allow-headers')
      };
      
      Object.entries(corsHeaders).forEach(([header, value]) => {
        if (value) {
          addResult(`  • ${header}: ${value}`, 'success');
        } else {
          addResult(`  • ${header}: not set`, 'error');
        }
      });
    } catch (error) {
      addResult(`❌ Header check failed: ${(error as Error).message}`, 'error');
    }

    // Test 5: API client test
    try {
      addResult('Testing API client...', 'info');
      const { apiClient } = await import('../../services/api');
      const result = await apiClient.getServices();
      const data = result.data as { results: number };
      addResult(`✅ API client: ${result.status} - ${data.results} services`, 'success');
    } catch (error) {
      addResult(`❌ API client failed: ${(error as Error).message}`, 'error');
    }

    addResult('🏁 Network diagnostics complete', 'info');
    setIsRunning(false);
  };

  return (
    <Container>
      <h3>Network Diagnostics</h3>
      <Button onClick={runTests} disabled={isRunning}>
        {isRunning ? 'Running Tests...' : 'Run Network Tests'}
      </Button>
      
      <div>
        {results.map((result, i) => (
          <ResultLine key={i} $status={result.status}>
            {result.message}
          </ResultLine>
        ))}
      </div>
    </Container>
  );
}; 