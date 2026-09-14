const fs = require('fs');
const path = require('path');

const filePath = 'c:/Users/jhash/Downloads/Sahapathika_Holidays/index.html';
let content = fs.readFileSync(filePath, 'utf-8');

// Change Title
content = content.replace(
  /<title>Home \| Sahapathika Holidays<\/title>/g,
  '<title>Sahapathika Holidays | Kerala Tours, Ayurveda & Honeymoon Packages</title>'
);

// Change OG Title
content = content.replace(
  /<meta property="og:title" content="Home \| Sahapathika Holidays">/g,
  '<meta property="og:title" content="Sahapathika Holidays | Kerala Tours, Ayurveda & Honeymoon Packages">'
);

// Change OG URL
content = content.replace(
  /<meta property="og:url" content="https:\/\/sahapathika-holidays\.vercel\.app\/index\.html">/g,
  '<meta property="og:url" content="https://sahapathika-holidays.vercel.app/">'
);

fs.writeFileSync(filePath, content);
console.log('Updated index.html SEO to act as proper Home page');
