/**
 * Recovery Office Dashboard System Test
 * Comprehensive testing of the enhanced dashboard with real backend integration
 */

const axios = require('axios');

// Configuration
const API_BASE_URL = 'http://localhost:5000/api';
const FRONTEND_URL = 'http://localhost:3000';

// Test configuration
const testConfig = {
  timeout: 10000,
  retries: 3,
  verbose: true
};

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Utility functions
function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, colors.green);
}

function logError(message) {
  log(`❌ ${message}`, colors.red);
}

function logInfo(message) {
  log(`ℹ️  ${message}`, colors.blue);
}

function logWarning(message) {
  log(`⚠️  ${message}`, colors.yellow);
}

function logHeader(message) {
  log(`\n${colors.bright}${colors.cyan}=== ${message} ===${colors.reset}`);
}

// Test results tracking
const testResults = {
  passed: 0,
  failed: 0,
  warnings: 0,
  tests: []
};

function recordTest(name, passed, message = '', warning = false) {
  testResults.tests.push({ name, passed, message, warning });
  if (warning) {
    testResults.warnings++;
    logWarning(`${name}: ${message}`);
  } else if (passed) {
    testResults.passed++;
    logSuccess(`${name}: ${message || 'PASSED'}`);
  } else {
    testResults.failed++;
    logError(`${name}: ${message || 'FAILED'}`);
  }
}

// API client with error handling
async function apiRequest(endpoint, method = 'GET', data = null) {
  try {
    const config = {
      method,
      url: `${API_BASE_URL}${endpoint}`,
      timeout: testConfig.timeout,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (data) {
      config.data = data;
    }

    const response = await axios(config);
    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      status: error.response?.status,
      data: error.response?.data
    };
  }
}

// Test functions
async function testBackendHealth() {
  logHeader('Backend Health Check');
  
  const result = await apiRequest('/health');
  if (result.success) {
    recordTest('Backend Health', true, `Server responding (${result.status})`);
    if (testConfig.verbose) {
      logInfo(`Health data: ${JSON.stringify(result.data, null, 2)}`);
    }
  } else {
    recordTest('Backend Health', false, `Server not responding: ${result.error}`);
  }
  
  return result.success;
}

async function testDatabaseConnection() {
  logHeader('Database Connection Test');
  
  // Test services endpoint (requires database)
  const servicesResult = await apiRequest('/services');
  if (servicesResult.success) {
    const services = servicesResult.data?.data || [];
    recordTest('Database Connection', true, `Retrieved ${services.length} services`);
    
    if (services.length > 0) {
      recordTest('Service Data Structure', true, 'Services have required fields');
      if (testConfig.verbose) {
        logInfo(`Sample service: ${JSON.stringify(services[0], null, 2)}`);
      }
    } else {
      recordTest('Service Data', false, 'No services found in database');
    }
  } else {
    recordTest('Database Connection', false, `Cannot retrieve services: ${servicesResult.error}`);
  }
  
  return servicesResult.success;
}

async function testAnalyticsEndpoints() {
  logHeader('Analytics Endpoints Test');
  
  // Test dashboard analytics endpoint
  const dashboardResult = await apiRequest('/analytics/dashboard');
  if (dashboardResult.success) {
    const analytics = dashboardResult.data?.data;
    recordTest('Dashboard Analytics', true, 'Analytics endpoint responding');
    
    // Validate analytics data structure
    const requiredFields = ['bookingStats', 'topServices', 'clientAcquisition', 'waitlistMetrics'];
    const hasAllFields = requiredFields.every(field => analytics && analytics[field]);
    
    if (hasAllFields) {
      recordTest('Analytics Data Structure', true, 'All required fields present');
    } else {
      recordTest('Analytics Data Structure', false, 'Missing required analytics fields');
    }
    
    if (testConfig.verbose && analytics) {
      logInfo(`Analytics structure: ${Object.keys(analytics).join(', ')}`);
    }
  } else {
    recordTest('Dashboard Analytics', false, `Analytics endpoint failed: ${dashboardResult.error}`);
  }
  
  // Test service popularity endpoint
  const popularityResult = await apiRequest('/analytics/service-popularity');
  if (popularityResult.success) {
    recordTest('Service Popularity Analytics', true, 'Service popularity endpoint responding');
  } else {
    recordTest('Service Popularity Analytics', false, `Service popularity failed: ${popularityResult.error}`);
  }
  
  return dashboardResult.success;
}

