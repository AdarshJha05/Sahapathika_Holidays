const fs = require('fs');
const path = require('path');

const filePath = 'c:/Users/jhash/Downloads/Sahapathika_Holidays/contact.html';
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Change sc-if condition to explicitly check against empty string
content = content.replace('<sc-if value="{{ errorMsg }}"', '<sc-if value="{{ errorMsg !== \'\' }}"');

// 2. Add * to mandatory field labels
const asterix = ' <span style="color:#E5483D">*</span>';

content = content.replace('>Your name</span>', `>Your name${asterix}</span>`);
content = content.replace('>Phone</span>', `>Phone${asterix}</span>`);
content = content.replace('>Email</span>', `>Email${asterix}</span>`);
content = content.replace('>Travel dates</span>', `>Travel dates${asterix}</span>`);
content = content.replace('>Interested package</span>', `>Interested package${asterix}</span>`);

fs.writeFileSync(filePath, content);
console.log('Fixed error condition and added asterisks to contact.html');
