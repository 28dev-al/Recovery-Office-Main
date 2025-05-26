/**
 * Quick deployment script for the Recovery Office website
 * 
 * This script handles the deployment by:
 * 1. Temporarily fixing TypeScript path alias issues
 * 2. Building the project with TypeScript checks disabled
 * 3. Restoring the original files
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { glob } = require('glob');

console.log('🌿 Recovery Office - Quick Deployment Script');
console.log('============================================');

// Store original content for restoration
const originalContent = {};

async function main() {
  try {
    // 1. Find all files with @utils imports
    console.log('🔍 Finding files with path alias issues...');
    const files = await glob('src/**/*.{ts,tsx,js,jsx}', { ignore: ['**/node_modules/**', '**/build/**'] });
    
    // Keep track of files we've modified
    const modifiedFiles = [];
    
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      
      // Check if the file has any @utils imports
      if (content.includes('@utils/')) {
        console.log(`  Found import in: ${file}`);
        
        // Backup original content
        originalContent[file] = content;
        
        // Determine the relative path to utils directory
        const fileDir = path.dirname(file);
        const relativePath = path.relative(fileDir, 'src/utils').replace(/\\/g, '/');
        
        // Replace @utils with relative path
        let modifiedContent = content.replace(
          /from\s+["']@utils\/(.*?)["']/g, 
          (match, importPath) => `from "${relativePath}/${importPath}"`
        );
        
        // Write the modified content
        fs.writeFileSync(file, modifiedContent, 'utf8');
        modifiedFiles.push(file);
      }
    }
    
    console.log(`\n📝 Modified ${modifiedFiles.length} files to fix path aliases`);
    
    // 2. Run the quick build command
    console.log('\n🚀 Building the project...');
    execSync('npm run build:quick', { stdio: 'inherit' });
    
    console.log('\n🎉 Build completed successfully!');
    console.log('The website files are in the "build" directory.');
    console.log('\nTo deploy to Netlify, run:');
    console.log('  netlify deploy --prod --dir=build');
    
  } catch (error) {
    console.error('\n❌ Build failed with error:', error.message);
    process.exit(1);
  } finally {
    // 3. Restore original files
    console.log('\n🔄 Restoring original files...');
    
    Object.entries(originalContent).forEach(([filePath, content]) => {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  ✅ Restored: ${filePath}`);
    });
  }

  console.log('\n✨ Deployment preparation complete!');
}

main(); 