// Test script to verify BookingContext service loading
console.log('🔍 Testing BookingContext Service Loading\n');

// This script will be run in the browser console to check if services are being loaded
const testScript = `
// Check if BookingContext is available
const checkBookingContext = () => {
  console.log('=== BOOKING CONTEXT SERVICE TEST ===');
  
  // Try to access React DevTools
  const reactDevTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!reactDevTools) {
    console.error('React DevTools not found. Please install React Developer Tools extension.');
    return;
  }
  
  // Get React fiber tree
  const fiberRoot = document.getElementById('root')._reactRootContainer;
  if (!fiberRoot) {
    console.error('React root not found');
    return;
  }
  
  console.log('✅ React root found');
  
  // Instructions for manual testing
  console.log('\\n📋 MANUAL TEST INSTRUCTIONS:');
  console.log('1. Open React Developer Tools');
  console.log('2. Search for "BookingProvider" component');
  console.log('3. Check the "hooks" section for state');
  console.log('4. Look for "availableServices" in the state');
  console.log('5. Verify services have valid MongoDB ObjectIds');
  
  console.log('\\n🔍 EXPECTED RESULT:');
  console.log('availableServices should contain services with IDs like:');
  console.log('- 6830bb99da51afb0a6180bee (Cryptocurrency Recovery)');
  console.log('- 6830bb99da51afb0a6180bef (Financial Scam Recovery)');
  
  console.log('\\n❌ IF YOU SEE:');
  console.log('- emergency-crypto');
  console.log('- fallback-crypto');
  console.log('Then services are NOT loading properly from API');
};

checkBookingContext();
`;

console.log('Copy and paste this into the browser console while the app is running:\n');
console.log(testScript); 