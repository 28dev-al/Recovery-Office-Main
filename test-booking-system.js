/**
 * Booking System Test Script
 * 
 * This script helps verify that the booking system fixes have resolved the issues.
 * Run this script to validate the booking flow locally.
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('📋 Booking System Test Script');
console.log('============================');

// 1. First run TypeScript check
console.log('\n🔍 Step 1: Running TypeScript check...');
exec('node ts-check.js', (error, stdout, stderr) => {
  console.log(stdout);
  
  if (error) {
    console.error('❌ TypeScript check failed! Please fix the remaining errors.');
    return;
  }
  
  console.log('✅ TypeScript check passed!');
  
  // 2. Check for critical files
  console.log('\n🔍 Step 2: Verifying file changes...');
  const filesToCheck = [
    'src/pages/Booking/BookingPage.tsx',
    'src/context/BookingContext.tsx',
    'src/components/common/ErrorBoundary.tsx',
    'src/design-system/components/feedback/ErrorDisplay.tsx',
    'src/services/api.client.ts',
    'src/services/index.ts',
    'src/services/booking.service.ts'
  ];
  
  let allFilesExist = true;
  
  filesToCheck.forEach(file => {
    if (fs.existsSync(path.join(process.cwd(), file))) {
      console.log(`  ✅ ${file} exists`);
    } else {
      console.log(`  ❌ ${file} not found!`);
      allFilesExist = false;
    }
  });
  
  if (!allFilesExist) {
    console.error('❌ Some critical files are missing! Please check the file paths.');
    return;
  }
  
  console.log('✅ All critical files exist!');
  
  // 3. Start the development server
  console.log('\n🔍 Step 3: Starting development server...');
  console.log('  👉 Once the server starts, please navigate to:');
  console.log('     http://localhost:3000/booking');
  console.log('\n  Please test the following scenarios:');
  console.log('  1. Complete a booking from start to finish');
  console.log('  2. Verify error messages are shown when skipping steps');
  console.log('  3. Check that the UI is consistent with the premium design');
  
  console.log('\n  Press Ctrl+C to stop the server when testing is complete.');
  
  // Start the server
  const server = exec('npm start', { stdio: 'inherit' });
  server.stdout.pipe(process.stdout);
  server.stderr.pipe(process.stderr);
  
  // Handle server process exit
  server.on('exit', (code) => {
    if (code === 0) {
      console.log('\n✅ Server stopped successfully. Testing complete!');
    } else {
      console.error(`\n❌ Server exited with code ${code}`);
    }
  });
}); 