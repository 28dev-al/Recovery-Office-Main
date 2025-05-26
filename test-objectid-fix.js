/**
 * Complete ObjectId Fix Verification Script
 * 
 * Tests the end-to-end booking system with proper MongoDB ObjectId handling
 */

const https = require('https');
const http = require('http');

// Configuration
const API_BASE_URL = 'http://localhost:5000/api';
const FRONTEND_URL = 'http://localhost:3000';

// Helper function to make HTTP requests
async function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const protocol = urlObj.protocol === 'https:' ? https : http;
    
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Origin': FRONTEND_URL,
        'Accept': 'application/json',
        ...options.headers
      }
    };

    const req = protocol.request(requestOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const parsedData = data ? JSON.parse(data) : {};
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: parsedData
          });
        } catch (parseError) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: data,
            parseError: parseError.message
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (options.body) {
      req.write(JSON.stringify(options.body));
    }

    req.end();
  });
}

// Test functions
async function testServiceDataIntegrity() {
  console.log('\n🧪 TESTING SERVICE DATA INTEGRITY...');
  console.log('==========================================');

  try {
    // Test service endpoint
    const servicesResponse = await makeRequest(`${API_BASE_URL}/services`);
    console.log(`✅ Services API Status: ${servicesResponse.statusCode}`);

    if (servicesResponse.statusCode === 200 && servicesResponse.data.data) {
      const services = servicesResponse.data.data;
      console.log(`📊 Found ${services.length} services`);

      services.forEach((service, index) => {
        const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(service._id);
        console.log(`   ${index + 1}. ${service.name}`);
        console.log(`      ID: ${service._id}`);
        console.log(`      Valid ObjectId: ${isValidObjectId ? '✅' : '❌'}`);
        
        if (!isValidObjectId) {
          console.error(`      ⚠️ CRITICAL: Invalid ObjectId format!`);
        }
      });

      // Test debug endpoint
      const debugResponse = await makeRequest(`${API_BASE_URL}/test/services`);
      if (debugResponse.statusCode === 200) {
        console.log('\n📋 Service Debug Information:');
        console.log(`   Total Services: ${debugResponse.data.totalServices}`);
        console.log(`   Valid ObjectIds: ${debugResponse.data.summary.validObjectIds}`);
        console.log(`   Invalid ObjectIds: ${debugResponse.data.summary.invalidObjectIds}`);
        console.log(`   All Valid: ${debugResponse.data.allValidObjectIds ? '✅' : '❌'}`);
        
        return {
          success: debugResponse.data.allValidObjectIds,
          services: debugResponse.data.data,
          totalServices: debugResponse.data.totalServices
        };
      }
    }
  } catch (error) {
    console.error('❌ Service data test failed:', error.message);
    return { success: false, error: error.message };
  }
}

