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

  // 1. Add CSS class
  const cssInjection = `@media(max-width: 495px) { .sh-mobile-gallery-btn { display: block !important; } }`;
  if (!content.includes('.sh-mobile-gallery-btn')) {
    content = content.replace(/<\/style>/, `  ${cssInjection}\n</style>`);
    changed = true;
  }

  // 2. Add button to main image in package detail page
  const mainImageDivRegex = /(<div style="grid-row:span 2;border-radius:24px;overflow:hidden;position:relative">\s*<sc-if value="\{\{ detail\.slug === 'puri-jagannath-konark-chilika-bhubaneswar' \|\| detail\.title\.includes\('Puri Jagannath'\) \}\}">.*?<\/sc-if>\s*<\/div>)/g;
  
  if (mainImageDivRegex.test(content) && !content.includes('class="sh-mobile-gallery-btn"')) {
    content = content.replace(mainImageDivRegex, function(match, p1) {
      return match.replace(/<\/div>$/, `  <button class="sh-mobile-gallery-btn" style="display:none;position:absolute;right:16px;bottom:16px;background:rgba(22,33,29,.82);color:#FAF6EF;border:0;padding:11px 18px;border-radius:999px;font-size:12.5px;font-weight:700;cursor:pointer;backdrop-filter:blur(6px);z-index:2" onClick="{{ openGallery }}">More photos</button>\n        </div>`);
    });
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
