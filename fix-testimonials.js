const fs = require('fs');
const path = require('path');

const cwd = 'c:/Users/jhash/Downloads/Sahapathika_Holidays';
const files = fs.readdirSync(cwd).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(cwd, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  let updated = false;

  const targetDiv = '<div style="position:relative;min-height:290px">';
  const newDiv = '<div style="display:grid">';

  if (content.includes(targetDiv)) {
      content = content.replace(targetDiv, newDiv);
      updated = true;
  }

  const targetStyle = "style: 'position:absolute;inset:0;background:#fff;border-radius:26px;padding:40px;box-shadow:0 16px 44px -22px rgba(22,33,29,.28);transition:opacity .6s,transform .6s;opacity:' +";
  const newStyle = "style: 'grid-area:1/1;background:#fff;border-radius:26px;padding:40px;box-shadow:0 16px 44px -22px rgba(22,33,29,.28);transition:opacity .6s,transform .6s;opacity:' +";
  
  if (content.includes(targetStyle)) {
      content = content.replace(targetStyle, newStyle);
      updated = true;
  }
  
  if (updated) {
      fs.writeFileSync(filePath, content);
      console.log('Fixed testimonial layout in ' + file);
  }
});
