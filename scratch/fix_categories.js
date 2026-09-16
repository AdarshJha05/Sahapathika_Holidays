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

  // 1. Remove Kashmir Valley and East India from catColor
  // It looks like: 'Pilgrimage Yatra': '#B5822A', 'Kashmir Valley': '#2F7A63', 'East India': '#B5822A'
  const catColorRegex = /,\s*'Kashmir Valley':\s*'#[A-Z0-9]+',\s*'East India':\s*'#[A-Z0-9]+'/g;
  if (catColorRegex.test(content)) {
    content = content.replace(catColorRegex, '');
    changed = true;
  }
  // fallback if formatting is different
  content = content.replace(/,\s*'Kashmir Valley':\s*'#[^']+'/g, '');
  content = content.replace(/,\s*'East India':\s*'#[^']+'/g, '');

  // 2. Change package regions to match the 5 zones
  // Replace region: 'South Kerala', region: 'Central Kerala', region: 'North Kerala', region: 'Multi-region' with region: 'South India'
  const regionUpdates = [
    { from: "region: 'South Kerala'", to: "region: 'South India'" },
    { from: "region: 'Central Kerala'", to: "region: 'South India'" },
    { from: "region: 'North Kerala'", to: "region: 'South India'" },
    { from: "region: 'Multi-region'", to: "region: 'South India'" },
    { from: "region: 'Kashmir Valley'", to: "region: 'North India'" }
  ];
  
  regionUpdates.forEach(update => {
    if (content.includes(update.from)) {
      content = content.split(update.from).join(update.to);
      changed = true;
    }
  });

  // 3. Update the regionChips to explicitly match the user's requested list
  const regionChipsStr = "regionChips: ['All'].concat([...new Set(this.packages.map(p => p.region))])";
  const newRegionChipsStr = "regionChips: ['All', 'North India', 'South India', 'East India', 'West India', 'Central India']";
  
  if (content.includes(regionChipsStr)) {
    content = content.replace(regionChipsStr, newRegionChipsStr);
    changed = true;
  } else if (content.includes("regionChips: ['All', 'South Kerala', 'Central Kerala', 'North Kerala', 'Multi-region']")) {
    content = content.replace("regionChips: ['All', 'South Kerala', 'Central Kerala', 'North Kerala', 'Multi-region']", newRegionChipsStr);
    changed = true;
  }

  // 4. Also update the getGallery() logic since Kashmir Valley is now North India
  // Actually, wait! getGallery relies on p.region === 'Kashmir Valley' !
  // Let's modify getGallery so it relies on something else, like slug, OR just change the condition.
  // We can change: `else if (p.region === 'Kashmir Valley')` to `else if (p.slug.includes('kashmir'))`
  if (content.includes("p.region === 'Kashmir Valley'")) {
    content = content.replace("p.region === 'Kashmir Valley'", "p.slug.includes('kashmir')");
    changed = true;
  }
  // And `if (p.region === 'North India')` needs to not trigger for Kashmir.
  // Wait, if p.region is 'North India', it will trigger for Kashmir now!
  // So we must change the order in getGallery:
  // if (p.slug.includes('kashmir')) ... else if (p.region === 'North India') ...
  
  const getGalleryMatch = "if (p.region === 'North India') set = ['shimla.jpg', 'manali.jpg', 'kullu.jpg', 'haridwar(aarti).jpg', 'rishikesh.jpg', 'mathura.jpg'];\\s*else if \\(p.slug.includes\\('kashmir'\\)\\) set = \\['srinagar.jpg', 'gulmarg.jpg', 'pahalgam.jpg', 'sonamarg.jpg', 'kashmir\\(lake\\).jpg', 'kashmir\\(bridge\\).jpg'\\];";
  
  const targetLogic = `if (p.region === 'North India') set = ['shimla.jpg', 'manali.jpg', 'kullu.jpg', 'haridwar(aarti).jpg', 'rishikesh.jpg', 'mathura.jpg'];
    else if (p.slug.includes('kashmir')) set = ['srinagar.jpg', 'gulmarg.jpg', 'pahalgam.jpg', 'sonamarg.jpg', 'kashmir(lake).jpg', 'kashmir(bridge).jpg'];`;
  const replacementLogic = `if (p.slug.includes('kashmir')) set = ['srinagar.jpg', 'gulmarg.jpg', 'pahalgam.jpg', 'sonamarg.jpg', 'kashmir(lake).jpg', 'kashmir(bridge).jpg'];
    else if (p.region === 'North India') set = ['shimla.jpg', 'manali.jpg', 'kullu.jpg', 'haridwar(aarti).jpg', 'rishikesh.jpg', 'mathura.jpg'];`;

  if (content.includes(targetLogic)) {
    content = content.replace(targetLogic, replacementLogic);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
