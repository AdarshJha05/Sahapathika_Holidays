const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

// Get old footer
const oldIndex = fs.readFileSync(path.join(root, 'scratch', 'old_index.html'), 'utf8');
const oldStart = oldIndex.indexOf('<footer');
const oldEnd = oldIndex.indexOf('</footer>') + 9;
const oldFooter = oldIndex.slice(oldStart, oldEnd);

console.log('Old footer length:', oldFooter.length);

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
console.log('Found HTML files:', htmlFiles.length);

let modifiedCount = 0;

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // Use regex to replace ALL footers in the file (since some files might have duplicates as noted)
  const regex = /<footer[\s\S]*?<\/footer>/g;
  
  if (regex.test(content)) {
    const newContent = content.replace(regex, () => oldFooter);
    fs.writeFileSync(file, newContent, 'utf8');
    modifiedCount++;
  } else {
    console.log('Footer not found in:', file);
  }
});

console.log('Modified files:', modifiedCount);
