const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'package-varanasi-tour-packages-from-kerala.html');

let content = fs.readFileSync(file, 'utf8');

const insertionPoint = "          <h2 style=\"font-family:'Fraunces',serif;font-weight:400;font-size:32px;letter-spacing:-.02em;margin:0 0 8px\">Reviews</h2>";
const mapCode = `          <h2 style="font-family:'Fraunces',serif;font-weight:400;font-size:32px;letter-spacing:-.02em;margin:0 0 20px">Where you'll be</h2>
          <div style="height:350px;border-radius:22px;overflow:hidden;background:#DCEEE7;position:relative;margin-bottom:48px;border:1px solid rgba(95,169,140,.4)">
            <iframe src="{{ detail.mapUrl }}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allowfullscreen loading="lazy"></iframe>
          </div>

          <h2 style="font-family:'Fraunces',serif;font-weight:400;font-size:32px;letter-spacing:-.02em;margin:0 0 8px">Reviews</h2>`;

if (content.includes(insertionPoint) && !content.includes("Where you'll be")) {
  content = content.replace(insertionPoint, mapCode);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Map inserted in package-varanasi-tour-packages-from-kerala.html');
} else {
  console.log('Insertion point not found or map already exists.');
}
