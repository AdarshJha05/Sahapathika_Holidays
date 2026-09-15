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

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // 1. Rename Popular Packages to Popular
  if (content.includes('aria-label="Popular Packages"')) {
    content = content.replace(/aria-label="Popular Packages"/g, 'aria-label="Popular"');
    changed = true;
  }
  if (content.includes('>Popular Packages</h2>')) {
    content = content.replace(/>Popular Packages<\/h2>/g, '>Popular</h2>');
    changed = true;
  }

  // 2. Update Support section links
  const contactLink = /href="#"([^>]*)>Contact Us<\/a>/g;
  if (contactLink.test(content)) {
    content = content.replace(contactLink, 'href="contact.html"$1>Contact Us</a>');
    changed = true;
  }

  const aboutLink = /href="#"([^>]*)>About Us<\/a>/g;
  if (aboutLink.test(content)) {
    content = content.replace(aboutLink, 'href="about.html"$1>About Us</a>');
    changed = true;
  }

  const termsLink = /href="#"([^>]*)>Terms &amp; Policies<\/a>/g;
  if (termsLink.test(content)) {
    content = content.replace(termsLink, 'href="terms.html"$1>Terms &amp; Policies</a>');
    changed = true;
  }

  const privacyLink = /href="#"([^>]*)>Privacy Notice<\/a>/g;
  if (privacyLink.test(content)) {
    content = content.replace(privacyLink, 'href="privacy.html"$1>Privacy Notice</a>');
    changed = true;
  }

  const cookieLink = /href="#"([^>]*)>Cookie Notice<\/a>/g;
  if (cookieLink.test(content)) {
    content = content.replace(cookieLink, 'href="cookies.html"$1>Cookie Notice</a>');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
