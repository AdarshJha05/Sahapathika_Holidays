const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/jhash/Downloads/Sahapathika_Holidays';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf-8');
    let changed = false;

    // 1. Fix the bodyStyle logic to be purely a transition wrapper (no overflow auto on the animating element)
    if (content.includes("overflow-y:' + (open ? 'auto' : 'hidden')")) {
        content = content.replace(/overflow-y:' \+ \(open \? 'auto' : 'hidden'\) \+ ';overflow-x:hidden;-webkit-overflow-scrolling:touch;/g, "overflow:hidden;");
        changed = true;
    }

    // 2. Wrap the text in an inner scrolling div that has a fixed max-height and auto scroll
    const oldDayHtml = '<div class="sc-accordion-scroll" style="{{ d.bodyStyle }}"><p style="margin:0;padding:0 24px 22px;font-size:15px;line-height:1.75;color:#3A4A44">{{ d.body }}</p></div>';
    const newDayHtml = '<div style="{{ d.bodyStyle }}"><div class="sc-accordion-scroll" style="max-height: 350px; overflow-y: auto; -webkit-overflow-scrolling: touch; overscroll-behavior-y: contain;"><p style="margin:0;padding:0 24px 22px;font-size:15px;line-height:1.75;color:#3A4A44">{{ d.body }}</p></div></div>';
    
    if (content.includes(oldDayHtml)) {
        content = content.replace(oldDayHtml, newDayHtml);
        changed = true;
    }

    const oldFaqHtml = '<div class="sc-accordion-scroll" style="{{ f.bodyStyle }}"><p style="margin:0;padding:0 22px 20px;font-size:14.5px;line-height:1.7;color:#3A4A44">{{ f.a }}</p></div>';
    const newFaqHtml = '<div style="{{ f.bodyStyle }}"><div class="sc-accordion-scroll" style="max-height: 350px; overflow-y: auto; -webkit-overflow-scrolling: touch; overscroll-behavior-y: contain;"><p style="margin:0;padding:0 22px 20px;font-size:14.5px;line-height:1.7;color:#3A4A44">{{ f.a }}</p></div></div>';
    
    if (content.includes(oldFaqHtml)) {
        content = content.replace(oldFaqHtml, newFaqHtml);
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(path.join(dir, file), content, 'utf-8');
        console.log(`Fixed wrapper in ${file}`);
    }
});
