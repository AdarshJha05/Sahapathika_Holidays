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

  // 1. Update animation targets
  const oldAnim = "this.setState({ counts: { travellers: 0, destinations: Math.round(e * 100), packages: Math.round(e * 125), years: Math.round(e * 35) } });";
  const newAnim = "this.setState({ counts: { travellers: Math.round(e * 100), destinations: Math.round(e * 125), packages: Math.round(e * 35), years: Math.round(e * 10) } });";
  
  if (content.includes(oldAnim)) {
    content = content.replace(oldAnim, newAnim);
    changed = true;
  }

  // 2. Update stats array
  const statsRegex = /stats:\s*\[[\s\S]*?\]\,/m;
  const newStats = `stats: [
        { value: s.counts.travellers + '+', label: 'Happy Travelers', tag: 'VERIFIED', tagStyle: okTag },
        { value: s.counts.destinations + '+', label: 'Destinations', tag: 'VERIFIED', tagStyle: okTag },
        { value: s.counts.packages + '+', label: 'Holiday Packages', tag: 'VERIFIED', tagStyle: okTag },
        { value: s.counts.years + '+', label: 'Years of Experience', tag: 'VERIFIED', tagStyle: okTag }
      ],`;

  if (statsRegex.test(content) && content.includes('Destinations Covered') === false && content.includes('Happy Travelers') === false) {
    content = content.replace(statsRegex, newStats);
    changed = true;
  } else if (statsRegex.test(content) && content.includes("value: s.counts.destinations + '+', label: 'Destinations'")) {
    content = content.replace(statsRegex, newStats);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
