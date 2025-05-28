/**
 * DEBUG VERSION - Minimal Recovery Office Entry Point
 * Use this to test if syntax errors have been resolved
 */

console.log('🔧 DEBUG: Starting minimal Recovery Office...');

// Safe environment configuration (no direct process.env assignment)
const getDebugConfig = () => {
  const config = {
    apiUrl: process.env.REACT_APP_API_URL || 'https://recovery-office-backend-production.up.railway.app/api',
    nodeEnv: process.env.NODE_ENV || 'development',
    isDebug: true
  };
  
  console.log('🐛 DEBUG CONFIG:', config);
  return config;
};

const debugConfig = getDebugConfig();

// React imports
import React from 'react';
import ReactDOM from 'react-dom/client';

// Minimal debug app component
const DebugApp: React.FC = () => {
  return (
    <div style={{
      padding: '40px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ color: '#0A214F', marginBottom: '24px' }}>
          🚀 Recovery Office - Debug Mode
        </h1>
        
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ color: '#28a745', marginBottom: '16px' }}>
            ✅ Application Bundle Loaded Successfully!
          </h2>
          <p style={{ color: '#6c757d' }}>
            If you can see this message, the JavaScript syntax error has been resolved.
          </p>
        </div>

        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '16px', 
          borderRadius: '4px',
          border: '1px solid #dee2e6'
        }}>
          <h3 style={{ marginTop: 0, color: '#495057' }}>Debug Information:</h3>
          <ul style={{ marginBottom: 0, color: '#6c757d' }}>
            <li><strong>API URL:</strong> {debugConfig.apiUrl}</li>
            <li><strong>Environment:</strong> {debugConfig.nodeEnv}</li>
            <li><strong>Bundle Status:</strong> Compiled & Executed Successfully</li>
            <li><strong>React Status:</strong> Rendered Successfully</li>
          </ul>
        </div>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <button 
            onClick={() => window.location.href = '/'}
            style={{
              backgroundColor: '#0A214F',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            🏠 Go to Full Application
          </button>
        </div>
      </div>
    </div>
  );
};

// Render debug app
console.log('🎯 DEBUG: Rendering minimal app...');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <DebugApp />
  </React.StrictMode>
);

console.log('✅ DEBUG: Recovery Office debug version loaded successfully!'); 
