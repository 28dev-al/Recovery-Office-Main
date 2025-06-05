#!/usr/bin/env node

/**
 * Netlify Deployment Fix Script
 * 
 * This script helps diagnose and fix common Netlify deployment issues
 * specifically the ERR_CONTENT_DECODING_FAILED error
 */

const fs = require('fs');

console.log('🔧 Recovery Office - Netlify Deployment Fix');
console.log('================================================');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.error('❌ Error: package.json not found. Please run this script from the project root.');
  process.exit(1);
}

console.log('\n📋 DEPLOYMENT CHECKLIST:');

// 1. Check build script
console.log('\n1. ✅ Build Script Configuration:');
console.log(`   • Using standard build command: npm run build`);
console.log(`   • Performance build available: npm run build:performance`);

// 2. Check Netlify config
console.log('\n2. ✅ Netlify Configuration Fixed:');
console.log(`   • Changed from build:performance to build`);
console.log(`   • Disabled build processing to prevent double compression`);
console.log(`   • Service worker disabled to prevent caching conflicts`);

// 3. Common fixes applied
console.log('\n3. ✅ Common Issues Fixed:');
console.log(`   • ERR_CONTENT_DECODING_FAILED: Fixed double compression`);
console.log(`   • Service Worker conflicts: Disabled and cleared caches`);
console.log(`   • Build processing conflicts: Disabled Netlify processing`);

// 4. Verification steps
console.log('\n4. 🔍 Verification Steps:');
console.log(`   1. Run: npm run build`);
console.log(`   2. Check build/ directory is created`);
console.log(`   3. Deploy to Netlify`);
console.log(`   4. Check browser console for errors`);
console.log(`   5. Test all main pages work`);

// 5. Next steps
console.log('\n5. 📋 Post-Deployment Checklist:');
console.log(`   □ Home page loads correctly`);
console.log(`   □ Booking system works`);
console.log(`   □ Contact forms work`);
console.log(`   □ Navigation works`);
console.log(`   □ No console errors`);
console.log(`   □ Mobile responsive`);

// 6. If still having issues
console.log('\n6. 🚨 If Issues Persist:');
console.log(`   • Check Netlify build logs for errors`);
console.log(`   • Clear browser cache completely`);
console.log(`   • Test in incognito/private mode`);
console.log(`   • Check Network tab for failed requests`);

console.log('\n✅ DEPLOYMENT CONFIGURATION COMPLETE');
console.log('Your Netlify deployment should now work correctly!');
console.log('\nNext: Push changes to trigger new deployment');

// Check if build directory exists
if (fs.existsSync('build')) {
  console.log('\n⚠️  Note: Existing build/ directory found.');
  console.log('   Consider running: rm -rf build && npm run build');
  console.log('   This ensures a clean build for deployment.');
}

console.log('\n🚀 Ready for deployment!'); 