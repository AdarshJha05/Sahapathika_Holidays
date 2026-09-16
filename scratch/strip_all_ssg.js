const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (!fullPath.includes('node_modules') && !fullPath.includes('.git') && !fullPath.includes('nextjs-app')) {
        results = results.concat(getHtmlFiles(fullPath));
      }
    } else {
      if (fullPath.endsWith('.html') && !fullPath.includes('scratch')) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

const htmlFiles = getHtmlFiles(root);
let modifiedCount = 0;

htmlFiles.forEach(file => {
  let html = fs.readFileSync(file, 'utf8');
  let changed = false;

  // 1. Remove SSG style block
  const styleStart = html.indexOf('<style id="ssg-style">');
  if (styleStart !== -1) {
    const styleEnd = html.indexOf('</style>', styleStart) + 8;
    if (styleEnd > 8) {
      html = html.substring(0, styleStart) + html.substring(styleEnd);
      changed = true;
    }
  }
  
  // 2. Restore x-dc tag
  if (html.includes('<x-dc style="display:none !important">')) {
    html = html.replace(/<x-dc style="display:none !important">/g, '<x-dc>');
    changed = true;
  }
  
  // 3. Remove all <div id="ssg-content"> blocks entirely!
  // Wait, if there are multiple ssg-content blocks, we should remove all of them.
  let ssgIndex = html.indexOf('<div id="ssg-content">');
  while (ssgIndex !== -1) {
    // Find the end of this ssg-content block
    // We can just find the script tag that follows it, or use regex
    const nextScript = html.indexOf('<script', ssgIndex);
    if (nextScript !== -1) {
      html = html.substring(0, ssgIndex) + html.substring(nextScript);
      changed = true;
    } else {
      break;
    }
    ssgIndex = html.indexOf('<div id="ssg-content">');
  }

  // Also remove `<div class="sc-host" data-sc-name="index">...</div>` if it was appended directly to body
  // Wait, the first one might just be directly in body before <div id="ssg-content">
  // Let's look for `<div class="sc-host" data-sc-name="`
  let hostIndex = html.indexOf('<div class="sc-host" data-sc-name="');
  while (hostIndex !== -1) {
    // If it's directly before a script or before ssg-content
    const nextScript = html.indexOf('<script', hostIndex);
    if (nextScript !== -1) {
      html = html.substring(0, hostIndex) + html.substring(nextScript);
      changed = true;
    } else {
      break;
    }
    hostIndex = html.indexOf('<div class="sc-host" data-sc-name="');
  }
  
  // If there's an orphaned `</div></div>\n</div>` we can clean it up, but it doesn't hurt.
  
  // Let's just do a clean regex for the bloated static HTML inserted by JSDOM:
  // It always inserts after </x-dc>.
  // So we can just delete everything between </x-dc> and the first <script> that follows it!
  const xdcEnd = html.indexOf('</x-dc>');
  if (xdcEnd !== -1) {
    const scriptStart = html.indexOf('<script', xdcEnd);
    if (scriptStart !== -1) {
      const intermediate = html.substring(xdcEnd + 7, scriptStart);
      // Only delete if it contains sc-host or ssg-content
      if (intermediate.includes('sc-host') || intermediate.includes('ssg-content')) {
        html = html.substring(0, xdcEnd + 7) + '\n' + html.substring(scriptStart);
        changed = true;
      }
    }
  }

  if (changed) {
    fs.writeFileSync(file, html, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
