const fs = require('fs');
const path = require('path');

const cwd = 'c:/Users/jhash/Downloads/Sahapathika_Holidays';
const files = fs.readdirSync(cwd).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(cwd, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // We want to add og:url, og:image:width, og:image:height right after og:type
  if (!content.includes('og:url')) {
    const url = `https://sahapathika-holidays.vercel.app/${file}`;
    const extras = `
  <meta property="og:url" content="${url}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">`;

    content = content.replace(
      /<meta property="og:type" content="website">/,
      `<meta property="og:type" content="website">${extras}`
    );
    
    fs.writeFileSync(filePath, content);
    console.log(`Added extra OG tags to ${file}`);
  }
});
