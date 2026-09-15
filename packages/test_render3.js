const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('c:/Users/jhash/Downloads/Sahapathika_Holidays/package-varanasi-tour-packages-from-kerala.html', 'utf-8');
const supportJs = fs.readFileSync('c:/Users/jhash/Downloads/Sahapathika_Holidays/support.js', 'utf-8');

const dom = new JSDOM(html, { runScripts: "dangerously" });
dom.window.console = console;

setTimeout(() => {
  const bodyHtml = dom.window.document.body.innerHTML;
  fs.writeFileSync('c:/Users/jhash/Downloads/Sahapathika_Holidays/packages/jsdom_output.html', bodyHtml);
}, 3000);
