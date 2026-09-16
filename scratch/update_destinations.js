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

const destGroupsNew = `destGroups: [
        {
          title: 'NORTH INDIA', badge: 'POPULAR', badgeStyle: 'font-size:9px;font-weight:800;letter-spacing:.1em;background:#DCEEE7;color:#2F7A63;padding:4px 9px;border-radius:99px',
          items: [
            { name: 'Shimla & Manali', initial: 'S', photo: 'packages_cards/shimla.jpg', region: 'North India' },
            { name: 'Kashmir', initial: 'K', photo: 'packages_cards/srinagar.jpg', region: 'North India' },
            { name: 'Varanasi', initial: 'V', photo: 'packages_cards/varanasi.jpg', region: 'North India' },
            { name: 'Ayodhya', initial: 'A', photo: 'packages_cards/ayodhya.jpg', region: 'North India' },
            { name: 'Mathura', initial: 'M', photo: 'packages_cards/mathura.jpg', region: 'North India' },
            { name: 'Haridwar', initial: 'H', photo: 'packages_cards/haridwar(aarti).jpg', region: 'North India' }
          ]
        },
        {
          title: 'SOUTH & EAST INDIA', badge: 'BOOKABLE NOW', badgeStyle: 'font-size:9px;font-weight:800;letter-spacing:.1em;background:#DCEEE7;color:#2F7A63;padding:4px 9px;border-radius:99px',
          items: [
            { name: 'Kovalam', initial: 'K', photo: 'https://i.pinimg.com/1200x/1f/cc/f1/1fccf111a972587d9c072f8381018c70.jpg', region: 'South India' },
            { name: 'Alleppey', initial: 'A', photo: 'https://i.pinimg.com/736x/b4/88/63/b48863982d7b8c63a8d633405da62b2b.jpg', region: 'South India' },
            { name: 'Munnar', initial: 'M', photo: 'https://i.pinimg.com/736x/75/1e/96/751e9636e5a9f3b2ef002932b1817d3d.jpg', region: 'South India' },
            { name: 'Kochi', initial: 'C', photo: 'https://i.pinimg.com/1200x/2e/de/6a/2ede6ae530ca4688f61e8a73046ae302.jpg', region: 'South India' },
            { name: 'Puri', initial: 'P', photo: 'packages_cards/jaganathpuri.jpg', region: 'East India' },
            { name: 'Chilika', initial: 'C', photo: 'packages_cards/boat_ghat.jpg', region: 'East India' }
          ]
        },
        {
          title: 'INTERNATIONAL — ON ENQUIRY', badgeStyle: 'font-size:9px;font-weight:800;letter-spacing:.1em;background:#FDE8E4;color:#C4362C;padding:4px 9px;border-radius:99px',
          items: ['Middle East', 'South-East Asia', 'Europe', 'Sri Lanka', 'Maldives', 'Far East'].map(n => ({ name: n, initial: n[0], photo: '' }))
        }
      ]`;

const destGroupsOldRegex = /destGroups: \[\s*\{\s*title: 'KERALA'[\s\S]*?items: \['Middle East'[\s\S]*?\]\s*\}/m;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (destGroupsOldRegex.test(content)) {
    content = content.replace(destGroupsOldRegex, destGroupsNew);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
