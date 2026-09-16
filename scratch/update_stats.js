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
  const oldAnim = "this.setState({ counts: { travellers: Math.round(e * 0), destinations: Math.round(e * 0), packages: Math.round(e * 10), years: Math.round(e * 10) } });";
  const newAnim = "this.setState({ counts: { travellers: 0, destinations: Math.round(e * 100), packages: Math.round(e * 125), years: Math.round(e * 35) } });";
  
  if (content.includes(oldAnim)) {
    content = content.replace(oldAnim, newAnim);
    changed = true;
  }

  // 2. Update stats array
  const oldStats = `      stats: [
        { value: s.counts.travellers ? s.counts.travellers + '+' : '—', label: 'Happy Travellers', tag: 'AWAITING CLIENT DATA', tagStyle: tbcTag },
        { value: s.counts.destinations ? s.counts.destinations + '+' : '—', label: 'Destinations Covered', tag: 'AWAITING CLIENT DATA', tagStyle: tbcTag },
        { value: s.counts.packages + '', label: 'Holiday Packages', tag: 'VERIFIED', tagStyle: okTag },
        { value: s.counts.years + '+', label: 'Years of Experience', tag: 'VERIFIED · SINCE 2015', tagStyle: okTag }
      ],`;

  const newStats = `      stats: [
        { value: s.counts.destinations + '+', label: 'Destinations', tag: 'VERIFIED', tagStyle: okTag },
        { value: s.counts.packages + '+', label: 'Holiday Packages', tag: 'VERIFIED', tagStyle: okTag },
        { value: s.counts.years + '+', label: 'Years of Experience', tag: 'VERIFIED', tagStyle: okTag }
      ],`;

  if (content.includes(oldStats)) {
    content = content.replace(oldStats, newStats);
    changed = true;
  } else {
    // try removing carriage returns for matching
    const normalizedContent = content.replace(/\\r\\n/g, '\\n');
    const normalizedOld = oldStats.replace(/\\r\\n/g, '\\n');
    if (normalizedContent.includes(normalizedOld)) {
      content = normalizedContent.replace(normalizedOld, newStats);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
