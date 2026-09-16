const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const mapping = {
  'shimla-manali': 'packages_cards/shimla.jpg',
  'shimla-kullu-manali': 'packages_cards/kullu.jpg',
  'himachal-devi-yatra-with-vaishno-devi-mansa-devi': 'packages_cards/mansadevi.jpg',
  'shimla-manali-amritsar': 'packages_cards/amritsar.jpg',
  'himachal-pradesh': 'packages_cards/himachal_pradesh.jpg',
  'puri-jagannath-konark-chilika-bhubaneswar': 'packages_cards/jaganathpuri.jpg',
  'lucknow-naimisharanya-ayodhya-prayagraj-varanasi-y': 'packages_cards/ayodhya.jpg',
  'kashi-gaya-prayag-ayodhya-pitru-moksha-yatra': 'packages_cards/kashi.jpg',
  'kashi-prayag-chitrakoot-ayodhya-divya-yatra': 'packages_cards/chitrakoot.jpg',
  'kashi-prayag-chitrakoot-ayodhya-yatra': 'packages_cards/prayagraj.jpg',
  'kashmir-5-days-srinagar-sonmarg-gulmarg-pahalgam-j': 'packages_cards/srinagar.jpg',
  'kashmir-6-days-srinagar-sonmarg-gulmarg-pahalgam': 'packages_cards/gulmarg.jpg',
  'kashmir-honeymoon': 'packages_cards/sonamarg.jpg',
  'kashmir-with-vaishno-devi': 'packages_cards/vaishnodevi.jpg',
  'mathura-vrindavan-braj-agra-yatra': 'packages_cards/mathura(janambhoomi).jpg',
  'varanasi-tour-packages-from-kerala': 'packages_cards/varanasi(aarti).jpg'
};

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

  for (const [slug, imgPath] of Object.entries(mapping)) {
    // We want to replace photo: '...' with photo: 'imgPath' for this slug
    const regex = new RegExp(`(\\{\\s*slug:\\s*'${slug}'.*?photo:\\s*')[^']+(')`);
    if (regex.test(content)) {
      content = content.replace(regex, `$1${imgPath}$2`);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
