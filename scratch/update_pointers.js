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

const oldIncludes = '<sc-for list="{{ detail.includes }}" as="i" hint-placeholder-count="6"><div style="font-size:14.5px;line-height:1.6;color:#3A4A44">{{ i.t }}</div></sc-for>';
const newIncludes = '<sc-for list="{{ detail.includes }}" as="i" hint-placeholder-count="6"><div style="font-size:14.5px;line-height:1.6;color:#3A4A44;display:flex;align-items:flex-start;gap:10px"><span style="color:#5FA98C;font-size:16px;line-height:1.3;flex:0 0 auto">✓</span><div>{{ i.t }}</div></div></sc-for>';

const oldExcludes = '<sc-for list="{{ detail.excludes }}" as="i" hint-placeholder-count="5"><div style="font-size:14.5px;line-height:1.6;color:#3A4A44">{{ i.t }}</div></sc-for>';
const newExcludes = '<sc-for list="{{ detail.excludes }}" as="i" hint-placeholder-count="5"><div style="font-size:14.5px;line-height:1.6;color:#3A4A44;display:flex;align-items:flex-start;gap:10px"><span style="color:#E5483D;font-size:14px;line-height:1.4;flex:0 0 auto">✕</span><div>{{ i.t }}</div></div></sc-for>';

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (content.includes(oldIncludes)) {
    content = content.replace(oldIncludes, newIncludes);
    changed = true;
  }
  
  if (content.includes(oldExcludes)) {
    content = content.replace(oldExcludes, newExcludes);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
