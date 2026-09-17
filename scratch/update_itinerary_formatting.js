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

  // 1. Update the mapped object
  const bodyMapRegex = /n: 'DAY ' \+ \(n < 10 \? '0' \+ n : n\), title: x\.title, body: x\.body,/g;
  if (bodyMapRegex.test(content)) {
    content = content.replace(bodyMapRegex, `n: 'DAY ' + (n < 10 ? '0' + n : n), title: x.title, body: x.body.map(para => {
              const isMeal = para.startsWith('Meals:');
              const isOvernight = para.startsWith('Overnight:');
              return {
                isMeal, isOvernight,
                text: isMeal ? para.replace('Meals:', '').trim() : (isOvernight ? para.replace('Overnight:', '').trim() : para)
              };
            }),`);
    changed = true;
  }

  // 2. Update the HTML
  const htmlRegex = /<sc-for list="\{\{ d\.body \}\}" as="para"><p style="margin:0;font-size:15px;line-height:1\.75;color:#3A4A44">\{\{ para \}\}<\/p><\/sc-for>/g;
  if (htmlRegex.test(content)) {
    content = content.replace(htmlRegex, `<sc-for list="{{ d.body }}" as="para"><p style="margin:0;font-size:15px;line-height:1.75;color:#3A4A44"><sc-if value="{{ para.isMeal }}"><span style="font-weight:800;display:inline-flex;align-items:center;gap:6px;transform:translateY(3px)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path></svg> Meals:</span> </sc-if><sc-if value="{{ para.isOvernight }}"><span style="font-weight:800">Details:</span> </sc-if>{{ para.text }}</p></sc-for>`);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
