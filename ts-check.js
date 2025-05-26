/**
 * TypeScript checking script
 * Runs the TypeScript compiler on specified files to check for errors
 */

const { execSync } = require('child_process');
const { resolve } = require('path');
const { existsSync } = require('fs');

// Check if tsconfig.json exists
const tsconfigPath = resolve(__dirname, 'tsconfig.json');
if (!existsSync(tsconfigPath)) {
  console.error('Error: tsconfig.json not found!');
  process.exit(1);
}

console.log('Running TypeScript check on booking components...');

try {
  // Use the project's tsconfig to check specific files/directories
  const command = 'npx tsc --noEmit --project tsconfig.json';
  
  // Execute the TypeScript compiler
  console.log(`\nExecuting: ${command}\n`);
  execSync(command, { stdio: 'inherit' });
  
  console.log('\n✅ TypeScript check completed successfully! No errors found.');
} catch (error) {
  console.error('\n❌ TypeScript check failed with errors.');
  process.exit(1);
} 