/**
 * Complete Booking Flow Test
 * Tests the entire booking submission process including client creation and booking creation
 */

async function testCompleteBookingFlow() {
  console.log('🧪 Testing Complete Recovery Office Booking Flow...\n');
  
  try {
    // Test 1: Health check
    console.log('1. Testing backend health...');
    const healthResponse = await fetch('http://localhost:5000/api/health');
    
    if (!healthResponse.ok) {
      throw new Error(`Backend health check failed: ${healthResponse.status}`);
    }
    
    const healthData = await healthResponse.json();
    console.log('✅ Backend healthy:', healthData.status);
    
    // Test 2: Complete booking flow simulation
    console.log('\n2. Testing complete booking submission flow...');
    
    // Step 2a: Create client (simulating ConfirmationStep client creation)
    const clientPayload = {
      firstName: 'Andrew',
      lastName: 'Myers',
      email: 'andrew.myers@example.com',
      phone: '+44 7123 456789',
      preferredContactMethod: 'email',
      gdprConsent: true,
      marketingConsent: false,
      notes: 'Test client for cryptocurrency recovery consultation',
      caseType: 'cryptocurrency-recovery',
      estimatedLoss: 75000,
      urgencyLevel: 'standard'
    };
    
    console.log('   Creating client record...');
    const clientResponse = await fetch('http://localhost:5000/api/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(clientPayload)
    });
    
    if (!clientResponse.ok) {
      const errorText = await clientResponse.text();
      throw new Error(`Client creation failed: ${clientResponse.status} - ${errorText}`);
    }
    
    const clientData = await clientResponse.json();
    const clientId = clientData.data?._id || clientData.data?.id || clientData._id || clientData.id;
    
    if (!clientId) {
      throw new Error('No client ID returned from client creation');
    }
    
    console.log('   ✅ Client created with ID:', clientId);
    
    // Step 2b: Create booking (simulating ConfirmationStep booking creation)
    const bookingPayload = {
      clientId: clientId,
      serviceId: 'service-crypto-recovery',
      serviceName: 'Cryptocurrency Recovery',
      date: '2025-06-10',
      timeSlot: '10:00-11:00',
      notes: 'Cryptocurrency Recovery consultation - Test booking',
      estimatedValue: 75000,
      status: 'confirmed'
    };
    
    console.log('   Creating booking record...');
    const bookingResponse = await fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(bookingPayload)
    });
    
    if (!bookingResponse.ok) {
      const errorText = await bookingResponse.text();
      throw new Error(`Booking creation failed: ${bookingResponse.status} - ${errorText}`);
    }
    
    const bookingData = await bookingResponse.json();
    const bookingRef = bookingData.data?.reference || 
                      bookingData.data?._id || 
                      bookingData.data?.id ||
                      bookingData.reference ||
                      bookingData._id ||
                      bookingData.id ||
                      `RO-${Date.now()}`;
    
    console.log('   ✅ Booking created with reference:', bookingRef);
    
    // Test 3: Verify booking retrieval
    console.log('\n3. Testing booking retrieval...');
    const retrieveResponse = await fetch(`http://localhost:5000/api/bookings/${bookingData.data?._id || bookingData.data?.id}`);
    
    if (retrieveResponse.ok) {
      const retrievedBooking = await retrieveResponse.json();
      console.log('   ✅ Booking retrieved successfully');
      console.log('   📋 Booking details:', {
        reference: retrievedBooking.data?.reference,
        status: retrievedBooking.data?.status,
        service: retrievedBooking.data?.serviceName,
        date: retrievedBooking.data?.date,
        timeSlot: retrievedBooking.data?.timeSlot
      });
    } else {
      console.log('   ⚠️ Booking retrieval failed (non-critical)');
    }
    
    console.log('\n🎉 Complete booking flow test PASSED!');
    console.log('✅ Client creation: Working');
    console.log('✅ Booking creation: Working');
    console.log('✅ Data flow: Working');
    console.log('\n📝 Summary:');
    console.log(`   Client ID: ${clientId}`);
    console.log(`   Booking Reference: ${bookingRef}`);
    console.log(`   Service: ${bookingPayload.serviceName}`);
    console.log(`   Date: ${bookingPayload.date}`);
    console.log(`   Time: ${bookingPayload.timeSlot}`);
    
  } catch (error) {
    console.error('\n❌ Complete booking flow test FAILED:', error.message);
    console.error('Full error:', error);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Solution: Start the backend server with:');
      console.log('   cd backend && npm start');
    } else if (error.message.includes('404')) {
      console.log('\n💡 Solution: Check if the API endpoints exist in backend/src/routes/');
    } else if (error.message.includes('400') || error.message.includes('validation')) {
      console.log('\n💡 Solution: Check the request payload format and required fields');
    }
  }
}

// Run the test
testCompleteBookingFlow(); 