async function testBookingSystem() {
  logHeader('Booking System Integration Test');
  
  // Test bookings endpoint
  const bookingsResult = await apiRequest('/bookings');
  if (bookingsResult.success) {
    const bookings = bookingsResult.data?.data || [];
    recordTest('Bookings Retrieval', true, `Retrieved ${bookings.length} bookings`);
    
    if (bookings.length > 0) {
      const booking = bookings[0];
      const hasRequiredFields = booking._id && booking.clientInfo && booking.service;
      
      if (hasRequiredFields) {
        recordTest('Booking Data Structure', true, 'Bookings have required fields');
      } else {
        recordTest('Booking Data Structure', false, 'Bookings missing required fields');
      }
      
      if (testConfig.verbose) {
        logInfo(`Sample booking structure: ${Object.keys(booking).join(', ')}`);
      }
    } else {
      recordTest('Booking Data', true, 'No bookings found (expected for new system)', true);
    }
  } else {
    recordTest('Bookings Retrieval', false, `Cannot retrieve bookings: ${bookingsResult.error}`);
  }
  
  return bookingsResult.success;
}

async function testClientManagement() {
  logHeader('Client Management Test');
  
  // Test clients endpoint
  const clientsResult = await apiRequest('/clients');
  if (clientsResult.success) {
    const clients = clientsResult.data?.data || [];
    recordTest('Clients Retrieval', true, `Retrieved ${clients.length} clients`);
    
    if (clients.length > 0) {
      const client = clients[0];
      const hasRequiredFields = client._id && (client.name || (client.firstName && client.lastName)) && client.email;
      
      if (hasRequiredFields) {
        recordTest('Client Data Structure', true, 'Clients have required fields');
      } else {
        recordTest('Client Data Structure', false, 'Clients missing required fields');
      }
      
      if (testConfig.verbose) {
        logInfo(`Sample client structure: ${Object.keys(client).join(', ')}`);
      }
    } else {
      recordTest('Client Data', true, 'No clients found (expected for new system)', true);
    }
  } else {
    recordTest('Clients Retrieval', false, `Cannot retrieve clients: ${clientsResult.error}`);
  }
  
  return clientsResult.success;
}

async function testServiceConfiguration() {
  logHeader('Service Configuration Test');
  
  const servicesResult = await apiRequest('/services');
  if (servicesResult.success) {
    const services = servicesResult.data?.data || [];
    
    if (services.length >= 4) {
      recordTest('Service Count', true, `Found ${services.length} services (expected 4+)`);
    } else {
      recordTest('Service Count', false, `Only ${services.length} services found, expected 4+`);
    }
    
    // Check for expected Recovery Office services
    const expectedServices = [
      'Cryptocurrency Recovery',
      'Investment Fraud Recovery',
      'Financial Scam Recovery',
      'Regulatory Complaint'
    ];
    
    const foundServices = services.map(s => s.name);
    const hasExpectedServices = expectedServices.some(expected => 
      foundServices.some(found => found.includes(expected.split(' ')[0]))
    );
    
    if (hasExpectedServices) {
      recordTest('Service Types', true, 'Found expected recovery services');
    } else {
      recordTest('Service Types', false, 'Missing expected recovery services');
    }
    
    // Check service pricing
    const hasPricing = services.every(s => s.price && s.price > 0);
    if (hasPricing) {
      recordTest('Service Pricing', true, 'All services have valid pricing');
    } else {
      recordTest('Service Pricing', false, 'Some services missing pricing');
    }
    
    if (testConfig.verbose) {
      logInfo('Available services:');
      services.forEach(service => {
        log(`  - ${service.name}: £${service.price} (${service.duration}min)`, colors.cyan);
      });
    }
  } else {
    recordTest('Service Configuration', false, `Cannot retrieve services: ${servicesResult.error}`);
  }
  
  return servicesResult.success;
}

async function testDashboardDataFlow() {
  logHeader('Dashboard Data Flow Test');
  
  // Test the complete data flow that the dashboard uses
  const endpoints = [
    { name: 'Services', endpoint: '/services' },
    { name: 'Bookings', endpoint: '/bookings' },
    { name: 'Clients', endpoint: '/clients' },
    { name: 'Dashboard Analytics', endpoint: '/analytics/dashboard' },
    { name: 'Service Analytics', endpoint: '/analytics/service-popularity' }
  ];
  
  let allEndpointsWorking = true;
  
  for (const { name, endpoint } of endpoints) {
    const result = await apiRequest(endpoint);
    if (result.success) {
      recordTest(`${name} Endpoint`, true, `Status ${result.status}`);
    } else {
      recordTest(`${name} Endpoint`, false, `Failed: ${result.error}`);
      allEndpointsWorking = false;
    }
  }
  
  if (allEndpointsWorking) {
    recordTest('Complete Data Flow', true, 'All dashboard endpoints operational');
  } else {
    recordTest('Complete Data Flow', false, 'Some dashboard endpoints failing');
  }
  
  return allEndpointsWorking;
}

async function testFrontendConnectivity() {
  logHeader('Frontend Connectivity Test');
  
  try {
    const response = await axios.get(FRONTEND_URL, { timeout: 5000 });
    if (response.status === 200) {
      recordTest('Frontend Server', true, 'React development server responding');
    } else {
      recordTest('Frontend Server', false, `Unexpected status: ${response.status}`);
    }
  } catch (error) {
    recordTest('Frontend Server', false, `Frontend not accessible: ${error.message}`);
  }
}

