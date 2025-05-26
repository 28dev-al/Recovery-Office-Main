const axios = require('axios');

async function testServiceIdMapping() {
  console.log('🔍 Testing Service ID Mapping Issue\n');
  
  try {
    // 1. Fetch services from API
    console.log('1️⃣ Fetching services from API...');
    const response = await axios.get('http://localhost:5000/api/services');
    const services = response.data.data;
    
    console.log(`✅ Found ${services.length} services\n`);
    
    // 2. Display service IDs
    console.log('2️⃣ Service IDs from API:');
    services.forEach((service, index) => {
      console.log(`Service ${index + 1}: ${service.name}`);
      console.log(`  - _id: ${service._id}`);
      console.log(`  - id: ${service.id}`);
      console.log(`  - Is valid MongoDB ObjectId: ${/^[0-9a-fA-F]{24}$/.test(service._id)}`);
      console.log('');
    });
    
    // 3. Test what happens when we select the first service
    const selectedService = services[0];
    console.log('3️⃣ Simulating service selection:');
    console.log(`Selected: ${selectedService.name}`);
    console.log(`Service ID that should be sent to booking: ${selectedService._id || selectedService.id}`);
    console.log('');
    
    // 4. Create a test booking payload
    const bookingPayload = {
      serviceId: selectedService._id || selectedService.id,
      clientId: 'test-client-id',
      date: '2025-01-15',
      time: '10:00',
      duration: selectedService.duration,
      price: selectedService.price
    };
    
    console.log('4️⃣ Booking payload that would be sent:');
    console.log(JSON.stringify(bookingPayload, null, 2));
    console.log('');
    
    // 5. Check if the service ID is valid
    console.log('5️⃣ Validation check:');
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(bookingPayload.serviceId);
    console.log(`Is serviceId a valid MongoDB ObjectId: ${isValidObjectId ? '✅ YES' : '❌ NO'}`);
    
    if (!isValidObjectId) {
      console.log('\n⚠️ WARNING: The service ID is not a valid MongoDB ObjectId!');
      console.log('This will cause the booking to fail with "Invalid serviceId format" error.');
    } else {
      console.log('\n✅ Service ID is valid and should work for booking creation.');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

// Run the test
testServiceIdMapping(); 