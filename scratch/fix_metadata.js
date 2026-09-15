const fs = require('fs');

// 1. Extract packages data
const indexHtml = fs.readFileSync('index.html', 'utf8');
const match = indexHtml.match(/packages = (\[[\s\S]*?\]);/);
if (!match) {
  console.error('Could not find packages array in index.html');
  process.exit(1);
}

// Safely evaluate the array
const packages = eval(match[1]);

// 2. Iterate through all package-*.html files
const files = fs.readdirSync('.').filter(f => f.startsWith('package-') && f.endsWith('.html'));

let updated = 0;
for (const file of files) {
  const slug = file.replace('package-', '').replace('.html', '');
  const pkg = packages.find(p => p.slug === slug);
  
  if (!pkg) {
    console.warn('No package data found for ' + slug);
    continue;
  }
  
  let html = fs.readFileSync(file, 'utf8');
  
  // Replace title
  html = html.replace(/<title>.*?<\/title>/, `<title>${pkg.title} | Sahapathika Holidays</title>`);
  html = html.replace(/<meta property="og:title" content=".*?">/, `<meta property="og:title" content="${pkg.title} | Sahapathika Holidays">`);
  
  // Replace description
  const desc = `Explore ${pkg.title} with Sahapathika Holidays. A curated ${pkg.duration} journey in ${pkg.region} featuring ${pkg.cat}.`;
  html = html.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${desc}">`);
  html = html.replace(/<meta property="og:description" content=".*?">/, `<meta property="og:description" content="${desc}">`);
  
  // Replace OG image
  if (pkg.photo) {
    html = html.replace(/<meta property="og:image" content=".*?">/, `<meta property="og:image" content="${pkg.photo}">`);
  }
  
  fs.writeFileSync(file, html, 'utf8');
  updated++;
}

console.log(`Updated metadata for ${updated} package pages.`);