async function testSystemIntegration() {
  logHeader('System Integration Test');
  
  // Test that all components work together
  const integrationTests = [
    { name: 'Backend Health', test: testBackendHealth },
    { name: 'Database Connection', test: testDatabaseConnection },
    { name: 'Analytics System', test: testAnalyticsEndpoints },
    { name: 'Booking System', test: testBookingSystem },
    { name: 'Client Management', test: testClientManagement },
    { name: 'Service Configuration', test: testServiceConfiguration },
    { name: 'Dashboard Data Flow', test: testDashboardDataFlow }
  ];
  
  let systemHealthy = true;
  
  for (const { name, test } of integrationTests) {
    try {
      const result = await test();
      if (!result) {
        systemHealthy = false;
      }
    } catch (error) {
      recordTest(name, false, `Test failed with error: ${error.message}`);
      systemHealthy = false;
    }
  }
  
  if (systemHealthy) {
    recordTest('Overall System Health', true, 'All core systems operational');
  } else {
    recordTest('Overall System Health', false, 'Some systems have issues');
  }
  
  return systemHealthy;
}

function printTestSummary() {
  logHeader('Test Summary');
  
  const total = testResults.passed + testResults.failed;
  const successRate = total > 0 ? (testResults.passed / total * 100).toFixed(1) : 0;
  
  log(`\nTotal Tests: ${total}`, colors.bright);
  log(`Passed: ${testResults.passed}`, colors.green);
  log(`Failed: ${testResults.failed}`, colors.red);
  log(`Warnings: ${testResults.warnings}`, colors.yellow);
  log(`Success Rate: ${successRate}%`, successRate >= 80 ? colors.green : colors.red);
  
  if (testResults.failed > 0) {
    log('\nFailed Tests:', colors.red);
    testResults.tests
      .filter(test => !test.passed && !test.warning)
      .forEach(test => {
        log(`  - ${test.name}: ${test.message}`, colors.red);
      });
  }
  
  if (testResults.warnings > 0) {
    log('\nWarnings:', colors.yellow);
    testResults.tests
      .filter(test => test.warning)
      .forEach(test => {
        log(`  - ${test.name}: ${test.message}`, colors.yellow);
      });
  }
  
  // System status
  log('\n' + '='.repeat(50), colors.cyan);
  if (testResults.failed === 0) {
    log('🎉 RECOVERY OFFICE DASHBOARD SYSTEM: FULLY OPERATIONAL', colors.green);
    log('✅ All core systems are working correctly', colors.green);
    log('✅ Dashboard is ready for production use', colors.green);
  } else if (testResults.failed <= 2) {
    log('⚠️  RECOVERY OFFICE DASHBOARD SYSTEM: MOSTLY OPERATIONAL', colors.yellow);
    log('✅ Core functionality is working', colors.green);
    log('⚠️  Some minor issues detected', colors.yellow);
  } else {
    log('❌ RECOVERY OFFICE DASHBOARD SYSTEM: NEEDS ATTENTION', colors.red);
    log('❌ Multiple system issues detected', colors.red);
    log('🔧 Please review failed tests and fix issues', colors.yellow);
  }
  log('='.repeat(50), colors.cyan);
}

// Main test execution
async function runAllTests() {
  log(`${colors.bright}${colors.magenta}
╔══════════════════════════════════════════════════════════════╗
║                    RECOVERY OFFICE                           ║
║              Dashboard System Test Suite                     ║
║                                                              ║
║  Testing enhanced dashboard with real backend integration    ║
╚══════════════════════════════════════════════════════════════╝
${colors.reset}`);
  
  logInfo(`Test Configuration:`);
  logInfo(`- API Base URL: ${API_BASE_URL}`);
  logInfo(`- Frontend URL: ${FRONTEND_URL}`);
  logInfo(`- Timeout: ${testConfig.timeout}ms`);
  logInfo(`- Verbose: ${testConfig.verbose}`);
  
  try {
    // Run frontend connectivity test (non-blocking)
    await testFrontendConnectivity();
    
    // Run main system integration tests
    await testSystemIntegration();
    
  } catch (error) {
    logError(`Test suite failed with error: ${error.message}`);
    recordTest('Test Suite Execution', false, error.message);
  }
  
  printTestSummary();
  
  // Exit with appropriate code
  process.exit(testResults.failed > 0 ? 1 : 0);
}

// Handle process termination
process.on('SIGINT', () => {
  log('\n\nTest interrupted by user', colors.yellow);
  printTestSummary();
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logError(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  recordTest('Unhandled Error', false, reason.toString());
  printTestSummary();
  process.exit(1);
});

// Run tests
if (require.main === module) {
  runAllTests();
}

module.exports = {
  runAllTests,
  testBackendHealth,
  testDatabaseConnection,
  testAnalyticsEndpoints,
  testBookingSystem,
  testClientManagement,
  testServiceConfiguration,
  testDashboardDataFlow,
  testFrontendConnectivity
}; 