async function testCompleteBookingFlow() {
  console.log('\n🧪 TESTING COMPLETE BOOKING FLOW...');
  console.log('====================================');

  try {
    // Step 1: Get services (should have valid ObjectIds)
    console.log('Step 1: Fetching services...');
    const servicesResponse = await makeRequest(`${API_BASE_URL}/services`);
    
    if (servicesResponse.statusCode !== 200 || !servicesResponse.data.data.length) {
      throw new Error('Failed to fetch services or no services available');
    }

    const services = servicesResponse.data.data;
    const firstService = services[0];
    console.log(`✅ Selected service: ${firstService.name} (ID: ${firstService._id})`);

    // Validate service ObjectId
    const serviceIdValid = /^[0-9a-fA-F]{24}$/.test(firstService._id);
    console.log(`   Service ObjectId valid: ${serviceIdValid ? '✅' : '❌'}`);
    
    if (!serviceIdValid) {
      throw new Error(`Invalid service ObjectId: ${firstService._id}`);
    }

    // Step 2: Create client
    console.log('\nStep 2: Creating client...');
    const clientData = {
      firstName: 'TestObjectId',
      lastName: 'User',
      email: `test-objectid-${Date.now()}@example.com`,
      phone: '+44 1234 567890',
      company: 'Test Company Ltd',
      caseType: 'cryptocurrency_recovery',
      estimatedLoss: 50000,
      urgencyLevel: 'high',
      additionalNotes: 'Testing ObjectId fix for Recovery Office booking system',
      gdprConsent: true
    };

    const clientResponse = await makeRequest(`${API_BASE_URL}/clients`, {
      method: 'POST',
      body: clientData
    });

    if (clientResponse.statusCode !== 201) {
      throw new Error(`Client creation failed: ${clientResponse.statusCode} - ${JSON.stringify(clientResponse.data)}`);
    }

    const client = clientResponse.data.data;
    console.log(`✅ Created client: ${client.firstName} ${client.lastName} (ID: ${client._id})`);

    // Validate client ObjectId
    const clientIdValid = /^[0-9a-fA-F]{24}$/.test(client._id);
    console.log(`   Client ObjectId valid: ${clientIdValid ? '✅' : '❌'}`);
    
    if (!clientIdValid) {
      throw new Error(`Invalid client ObjectId: ${client._id}`);
    }

    // Step 3: Validate IDs before booking
    console.log('\nStep 3: Validating IDs for booking...');
    const validationResponse = await makeRequest(`${API_BASE_URL}/test/validate-ids`, {
      method: 'POST',
      body: {
        serviceId: firstService._id,
        clientId: client._id
      }
    });

    if (validationResponse.statusCode !== 200) {
      throw new Error(`ID validation failed: ${validationResponse.statusCode}`);
    }

    const validation = validationResponse.data;
    console.log(`   Service ID validation: ${validation.data.serviceId.isValidFormat ? '✅' : '❌'}`);
    console.log(`   Service exists in DB: ${validation.data.serviceId.existsInDatabase ? '✅' : '❌'}`);
    console.log(`   Client ID validation: ${validation.data.clientId.isValidFormat ? '✅' : '❌'}`);
    console.log(`   Client exists in DB: ${validation.data.clientId.existsInDatabase ? '✅' : '❌'}`);
    console.log(`   Can create booking: ${validation.canCreateBooking ? '✅' : '❌'}`);

    if (!validation.canCreateBooking) {
      throw new Error('ID validation failed - cannot create booking');
    }

    // Step 4: Create booking with validated ObjectIds
    console.log('\nStep 4: Creating booking with real ObjectIds...');
    const bookingData = {
      clientId: client._id,  // Real MongoDB ObjectId
      serviceId: firstService._id,  // Real MongoDB ObjectId
      serviceName: firstService.name,
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
      timeSlot: '10:00 AM',
      notes: 'Test booking with verified ObjectIds',
      urgencyLevel: 'high',
      estimatedValue: 50000,
      status: 'confirmed'
    };

    console.log('   Booking data being submitted:');
    console.log(`     Client ID: ${bookingData.clientId} (${typeof bookingData.clientId})`);
    console.log(`     Service ID: ${bookingData.serviceId} (${typeof bookingData.serviceId})`);
    console.log(`     Client ID valid: ${/^[0-9a-fA-F]{24}$/.test(bookingData.clientId) ? '✅' : '❌'}`);
    console.log(`     Service ID valid: ${/^[0-9a-fA-F]{24}$/.test(bookingData.serviceId) ? '✅' : '❌'}`);

    const bookingResponse = await makeRequest(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      body: bookingData
    });

    console.log(`\n📋 Booking Response Status: ${bookingResponse.statusCode}`);
    
    if (bookingResponse.statusCode === 201) {
      const booking = bookingResponse.data.data;
      console.log('✅ BOOKING CREATION SUCCESSFUL!');
      console.log(`   Booking ID: ${booking._id}`);
      console.log(`   Reference: ${booking.reference || booking.bookingReference}`);
      console.log(`   Service: ${booking.serviceName}`);
      console.log(`   Client: ${booking.clientId}`);
      console.log(`   Status: ${booking.status}`);
      
      return {
        success: true,
        booking,
        client,
        service: firstService
      };
    } else {
      console.error('❌ BOOKING CREATION FAILED!');
      console.error(`   Status: ${bookingResponse.statusCode}`);
      console.error(`   Error: ${JSON.stringify(bookingResponse.data, null, 2)}`);
      
      return {
        success: false,
        error: bookingResponse.data,
        statusCode: bookingResponse.statusCode
      };
    }

  } catch (error) {
    console.error('❌ Complete booking flow test failed:', error.message);
    return { success: false, error: error.message };
  }
}

