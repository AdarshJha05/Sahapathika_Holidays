const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/jhash/Downloads/Sahapathika_Holidays';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    let changed = false;

    if (content.includes("open ? '400px' : '0'")) {
        content = content.replace(/open \? '400px' : '0'/g, "open ? '4000px' : '0'");
        // Also remove overflow-y: auto if present, just use hidden so it expands fully
        content = content.replace(/overflow-y:' \+ \(open \? 'auto' : 'hidden'\)/g, "overflow-y:' + (open ? 'visible' : 'hidden')");
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated max-height in ${file}`);
    }
});
