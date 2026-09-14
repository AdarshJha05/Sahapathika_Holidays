const fs = require('fs');
const path = require('path');

const cwd = 'c:/Users/jhash/Downloads/Sahapathika_Holidays';

// Read original logo
const originalLogo = fs.readFileSync(path.join(cwd, 'Site-logo1.svg'), 'utf-8');

// Add a white background rectangle with slightly rounded corners
const faviconSvg = originalLogo.replace(
  /(<svg[^>]+>)/,
  '$1\n  <rect width="100%" height="100%" fill="#ffffff" rx="8" />'
);

// Save new favicon
fs.writeFileSync(path.join(cwd, 'favicon-white.svg'), faviconSvg);
console.log('Created favicon-white.svg with white background');

// Update all HTML files to use the new favicon
const files = fs.readdirSync(cwd).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(cwd, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Replace old favicon link with new one
  content = content.replace(
    /<link rel="icon" type="image\/svg\+xml" href="Site-logo1\.svg">/g,
    '<link rel="icon" type="image/svg+xml" href="favicon-white.svg">'
  );

  fs.writeFileSync(filePath, content);
  console.log(`Updated favicon link in ${file}`);
});
