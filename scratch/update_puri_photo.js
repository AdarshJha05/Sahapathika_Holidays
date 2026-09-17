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

const regex = /\{ slug: 'puri-jagannath-konark-chilika-bhubaneswar', title: 'Puri Jagannath Konark Chilika Bhubaneswar', regions: 'Puri Jagannath Konark Chilika Bhubaneswar', region: 'East India', duration: '5 Days 4 Nights', cat: 'Heritage & Temple', photo: 'packages_cards\/jaganathpuri\.jpg', hint: 'Puri Jagannath Konark Chilika Bhubaneswar' \}/g;
const replacement = `{ slug: 'puri-jagannath-konark-chilika-bhubaneswar', title: 'Puri Jagannath Konark Chilika Bhubaneswar', regions: 'Puri Jagannath Konark Chilika Bhubaneswar', region: 'East India', duration: '5 Days 4 Nights', cat: 'Heritage & Temple', photo: 'packages_cards/puri_new.jpg', hint: 'Puri Jagannath Konark Chilika Bhubaneswar' }`;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  if (regex.test(content)) {
    content = content.replace(regex, replacement);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
