const fs = require('fs');
const html = fs.readFileSync('c:/Users/jhash/Downloads/Sahapathika_Holidays/package-varanasi-tour-packages-from-kerala.html', 'utf-8');

// Find the template string inside <x-dc>
const match = html.match(/<x-dc[^>]*>([\s\S]*?)<\/x-dc>/i);
if (!match) {
    console.log("No <x-dc> found");
    process.exit(1);
}

const templateStr = match[1];

// Count div tags
const divOpens = (templateStr.match(/<div/gi) || []).length;
const divCloses = (templateStr.match(/<\/div>/gi) || []).length;
console.log('div tags: opens=', divOpens, 'closes=', divCloses);

// Count section tags
const secOpens = (templateStr.match(/<section/gi) || []).length;
const secCloses = (templateStr.match(/<\/section>/gi) || []).length;
console.log('section tags: opens=', secOpens, 'closes=', secCloses);

// Count sc-if tags
const ifOpens = (templateStr.match(/<sc-if/gi) || []).length;
const ifCloses = (templateStr.match(/<\/sc-if>/gi) || []).length;
console.log('sc-if tags: opens=', ifOpens, 'closes=', ifCloses);

// Count sc-for tags
const forOpens = (templateStr.match(/<sc-for/gi) || []).length;
const forCloses = (templateStr.match(/<\/sc-for>/gi) || []).length;
console.log('sc-for tags: opens=', forOpens, 'closes=', forCloses);
