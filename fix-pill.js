const fs = require('fs');
const path = require('path');

const cwd = 'c:/Users/jhash/Downloads/Sahapathika_Holidays';
const files = fs.readdirSync(cwd).filter(f => f.endsWith('.html'));

const cssToInject = `
  .nl-pill { transition: box-shadow 0.2s ease; }
  .nl-pill:focus-within { box-shadow: 0 0 0 3px rgba(229,72,61,.22), 0 0 0 1px rgba(229,72,61,.55) !important; }
  .nl-pill input:focus, .nl-pill input:focus-visible { outline: none !important; box-shadow: none !important; }
`;

files.forEach(file => {
  const filePath = path.join(cwd, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  const targetDiv = '<div style="display:flex;gap:10px;background:#FAF6EF;border-radius:999px;padding:8px 8px 8px 24px;box-shadow:0 12px 30px -16px rgba(22,33,29,.3)">';
  const newDiv = '<div class="nl-pill" style="display:flex;gap:10px;background:#FAF6EF;border-radius:999px;padding:8px 8px 8px 24px;box-shadow:0 12px 30px -16px rgba(22,33,29,.3)">';
  
  let updated = false;

  if (content.includes(targetDiv)) {
      content = content.replace(targetDiv, newDiv);
      updated = true;
  }
  
  if (updated && !content.includes('.nl-pill:focus-within')) {
      content = content.replace('<style>', '<style>' + cssToInject);
      fs.writeFileSync(filePath, content);
      console.log('Fixed pill focus in ' + file);
  }
});
