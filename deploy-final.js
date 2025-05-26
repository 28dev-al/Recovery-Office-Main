/**
 * Final deployment script for the Recovery Office website
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

console.log('🌿 Recovery Office - Final Deployment Script');
console.log('============================================');

// Store original content for restoration
const originalContent = {};

async function main() {
  try {
    console.log('🔍 Finding files with path alias issues...');
    
    // Handle theme.ts directly first, since it has hidden import issues
    const themeFile = 'src/design-system/theme/theme.ts';
    let themeContent = fs.readFileSync(themeFile, 'utf8');
    originalContent[themeFile] = themeContent;
    
    // Replace any remaining @utils imports with proper relative paths
    themeContent = themeContent.replace(
      /import\s+.*?from\s+["']@utils\/sacredGeometry["']/g,
      'import { goldenRatioSegment, goldenRatioScale } from "../../utils/sacredGeometry"'
    );
    
    fs.writeFileSync(themeFile, themeContent, 'utf8');
    console.log(`  ✅ Fixed ${themeFile} manually`);
    
    // Find all files with @utils imports
    const files = await glob('src/**/*.{ts,tsx,js,jsx}', { ignore: ['**/node_modules/**', '**/build/**'] });
    
    // Keep track of files we've modified
    const modifiedFiles = [];
    
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      
      // Check if the file has any @utils imports
      if (content.includes('@utils/')) {
        console.log(`  Found import in: ${file}`);
        
        // Backup original content if we haven't already
        if (!originalContent[file]) {
          originalContent[file] = content;
        }
        
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
    
    // Handle special case for globalStyles.ts
    const globalStylesFile = 'src/design-system/theme/globalStyles.ts';
    if (fs.existsSync(globalStylesFile)) {
      let content = fs.readFileSync(globalStylesFile, 'utf8');
      if (!originalContent[globalStylesFile]) {
        originalContent[globalStylesFile] = content;
      }
      
      content = content.replace(
        /from\s+["']@utils\/sacredGeometry["']/g,
        'from "../../utils/sacredGeometry"'
      );
      
      fs.writeFileSync(globalStylesFile, content, 'utf8');
      console.log(`  ✅ Fixed ${globalStylesFile} manually`);
    }
    
    // 2. Run the quick build command
    console.log('\n🚀 Building the project...');
    
    // Create a temporary tsconfig.build.json for building
    const tsConfigFile = 'tsconfig.json';
    const tsConfigBuildFile = 'tsconfig.build.json';
    
    if (fs.existsSync(tsConfigFile)) {
      originalContent[tsConfigFile] = fs.readFileSync(tsConfigFile, 'utf8');
      
      // Simple implementation to remove comments from JSON
      function stripJsonComments(str) {
        // Strip // comments
        let result = str.replace(/\/\/.*$/gm, '');
        // Strip /* */ comments
        result = result.replace(/\/\*[\s\S]*?\*\//g, '');
        return result;
      }

      // Parse the cleaned JSON
      const tsConfig = JSON.parse(stripJsonComments(originalContent[tsConfigFile]));
      
      // Update compiler options to make build more permissive
      tsConfig.compilerOptions = {
        ...tsConfig.compilerOptions,
        noEmitOnError: false,
        skipLibCheck: true,
        jsx: "react-jsx"
      };
      
      // Write the temporary config file
      fs.writeFileSync(tsConfigBuildFile, JSON.stringify(tsConfig, null, 2), 'utf8');
      
      // Backup original tsconfig.json and replace with build version
      fs.copyFileSync(tsConfigBuildFile, tsConfigFile);
      console.log('  ✅ Updated TypeScript configuration for build');
    }
    
    // Execute the build
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
    
    // Clean up temporary build config
    const tsConfigBuildFile = 'tsconfig.build.json';
    if (fs.existsSync(tsConfigBuildFile)) {
      fs.unlinkSync(tsConfigBuildFile);
      console.log(`  ✅ Removed temporary build config`);
    }
  }

  console.log('\n✨ Deployment preparation complete!');
}

main(); 