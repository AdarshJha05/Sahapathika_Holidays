const fs = require('fs');
const path = require('path');

const cwd = 'c:/Users/jhash/Downloads/Sahapathika_Holidays';
const files = fs.readdirSync(cwd).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(cwd, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Change padding: .45rem 0; to padding: .45rem .85rem; inside .legal a
  content = content.replace(
    /\.legal a \{\s*padding: \.45rem 0;\s*\}/g,
    '.legal a {\n        padding: .45rem .85rem;\n      }'
  );
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated legal link padding in ${file}`);
});
