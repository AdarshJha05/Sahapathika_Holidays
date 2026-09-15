const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'contact.html');
let content = fs.readFileSync(filePath, 'utf8');

// Replace map template
const oldTemplateRegex = /<div style="height:250px;background:#DCEEE7;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden">\s*<iframe src="\{\{\s*o\.embed\s*\}\}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"><\/iframe>\s*<\/div>/g;

const newTemplate = `<div style="height:250px;background:#DCEEE7;position:relative;overflow:hidden">
                <iframe src="{{ o.embed }}" width="100%" height="100%" style="border:0;display:block;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                <a href="{{ o.dir }}" target="_blank" rel="noopener" style="position:absolute;top:12px;right:12px;background:#fff;color:#1A73E8;padding:8px 14px;border-radius:4px;font-size:13px;font-weight:700;text-decoration:none;box-shadow:0 2px 6px rgba(0,0,0,0.3);display:flex;align-items:center;gap:6px;font-family:sans-serif">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21.71 11.29l-9-9c-.39-.39-1.02-.39-1.41 0l-9 9c-.39.39-.39 1.02 0 1.41l9 9c.39.39 1.02.39 1.41 0l9-9c.39-.38.39-1.01 0-1.41zM14 14.5V12h-4v3H8v-4c0-.55.45-1 1-1h5V7.5l3.5 3.5-3.5 3.5z"/></svg>
                  Directions
                </a>
              </div>`;

if (oldTemplateRegex.test(content)) {
    content = content.replace(oldTemplateRegex, newTemplate);
    console.log("Template matched and replaced.");
} else {
    console.log("Template NOT matched.");
}

// Replace offices data array
const oldDataRegex = /offices:\s*\[[\s\S]*?\]/g;
const newData = `offices: [
        { city: 'Kochi', address: '14/5H, 2nd Floor, Thomson and Mathews Building, NH 544, Opposite Navya Bakery, Athani, Airport Junction, Kochi, Kerala 683585', embed: 'https://www.google.com/maps?q=14/5H,+2nd+Floor,+Thomson+and+Mathews+Building,+NH+544,+Opposite+Navya+Bakery,+Athani,+Airport+Junction,+Kochi,+Kerala+683585&output=embed', dir: 'https://www.google.com/maps/dir/?api=1&destination=14/5H,+2nd+Floor,+Thomson+and+Mathews+Building,+NH+544,+Opposite+Navya+Bakery,+Athani,+Airport+Junction,+Kochi,+Kerala+683585' },
        { city: 'New Delhi', address: 'House Plot no 476, Bharthal Dwarka Expressway, Opp: IICC Yashobhoomi, Sec 26 Dwarka, New Delhi 110077', embed: 'https://www.google.com/maps?q=House+Plot+no+476,+Bharthal+Dwarka+Expressway,+Opp:+IICC+Yashobhoomi,+Sec+26+Dwarka,+New+Delhi+110077&output=embed', dir: 'https://www.google.com/maps/dir/?api=1&destination=House+Plot+no+476,+Bharthal+Dwarka+Expressway,+Opp:+IICC+Yashobhoomi,+Sec+26+Dwarka,+New+Delhi+110077' }
      ]`;

if (oldDataRegex.test(content)) {
    content = content.replace(oldDataRegex, newData);
    console.log("Data matched and replaced.");
} else {
    console.log("Data NOT matched.");
}

fs.writeFileSync(filePath, content, 'utf8');
