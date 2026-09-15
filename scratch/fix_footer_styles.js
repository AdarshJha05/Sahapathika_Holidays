const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (!fullPath.includes('node_modules') && !fullPath.includes('.git') && !fullPath.includes('nextjs-app')) {
        results = results.concat(getHtmlFiles(fullPath));
      }
    } else {
      if (fullPath.endsWith('.html') && !fullPath.includes('scratch')) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

const htmlFiles = getHtmlFiles(root);
let modifiedCount = 0;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // 1. Update brand-blurb max-width
  if (content.includes('max-width: 24ch;')) {
    content = content.replace(/max-width:\s*24ch;/g, 'max-width: 42ch;');
    changed = true;
  }
  
  // 2. Update grid-template-columns to give first column more width
  const gridRegex = /grid-template-columns:\s*minmax\(min\(100%,\s*240px\),\s*1\.45fr\)/g;
  if (gridRegex.test(content)) {
    content = content.replace(gridRegex, 'grid-template-columns: minmax(min(100%,340px), 1.85fr)');
    changed = true;
  }

  // 3. Add overlay to footer-media to ensure text visibility
  // We'll append a pseudo-element rule to the end of the <style> block where footer-media is defined,
  // or simply insert it after `.footer-media { ... }`
  const overlayCSS = `
    .footer-media::before {
      content: "";
      position: absolute;
      inset: 0;
      background: rgba(250, 246, 239, 0.75);
      z-index: 1;
    }
  `;
  
  // Find where .footer-media { ... } is and insert after
  const mediaRegex = /\.footer-media\s*\{\s*position:\s*absolute;\s*inset:\s*0;\s*z-index:\s*-2;\s*pointer-events:\s*none;\s*\}/g;
  if (mediaRegex.test(content)) {
    content = content.replace(mediaRegex, `$& ${overlayCSS}`);
    changed = true;
  }

  // 4. Also fix the max-width in media queries for brand-blurb if there's any
  const mbRegex = /max-width:\s*34ch;/g;
  if (mbRegex.test(content)) {
    content = content.replace(mbRegex, 'max-width: 100%;');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
