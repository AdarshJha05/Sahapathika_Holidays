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

  // Fix buttons in lightbox
  // Close button
  if (content.includes('position:absolute;top:26px;right:30px;background:none;border:1px')) {
    content = content.replace('position:absolute;top:26px;right:30px;background:none;border:1px', 'position:absolute;z-index:2;top:26px;right:30px;background:none;border:1px');
    changed = true;
  }
  
  // Prev button
  if (content.includes('position:absolute;left:26px;top:50%;background:none;border:1px')) {
    content = content.replace('position:absolute;left:26px;top:50%;background:none;border:1px', 'position:absolute;z-index:2;left:26px;top:50%;background:none;border:1px');
    changed = true;
  }

  // Next button
  if (content.includes('position:absolute;right:26px;top:50%;background:none;border:1px')) {
    content = content.replace('position:absolute;right:26px;top:50%;background:none;border:1px', 'position:absolute;z-index:2;right:26px;top:50%;background:none;border:1px');
    changed = true;
  }
  
  // On mobile, the buttons are quite close to the edges. We can also shrink the left/right offset on very small screens, 
  // but just adding z-index will make them clickable and visible OVER the image.
  // Wait, if it's over the image, the arrow will be visible. The border might be slightly hard to see if the image is white.
  // We can add backdrop-filter:blur(4px); or a slight background to the buttons to make them pop more over images.
  // The user asked to "fix it", meaning they shouldn't be hidden behind the image.

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
