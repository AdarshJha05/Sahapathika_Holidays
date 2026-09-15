const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/jhash/Downloads/Sahapathika_Holidays';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf-8');
    let original = content;

    // Remove overscroll-behavior-y from inline styles
    content = content.replace(/ overscroll-behavior-y: contain;/g, "");
    
    // Remove overscroll-behavior-y from CSS blocks
    content = content.replace(/overscroll-behavior-y:\s*contain;\s*/g, "");

    if (content !== original) {
        fs.writeFileSync(path.join(dir, file), content, 'utf-8');
        console.log(`Fixed overscroll in ${file}`);
    }
});
