const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('c:/Users/jhash/Downloads/Sahapathika_Holidays/package-varanasi-tour-packages-from-kerala.html', 'utf-8');
const supportJs = fs.readFileSync('c:/Users/jhash/Downloads/Sahapathika_Holidays/support.js', 'utf-8');

const dom = new JSDOM(html, { runScripts: "dangerously" });
dom.window.console = console;

setTimeout(() => {
  const bodyHtml = dom.window.document.body.innerHTML;
  if (bodyHtml.includes('dtl-main')) {
    console.log("dtl-main found!");
  } else {
    console.log("dtl-main MISSING");
  }
  if (bodyHtml.includes('Reviews')) {
    console.log("Reviews found!");
  } else {
    console.log("Reviews MISSING");
  }
}, 3000);
