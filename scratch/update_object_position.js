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

  // p.slotId
  const slotIdRegex = /<image-slot id="\{\{ p\.slotId \}\}" src="\{\{ p\.photo \}\}" shape="rect" placeholder="\{\{ p\.photoHint \}\}" fit="\{\{ p\.slug === 'puri-jagannath-konark-chilika-bhubaneswar' \? 'contain' : 'cover' \}\}"\><\/image-slot>/g;
  if (slotIdRegex.test(content)) {
    content = content.replace(slotIdRegex, 
      `<sc-if value="{{ p.slug === 'puri-jagannath-konark-chilika-bhubaneswar' }}"><img src="{{ p.photo }}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:top;" /></sc-if><sc-if value="{{ p.slug !== 'puri-jagannath-konark-chilika-bhubaneswar' }}"><image-slot id="{{ p.slotId }}" src="{{ p.photo }}" shape="rect" placeholder="{{ p.photoHint }}"></image-slot></sc-if>`
    );
    changed = true;
  }

  // p.listSlot
  const listSlotRegex = /<image-slot id="\{\{ p\.listSlot \}\}" src="\{\{ p\.photo \}\}" shape="rect" placeholder="\{\{ p\.hint \}\}" fit="\{\{ p\.slug === 'puri-jagannath-konark-chilika-bhubaneswar' \? 'contain' : 'cover' \}\}"\><\/image-slot>/g;
  if (listSlotRegex.test(content)) {
    content = content.replace(listSlotRegex, 
      `<sc-if value="{{ p.slug === 'puri-jagannath-konark-chilika-bhubaneswar' }}"><img src="{{ p.photo }}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:top;" /></sc-if><sc-if value="{{ p.slug !== 'puri-jagannath-konark-chilika-bhubaneswar' }}"><image-slot id="{{ p.listSlot }}" src="{{ p.photo }}" shape="rect" placeholder="{{ p.hint }}"></image-slot></sc-if>`
    );
    changed = true;
  }

  // p.relSlot
  const relSlotRegex = /<image-slot id="\{\{ p\.relSlot \}\}" src="\{\{ p\.photo \}\}" shape="rect" placeholder="\{\{ p\.hint \}\}" fit="\{\{ p\.slug === 'puri-jagannath-konark-chilika-bhubaneswar' \? 'contain' : 'cover' \}\}"\><\/image-slot>/g;
  if (relSlotRegex.test(content)) {
    content = content.replace(relSlotRegex, 
      `<sc-if value="{{ p.slug === 'puri-jagannath-konark-chilika-bhubaneswar' }}"><img src="{{ p.photo }}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:top;" /></sc-if><sc-if value="{{ p.slug !== 'puri-jagannath-konark-chilika-bhubaneswar' }}"><image-slot id="{{ p.relSlot }}" src="{{ p.photo }}" shape="rect" placeholder="{{ p.hint }}"></image-slot></sc-if>`
    );
    changed = true;
  }
  
  // detail.photo
  const detailPhotoRegex = /<image-slot id="sh-d1" src="\{\{ detail\.photo \}\}" shape="rect" placeholder="\{\{ detail\.hint \}\}" fit="\{\{ detail\.p\.slug === 'puri-jagannath-konark-chilika-bhubaneswar' \? 'contain' : 'cover' \}\}"\><\/image-slot>/g;
  if (detailPhotoRegex.test(content)) {
    content = content.replace(detailPhotoRegex, 
      `<sc-if value="{{ detail.slug === 'puri-jagannath-konark-chilika-bhubaneswar' || detail.title.includes('Puri Jagannath') }}"><img src="{{ detail.photo }}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:top;" /></sc-if><sc-if value="{{ detail.slug !== 'puri-jagannath-konark-chilika-bhubaneswar' && !detail.title.includes('Puri Jagannath') }}"><image-slot id="sh-d1" src="{{ detail.photo }}" shape="rect" placeholder="{{ detail.hint }}"></image-slot></sc-if>`
    );
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
