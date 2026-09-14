const fs = require('fs');
const path = require('path');
const https = require('https');

const packages = [
    { slug: 'kerala-ayurveda-wellness-retreat', photo: 'https://i.pinimg.com/736x/24/8a/88/248a8829446ddc4864ba2093a40713b2.jpg' },
    { slug: 'munnar-thekkady-alleppey', photo: 'https://i.pinimg.com/736x/b4/88/63/b48863982d7b8c63a8d633405da62b2b.jpg' },
    { slug: 'waterfalls-hills-backwaters', photo: 'https://i.pinimg.com/736x/75/1e/96/751e9636e5a9f3b2ef002932b1817d3d.jpg' },
    { slug: 'kerala-temple-tour', photo: 'https://i.pinimg.com/736x/a8/39/4f/a8394fa9408e2472f0672f2bb515d9db.jpg' },
    { slug: 'kovalam-varkala-tour', photo: 'https://i.pinimg.com/1200x/1f/cc/f1/1fccf111a972587d9c072f8381018c70.jpg' },
    { slug: 'north-kerala-heritage-tour', photo: 'https://i.pinimg.com/1200x/1e/00/bb/1e00bb9fa2160c94d8b9fd5aa079874b.jpg' },
    { slug: 'beach-and-backwater-tour', photo: 'https://i.pinimg.com/1200x/9c/4d/7b/9c4d7b7354f5deff64a143cd3ee10583.jpg' },
    { slug: 'enchanting-captivating-kerala', photo: 'https://i.pinimg.com/originals/87/8b/84/878b841ad38d1d59cbefa547e995f363.png' },
    { slug: 'scenic-beautiful-kerala', photo: 'https://i.pinimg.com/1200x/2e/de/6a/2ede6ae530ca4688f61e8a73046ae302.jpg' },
    { slug: 'kerala-short-honeymoon-tour', photo: 'https://i.pinimg.com/1200x/7d/92/4c/7d924cc4489932afa59b881fc9f2a523.jpg' }
];

const defaultPhoto = 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4f690bd1-881a-4192-82f2-d714d34c8fb9.png';

const dir = path.join(__dirname, 'og-images');
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

function download(url, filename) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        console.log(`Failed to download ${url}: ${res.statusCode}`);
        resolve();
        return;
      }
      const fileStream = fs.createWriteStream(filename);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function run() {
  await download(defaultPhoto, path.join(dir, 'default.png'));
  console.log('Downloaded default.png');
  for (let pkg of packages) {
    let ext = pkg.photo.split('.').pop();
    if (ext.length > 4) ext = 'jpg';
    await download(pkg.photo, path.join(dir, `${pkg.slug}.${ext}`));
    console.log(`Downloaded ${pkg.slug}.${ext}`);
  }
}

run();
