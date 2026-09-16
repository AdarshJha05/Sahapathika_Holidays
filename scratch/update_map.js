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

const oldHtmlRegex = /<h2 style="font-family:'Fraunces',serif;font-weight:400;font-size:32px;letter-spacing:-\.02em;margin:0 0 20px">Where you'll be<\/h2>[\s\S]*?<\/div>\s*<\/div>/;

const newHtml = `<h2 style="font-family:'Fraunces',serif;font-weight:400;font-size:32px;letter-spacing:-.02em;margin:0 0 20px">Where you'll be</h2>
          <div style="height:350px;border-radius:22px;overflow:hidden;background:#DCEEE7;position:relative;margin-bottom:48px;border:1px solid rgba(95,169,140,.4)">
            <iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="{{ detail.mapUrl }}" style="position:absolute;inset:0"></iframe>
          </div>`;


const oldJs = `photo3: this.getGallery(s.slug)[2].photo,
          flatChip:`;

const newJs = `photo3: this.getGallery(s.slug)[2].photo,
          mapUrl: 'https://maps.google.com/maps?q=' + encodeURIComponent(p.regions || p.title) + '&t=&z=6&ie=UTF8&iwloc=&output=embed',
          flatChip:`;

const oldJsWindows = oldJs.replace(/\\n/g, '\\r\\n');
const newJsWindows = newJs.replace(/\\n/g, '\\r\\n');

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (oldHtmlRegex.test(content)) {
    content = content.replace(oldHtmlRegex, newHtml);
    changed = true;
  }
  
  if (content.includes(oldJs)) {
    content = content.replace(oldJs, newJs);
    changed = true;
  } else if (content.includes(oldJsWindows)) {
    content = content.replace(oldJsWindows, newJsWindows);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