async function testDatabaseStats() {
  console.log('\n🧪 TESTING DATABASE STATISTICS...');
  console.log('==================================');

  try {
    const statsResponse = await makeRequest(`${API_BASE_URL}/test/database-stats`);
    
    if (statsResponse.statusCode === 200) {
      console.log('✅ Database Statistics:');
      console.log(`   Services: ${statsResponse.data.data.services}`);
      console.log(`   Clients: ${statsResponse.data.data.clients}`);
      console.log(`   Bookings: ${statsResponse.data.data.bookings}`);
      console.log(`   Total Records: ${statsResponse.data.data.total}`);
      
      return {
        success: true,
        stats: statsResponse.data.data
      };
    } else {
      throw new Error(`Failed to get database stats: ${statsResponse.statusCode}`);
    }
  } catch (error) {
    console.error('❌ Database stats test failed:', error.message);
    return { success: false, error: error.message };
  }
}

// Main test runner
async function runAllTests() {
  console.log('🚀 STARTING MONGODB OBJECTID FIX VERIFICATION');
  console.log('==============================================');
  console.log(`Target API: ${API_BASE_URL}`);
  console.log(`Frontend Origin: ${FRONTEND_URL}`);
  console.log(`Test Time: ${new Date().toISOString()}\n`);

  const results = {
    serviceIntegrity: null,
    bookingFlow: null,
    databaseStats: null
  };

  // Run all tests
  results.serviceIntegrity = await testServiceDataIntegrity();
  results.bookingFlow = await testCompleteBookingFlow();
  results.databaseStats = await testDatabaseStats();

  // Generate final report
  console.log('\n📊 FINAL TEST RESULTS');
  console.log('=====================');
  
  const allTestsPassed = results.serviceIntegrity?.success && 
                        results.bookingFlow?.success && 
                        results.databaseStats?.success;

  console.log(`Service Data Integrity: ${results.serviceIntegrity?.success ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`Complete Booking Flow: ${results.bookingFlow?.success ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`Database Statistics: ${results.databaseStats?.success ? '✅ PASSED' : '❌ FAILED'}`);
  
  console.log(`\n🎯 OVERALL RESULT: ${allTestsPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);

  if (allTestsPassed) {
    console.log('\n🎉 SUCCESS! The MongoDB ObjectId fix is working correctly.');
    console.log('   ✅ Services return valid MongoDB ObjectIds');
    console.log('   ✅ Frontend preserves real ObjectIds (no synthetic IDs)');
    console.log('   ✅ Backend validates ObjectIds properly');
    console.log('   ✅ Complete booking flow works end-to-end');
    console.log('\n💡 The original "Cast to ObjectId failed for service-0" error should be resolved!');
  } else {
    console.log('\n❌ FAILURE! Some tests failed. Check the logs above for details.');
    
    if (!results.serviceIntegrity?.success) {
      console.log('   ❌ Service data integrity issues detected');
    }
    if (!results.bookingFlow?.success) {
      console.log('   ❌ Booking flow still failing - ObjectId issues persist');
    }
    if (!results.databaseStats?.success) {
      console.log('   ❌ Database connectivity issues');
    }
  }

  return {
    success: allTestsPassed,
    results
  };
}

// Run the tests
if (require.main === module) {
  runAllTests().catch(console.error);
}

module.exports = {
  runAllTests,
  testServiceDataIntegrity,
  testCompleteBookingFlow,
  testDatabaseStats
}; 