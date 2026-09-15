const fs = require('fs');
const path = require('path');

// Extract key data from each package HTML file
const files = fs.readdirSync('.').filter(f => f.startsWith('package-') && f.endsWith('.html') && !f.startsWith('package-lock'));

const results = [];

for (const file of files) {
  const slug = file.replace('package-', '').replace('.html', '');
  const html = fs.readFileSync(file, 'utf8');
  
  // Extract title from <title> tag
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].replace(' | Sahapathika Holidays', '').trim() : slug;
  
  // Extract OG description
  const descMatch = html.match(/property="og:description"\s+content="([^"]+)"/);
  const description = descMatch ? descMatch[1] : '';
  
  // Extract category from chip span patterns
  const catPatterns = [
    /Ayurveda &amp; Wellness|Ayurveda & Wellness/,
    /Heritage &amp; Temple|Heritage & Temple/,
    /Beach &amp; Coastal|Beach & Coastal/,
    /Hill &amp; Backwater|Hill & Backwater/,
    /Signature/,
    /Honeymoon/,
    /Heritage[^&]/,
    /Pilgrimage/,
    /Hill Station/,
  ];
  
  // Look for category in chip/badge elements
  let cat = 'Signature';
  const chipMatch = html.match(/data-dc-tpl.*?cat.*?([A-Za-z&; ]+(?:Wellness|Temple|Coastal|Backwater|Signature|Honeymoon|Heritage|Pilgrimage))/);
  
  // More reliable: look for the chip style with category-specific colors
  if (html.includes('#2E6E6A') || html.toLowerCase().includes('ayurveda')) cat = 'Ayurveda & Wellness';
  else if (html.includes('#9C331F') || html.toLowerCase().includes('honeymoon')) cat = 'Honeymoon';
  else if (html.includes('#3C6F63') || html.toLowerCase().includes('beach') || html.toLowerCase().includes('backwater') || html.toLowerCase().includes('coastal')) cat = 'Beach & Coastal';
  else if (html.includes('#B5822A') || html.toLowerCase().includes('temple') || html.toLowerCase().includes('heritage') || html.toLowerCase().includes('pilgrimage')) cat = 'Heritage & Temple';
  else if (html.includes('#4E6B48') || html.toLowerCase().includes('hill') || html.toLowerCase().includes('waterfall')) cat = 'Hill & Backwater';
  else if (html.includes('#C4432B')) cat = 'Signature';
  
  // Override by slug patterns
  if (slug.includes('ayurveda') || slug.includes('wellness')) cat = 'Ayurveda & Wellness';
  if (slug.includes('honeymoon')) cat = 'Honeymoon';
  if (slug.includes('beach') || slug.includes('backwater') || slug.includes('coastal') || slug.includes('kovalam') || slug.includes('varkala')) cat = 'Beach & Coastal';
  if (slug.includes('temple') || slug.includes('heritage') || slug.includes('kashi') || slug.includes('varanasi') || slug.includes('mathura') || slug.includes('puri') || slug.includes('lucknow') || slug.includes('devi')) cat = 'Heritage & Temple';
  if (slug.includes('hill') || slug.includes('waterfall') || slug.includes('munnar') || slug.includes('scenic')) cat = 'Hill & Backwater';
  if (slug.includes('shimla') || slug.includes('manali') || slug.includes('himachal') || slug.includes('kullu')) cat = 'Hill Station';
  if (slug.includes('kashmir')) cat = 'Hill Station';
  
  // Determine region
  let regionGroup = 'Kerala';
  let region = 'Multi-region';
  
  const keralaSlugs = ['ayurveda', 'beach-and-backwater-tour', 'enchanting-captivating-kerala', 'kerala-ayurveda-wellness-retreat', 'kerala-short-honeymoon-tour', 'kerala-temple-tour', 'kovalam-varkala-tour', 'munnar-thekkady-alleppey', 'north-kerala-heritage-tour', 'scenic-beautiful-kerala', 'waterfalls-hills-backwaters', 'varanasi-tour-packages-from-kerala'];
  
  if (keralaSlugs.includes(slug)) {
    regionGroup = 'Kerala';
    if (slug.includes('north')) region = 'North Kerala';
    else if (slug.includes('munnar') || slug.includes('thekkady')) region = 'Central Kerala';
    else region = 'South Kerala';
  } else if (slug.includes('shimla') || slug.includes('manali') || slug.includes('himachal') || slug.includes('kullu')) {
    regionGroup = 'India';
    region = 'Himachal Pradesh';
  } else if (slug.includes('kashmir')) {
    regionGroup = 'India';
    region = 'Kashmir';
  } else if (slug.includes('kashi') || slug.includes('varanasi') || slug.includes('mathura') || slug.includes('lucknow') || slug.includes('ayodhya') || slug.includes('prayag')) {
    regionGroup = 'India';
    region = 'Uttar Pradesh';
  } else if (slug.includes('puri') || slug.includes('bhubaneswar')) {
    regionGroup = 'India';
    region = 'Odisha';
  }
  
  // Extract duration from description or title
  const durMatch = description.match(/(\d+)\s*(?:nights?|days?|night|day)/i) || title.match(/(\d+)\s*(?:Nights?|Days?)/i);
  const duration = durMatch ? `${durMatch[1]} ${durMatch[1].includes('5') || durMatch[1].includes('6') ? 'Nights' : 'Nights'}` : 'TBC';
  
  results.push({
    slug,
    title,
    description,
    cat,
    regionGroup,
    region,
    duration,
  });
}

fs.writeFileSync('scratch/package_data_extracted.json', JSON.stringify(results, null, 2));
console.log('Extracted', results.length, 'packages');
results.forEach(r => console.log(r.slug, '|', r.cat, '|', r.regionGroup, '|', r.region));
