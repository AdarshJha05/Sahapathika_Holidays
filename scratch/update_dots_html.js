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

  const target = '<span style="position:absolute;top:14px;right:14px;background:rgba(250,246,239,.95);color:#16211D;font-size:11.5px;font-weight:800;padding:6px 10px;border-radius:99px;animation:popin .45s .3s both">★ 4.9</span>';
  
  if (content.includes(target)) {
    const match = content.match(new RegExp(target.replace(/[.*+?^\${}()|[\]\\]/g, '\\$&') + '\\s*<\\/div>'));
    
    // Check if the match doesn't already contain galleryDots HTML
    if (match && !match[0].includes('galleryDots')) {
      content = content.replace(match[0], target + '\n                  <div style="position:absolute;bottom:14px;left:0;right:0;display:flex;justify-content:center;gap:6px;z-index:2"><sc-for list="{{ p.galleryDots }}" as="d"><div style="{{ d.style }}" onClick="{{ d.click }}"></div></sc-for></div>\n                </div>');
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
