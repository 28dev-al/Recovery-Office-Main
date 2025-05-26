async function testAPI() {
  console.log('🧪 Testing Recovery Office API endpoints...\n');
  
  try {
    // Test health endpoint first
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch('http://localhost:5000/api/health');
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData.status);
    
    // Test client creation
    console.log('\n2. Testing client creation...');
    const clientPayload = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '+44 1234 567890',
      gdprConsent: true,
      marketingConsent: false
    };
    
    const clientResponse = await fetch('http://localhost:5000/api/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(clientPayload)
    });
    
    console.log('Client response status:', clientResponse.status);
    const clientData = await clientResponse.json();
    console.log('Client response:', JSON.stringify(clientData, null, 2));
    
    if (clientData.status === 'success' && clientData.data) {
      const clientId = clientData.data._id || clientData.data.id;
      console.log('✅ Client created with ID:', clientId);
      
      // Test booking creation
      console.log('\n3. Testing booking creation...');
      const bookingPayload = {
        clientId: clientId,
        serviceId: 'service-crypto-recovery',
        date: '2025-06-10',
        timeSlot: '10:00-11:00',
        notes: 'Test booking from API test',
        status: 'confirmed'
      };
      
      const bookingResponse = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(bookingPayload)
      });
      
      console.log('Booking response status:', bookingResponse.status);
      const bookingData = await bookingResponse.json();
      console.log('Booking response:', JSON.stringify(bookingData, null, 2));
      
      if (bookingData.status === 'success') {
        console.log('✅ Booking created successfully');
      } else {
        console.log('❌ Booking creation failed');
      }
    } else {
      console.log('❌ Client creation failed');
    }
    
  } catch (error) {
    console.error('❌ API Test failed:', error.message);
    console.error('Full error:', error);
  }
}

testAPI(); 