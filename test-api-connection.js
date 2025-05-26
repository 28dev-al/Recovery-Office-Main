/**
 * Test script to verify API connectivity
 * Run with: node test-api-connection.js
 */

const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

async function testConnection() {
  console.log('Testing API connection...');
  console.log('Base URL:', API_BASE_URL);
  console.log('-------------------');

  // Test 1: Health check
  try {
    console.log('\n1. Testing health endpoint...');
    const healthResponse = await axios.get(`${API_BASE_URL}/health`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    
    console.log('   Status:', healthResponse.status);
    console.log('   Response:', JSON.stringify(healthResponse.data, null, 2));
  } catch (error) {
    console.error('   ERROR:', error.message);
    if (error.response) {
      console.error('   Response Status:', error.response.status);
      console.error('   Response Data:', error.response.data);
    }
  }

  // Test 2: Services endpoint
  try {
    console.log('\n2. Testing services endpoint...');
    const servicesResponse = await axios.get(`${API_BASE_URL}/services`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:3000'
      }
    });
    
    console.log('   Status:', servicesResponse.status);
    console.log('   Response:', JSON.stringify(servicesResponse.data, null, 2));
  } catch (error) {
    console.error('   ERROR:', error.message);
    if (error.response) {
      console.error('   Response Status:', error.response.status);
      console.error('   Response Data:', error.response.data);
    }
  }

  // Test 3: CORS headers check
  try {
    console.log('\n3. Testing CORS headers...');
    const corsResponse = await axios.options(`${API_BASE_URL}/services`, {
      headers: {
        'Origin': 'http://localhost:3000',
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers': 'Content-Type'
      }
    });
    
    console.log('   Status:', corsResponse.status);
    console.log('   CORS Headers:');
    console.log('   - Access-Control-Allow-Origin:', corsResponse.headers['access-control-allow-origin']);
    console.log('   - Access-Control-Allow-Methods:', corsResponse.headers['access-control-allow-methods']);
    console.log('   - Access-Control-Allow-Headers:', corsResponse.headers['access-control-allow-headers']);
  } catch (error) {
    console.error('   ERROR:', error.message);
    if (error.response) {
      console.error('   Response Status:', error.response.status);
      console.error('   Response Headers:', error.response.headers);
    }
  }

  // Test 4: Direct curl equivalent
  console.log('\n4. Curl equivalent test commands:');
  console.log('   curl http://localhost:5000/api/health');
  console.log('   curl http://localhost:5000/api/services');
  console.log('   curl -X OPTIONS http://localhost:5000/api/services -H "Origin: http://localhost:3000"');

  console.log('\n-------------------');
  console.log('Test complete.');
}

testConnection(); 