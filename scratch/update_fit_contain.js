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
  
  // Update p.slotId (Featured package)
  const slotIdRegex = /<image-slot id="\{\{ p\.slotId \}\}" src="\{\{ p\.photo \}\}" shape="rect" placeholder="\{\{ p\.photoHint \}\}"(?:\s+fit="[^"]*")?><\/image-slot>/g;
  if (slotIdRegex.test(content)) {
    content = content.replace(slotIdRegex, `<image-slot id="{{ p.slotId }}" src="{{ p.photo }}" shape="rect" placeholder="{{ p.photoHint }}" fit="{{ p.slug === 'puri-jagannath-konark-chilika-bhubaneswar' ? 'contain' : 'cover' }}"></image-slot>`);
    changed = true;
  }
  
  // Update p.listSlot (Packages page list)
  const listSlotRegex = /<image-slot id="\{\{ p\.listSlot \}\}" src="\{\{ p\.photo \}\}" shape="rect" placeholder="\{\{ p\.hint \}\}"(?:\s+fit="[^"]*")?><\/image-slot>/g;
  if (listSlotRegex.test(content)) {
    content = content.replace(listSlotRegex, `<image-slot id="{{ p.listSlot }}" src="{{ p.photo }}" shape="rect" placeholder="{{ p.hint }}" fit="{{ p.slug === 'puri-jagannath-konark-chilika-bhubaneswar' ? 'contain' : 'cover' }}"></image-slot>`);
    changed = true;
  }

  // Update p.relSlot (Related packages)
  const relSlotRegex = /<image-slot id="\{\{ p\.relSlot \}\}" src="\{\{ p\.photo \}\}" shape="rect" placeholder="\{\{ p\.hint \}\}"(?:\s+fit="[^"]*")?><\/image-slot>/g;
  if (relSlotRegex.test(content)) {
    content = content.replace(relSlotRegex, `<image-slot id="{{ p.relSlot }}" src="{{ p.photo }}" shape="rect" placeholder="{{ p.hint }}" fit="{{ p.slug === 'puri-jagannath-konark-chilika-bhubaneswar' ? 'contain' : 'cover' }}"></image-slot>`);
    changed = true;
  }
  
  // Update the main detail view photo? Wait, the user said "in card". 
  // Let's also update the main detail photo (sh-d1) for this specific slug?
  // They said "the image is not fit make it fit so full image is display in card now its cut out from top and bottom"
  // Let's also update sh-d1 if we can.
  // Actually, sh-d1 is `<image-slot id="sh-d1" src="{{ detail.photo }}" shape="rect" placeholder="{{ detail.hint }}"></image-slot>`
  const detailPhotoRegex = /<image-slot id="sh-d1" src="\{\{ detail\.photo \}\}" shape="rect" placeholder="\{\{ detail\.hint \}\}"(?:\s+fit="[^"]*")?><\/image-slot>/g;
  if (detailPhotoRegex.test(content)) {
    content = content.replace(detailPhotoRegex, `<image-slot id="sh-d1" src="{{ detail.photo }}" shape="rect" placeholder="{{ detail.hint }}" fit="{{ detail.p.slug === 'puri-jagannath-konark-chilika-bhubaneswar' ? 'contain' : 'cover' }}"></image-slot>`);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
