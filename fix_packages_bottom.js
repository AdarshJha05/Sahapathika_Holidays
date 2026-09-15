const fs = require('fs');

const current = fs.readFileSync('packages.html', 'utf8');
const old = fs.readFileSync('old_packages.html', 'utf8');

const xdcIndex = current.indexOf('</x-dc>');
const currentTop = current.substring(0, xdcIndex + 7);

const oldXdcIndex = old.indexOf('</x-dc>');
const oldBottom = old.substring(oldXdcIndex + 7);

// Fix the v.play().catch error for JSDOM in oldBottom
let fixedBottom = oldBottom
  .replace(/v\.play\(\)\.catch\(function\(\)\{\}\);/g, "if(v.play) { var p = v.play(); if (p && p.catch) p.catch(function(){}); }")
  .replace(/n\.play\(\)\.catch\(function\(\)\{\}\);/g, "if(n.play) { var p = n.play(); if (p && p.catch) p.catch(function(){}); }");

fs.writeFileSync('packages.html', currentTop + fixedBottom, 'utf8');
console.log('Fixed packages.html');
