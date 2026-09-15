const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'contact.html');
let content = fs.readFileSync(filePath, 'utf8');

// Replace map template
const oldTemplateRegex = /<div style="height:150px;background:#DCEEE7;position:relative;display:flex;align-items:center;justify-content:center">[\s\S]*?\{\{\s*o\.city\s*\}\}\s*—\s*—\s*MAP\s*EMBED\s*<\/span>\s*<\/div>/g;

const newTemplate = `<div style="height:250px;background:#DCEEE7;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden">
                <iframe src="{{ o.embed }}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>`;

if (oldTemplateRegex.test(content)) {
    content = content.replace(oldTemplateRegex, newTemplate);
    console.log("Template matched and replaced.");
} else {
    console.log("Template NOT matched.");
}

// Replace offices data array
const oldDataRegex = /offices:\s*\[\s*\{\s*city:\s*'Kochi'[^\]]+\]/g;
const newData = `offices: [
        { city: 'Kochi', address: '14/5H, 2nd Floor, Thomson and Mathews Building, NH 544, Opposite Navya Bakery, Athani, Airport Junction, Kochi, Kerala 683585', embed: 'https://www.google.com/maps?q=14/5H,+2nd+Floor,+Thomson+and+Mathews+Building,+NH+544,+Opposite+Navya+Bakery,+Athani,+Airport+Junction,+Kochi,+Kerala+683585&output=embed' },
        { city: 'New Delhi', address: 'House Plot no 476, Bharthal Dwarka Expressway, Opp: IICC Yashobhoomi, Sec 26 Dwarka, New Delhi 110077', embed: 'https://www.google.com/maps?q=House+Plot+no+476,+Bharthal+Dwarka+Expressway,+Opp:+IICC+Yashobhoomi,+Sec+26+Dwarka,+New+Delhi+110077&output=embed' }
      ]`;

if (oldDataRegex.test(content)) {
    content = content.replace(oldDataRegex, newData);
    console.log("Data matched and replaced.");
} else {
    console.log("Data NOT matched.");
}

fs.writeFileSync(filePath, content, 'utf8');
