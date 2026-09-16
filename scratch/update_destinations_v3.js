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

  // 1. Remove the INTERNATIONAL section
  const intlRegex = /,\s*\{\s*title:\s*'INTERNATIONAL — ON ENQUIRY'[\s\S]*?\}\s*\]/m;
  if (intlRegex.test(content)) {
    content = content.replace(intlRegex, '\n      ]');
    changed = true;
  }

  // 2. Fix url() parentheses bug
  // Currently: 'background-image:url(' + d.photo + ');background-size...
  // We want: 'background-image:url(\\'' + d.photo + '\\');background-size...
  const oldUrl = "'background-image:url(' + d.photo + ');";
  const newUrl = "'background-image:url(\\'' + d.photo + '\\');";
  if (content.includes(oldUrl)) {
    content = content.replace(oldUrl, newUrl);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
