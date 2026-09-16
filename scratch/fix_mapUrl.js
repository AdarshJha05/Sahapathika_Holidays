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

const regex = /photo3:\s*this\.getGallery\(s\.slug\)\[2\]\.photo,([\s\S]*?)flatChip:/m;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (regex.test(content) && !content.includes('mapUrl:')) {
    content = content.replace(regex, `photo3: this.getGallery(s.slug)[2].photo,\n          mapUrl: 'https://maps.google.com/maps?q=' + encodeURIComponent(p.regions || p.title) + '&t=&z=6&ie=UTF8&iwloc=&output=embed',$1flatChip:`);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
