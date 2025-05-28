/**
 * API Test Utility
 * 
 * Provides functions to test API connectivity and diagnose issues
 */

export const testBackendConnection = async () => {
  console.log('🔍 Testing backend connection...');
  
  try {
    // Test 1: Health check
    const healthResponse = await fetch('https://recovery-office-backend-production.up.railway.app/api/health');
    console.log('✅ Health check:', healthResponse.status);
    
    // Test 2: Services endpoint
    const servicesResponse = await fetch('https://recovery-office-backend-production.up.railway.app/api/services');
    console.log('✅ Services endpoint:', servicesResponse.status);
    
    if (servicesResponse.ok) {
      const data = await servicesResponse.json();
      console.log('✅ Services data:', data);
      return data;
    }
    
  } catch (error) {
    console.error('❌ Connection test failed:', error);
    return null;
  }
};

export interface ApiTestResult {
  endpoint: string;
  success: boolean;
  status?: number | string;
  message: string;
  data?: unknown;
  error?: string;
  timestamp: string;
}

/**
 * Test a single API endpoint
 */
async function testEndpoint(
  name: string,
  testFn: () => Promise<{ status?: number | string; data?: unknown }>
): Promise<ApiTestResult> {
  const startTime = Date.now();
  
  try {
    const result = await testFn();
    const duration = Date.now() - startTime;
    
    return {
      endpoint: name,
      success: true,
      status: result.status || 200,
      message: `Success in ${duration}ms`,
      data: result.data,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    
    return {
      endpoint: name,
      success: false,
      message: `Failed in ${duration}ms`,
      error: (error as Error).message,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Test all API endpoints
 */
export async function testAllEndpoints(): Promise<ApiTestResult[]> {
  console.log('[API Test] Starting comprehensive API test...');
  
  const tests: ApiTestResult[] = [];
  
  // Test 1: Health Check
  tests.push(await testEndpoint('Health Check', async () => {
    const response = await fetch('https://recovery-office-backend-production.up.railway.app/api/health', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    return { status: response.status, data: await response.json() };
  }));
  
  // Test 2: Services
  tests.push(await testEndpoint('Get Services', async () => {
    const response = await fetch('https://recovery-office-backend-production.up.railway.app/api/services', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    return { status: response.status, data: await response.json() };
  }));
  
  // Test 3: Backend Availability
  tests.push(await testEndpoint('Backend Availability', async () => {
    try {
      const response = await fetch('https://recovery-office-backend-production.up.railway.app/', {
        method: 'HEAD',
        mode: 'no-cors'
      });
      return { status: response.type === 'opaque' ? 'Server responded' : response.status };
    } catch {
      throw new Error('Server not reachable');
    }
  }));
  
  // Log results
  console.log('[API Test] Results:');
  tests.forEach(test => {
    const icon = test.success ? '✅' : '❌';
    console.log(`${icon} ${test.endpoint}: ${test.message}`);
    if (test.error) {
      console.error(`   Error: ${test.error}`);
    }
    if (test.data) {
      console.log('   Data:', test.data);
    }
  });
  
  return tests;
}

/**
 * Check if backend is accessible
 */
export async function isBackendAccessible(): Promise<boolean> {
  try {
    const response = await fetch('https://recovery-office-backend-production.up.railway.app/api/health', {
      method: 'GET',
      mode: 'cors'
    });
    return response.ok;
  } catch {
    return false;
  }
}

// Make testBackendConnection available globally for browser console testing
declare global {
  interface Window {
    testBackendConnection: typeof testBackendConnection;
  }
}

window.testBackendConnection = testBackendConnection; 
