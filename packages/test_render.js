const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('c:/Users/jhash/Downloads/Sahapathika_Holidays/package-varanasi-tour-packages-from-kerala.html', 'utf-8');

// Also load support.js so DCLogic can run
const supportJs = fs.readFileSync('c:/Users/jhash/Downloads/Sahapathika_Holidays/support.js', 'utf-8');

const dom = new JSDOM(html, { runScripts: "dangerously" });

// Override console to see what happens
dom.window.console = console;

// Run supportJs manually if it doesn't run from the html automatically
try {
  dom.window.eval(supportJs);
} catch(e) {
  console.log("Error evaluating support.js", e);
}

// wait a bit for react and dclogic to initialize
setTimeout(() => {
  console.log("Checking errors:");
  console.log(dom.window.document.documentElement.innerHTML.substring(0, 500));
}, 1000);
