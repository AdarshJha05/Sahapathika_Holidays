const fs = require('fs');
const jsCode = fs.readFileSync('c:/Users/jhash/Downloads/Sahapathika_Holidays/packages/update_varanasi2.js', 'utf-8');
const match = jsCode.match(/const articleHtml = `([\s\S]*?)`;/);
if (match) {
  const html = match[1];
  console.log('Opens:', (html.match(/<div/gi)||[]).length, 'Closes:', (html.match(/<\/div>/gi)||[]).length);
}
