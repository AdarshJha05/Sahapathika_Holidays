const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

// Get old footer
const oldIndex = fs.readFileSync(path.join(root, 'scratch', 'old_index.html'), 'utf8');
const oldStart = oldIndex.indexOf('<footer');
const oldEnd = oldIndex.indexOf('</footer>') + 9;
let oldFooter = oldIndex.slice(oldStart, oldEnd);

// Replace logo lockup
oldFooter = oldFooter.replace(
  /<div class="brand-lockup">[\s\S]*?<\/div>/,
  `<div class="brand-lockup">
            <img src="Site-logo1.svg" alt="Sahapathika Holidays" style="height:62px; width:auto; filter: brightness(0) invert(1);">
          </div>`
);

// Replace blurb
oldFooter = oldFooter.replace(
  '<p class="brand-blurb">Crafting digital experiences that connect, delight, and leave a lasting imprint</p>',
  '<p class="brand-blurb">Sahapathika Holidays offers unforgettable travel experiences with customized Kerala tour packages, family vacations, honeymoon trips, and luxury holiday journeys across India. From serene backwaters and misty hill stations to cultural landmarks and scenic destinations.</p>'
);

// Replace contact list
oldFooter = oldFooter.replace(
  '<a href="mailto:care@heritage.com">care@heritage.com</a>',
  '<a href="mailto:sahapathika@gmail.com">sahapathika@gmail.com</a>'
);
oldFooter = oldFooter.replace(
  '<a href="tel:+910000000000">+91 00000 00000</a>',
  '<a href="tel:+919072769547">+91 90727 69547</a>'
);
oldFooter = oldFooter.replace(
  '<span>India</span>',
  '<span>Delhi and Kochi</span>'
);

// Replace Shop -> Popular Packages
oldFooter = oldFooter.replace(
  /<nav class="col" aria-label="Shop">[\s\S]*?<\/nav>/,
  `<nav class="col" aria-label="Popular Packages">
          <h2 class="col-title">Popular Packages</h2>
          <ul class="link-list">
            <li><a href="package-kerala-ayurveda-wellness-retreat.html">Kerala Ayurveda Wellness</a></li>
            <li><a href="package-kerala-short-honeymoon-tour.html">Kerala Short Honeymoon</a></li>
            <li><a href="package-shimla-manali.html">Shimla Manali Tour</a></li>
            <li><a href="package-kashmir-honeymoon.html">Kashmir Honeymoon</a></li>
            <li><a href="package-kerala-temple-tour.html">Kerala Temple Tour</a></li>
          </ul>
        </nav>`
);

// Replace Heritage -> Destinations
oldFooter = oldFooter.replace(
  /<nav class="col" aria-label="Heritage">[\s\S]*?<\/nav>/,
  `<nav class="col" aria-label="Destinations">
          <h2 class="col-title">Destinations</h2>
          <ul class="link-list">
            <li><a href="packages.html">Kerala</a></li>
            <li><a href="packages.html">Himachal Pradesh</a></li>
            <li><a href="packages.html">Kashmir</a></li>
            <li><a href="packages.html">North India</a></li>
            <li><a href="packages.html">Andaman</a></li>
          </ul>
        </nav>`
);

// Replace Care & Service -> Support
oldFooter = oldFooter.replace(
  /<nav class="col" aria-label="Care and service">[\s\S]*?<\/nav>/,
  `<nav class="col" aria-label="Support">
          <h2 class="col-title">Support</h2>
          <ul class="link-list">
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Terms &amp; Policies</a></li>
            <li><a href="#">Privacy Notice</a></li>
            <li><a href="#">Cookie Notice</a></li>
          </ul>
        </nav>`
);

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
  const content = fs.readFileSync(file, 'utf8');
  const regex = /<footer[\s\S]*?<\/footer>/g;
  
  if (regex.test(content)) {
    const newContent = content.replace(regex, () => oldFooter);
    fs.writeFileSync(file, newContent, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
