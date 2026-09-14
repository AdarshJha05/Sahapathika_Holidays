const fs = require('fs');
const path = require('path');

const cwd = 'c:/Users/jhash/Downloads/Sahapathika_Holidays';
const files = fs.readdirSync(cwd).filter(f => f.endsWith('.html'));

const newPackages = JSON.parse(fs.readFileSync(path.join(cwd, 'packages', 'new_packages.json'), 'utf-8'));

// Format new packages as string
let newPackagesStr = "";
newPackages.forEach(pkg => {
    let p = pkg.obj;
    newPackagesStr += `    { slug: '${p.slug}', title: '${p.title.replace(/'/g, "\\'")}', regions: '${p.regions.replace(/'/g, "\\'")}', region: '${p.region}', duration: '${p.duration}', cat: '${p.cat}', photo: '${p.photo}', hint: '${p.hint.replace(/'/g, "\\'")}' },\n`;
});

files.forEach(file => {
    const filePath = path.join(cwd, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    let updated = false;

    // Update catColor if not already updated
    if (!content.includes("'Pilgrimage Yatra': '#B5822A'")) {
        const catColorTarget = `'Honeymoon': '#C4362C'\n  };`;
        const catColorNew = `'Honeymoon': '#C4362C', 'Pilgrimage Yatra': '#B5822A', 'Kashmir Valley': '#2F7A63', 'East India': '#B5822A'\n  };`;
        if (content.includes(catColorTarget)) {
            content = content.replace(catColorTarget, catColorNew);
            updated = true;
        } else {
            const catColorTarget2 = `'Honeymoon': '#C4362C'\r\n  };`;
            const catColorNew2 = `'Honeymoon': '#C4362C', 'Pilgrimage Yatra': '#B5822A', 'Kashmir Valley': '#2F7A63', 'East India': '#B5822A'\r\n  };`;
            if (content.includes(catColorTarget2)) {
                content = content.replace(catColorTarget2, catColorNew2);
                updated = true;
            }
        }
    }

    // Update packages array
    // Find the end of the packages array, or just insert after "packages = [\n"
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
