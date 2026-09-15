const fs = require('fs');
const h = fs.readFileSync('index.html', 'utf8');
const a = h.includes('<div id="ssg-content">');
const b = h.includes('<x-dc>');
const c = h.includes('<style id="ssg-style">');
const d = h.includes('~ #ssg-content');
console.log(JSON.stringify({ ssgContent: a, xdc: b, ssgStyle: c, combinator: d }));
