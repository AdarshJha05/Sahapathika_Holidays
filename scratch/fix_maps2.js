const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'contact.html');
let content = fs.readFileSync(filePath, 'utf8');

// The current iframe line is:
// <iframe src="{{ o.embed }}" width="100%" height="100%" style="border:0;display:block;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

const oldIframe = '<iframe src="{{ o.embed }}" width="100%" height="100%" style="border:0;display:block;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
const newIframe = '<iframe src="{{ o.embed }}" style="position:absolute; top:0; left:0; width:100%; height:100%; border:0; display:block;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';

content = content.replace(oldIframe, newIframe);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed iframe CSS.');
