const fs = require('fs');
const { JSDOM } = require('jsdom');
const path = require('path');

async function buildSSG() {
  const files = fs.readdirSync('.').filter(f => (f.startsWith('package-') || f === 'packages.html' || f === 'index.html') && f.endsWith('.html'));
  
  for (const file of files) {
    if (file === 'test-packages-out.html' || file.startsWith('test-') || file.includes('jsdom_output')) continue;

    console.log(`Processing ${file}...`);
    let originalHtml = fs.readFileSync(file, 'utf8');

    if (!originalHtml.includes('<x-dc>')) continue;
    if (originalHtml.includes('id="ssg-content"')) continue;

    try {
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

      // Inject mocks for ResizeObserver and fetch
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
      ${externalScripts}
      `;
      testHtml = testHtml.replace('<head>', '<head>' + polyfills);

      const dom = new JSDOM(testHtml, {
        runScripts: "dangerously",
        resources: "usable",
        url: "http://localhost/" + file,
      });

      // Wait for React to mount (up to 5 seconds)
      let waitCount = 0;
      let dcRoot;
      while (waitCount < 50) {
        dcRoot = dom.window.document.getElementById('dc-root');
        if (dcRoot && dcRoot.innerHTML.trim().length > 100) {
          break;
        }
        await new Promise(resolve => setTimeout(resolve, 100));
        waitCount++;
      }
      
      if (!dcRoot || dcRoot.innerHTML.trim().length <= 100) {
        console.error(`Failed to render ${file}: #dc-root is empty or missing`);
        dom.window.close();
        continue;
      }

      const renderedHtml = dcRoot.innerHTML;
      
      const ssgCss = `
  <style id="ssg-style">
    /* Hide the raw template so users don't see {{ tokens }} */
    x-dc { display: none !important; }
    /* Hide the SSG content once React has mounted and populated dc-root */
    #dc-root:not(:empty) + #ssg-content { display: none !important; }
  </style>
`;
      originalHtml = originalHtml.replace('</head>', ssgCss + '</head>');
      originalHtml = originalHtml.replace(/<x-dc(?:\s[^>]*)?>/, '<x-dc style="display:none !important">');

      const ssgBlock = `\n<div id="ssg-content">\n${renderedHtml}\n</div>\n`;
      originalHtml = originalHtml.replace('</x-dc>', '</x-dc>' + ssgBlock);

      fs.writeFileSync(file, originalHtml, 'utf8');
      console.log(`Successfully generated SSG for ${file}`);
      
      // Prevent JSDOM memory leaks and hanging timers
      dom.window.close();
      
    } catch (e) {
      console.error(`Error processing ${file}:`, e);
    }
  }
}

buildSSG();
