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

  // 1. Remove Destinations block from footer
  const destRegex = /<nav class="col" aria-label="Destinations">[\s\S]*?<\/nav>/g;
  if (destRegex.test(content)) {
    content = content.replace(destRegex, '');
    changed = true;
  }

  // 2. Remove filter from footer logo to make it colorful
  const logoRegex = /<img src="Site-logo1\.svg" alt="Sahapathika Holidays" style="height:62px; width:auto; filter: brightness\(0\) invert\(1\);?">/g;
  if (logoRegex.test(content)) {
    content = content.replace(logoRegex, '<img src="Site-logo1.svg" alt="Sahapathika Holidays" style="height:62px; width:auto;">');
    changed = true;
  }

  // 3. Just in case there are duplicates with different spacing
  const altLogoRegex = /filter:\s*brightness\(0\)\s*invert\(1\);?/g;
  // wait, we only want to remove the filter inside the footer. 
  // Let's just do a specific replace on the footer logo line.
  
  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
