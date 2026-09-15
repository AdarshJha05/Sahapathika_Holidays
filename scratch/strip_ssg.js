const fs = require('fs');

function stripSSG(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  console.log('Read ' + filePath + ', length: ' + html.length);
  
  let ssgIndex = html.indexOf('<div id="ssg-content">');
  console.log('ssgIndex:', ssgIndex);
  
  if (ssgIndex !== -1) {
    // 1. Remove SSG style block
    const styleStart = html.indexOf('<style id="ssg-style">');
    const styleEnd = html.indexOf('</style>', styleStart) + 8;
    if (styleStart !== -1 && styleEnd > 8) {
      html = html.substring(0, styleStart) + html.substring(styleEnd);
      ssgIndex = html.indexOf('<div id="ssg-content">');
    }
    
    // 2. Restore x-dc tag
    html = html.replace(/<x-dc style="display:none !important">/g, '<x-dc>');
    
    // 3. Remove SSG block
    if (ssgIndex !== -1) {
      html = html.substring(0, ssgIndex);
      html += '  </body>\n</html>\n';
    }
    
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Stripped SSG from ${filePath}`);
  }
}

stripSSG('packages.html');
stripSSG('index.html');
