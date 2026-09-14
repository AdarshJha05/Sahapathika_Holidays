const fs = require('fs');
const path = require('path');

const cwd = 'c:/Users/jhash/Downloads/Sahapathika_Holidays';
const files = fs.readdirSync(cwd).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(cwd, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace the broken regex
  const badRegex = '/^[^s@]+@[^s@]+\\.[^s@]+$/';
  const goodRegex = '/^[^\\\\s@]+@[^\\\\s@]+\\.[^\\\\s@]+$/'; // Double slash for string rep
  
  // wait, the literal text in the file is:
  // /^[^s@]+@[^s@]+\.[^s@]+$/
  
  // let's just do a plain string replacement
  const badStr = '!/^[^s@]+@[^s@]+\\.[^s@]+$/.test(email)';
  const goodStr = '!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)';
  
  if (content.includes(badStr)) {
      content = content.replace(badStr, goodStr);
      fs.writeFileSync(filePath, content);
      console.log('Fixed email validation in ' + file);
  }
});
