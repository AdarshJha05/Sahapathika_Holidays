const fs = require('fs');
const path = require('path');

const cwd = 'c:/Users/jhash/Downloads/Sahapathika_Holidays';
const files = fs.readdirSync(cwd).filter(f => f.endsWith('.html'));

const newPackages = JSON.parse(fs.readFileSync(path.join(cwd, 'new_packages', 'new_packages.json'), 'utf-8'));

let newPackagesStr = "";
newPackages.forEach(pkg => {
    let p = pkg.obj;
    newPackagesStr += `    { slug: '${p.slug}', title: '${p.title.replace(/'/g, "\\'")}', regions: '${p.regions.replace(/'/g, "\\'")}', region: '${p.region}', duration: '${p.duration}', cat: '${p.cat}', photo: '${p.photo}', hint: '${p.hint.replace(/'/g, "\\'")}' },\n`;
});

files.forEach(file => {
    const filePath = path.join(cwd, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    let updated = false;

    if (!content.includes(newPackages[0].obj.slug)) {
        const packagesRegex = /packages\s*=\s*\[/g;
        if (packagesRegex.test(content)) {
            content = content.replace(packagesRegex, `packages = [\n${newPackagesStr}`);
            updated = true;
        }
    }

    if (updated) {
        fs.writeFileSync(filePath, content);
        console.log('Injected new packages into', file);
    }
});
