const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const mapping = {
  'shimla-manali': 'packages_cards/kashmir(pass).jpg',
  'shimla-kullu-manali': 'packages_cards/kashmir(meadow).jpg',
  'himachal-devi-yatra-with-vaishno-devi-mansa-devi': 'packages_cards/haridwar(harkipauri).jpg',
  'shimla-manali-amritsar': 'packages_cards/kashmir(bridge).jpg',
  'himachal-pradesh': 'packages_cards/Uttarakhand(kedar_dham).jpg',
  'puri-jagannath-konark-chilika-bhubaneswar': 'packages_cards/boat_ghat.jpg',
  'lucknow-naimisharanya-ayodhya-prayagraj-varanasi-y': 'packages_cards/varanasi.jpg',
  'kashi-gaya-prayag-ayodhya-pitru-moksha-yatra': 'packages_cards/varanasi(Kashi_Vishwanath).jpg',
  'kashi-prayag-chitrakoot-ayodhya-divya-yatra': 'packages_cards/varanasi(Manikarnika_Ghat).jpg',
  'kashi-prayag-chitrakoot-ayodhya-yatra': 'packages_cards/devprayag.jpg',
  'kashmir-5-days-srinagar-sonmarg-gulmarg-pahalgam-j': 'packages_cards/kashmir(city).jpg',
  'kashmir-6-days-srinagar-sonmarg-gulmarg-pahalgam': 'packages_cards/kashmir(lake_boat).jpg',
  'kashmir-honeymoon': 'packages_cards/kashmir(lake).jpg',
  'kashmir-with-vaishno-devi': 'packages_cards/kashmir(monastery).jpg',
  'mathura-vrindavan-braj-agra-yatra': 'packages_cards/haridwar(aarti).jpg',
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
    // Format: { slug: 'slug_name', title: '...', ..., photo: 'https://...', hint: '...' }
    // Using Regex to capture up to photo: '...'
    
    // Create a regex for this specific slug line
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
