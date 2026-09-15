const fs = require('fs');
const path = require('path');

const cwd = 'c:/Users/jhash/Downloads/Sahapathika_Holidays';
const files = fs.readdirSync(cwd).filter(f => f.startsWith('package-') && f.endsWith('.html'));

const newPackages = JSON.parse(fs.readFileSync(path.join(cwd, 'new_packages', 'new_packages.json'), 'utf-8'));

let newItineraryStrings = "";
newPackages.forEach(pkg => {
    let p = pkg.obj;
    let newItinerary = `\n    '${p.slug}': [\n`;
    pkg.raw.days.forEach(day => {
        let t = day.title.replace(/'/g, "\\'");
        let b = day.body.replace(/'/g, "\\'").replace(/\n/g, "<br>");
        newItinerary += `      { title: '${t}', body: '${b}' },\n`;
    });
    newItinerary += "    ],";
    newItineraryStrings += newItinerary;
});

files.forEach(file => {
    const filePath = path.join(cwd, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Only inject if it's not already injected
    if (!content.includes(`'${newPackages[0].obj.slug}': [`)) {
        // Find itineraries = {
        if (content.includes('itineraries = {')) {
            content = content.replace('itineraries = {', `itineraries = {${newItineraryStrings}`);
            fs.writeFileSync(filePath, content, 'utf-8');
            console.log('Injected itineraries into', file);
        }
    }
});
