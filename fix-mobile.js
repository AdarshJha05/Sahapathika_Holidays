const fs = require('fs');
const path = require('path');

const cwd = 'c:/Users/jhash/Downloads/Sahapathika_Holidays';
const files = fs.readdirSync(cwd).filter(f => f.endsWith('.html'));

const cssToAdd = `
    .pkg-aside, .detail-aside {
      position: relative !important;
      top: auto !important;
      max-width: none !important;
      width: 100% !important;
      z-index: 10;
    }
`;

files.forEach(file => {
  const filePath = path.join(cwd, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  let modified = false;

  if (content.includes('<aside style="{{ pkgAsideStyle }}">')) {
      content = content.replace(/<aside style="\{\{ pkgAsideStyle \}\}">/g, '<aside class="pkg-aside" style="{{ pkgAsideStyle }}">');
      modified = true;
  }
  
  if (content.includes('<aside style="{{ detailAsideStyle }}">')) {
      content = content.replace(/<aside style="\{\{ detailAsideStyle \}\}">/g, '<aside class="detail-aside" style="{{ detailAsideStyle }}">');
      modified = true;
  }

  // Insert CSS rules into max-width: 900px block
  if (!content.includes('.pkg-aside') && modified) {
    const mediaQueryRegex = /(@media\s*\(\s*max-width:\s*900px\s*\)\s*\{)/;
    if (mediaQueryRegex.test(content)) {
      content = content.replace(mediaQueryRegex, `$1${cssToAdd}`);
    } else {
      console.log(`Could not find 900px media query in ${file}`);
    }
  }

  if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`Patched layout in ${file}`);
  }
});
