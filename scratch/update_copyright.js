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

  const oldCopyrightRegex = /<div style="font-size:\s*13\.5px;\s*color:\s*var\(--ink-soft\);\s*opacity:\s*0\.9;">&copy;\s*2026\s*Sahapathika\s*Holidays\s*&middot;\s*Govt\.\s*Approved<\/div>/g;
  const newCopyright = `<div style="font-size: 13.5px; color: var(--ink-soft); opacity: 0.9;">Copyright &copy; 2026 Sahapathika. All Rights Reserved. | Govt. Approved | Designed by <a href="https://rytfulmedia.in" target="_blank" rel="noopener" style="color:#E5483D; font-weight:700; text-decoration:none;">RytfulMedia</a>.</div>`;

  if (oldCopyrightRegex.test(content)) {
    content = content.replace(oldCopyrightRegex, newCopyright);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
