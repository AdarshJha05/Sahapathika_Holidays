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

  // 1. Inject getGallery(slug) method before renderVals()
  if (!content.includes('getGallery(slug)')) {
    const methodStr = `
  getGallery(slug) {
    const p = this.packages.find(x => x.slug === slug);
    const def = this.galleryItems;
    if (!p) return def;
    
    let set = [];
    if (p.region === 'North India') set = ['shimla.jpg', 'manali.jpg', 'kullu.jpg', 'haridwar(aarti).jpg', 'rishikesh.jpg', 'mathura.jpg'];
    else if (p.region === 'Kashmir Valley') set = ['srinagar.jpg', 'gulmarg.jpg', 'pahalgam.jpg', 'sonamarg.jpg', 'kashmir(lake).jpg', 'kashmir(bridge).jpg'];
    else if (p.region === 'East India') set = ['jaganathpuri.jpg', 'jaganathpuri(1).jpg', 'boat_ghat.jpg', 'varanasi.jpg', 'kashi.jpg', 'prayagraj.jpg'];
    else return def;
    
    return set.map((img, i) => {
      let photo = i === 0 ? p.photo : 'packages_cards/' + img;
      return {
        id: 'sh-g' + (i+1),
        photo: photo,
        hint: p.title + ' view ' + (i+1),
        span: i === 0 ? 'grid-column:span 2;grid-row:span 2' : (i===5 ? 'grid-column:span 2;grid-row:span 1' : 'grid-column:span 1;grid-row:span 1'),
        cap: p.title
      };
    });
  }

  renderVals() {`;
    content = content.replace('  renderVals() {', methodStr);
    changed = true;
  }

  // 2. Replace this.galleryItems with this.getGallery(...) in renderVals
  content = content.replace(/gallery: this\.galleryItems\.map/g, "gallery: this.getGallery(s.page === 'detail' ? s.slug : null).map");
  content = content.replace(/this\.galleryItems\[s\.light\]/g, "this.getGallery(s.page === 'detail' ? s.slug : null)[s.light]");

  // 3. Add photo2 and photo3 to detail object
  if (!content.includes('photo2: this.getGallery(s.slug)[1].photo')) {
    content = content.replace(/photo: p\.photo,/g, "photo: p.photo, photo2: this.getGallery(s.slug)[1].photo, photo3: this.getGallery(s.slug)[2].photo,");
  }

  // 4. Update the HTML placeholders
  const shd2Regex = /<image-slot id="sh-d2" src="[^"]+" shape="rect" placeholder="[^"]+"><\/image-slot>/g;
  if (shd2Regex.test(content)) {
    content = content.replace(shd2Regex, '<image-slot id="sh-d2" src="{{ detail.photo2 }}" shape="rect" placeholder="{{ detail.hint }}"></image-slot>');
    changed = true;
  }

  const shd3Regex = /<image-slot id="sh-d3" src="[^"]+" shape="rect" placeholder="[^"]+">/g;
  if (shd3Regex.test(content)) {
    content = content.replace(shd3Regex, '<image-slot id="sh-d3" src="{{ detail.photo3 }}" shape="rect" placeholder="{{ detail.hint }}">');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
