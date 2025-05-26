/**
 * ServiceTest Component
 * 
 * A debugging component that tests the services API independently
 * to identify loading state issues and API connectivity problems.
 */

import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { vlog, verror, vinfo, vsuccess } from '../../utils/debugLogger';
import { NetworkTest } from './NetworkTest';

interface ServiceTestProps {
  autoStart?: boolean;
}

interface TestResult {
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

export const ServiceTest: React.FC<ServiceTestProps> = ({ autoStart = false }) => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [apiEndpoint, setApiEndpoint] = useState('http://localhost:5000/api/services');

  const addResult = (message: string, type: TestResult['type'] = 'info') => {
    const result: TestResult = {
      timestamp: new Date().toLocaleTimeString(),
      message,
      type
    };
    
    setTestResults(prev => [result, ...prev]);
    
    // Also log to visual debugger
    switch (type) {
      case 'success':
        vsuccess(`[ServiceTest] ${message}`);
        break;
      case 'error':
        verror(`[ServiceTest] ${message}`);
        break;
      case 'warning':
        vlog(`[ServiceTest] ⚠️ ${message}`);
        break;
      default:
        vinfo(`[ServiceTest] ${message}`);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const testServicesAPI = useCallback(async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    addResult('🚀 Starting services API test...', 'info');
    
    try {
      addResult(`Testing endpoint: ${apiEndpoint}`, 'info');
      
      // Test 1: Basic connectivity
      addResult('Test 1: Checking basic connectivity...', 'info');
      const response = await fetch(apiEndpoint);
      addResult(`✅ Response received - Status: ${response.status}`, 'success');
      addResult(`Response headers: ${JSON.stringify(Object.fromEntries(response.headers.entries()))}`, 'info');
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      // Test 2: Parse JSON
      addResult('Test 2: Parsing JSON response...', 'info');
      const data = await response.json();
      addResult(`✅ JSON parsed successfully`, 'success');
      addResult(`Response type: ${typeof data}`, 'info');
      addResult(`Response keys: ${Object.keys(data).join(', ')}`, 'info');
      
      // Test 3: Analyze data structure
      addResult('Test 3: Analyzing data structure...', 'info');
      
      let servicesArray: unknown[] = [];
      
      if (data.data && Array.isArray(data.data)) {
        servicesArray = data.data;
        addResult(`✅ Found services in data.data - Length: ${servicesArray.length}`, 'success');
      } else if (data.services && Array.isArray(data.services)) {
        servicesArray = data.services;
        addResult(`✅ Found services in data.services - Length: ${servicesArray.length}`, 'success');
      } else if (Array.isArray(data)) {
        servicesArray = data;
        addResult(`✅ Direct array response - Length: ${servicesArray.length}`, 'success');
      } else {
        addResult(`⚠️ Unexpected data structure: ${JSON.stringify(data)}`, 'warning');
      }
      
      // Test 4: Validate service objects
      if (servicesArray.length > 0) {
        addResult('Test 4: Validating service objects...', 'info');
        
        servicesArray.forEach((service, index) => {
          if (typeof service === 'object' && service !== null) {
            const serviceObj = service as Record<string, unknown>;
            addResult(`Service ${index + 1}: ${JSON.stringify(serviceObj)}`, 'info');
            
            const requiredFields = ['id', 'name', 'description'];
            const missingFields = requiredFields.filter(field => !(field in serviceObj));
            
            if (missingFields.length === 0) {
              addResult(`✅ Service ${index + 1} has all required fields`, 'success');
            } else {
              addResult(`⚠️ Service ${index + 1} missing fields: ${missingFields.join(', ')}`, 'warning');
            }
          } else {
            addResult(`❌ Service ${index + 1} is not a valid object`, 'error');
          }
        });
      } else {
        addResult('⚠️ No services found in response', 'warning');
      }
      
      // Test 5: Network timing
      addResult('Test 5: Testing response timing...', 'info');
      const startTime = Date.now();
      const testResponse = await fetch(apiEndpoint);
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      addResult(`✅ Response time: ${duration}ms`, duration < 1000 ? 'success' : 'warning');
      await testResponse.json(); // Consume the response
      
      addResult('🎉 All tests completed successfully!', 'success');
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      addResult(`❌ Test failed: ${errorMessage}`, 'error');
      
      if (error instanceof TypeError && errorMessage.includes('fetch')) {
        addResult('💡 Suggestion: Check if backend server is running on the correct port', 'warning');
      }
    } finally {
      setIsRunning(false);
    }
  }, [apiEndpoint, isRunning]);

  const testAlternativeEndpoints = async () => {
    const endpoints = [
      'http://localhost:5000/api/services',
      'http://localhost:3000/api/services',
      'http://localhost:8000/api/services',
      '/api/services' // Relative URL
    ];
    
    addResult('🔍 Testing alternative endpoints...', 'info');
    
    for (const endpoint of endpoints) {
      try {
        addResult(`Testing: ${endpoint}`, 'info');
        const response = await fetch(endpoint);
        
        if (response.ok) {
          addResult(`✅ ${endpoint} - Working (${response.status})`, 'success');
          const data = await response.json();
          addResult(`Data structure: ${JSON.stringify(Object.keys(data))}`, 'info');
        } else {
          addResult(`❌ ${endpoint} - Failed (${response.status})`, 'error');
        }
      } catch (error) {
        addResult(`❌ ${endpoint} - Error: ${error instanceof Error ? error.message : String(error)}`, 'error');
      }
    }
  };

  // Auto-start test if requested
  useEffect(() => {
    if (autoStart) {
      addResult('Auto-starting service test...', 'info');
      setTimeout(testServicesAPI, 1000);
    }
  }, [autoStart, testServicesAPI]);

  return (
    <>
      <TestContainer>
        <TestHeader>
          <TestTitle>🔧 Service API Test Console</TestTitle>
          <TestSubtitle>Debug tool for diagnosing service loading issues</TestSubtitle>
        </TestHeader>
        
        <ControlsSection>
          <EndpointInput
            type="text"
            value={apiEndpoint}
            onChange={(e) => setApiEndpoint(e.target.value)}
            placeholder="API endpoint to test"
          />
          
          <ButtonGroup>
            <TestButton 
              onClick={testServicesAPI} 
              disabled={isRunning}
              $primary
            >
              {isRunning ? '🔄 Testing...' : '🧪 Test Services API'}
            </TestButton>
            
            <TestButton onClick={testAlternativeEndpoints}>
              🔍 Test All Endpoints
            </TestButton>
            
            <TestButton onClick={() => setTestResults([])}>
              🗑️ Clear Results
            </TestButton>
          </ButtonGroup>
        </ControlsSection>
        
        <ResultsSection>
          <ResultsHeader>
            Test Results ({testResults.length})
          </ResultsHeader>
          
          <ResultsList>
            {testResults.length === 0 ? (
              <EmptyState>No test results yet. Click "Test Services API" to start.</EmptyState>
            ) : (
              testResults.map((result, index) => (
                <ResultItem key={index} $type={result.type}>
                  <ResultTime>{result.timestamp}</ResultTime>
                  <ResultMessage>{result.message}</ResultMessage>
                </ResultItem>
              ))
            )}
          </ResultsList>
        </ResultsSection>
      </TestContainer>
      
      {/* Network diagnostics component */}
      <NetworkTest />
    </>
  );
};

// Styled Components
const TestContainer = styled.div`
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  margin: 20px;
  overflow: hidden;
  font-family: system-ui, -apple-system, sans-serif;
`;

const TestHeader = styled.div`
  background: linear-gradient(135deg, #0A214F 0%, #1a365d 100%);
  color: white;
  padding: 20px;
  text-align: center;
`;

const TestTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 600;
`;

const TestSubtitle = styled.div`
  opacity: 0.9;
  font-size: 14px;
`;

const ControlsSection = styled.div`
  padding: 20px;
  background: white;
  border-bottom: 1px solid #dee2e6;
`;

const EndpointInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 16px;
  font-family: monospace;
  
  &:focus {
    outline: none;
    border-color: #0A214F;
    box-shadow: 0 0 0 2px rgba(10, 33, 79, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const TestButton = styled.button<{ $primary?: boolean }>`
  background: ${props => props.$primary ? '#0A214F' : '#6c757d'};
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background: ${props => props.$primary ? '#0a1a3a' : '#5a6268'};
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ResultsSection = styled.div`
  background: white;
`;

const ResultsHeader = styled.div`
  padding: 16px 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
  font-weight: 600;
  color: #495057;
`;

const ResultsList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const EmptyState = styled.div`
  padding: 40px;
  text-align: center;
  color: #6c757d;
  font-style: italic;
`;

const ResultItem = styled.div<{ $type: TestResult['type'] }>`
  padding: 12px 20px;
  border-bottom: 1px solid #f1f3f4;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  
  ${props => {
    switch (props.$type) {
      case 'success':
        return 'border-left: 3px solid #28a745; background: #f8fff9;';
      case 'error':
        return 'border-left: 3px solid #dc3545; background: #fff8f8;';
      case 'warning':
        return 'border-left: 3px solid #ffc107; background: #fffdf5;';
      default:
        return 'border-left: 3px solid #6c757d; background: white;';
    }
  }}
  
  &:last-child {
    border-bottom: none;
  }
`;

const ResultTime = styled.div`
  color: #6c757d;
  font-size: 12px;
  font-family: monospace;
  white-space: nowrap;
  margin-top: 2px;
`;

const ResultMessage = styled.div`
  flex: 1;
  font-size: 13px;
  line-height: 1.4;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: monospace;
`;

export default ServiceTest; 