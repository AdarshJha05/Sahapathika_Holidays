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

  const target = `if (p.slug.includes('kashmir')) set = ['srinagar.jpg', 'gulmarg.jpg', 'pahalgam.jpg', 'sonamarg.jpg', 'kashmir(lake).jpg', 'kashmir(bridge).jpg'];`;
  const replacement = `if (p.slug === 'puri-jagannath-konark-chilika-bhubaneswar') set = ['puri_new.jpg', 'jaganathpuri.jpg', 'jaganathpuri(1).jpg', 'boat_ghat.jpg', 'varanasi.jpg', 'kashi.jpg'];\n    else if (p.slug.includes('kashmir')) set = ['srinagar.jpg', 'gulmarg.jpg', 'pahalgam.jpg', 'sonamarg.jpg', 'kashmir(lake).jpg', 'kashmir(bridge).jpg'];`;

  if (content.includes(target) && !content.includes(`if (p.slug === 'puri-jagannath-konark-chilika-bhubaneswar') set =`)) {
    content = content.replace(target, replacement);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
