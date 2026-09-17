const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'index.html');

let content = fs.readFileSync(file, 'utf8');

// 1. Find the stats section
const statsRegex = /<section ref="\{\{ statsRef \}\}"[\s\S]*?<\/section>\s*/;
const statsMatch = content.match(statsRegex);

if (!statsMatch) {
  console.log('Stats section not found!');
  process.exit(1);
}

const statsHtml = statsMatch[0];

// Remove stats section from its original place
content = content.replace(statsRegex, '');

// 2. Find the top categories section
const topCategoriesRegex = /<section style="max-width:1280px;margin:0 auto;padding:clamp\(56px, 8vw, 96px\) 24px 24px">\s*<div style="display:flex;align-items:flex-end;justify-content:space-between;gap:32px;flex-wrap:wrap;margin-bottom:44px">\s*<div style="max-width:600px">\s*<div style="font-size:11px;letter-spacing:\.24em;font-weight:800;color:#C4362C;margin-bottom:14px">TOP CATEGORIES<\/div>/;

if (!topCategoriesRegex.test(content)) {
  console.log('Top categories section not found!');
  process.exit(1);
}

// Insert statsHtml before topCategories
content = content.replace(topCategoriesRegex, match => statsHtml + match);

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully moved stats section above top categories in index.html');
