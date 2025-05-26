#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🔍 Checking TypeScript compilation errors...\n');

try {
  // Run TypeScript compiler in no-emit mode to check for errors
  execSync('npx tsc --noEmit', {
    stdio: 'inherit',
    cwd: __dirname
  });
  
  console.log('\n✅ TypeScript compilation successful! No errors found.');
  process.exit(0);
} catch (error) {
  console.error('\n❌ TypeScript compilation failed with errors.');
  process.exit(1);
} 