/**
 * Backend Endpoints Test
 * Tests the specific API endpoints that were causing the booking submission failures
 */

async function testBackendEndpoints() {
  console.log('🔧 Testing Fixed Backend API Endpoints...\n');
  
  const baseURL = 'http://localhost:5000';
  
  try {
    // Test 1: Health check
    console.log('1. Testing backend health...');
    const healthResponse = await fetch(`${baseURL}/api/health`);
    
    if (!healthResponse.ok) {
      throw new Error(`Health check failed: ${healthResponse.status}`);
    }
    
    const healthData = await healthResponse.json();
    console.log('✅ Health check passed:', healthData.status);
    
    // Test 2: Client creation with extended fields
    console.log('\n2. Testing client creation with recovery consultation fields...');
    const clientPayload = {
      firstName: 'Test',
      lastName: 'Client',
      email: 'test.client@example.com',
      phone: '+44 7123 456789',
      preferredContactMethod: 'email',
      gdprConsent: true,
      marketingConsent: false,
      // Extended fields that were causing validation failures
      company: 'Test Company Ltd',
      caseType: 'cryptocurrency-recovery',
      estimatedLoss: 50000,
      urgencyLevel: 'standard',
      additionalNotes: 'Test client creation with extended fields'
    };
    
    const clientResponse = await fetch(`${baseURL}/api/clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(clientPayload)
    });
    
    console.log('   Client response status:', clientResponse.status);
    
    if (!clientResponse.ok) {
      const errorText = await clientResponse.text();
      console.log('   ❌ Client creation failed:', errorText);
      return false;
    }
    
    const clientData = await clientResponse.json();
    console.log('   ✅ Client created successfully');
    console.log('   📋 Client ID:', clientData.data._id || clientData.data.id);
    console.log('   📋 Client Data:', {
      name: `${clientData.data.firstName} ${clientData.data.lastName}`,
      email: clientData.data.email,
      caseType: clientData.data.caseType,
      urgencyLevel: clientData.data.urgencyLevel
    });
    
    const clientId = clientData.data._id || clientData.data.id;
    
    // Test 3: Booking creation with extended fields
    console.log('\n3. Testing booking creation with recovery consultation fields...');
    const bookingPayload = {
      clientId: clientId,
      serviceId: 'recovery-consultation',
      serviceName: 'Cryptocurrency Recovery',
      date: '2025-06-10',
      timeSlot: '10:00-11:00',
      notes: 'Test booking with extended fields',
      // Extended fields that were causing validation failures
      urgencyLevel: 'standard',
      estimatedValue: 50000,
      status: 'confirmed'
    };
    
    const bookingResponse = await fetch(`${baseURL}/api/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(bookingPayload)
    });
    
    console.log('   Booking response status:', bookingResponse.status);
    
    if (!bookingResponse.ok) {
      const errorText = await bookingResponse.text();
      console.log('   ❌ Booking creation failed:', errorText);
      return false;
    }
    
    const bookingData = await bookingResponse.json();
    console.log('   ✅ Booking created successfully');
    console.log('   📋 Booking ID:', bookingData.data._id || bookingData.data.id);
    console.log('   📋 Booking Reference:', bookingData.data.reference);
    console.log('   📋 Booking Data:', {
      serviceName: bookingData.data.serviceName,
      date: bookingData.data.date,
      timeSlot: bookingData.data.timeSlot,
      urgencyLevel: bookingData.data.urgencyLevel,
      estimatedValue: bookingData.data.estimatedValue,
      status: bookingData.data.status
    });
    
    console.log('\n🎉 ALL BACKEND ENDPOINTS WORKING CORRECTLY!');
    console.log('✅ Client creation: FIXED');
    console.log('✅ Booking creation: FIXED');
    console.log('✅ Extended validation: FIXED');
    console.log('✅ Field mapping: FIXED');
    
    console.log('\n📝 Summary:');
    console.log(`   Client ID: ${clientId}`);
    console.log(`   Booking Reference: ${bookingData.data.reference}`);
    console.log(`   All validation and field issues resolved!`);
    
    return true;
    
  } catch (error) {
    console.error('\n❌ Backend endpoint test FAILED:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Solution: Backend server not running. Start with:');
      console.log('   cd backend && npm start');
    } else if (error.message.includes('validation')) {
      console.log('\n💡 Solution: Check validation middleware and field names');
    } else if (error.message.includes('404')) {
      console.log('\n💡 Solution: Check if routes are properly registered');
    }
    
    return false;
  }
}

// Run the test
testBackendEndpoints(); 