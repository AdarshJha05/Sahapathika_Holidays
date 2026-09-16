const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const scratchDir = path.join(root, 'scratch');

const scriptsToExtract = [
  'update_amritsar.js',
  'update_devi_yatra.js',
  'update_divya_yatra.js',
  'update_hp.js',
  'update_kashi_gaya_yatra.js',
  'update_kashi_yatra.js',
  'update_kashmir_5_days.js',
  'update_kashmir_6_days.js',
  'update_kashmir_honeymoon.js',
  'update_kashmir_vaishno_devi.js',
  'update_lucknow_yatra.js',
  'update_mathura_vrindavan.js',
  'update_puri.js'
];

let allCodeBlocks = [];

scriptsToExtract.forEach(script => {
  const content = fs.readFileSync(path.join(scratchDir, script), 'utf8');
  // Match the code block
  // The code blocks typically start with: const kashmirCode = `} else if (p.slug === '...') {
  // and end with: } else if (p.slug === '...') {`;
  
  const match = content.match(/const [a-zA-Z0-9]+Code = `\} else if \(([\s\S]*?)\} else if \([^)]+\) \{`;/);
  if (match) {
    let block = `if (${match[1]}`;
    allCodeBlocks.push(block);
  } else {
    console.error('Could not extract code from ' + script);
  }
});

let combinedCode = allCodeBlocks.join('} else ') + "} else if (p.slug === 'kerala-ayurveda-wellness-retreat') {";

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

const insertionPoint = "if (p.slug === 'kerala-ayurveda-wellness-retreat') {";

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  if (content.includes(insertionPoint) && !content.includes("slug === 'kashmir-5-days-srinagar-sonmarg-gulmarg-pahalgam-j'")) {
    content = content.replace(insertionPoint, combinedCode);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
