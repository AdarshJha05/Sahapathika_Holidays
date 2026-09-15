const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/jhash/Downloads/Sahapathika_Holidays';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const scrollbarCSS = `
  /* Custom scrollbar for accordions */
  .sc-accordion-scroll {
    overscroll-behavior-y: contain;
    /* Ensure hardware acceleration for smooth scrolling on iOS */
    transform: translateZ(0);
  }
  .sc-accordion-scroll::-webkit-scrollbar { width: 6px; }
  .sc-accordion-scroll::-webkit-scrollbar-track { background: transparent; }
  .sc-accordion-scroll::-webkit-scrollbar-thumb { background: rgba(58, 74, 68, 0.25); border-radius: 4px; }
  .sc-accordion-scroll::-webkit-scrollbar-thumb:hover { background: rgba(58, 74, 68, 0.45); }
`;

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf-8');
    let changed = false;

    // Inject class into HTML
    if (content.includes('<div style="{{ d.bodyStyle }}">')) {
        content = content.replace(/<div style="\{\{ d\.bodyStyle \}\}">/g, '<div class="sc-accordion-scroll" style="{{ d.bodyStyle }}">');
        changed = true;
    }
    if (content.includes('<div style="{{ f.bodyStyle }}">')) {
        content = content.replace(/<div style="\{\{ f\.bodyStyle \}\}">/g, '<div class="sc-accordion-scroll" style="{{ f.bodyStyle }}">');
        changed = true;
    }

    // Inject CSS
    if (changed && !content.includes('.sc-accordion-scroll')) {
        if (content.includes('</style>')) {
            content = content.replace('</style>', scrollbarCSS + '</style>');
        }
    }

    if (changed) {
        fs.writeFileSync(path.join(dir, file), content, 'utf-8');
        console.log(`Fixed in ${file}`);
    }
});
