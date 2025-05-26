const fs = require('fs');
const path = require('path');

// Generate SVG favicon
const faviconSVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a365d"/>
      <stop offset="100%" style="stop-color:#d69e2e"/>
    </linearGradient>
  </defs>
  <circle cx="16" cy="16" r="15" fill="url(#grad)"/>
  <path d="M9 8h6c2.2 0 4 1.8 4 4 0 1.5-0.8 2.8-2 3.4L19 20h-3l-2-4h-3v4h-2V8z M11 10v4h4c1.1 0 2-0.9 2-2s-0.9-2-2-2h-4z" fill="#ffffff"/>
  <circle cx="21" cy="11" r="1.5" fill="#d69e2e"/>
</svg>
`;

// Write favicon
fs.writeFileSync(path.join(__dirname, '../public/favicon.svg'), faviconSVG);

console.log('✅ Brand assets generated successfully');
console.log('📄 Generated: favicon.svg');
console.log('💡 Next: Replace public/favicon.ico with professional ICO version');
console.log('💡 Next: Generate PNG versions for app icons');
console.log('💡 Recommendation: Use online tools to convert SVG to ICO and PNG formats');
console.log('💡 Sizes needed: 16x16, 32x32, 192x192, 512x512 PNG files'); 