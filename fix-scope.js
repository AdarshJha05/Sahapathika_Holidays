const fs = require('fs');
const path = require('path');

const filePath = 'c:/Users/jhash/Downloads/Sahapathika_Holidays/contact.html';
let content = fs.readFileSync(filePath, 'utf-8');

// The issue is that errorMsg isn't exposed from state to the template rendering context.
// Find: form: s.form, sent: s.sent, notSent: !s.sent,
// Replace with: form: s.form, sent: s.sent, notSent: !s.sent, errorMsg: s.errorMsg,

content = content.replace(
  'form: s.form, sent: s.sent, notSent: !s.sent,',
  'form: s.form, sent: s.sent, notSent: !s.sent, errorMsg: s.errorMsg,'
);

fs.writeFileSync(filePath, content);
console.log('Exposed errorMsg to template scope');
