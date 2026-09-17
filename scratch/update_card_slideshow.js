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

  // Add the setInterval in componentDidMount
  const cdmRegex = /this\.timer = setInterval\(\(\) => this\.setState\(s => \(\{ testi: \(s\.testi \+ 1\) % 3 \}\)\), 6000\);/;
  if (cdmRegex.test(content) && !content.includes('this.cardTimer = setInterval')) {
    content = content.replace(cdmRegex, `this.timer = setInterval(() => this.setState(s => ({ testi: (s.testi + 1) % 3 })), 6000);\n    this.cardTimer = setInterval(() => this.setState(s => ({ cardSlide: (s.cardSlide || 0) + 1 })), 2000);`);
    changed = true;
  }

  // Modify the results mapping
  const resultsRegex = /return r\.map\(p => Object\.assign\(\{\}, p, \{\s+listSlot: 'sh-pkg-' \+ p\.slug, chipStyle: this\.chip\(p\.cat\),\s+go: \(\) => this\.go\('detail', \{ slug: p\.slug, day: 1 \}\)\s+\}\)\);/;
  if (resultsRegex.test(content)) {
    content = content.replace(resultsRegex, `return r.map(p => {
          const gal = this.getGallery(p.slug) || [];
          const currentPhoto = gal.length > 0 ? gal[(s.cardSlide || 0) % gal.length].photo : p.photo;
          return Object.assign({}, p, {
            photo: currentPhoto,
            listSlot: 'sh-pkg-' + p.slug, chipStyle: this.chip(p.cat),
            go: () => this.go('detail', { slug: p.slug, day: 1 })
          });
        });`);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
