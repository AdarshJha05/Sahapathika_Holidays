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

  // 1. Fix grid-template-columns for 4 columns instead of 5
  // Original: grid-template-columns: minmax(min(100%,240px), 1.45fr) repeat(3, minmax(min(100%,130px), .85fr)) minmax(min(100%,260px), 1.25fr);
  const gridRegex = /grid-template-columns:\s*minmax\(min\(100%,\s*240px\),\s*1\.45fr\)\s*repeat\(3,\s*minmax\(min\(100%,\s*130px\),\s*\.85fr\)\)\s*minmax\(min\(100%,\s*260px\),\s*1\.25fr\);/g;
  const newGrid = `grid-template-columns: minmax(min(100%,240px), 1.45fr) repeat(2, minmax(min(100%,130px), .85fr)) minmax(min(100%,260px), 1.25fr);`;

  if (gridRegex.test(content)) {
    content = content.replace(gridRegex, newGrid);
    changed = true;
  }

  // 2. Remove the legal nav at the bottom
  const legalRegex = /<nav class="legal" aria-label="Legal">[\s\S]*?<\/nav>/g;
  if (legalRegex.test(content)) {
    content = content.replace(legalRegex, '');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
