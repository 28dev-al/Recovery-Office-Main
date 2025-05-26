/**
 * Connection Test Utility
 * 
 * Provides comprehensive testing of backend connectivity
 * Available globally for browser console testing
 */

export const testConnection = async () => {
  console.log('🔍 Testing backend connection...');

  const tests = [
    {
      name: 'Direct fetch to backend',
      url: 'http://localhost:5000/api/services'
    },
    {
      name: 'Health check',
      url: 'http://localhost:5000/api/health'
    },
    {
      name: 'CORS preflight test',
      url: 'http://localhost:5000/api/services',
      method: 'OPTIONS'
    }
  ];

  const results = [];

  for (const test of tests) {
    try {
      console.log(`Testing: ${test.name}`);
      const response = await fetch(test.url, {
        method: test.method || 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      });
      
      let data = null;
      if (response.ok && test.method !== 'OPTIONS') {
        data = await response.json();
      }
      
      console.log(`✅ ${test.name}: Success`, { status: response.status, data });
      results.push({ test: test.name, success: true, status: response.status, data });
    } catch (error) {
      console.error(`❌ ${test.name}: Failed`, error);
      results.push({ test: test.name, success: false, error: (error as Error).message });
    }
  }

  // Summary
  const successCount = results.filter(r => r.success).length;
  console.log(`\n📊 Test Summary: ${successCount}/${results.length} tests passed`);
  
  if (successCount === results.length) {
    console.log('🎉 All tests passed! Backend connection is working.');
  } else {
    console.log('⚠️ Some tests failed. Check individual results above.');
  }

  return results;
};

// Environment check function
export const checkEnvironment = () => {
  console.log('🔍 Environment Variables Check:');
  console.log({
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    REACT_APP_ENVIRONMENT: process.env.REACT_APP_ENVIRONMENT
  });
  
  console.log('\n🌐 Current Location:');
  console.log({
    href: window.location.href,
    origin: window.location.origin,
    protocol: window.location.protocol,
    host: window.location.host
  });
};

// Network diagnostics
export const runNetworkDiagnostics = async () => {
  console.log('🔍 Running network diagnostics...');
  
  // Test basic connectivity
  const tests = [
    'http://localhost:5000',
    'http://localhost:5000/api',
    'http://localhost:5000/api/health',
    'http://localhost:5000/api/services'
  ];
  
  for (const url of tests) {
        try {      const start = Date.now();      const response = await fetch(url, { method: 'HEAD', mode: 'no-cors' });      const duration = Date.now() - start;      console.log(`✅ ${url}: Reachable (${duration}ms)`, response.type);    } catch (error) {      console.error(`❌ ${url}: Unreachable`, (error as Error).message);    }
  }
};

// Make functions globally available
declare global {
  interface Window {
    testConnection: typeof testConnection;
    checkEnvironment: typeof checkEnvironment;
    runNetworkDiagnostics: typeof runNetworkDiagnostics;
  }
}

window.testConnection = testConnection;
window.checkEnvironment = checkEnvironment;
window.runNetworkDiagnostics = runNetworkDiagnostics; 