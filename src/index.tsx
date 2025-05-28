/**
 * Recovery Office Frontend Application Entry Point
 */

console.log('🔧 ENVIRONMENT VARIABLE FORCE LOADING START');
console.log('====================================');

// CRITICAL: Safe environment variable handling to prevent syntax errors
const getEnvironmentConfig = () => {
  // Check if we're in development mode
  const currentNodeEnv = process.env.NODE_ENV;
  const isDevelopment = !currentNodeEnv || currentNodeEnv === 'development';
  
  console.log('📊 Environment Detection:', {
    NODE_ENV: currentNodeEnv,
    isDevelopment,
    processEnvKeys: Object.keys(process.env).length,
    reactAppKeys: Object.keys(process.env).filter(key => key.startsWith('REACT_APP_')).length
  });

  // SAFE: Create configuration object instead of direct assignment
  const config = {
    NODE_ENV: isDevelopment ? 'development' : currentNodeEnv,
    REACT_APP_API_URL: process.env.REACT_APP_API_URL || 'https://recovery-office-backend-production.up.railway.app/api',
    REACT_APP_ENVIRONMENT: process.env.REACT_APP_ENVIRONMENT || 'development',
    isDevelopment
  };

  // Force development mode flag on window object (safe)
  if (!isDevelopment) {
    console.warn('🚨 FORCING DEVELOPMENT MODE');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__DEV__ = true;
  }

  // Validate and log final configuration
  const finalConfig = {
    REACT_APP_API_URL: config.REACT_APP_API_URL,
    REACT_APP_ENVIRONMENT: config.REACT_APP_ENVIRONMENT,
    NODE_ENV: config.NODE_ENV,
    isDevelopment: config.isDevelopment,
    totalEnvVars: Object.keys(process.env).length,
    reactAppVars: Object.keys(process.env).filter(key => key.startsWith('REACT_APP_'))
  };

  console.log('✅ FINAL ENVIRONMENT CONFIGURATION:', finalConfig);
  console.log('====================================');

  return finalConfig;
};

// Safe environment configuration
const envConfig = getEnvironmentConfig();

// Only proceed if we have basic configuration
if (!envConfig.REACT_APP_API_URL) {
  console.error('🚨 FATAL: Cannot start app without API URL');
  document.body.innerHTML = `
    <div style="padding: 40px; text-align: center; color: #dc3545; background: #fff8f8; border: 1px solid #ffdddd; border-radius: 8px; margin: 20px; font-family: Arial, sans-serif;">
      <h2>Configuration Error</h2>
      <p>Environment variables failed to load. Please check your .env file.</p>
      <p><strong>Expected:</strong> REACT_APP_API_URL=https://recovery-office-backend-production.up.railway.app/api</p>
      <button onclick="window.location.reload()" style="background: #0A214F; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer;">
        Retry
      </button>
    </div>
  `;
  throw new Error('Environment configuration failed');
}

// Proceed with React initialization
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './design-system/theme/globalStyles';

// Global environment logging for debugging
if (envConfig.isDevelopment) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).ENV_DEBUG = {
    REACT_APP_API_URL: envConfig.REACT_APP_API_URL,
    NODE_ENV: envConfig.NODE_ENV,
    REACT_APP_ENVIRONMENT: envConfig.REACT_APP_ENVIRONMENT,
    allReactEnvVars: Object.keys(process.env).filter(key => key.startsWith('REACT_APP_'))
  };
  console.log('🐛 Environment debug object available at window.ENV_DEBUG');
}

// Disable styled-components 'eval' path for strict CSP
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).SC_DISABLE_SPEEDY = true;

/**
 * Main entry point for the Recovery Office application.
 * 
 * This file renders the App component to the DOM.
 * The application uses sacred geometry principles throughout its design.
 */

console.log('🚀 Starting Recovery Office with configuration:', envConfig);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 






