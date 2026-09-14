const fs = require('fs');
const path = require('path');

const cwd = 'c:/Users/jhash/Downloads/Sahapathika_Holidays';
const files = fs.readdirSync(cwd).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(cwd, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Remove Chat icon
  content = content.replace(/\s*<a href="#" aria-label="Chat">[\s\S]*?<\/a>/, '');

  // Increase gap in CSS
  content = content.replace(/gap: clamp\(\.6rem,\s*1\.2vw,\s*1rem\);/g, 'gap: clamp(1rem, 2vw, 1.8rem);');

  fs.writeFileSync(filePath, content);
  console.log(`Updated footer in ${file}`);
});
