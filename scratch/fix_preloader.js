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

  const oldPreloaderRegex = /preloaderStyle:\s*'position:fixed;inset:0;z-index:100;background:#FAF6EF;display:flex;flex-direction:column;align-items:center;justify-content:center;animation:wipeout\s*\.5s\s*1\.25s\s*both',/g;
  const newPreloader = `preloaderStyle: (this._plDone === undefined ? (this._plDone = (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('sahapathika_preloaded')), typeof sessionStorage !== 'undefined' && sessionStorage.setItem('sahapathika_preloaded', '1')) : null, this._plDone ? 'display:none' : 'position:fixed;inset:0;z-index:100;background:#FAF6EF;display:flex;flex-direction:column;align-items:center;justify-content:center;animation:wipeout .5s 1.25s both'),`;

  if (oldPreloaderRegex.test(content)) {
    content = content.replace(oldPreloaderRegex, newPreloader);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
