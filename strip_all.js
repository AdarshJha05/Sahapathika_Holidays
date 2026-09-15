const fs = require('fs');
const path = require('path');

function stripSSG(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  let ssgIndex = html.indexOf('<div id="ssg-content">');
  
  if (ssgIndex !== -1) {
    const styleStart = html.indexOf('<style id="ssg-style">');
    const styleEnd = html.indexOf('</style>', styleStart) + 8;
    if (styleStart !== -1 && styleEnd > 8) {
      html = html.substring(0, styleStart) + html.substring(styleEnd);
      ssgIndex = html.indexOf('<div id="ssg-content">');
    }
    
    html = html.replace(/<x-dc style="display:none !important">/g, '<x-dc>');
    
    const scriptIndex = html.indexOf('<script src="https://unpkg.com/react');
    if (ssgIndex !== -1 && scriptIndex !== -1) {
      html = html.substring(0, ssgIndex) + html.substring(scriptIndex);
    }
    
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Stripped SSG from ${filePath}`);
  }
}

const files = fs.readdirSync(__dirname);
files.forEach(f => {
  if (f.endsWith('.html') && f !== 'test_out.html' && f !== 'test_varanasi.html') {
    stripSSG(path.join(__dirname, f));
  }
});
