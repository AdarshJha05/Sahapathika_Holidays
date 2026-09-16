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
  
  // Replace literal \\n with real \n
  if (content.includes("\\\\n")) {
    content = content.replace(/\\\\n/g, "\\n");
    changed = true;
  }
  
  // Add white-space:pre-wrap to the overview paragraph so \n renders as breaks
  const pTagRegex = /<p style="([^"]*max-width:720px;text-wrap:pretty[^"]*)">{{ detail\.overview }}<\/p>/;
  if (pTagRegex.test(content)) {
    const match = content.match(pTagRegex);
    if (!match[1].includes('white-space:pre-wrap')) {
      const newStyle = match[1] + ';white-space:pre-wrap';
      content = content.replace(match[0], `<p style="${newStyle}">{{ detail.overview }}</p>`);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
