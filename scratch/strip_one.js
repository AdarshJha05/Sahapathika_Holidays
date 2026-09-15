const fs = require('fs');
let html = fs.readFileSync('packages.html', 'utf8');
const styleStart = html.indexOf('<style id="ssg-style">');
if (styleStart !== -1) {
  const styleEnd = html.indexOf('</style>', styleStart) + 8;
  html = html.substring(0, styleStart) + html.substring(styleEnd);
  fs.writeFileSync('packages.html', html, 'utf8');
  console.log('Removed ssg-style');
}
