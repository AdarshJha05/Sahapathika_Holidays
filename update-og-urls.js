const fs = require('fs');
const path = require('path');

const cwd = 'c:/Users/jhash/Downloads/Sahapathika_Holidays';
const files = fs.readdirSync(cwd).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(cwd, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Replace Pinterest and Cloudfront URLs with local absolute URLs
  // e.g. https://d2ol7oe51mr4n9.cloudfront.net/.../4f690bd1-...png -> https://sahapathika-holidays.vercel.app/og-images/default.png
  // e.g. https://i.pinimg.com/.../some.jpg -> https://sahapathika-holidays.vercel.app/og-images/slug.jpg

  const slugMatch = content.match(/slug:\s*'([^']+)'/);
  const slug = slugMatch ? slugMatch[1] : null;

  // We need to replace the content of og:image
  content = content.replace(/<meta property="og:image" content="([^"]+)">/, (match, url) => {
    if (url.includes('pinimg.com')) {
      let ext = url.split('.').pop();
      if (ext.length > 4) ext = 'jpg';
      return `<meta property="og:image" content="https://sahapathika-holidays.vercel.app/og-images/${slug}.${ext}">`;
    } else {
      return `<meta property="og:image" content="https://sahapathika-holidays.vercel.app/og-images/default.png">`;
    }
  });

  fs.writeFileSync(filePath, content);
  console.log(`Updated OG image URL in ${file}`);
});
