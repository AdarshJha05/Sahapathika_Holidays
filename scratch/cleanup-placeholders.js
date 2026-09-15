const fs = require('fs');

const files = fs.readdirSync('.').filter(f => (f.startsWith('package-') || f === 'packages.html') && f.endsWith('.html'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Remove "Where you'll be" section
  content = content.replace(/<div\s+class="mt-12[^>]*>[\s\S]*?<h2[^>]*>Where you'll be<\/h2>[\s\S]*?<div\s+class="map-placeholder[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g, '');

  // Update star rating text
  content = content.replace(/★★★★★ · Reviews coming from live site/g, '★★★★★');
  
  // Remove "TO BE CONFIRMED" block
  const toBeConfirmedRegex = /<div[^>]*class="[^"]*bg-red-50[^"]*"[^>]*>[\s\S]*?TO BE CONFIRMED[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g;
  content = content.replace(toBeConfirmedRegex, '');

  fs.writeFileSync(file, content, 'utf8');
}
console.log('Cleanup complete.');
