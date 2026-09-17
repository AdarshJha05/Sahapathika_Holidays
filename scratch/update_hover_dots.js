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

  // 1. Update Timer
  const timerRegex = /this\.cardTimer = setInterval\(\(\) => this\.setState\(s => \(\{ cardSlide: \(s\.cardSlide \|\| 0\) \+ 1 \}\)\), 2000\);/g;
  if (timerRegex.test(content)) {
    content = content.replace(timerRegex, `this.cardTimer = setInterval(() => this.setState(s => s.hoveredCard ? { cardSlide: Object.assign({}, s.cardSlide, { [s.hoveredCard]: ((s.cardSlide || {})[s.hoveredCard] || 0) + 1 }) } : {}), 2000);`);
    changed = true;
  }

  // 2. Update Mapper
  const mapperRegex = /return r\.map\(p => \{\s+const gal = this\.getGallery\(p\.slug\) \|\| \[\];\s+const currentPhoto = gal\.length > 0 \? gal\[\(s\.cardSlide \|\| 0\) % gal\.length\]\.photo : p\.photo;\s+return Object\.assign\(\{\}, p, \{\s+photo: currentPhoto,\s+listSlot: 'sh-pkg-' \+ p\.slug, chipStyle: this\.chip\(p\.cat\),\s+go: \(\) => this\.go\('detail', \{ slug: p\.slug, day: 1 \}\)\s+\}\);\s+\}\);/g;
  if (mapperRegex.test(content)) {
    content = content.replace(mapperRegex, `return r.map(p => {
          const gal = this.getGallery(p.slug) || [];
          const currentIdx = ((s.cardSlide || {})[p.slug] || 0) % (gal.length || 1);
          const currentPhoto = gal.length > 0 ? gal[currentIdx].photo : p.photo;
          return Object.assign({}, p, {
            photo: currentPhoto,
            listSlot: 'sh-pkg-' + p.slug, chipStyle: this.chip(p.cat),
            hoverOn: () => this.setState({ hoveredCard: p.slug }),
            hoverOff: () => this.setState({ hoveredCard: null }),
            galleryDots: gal.length > 0 ? gal.map((g, i) => ({
              style: 'width:6px;height:6px;border-radius:99px;background:' + (i === currentIdx ? '#fff' : 'rgba(255,255,255,0.5)') + ';transition:background .2s',
              click: (e) => { e.stopPropagation(); this.setState(s => ({ cardSlide: Object.assign({}, s.cardSlide, { [p.slug]: i }) })); }
            })) : [],
            go: () => this.go('detail', { slug: p.slug, day: 1 })
          });
        });`);
    changed = true;
  }

  // 3. Update HTML onClick and add Dots (ONLY for packages.html or all, doesn't matter because results are used only in packages.html)
  // We need to replace: onClick="{{ p.go }}" with onClick="{{ p.go }}" onMouseEnter="{{ p.hoverOn }}" onMouseLeave="{{ p.hoverOff }}"
  // AND add the dots div before the closing of the relative wrapper
  // `<span style="position:absolute;top:14px;right:14px;background:rgba(250,246,239,.95);color:#16211D;font-size:11.5px;font-weight:800;padding:6px 10px;border-radius:99px;animation:popin .45s .3s both">★ 4.9</span>\n                </div>`
  
  const cardDivRegex = /(<div style="background:#fff;border-radius:24px;overflow:hidden;box-shadow:0 12px 32px -14px rgba\(22,33,29,\.18\);cursor:pointer;transition:transform \.34s cubic-bezier\(\.2,\.7,\.3,1\),box-shadow \.34s;animation:rise \.5s both" style-hover="transform:translateY\(-8px\);box-shadow:0 28px 54px -20px rgba\(22,33,29,\.32\)" onClick="\{\{ p\.go \}\}")>/g;
  if (cardDivRegex.test(content)) {
    content = content.replace(cardDivRegex, `$1 onMouseEnter="{{ p.hoverOn }}" onMouseLeave="{{ p.hoverOff }}">`);
    changed = true;
  }

  const dotsRegex = /(<span style="position:absolute;top:14px;right:14px;background:rgba\(250,246,239,\.95\);color:#16211D;font-size:11\.5px;font-weight:800;padding:6px 10px;border-radius:99px;animation:popin \.45s \.3s both">★ 4\.9<\/span>\s*<\/div>)/g;
  if (dotsRegex.test(content) && !content.includes('galleryDots')) {
    content = content.replace(dotsRegex, `<span style="position:absolute;top:14px;right:14px;background:rgba(250,246,239,.95);color:#16211D;font-size:11.5px;font-weight:800;padding:6px 10px;border-radius:99px;animation:popin .45s .3s both">★ 4.9</span>
                  <div style="position:absolute;bottom:14px;left:0;right:0;display:flex;justify-content:center;gap:6px;z-index:2"><sc-for list="{{ p.galleryDots }}" as="d"><div style="{{ d.style }}" onClick="{{ d.click }}"></div></sc-for></div>
                </div>`);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
