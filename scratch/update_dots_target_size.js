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

  const targetMapper = `            galleryDots: gal.length > 0 ? gal.map((g, i) => ({\n              style: 'width:6px;height:6px;border-radius:99px;background:' + (i === currentIdx ? '#fff' : 'rgba(255,255,255,0.5)') + ';transition:background .2s',\n              click: (e) => { e.stopPropagation(); this.setState(s => ({ cardSlide: Object.assign({}, s.cardSlide, { [p.slug]: i }) })); }\n            })) : [],`;

  if (content.includes(targetMapper)) {
    content = content.replace(targetMapper, `            galleryDots: gal.length > 0 ? gal.map((g, i) => ({\n              wrapStyle: 'width:28px;height:28px;display:flex;align-items:center;justify-content:center;cursor:pointer;margin:-10px 0',\n              innerStyle: 'width:8px;height:8px;border-radius:99px;background:' + (i === currentIdx ? '#fff' : 'rgba(255,255,255,0.6)') + ';transition:background .2s,transform .2s;transform:scale(' + (i === currentIdx ? '1.25' : '1') + ')',\n              click: (e) => { if(e && e.stopPropagation) { e.stopPropagation(); e.preventDefault(); } this.setState(s => ({ cardSlide: Object.assign({}, s.cardSlide, { [p.slug]: i }) })); }\n            })) : [],`);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
