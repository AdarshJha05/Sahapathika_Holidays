const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/jhash/Downloads/Sahapathika_Holidays';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf-8');
    let original = content;

    // 1. Replace body string with array of strings
    content = content.replace(/body:\s*'((?:[^'\\]|\\.)*)'/g, (match, stringContent) => {
        let paragraphs = stringContent.split('<br>');
        let arrayStr = paragraphs.map(p => `'${p}'`).join(', ');
        return `body: [${arrayStr}]`;
    });

    // 2. Replace the HTML rendering of d.body
    const oldHtml = '<p style="margin:0;padding:0 24px 22px;font-size:15px;line-height:1.75;color:#3A4A44">{{ d.body }}</p>';
    const newHtml = '<div style="padding:0 24px 22px;display:flex;flex-direction:column;gap:12px;"><sc-for list="{{ d.body }}" as="para"><p style="margin:0;font-size:15px;line-height:1.75;color:#3A4A44">{{ para }}</p></sc-for></div>';
    
    if (content.includes(oldHtml)) {
        content = content.replace(oldHtml, newHtml);
    }

    if (content !== original) {
        fs.writeFileSync(path.join(dir, file), content, 'utf-8');
        console.log(`Updated <br> to array in ${file}`);
    }
});
