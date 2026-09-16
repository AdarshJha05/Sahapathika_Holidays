const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../motion.js');
let content = fs.readFileSync(file, 'utf8');

const targetDestinations = `'<li><button class="sh-mob-sub-link" data-page="packages.html?region=South%20Kerala">Kerala (South)</button></li>' +
              '<li><button class="sh-mob-sub-link" data-page="packages.html?region=Central%20Kerala">Kerala (Central)</button></li>' +
              '<li><button class="sh-mob-sub-link" data-page="packages.html?region=North%20India">North India</button></li>' +
              '<li><button class="sh-mob-sub-link" data-page="packages.html?region=Kashmir%20Valley">Kashmir Valley</button></li>' +
              '<li><button class="sh-mob-sub-link" data-page="packages.html">View All Destinations</button></li>'`;

const replacementDestinations = `'<li><button class="sh-mob-sub-link" data-page="packages.html?region=North%20India">North India</button></li>' +
              '<li><button class="sh-mob-sub-link" data-page="packages.html?region=South%20India">South India</button></li>' +
              '<li><button class="sh-mob-sub-link" data-page="packages.html?region=East%20India">East India</button></li>' +
              '<li><button class="sh-mob-sub-link" data-page="packages.html">View All Destinations</button></li>'`;

if (content.includes(targetDestinations)) {
  content = content.replace(targetDestinations, replacementDestinations);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Modified motion.js');
} else {
  console.log('Target not found in motion.js');
}
