const fs = require('fs');

let testHtml = fs.readFileSync('package-beach-and-backwater-tour.html', 'utf8');
const scriptRegex = /<script\s+src="([^"]+)"><\/script>/g;

testHtml = testHtml.replace(scriptRegex, (match, srcPath) => {
  if (srcPath.startsWith('http') || srcPath.startsWith('//')) return match;
  const cleanPath = srcPath.replace('./', '');
  try {
    const content = fs.readFileSync(cleanPath, 'utf8');
    return `<script>${content}</script>`;
  } catch(e) {
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
  window.requestAnimationFrame = function(cb) { return setTimeout(cb, 0); };
  window.cancelAnimationFrame = function(id) { clearTimeout(id); };
</script>
`;
testHtml = testHtml.replace('<head>', '<head>' + polyfills);

fs.writeFileSync('debug.html', testHtml);
