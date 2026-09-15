const fs = require('fs');
const { JSDOM } = require('jsdom');

let originalHtml = fs.readFileSync('packages.html', 'utf8');
console.log('Read packages.html, length:', originalHtml.length);

if (!originalHtml.includes('<x-dc>')) {
  console.log('No x-dc found');
  process.exit();
}
if (originalHtml.includes('id="ssg-content"')) {
  console.log('Already has ssg-content');
  process.exit();
}

let testHtml = originalHtml;
const scriptRegex = /<script(?:\s+[^>]*?)?\s+src="([^"]+)"(?:\s+[^>]*?)?><\/script>/g;

let externalScripts = '';
testHtml = testHtml.replace(scriptRegex, (match, srcPath) => {
  if (srcPath.startsWith('http') || srcPath.startsWith('//')) return match;
  const cleanPath = srcPath.replace('./', '');
  try {
    const content = fs.readFileSync(cleanPath, 'utf8');
    externalScripts += `\n<script>${content}</script>\n`;
    return ''; // Remove from original location
  } catch(e) {
    console.warn('Could not load script:', cleanPath);
    return match;
  }
});

const polyfills = `
<script>
  window.ResizeObserver = class ResizeObserver {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  window.fetch = function() {
    return Promise.resolve({
      ok: true,
      text: () => Promise.resolve("")
    });
  };
  window.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };
</script>
`;
testHtml = testHtml.replace('</head>', polyfills + externalScripts + '</head>');

console.log('Creating JSDOM...');
const dom = new JSDOM(testHtml, { runScripts: "dangerously", url: "http://localhost/packages.html" });

let waitCount = 0;
let dcRoot;

console.log('Waiting for React...');

const checkLoop = setInterval(() => {
  dcRoot = dom.window.document.getElementById('dc-root');
  if (dcRoot && dcRoot.innerHTML.trim().length > 100) {
    clearInterval(checkLoop);
    console.log('Success!');
    const renderedHtml = dcRoot.innerHTML;
    const ssgBlock = `\n<div id="ssg-content">\n${renderedHtml}\n</div>\n`;
    originalHtml = originalHtml.replace('</x-dc>', '</x-dc>' + ssgBlock);
    fs.writeFileSync('packages.html', originalHtml, 'utf8');
    console.log('Saved packages.html');
    dom.window.close();
  } else {
    waitCount++;
    console.log('Wait', waitCount, dcRoot ? dcRoot.innerHTML.length : 'no root');
    if (waitCount >= 50) {
      clearInterval(checkLoop);
      console.log('Timeout');
      dom.window.close();
    }
  }
}, 100);
