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

  // 1. Change SIGNATURE JOURNEYS to JOURNEYS in the desktop dropdown
  const oldHeading = 'SIGNATURE JOURNEYS</div>';
  const newHeading = 'JOURNEYS</div>';
  
  if (content.includes(oldHeading)) {
    content = content.replace(oldHeading, newHeading);
    changed = true;
  }

  // 2. Change hint-placeholder-count="4" to 6 in the <sc-for list="{{ menuSignature }}" ...>
  const oldScFor = 'hint-placeholder-count="4"';
  // wait, let's only do it for the menuSignature loop
  const targetLoop = '<sc-for list="{{ menuSignature }}" as="p" hint-placeholder-count="4">';
  const newLoop = '<sc-for list="{{ menuSignature }}" as="p" hint-placeholder-count="6">';
  if (content.includes(targetLoop)) {
    content = content.replace(targetLoop, newLoop);
    changed = true;
  }

  // 3. Change menuSignature to pull 6 random cached items
  const oldMenuSig = "menuSignature: this.packages.slice(0, 4).map(p => ({ title: p.title, duration: p.duration, go: () => this.go('detail', { slug: p.slug, day: 1 }) })),";
  const newMenuSig = "menuSignature: (this._randPkgs || (this._randPkgs = this.packages.slice().sort(() => 0.5 - Math.random()).slice(0, 6))).map(p => ({ title: p.title, duration: p.duration, go: () => this.go('detail', { slug: p.slug, day: 1 }) })),";

  if (content.includes(oldMenuSig)) {
    content = content.replace(oldMenuSig, newMenuSig);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
