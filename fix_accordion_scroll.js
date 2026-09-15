const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/jhash/Downloads/Sahapathika_Holidays';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    let changed = false;

    if (content.includes("open ? '4000px' : '0'")) {
        // Change back to a smaller max-height and auto scroll
        content = content.replace(/open \? '4000px' : '0'/g, "open ? '350px' : '0'");
        content = content.replace(/overflow-y:' \+ \(open \? 'visible' : 'hidden'\)/g, "overflow-y:' + (open ? 'auto' : 'hidden')");
        
        // Ensure webkit scroll is smooth
        if (!content.includes('webkit-overflow-scrolling')) {
            content = content.replace(/overflow-x:hidden;/g, "overflow-x:hidden;-webkit-overflow-scrolling:touch;");
        }
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated accordion scroll in ${file}`);
    }
});
