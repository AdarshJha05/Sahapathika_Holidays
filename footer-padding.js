const fs = require('fs');
const path = require('path');

const cwd = 'c:/Users/jhash/Downloads/Sahapathika_Holidays';
const files = fs.readdirSync(cwd).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(cwd, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Find the global .footer-bottom block and inject padding-bottom
  // The block is:
  // .footer-bottom {
  //   margin-top: clamp(3rem, 6vh, 5rem);
  //   padding-top: clamp(1.5rem, 4vh, 2.5rem);
  
  if (content.includes('.footer-bottom {')) {
    content = content.replace(
      /(\.footer-bottom\s*\{\s*margin-top:.*?;)\s*(padding-top:.*?;)/,
      '$1\n      $2\n      padding-bottom: clamp(6rem, 10vh, 10rem);'
    );
    fs.writeFileSync(filePath, content);
    console.log(`Updated footer-bottom spacing in ${file}`);
  }
});
