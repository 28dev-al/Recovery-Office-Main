const fetch = require('node-fetch');

const API_BASE_URL = 'https://recovery-office-backend-production.up.railway.app/api';

// Test Google Ads Leads API endpoints
async function testGoogleAdsLeadsAPI() {
  console.log('🔍 Testing Google Ads Leads Dashboard API Endpoints...\n');
  
  try {
    // Test 1: Fetch all leads
    console.log('1️⃣ Testing GET /api/google-ads/leads');
    const leadsUrl = `${API_BASE_URL}/google-ads/leads`;
    console.log('   URL:', leadsUrl);
    
    const leadsResponse = await fetch(leadsUrl);
    console.log('   Status:', leadsResponse.status);
    console.log('   Status Text:', leadsResponse.statusText);
    console.log('   Headers:', Object.fromEntries(leadsResponse.headers.entries()));
    
    if (leadsResponse.ok) {
      const leadsData = await leadsResponse.json();
      console.log('   ✅ Success! Response structure:');
      console.log('   - success:', leadsData.success);
      console.log('   - data type:', typeof leadsData.data);
      console.log('   - data is array:', Array.isArray(leadsData.data));
      console.log('   - leads count:', leadsData.data ? leadsData.data.length : 'N/A');
      
      if (leadsData.data && leadsData.data.length > 0) {
        console.log('   - First lead sample:');
        const firstLead = leadsData.data[0];
        console.log('     * Reference:', firstLead.referenceNumber);
        console.log('     * Name:', firstLead.name);
        console.log('     * Email:', firstLead.email);
        console.log('     * Status:', firstLead.leadStatus);
        console.log('     * Priority:', firstLead.priority);
        console.log('     * Created:', firstLead.createdAt);
      }
    } else {
      const errorText = await leadsResponse.text();
      console.log('   ❌ Error Response:', errorText);
    }
    
    console.log('\n' + '='.repeat(60) + '\n');
    
    // Test 2: Fetch statistics
    console.log('2️⃣ Testing GET /api/google-ads/leads/stats');
    const statsUrl = `${API_BASE_URL}/google-ads/leads/stats`;
    console.log('   URL:', statsUrl);
    
    const statsResponse = await fetch(statsUrl);
    console.log('   Status:', statsResponse.status);
    console.log('   Status Text:', statsResponse.statusText);
    
    if (statsResponse.ok) {
      const statsData = await statsResponse.json();
      console.log('   ✅ Success! Stats structure:');
      console.log('   - success:', statsData.success);
      console.log('   - data type:', typeof statsData.data);
      
      if (statsData.data && statsData.data.overview) {
        console.log('   - Statistics overview:');
        const stats = statsData.data.overview;
        console.log('     * Total Leads:', stats.totalLeads);
        console.log('     * New Leads:', stats.newLeads);
        console.log('     * Contacted:', stats.contactedLeads);
        console.log('     * Converted:', stats.convertedLeads);
        console.log('     * Conversion Rate:', stats.conversionRate + '%');
        console.log('     * Emergency Leads:', stats.emergencyLeads);
        console.log('     * Avg Score:', stats.avgQualificationScore);
      }
    } else {
      const errorText = await statsResponse.text();
      console.log('   ❌ Error Response:', errorText);
    }
    
    console.log('\n' + '='.repeat(60) + '\n');
    
    // Test 3: Database connectivity verification
    console.log('3️⃣ Testing MongoDB Database Connection');
    
    if (leadsResponse.ok) {
      const leadsData = await leadsResponse.json();
      
      if (leadsData.success && leadsData.data && leadsData.data.length > 0) {
        console.log('   ✅ Database connection working!');
        console.log('   - Successfully retrieved', leadsData.data.length, 'leads from MongoDB');
        console.log('   - Sample reference numbers:');
        
        leadsData.data.slice(0, 5).forEach((lead, index) => {
          console.log(`     ${index + 1}. ${lead.referenceNumber} - ${lead.name} (${lead.leadStatus})`);
        });
      } else {
        console.log('   ⚠️ Database connection issue: No leads returned');
      }
    } else {
      console.log('   ❌ Cannot verify database - API endpoint failed');
    }
    
    console.log('\n' + '='.repeat(60) + '\n');
    
    // Summary
    console.log('📊 SUMMARY REPORT:');
    
    if (leadsResponse.ok && statsResponse.ok) {
      console.log('✅ All API endpoints are working correctly!');
      console.log('✅ Google Ads leads dashboard should display data properly');
      console.log('✅ Frontend will successfully fetch leads and statistics');
      
      const leadsData = await fetch(leadsUrl).then(r => r.json());
      if (leadsData.data && leadsData.data.length > 0) {
        console.log(`✅ Database contains ${leadsData.data.length} leads ready to display`);
      }
    } else {
      console.log('❌ API endpoint issues detected:');
      if (!leadsResponse.ok) {
        console.log('  - Leads endpoint failed:', leadsResponse.status);
      }
      if (!statsResponse.ok) {
        console.log('  - Stats endpoint failed:', statsResponse.status);
      }
    }
    
  } catch (error) {
    console.error('🚨 Test failed with error:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

// Test CORS headers
async function testCORS() {
  console.log('\n🌐 Testing CORS Headers...');
  
  try {
    const response = await fetch(`${API_BASE_URL}/google-ads/leads`, {
      method: 'OPTIONS'
    });
    
    console.log('CORS Headers:');
    const corsHeaders = ['access-control-allow-origin', 'access-control-allow-methods', 'access-control-allow-headers'];
    corsHeaders.forEach(header => {
      console.log(`  ${header}:`, response.headers.get(header) || 'Not set');
    });
    
  } catch (error) {
    console.error('CORS test failed:', error.message);
  }
}

// Run all tests
async function runAllTests() {
  console.log('🚀 Google Ads Dashboard API Test Suite');
  console.log('=====================================\n');
  
  await testGoogleAdsLeadsAPI();
  await testCORS();
  
  console.log('\n🏁 Test suite completed!');
}

runAllTests(); 