const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');

const dir = 'c:/Users/jhash/Downloads/Sahapathika_Holidays/new_packages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.docx'));

async function extract() {
  for (const file of files) {
    const p = path.join(dir, file);
    const result = await mammoth.extractRawText({path: p});
    const text = result.value;
    fs.writeFileSync(path.join(dir, file.replace('.docx', '.txt')), text);
    console.log(`Extracted: ${file}`);
  }
}

extract().catch(console.error);
