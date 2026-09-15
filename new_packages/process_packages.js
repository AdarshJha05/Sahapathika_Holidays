const fs = require('fs');
const path = require('path');

const cwd = 'c:/Users/jhash/Downloads/Sahapathika_Holidays/new_packages';
const extracted = JSON.parse(fs.readFileSync(path.join(cwd, 'extracted.json'), 'utf-8'));

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '')             // Trim - from end of text
        .substring(0, 50);              // Keep it somewhat short
}

const unsplashImages = {
    'shimla': 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'amritsar': 'https://images.unsplash.com/photo-1590393802688-e21976a445e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'devi': 'https://images.unsplash.com/photo-1601058349271-e4eb9f315a6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'default': 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
};

const newPackages = [];

extracted.forEach(pkg => {
    let rawTitle = pkg.title.split('\\n')[0].trim();
    if (!rawTitle) rawTitle = pkg.filename.replace('.docx', '');
    
    // Clean up title
    rawTitle = rawTitle.replace(/Tour Package from Kerala/ig, '').trim();
    rawTitle = rawTitle.replace(/Package from Kerala/ig, '').trim();
    rawTitle = rawTitle.replace(/[^\w\s\-&]/g, ' ').trim();
    rawTitle = rawTitle.replace(/-+/g, '-').trim();
    if (rawTitle.endsWith('-')) rawTitle = rawTitle.slice(0, -1).trim();

    let durationMatch = rawTitle.match(/(\d+N\s*\d+D|\d+\s*Days?\s*\d+\s*Nights?)/i);
    let duration = durationMatch ? durationMatch[1] : "On enquiry";
    if (durationMatch) {
        rawTitle = rawTitle.replace(durationMatch[0], '').trim();
        if (rawTitle.endsWith('-')) rawTitle = rawTitle.slice(0, -1).trim();
    }

    let slug = slugify(rawTitle);
    
    let region = 'North India';
    let cat = 'Hill & Backwater';
    let photo = unsplashImages.default;
    
    let t = rawTitle.toLowerCase();
    if (t.includes('shimla') || t.includes('manali')) {
        region = 'North India';
        cat = 'Hill & Backwater';
        photo = unsplashImages.shimla;
        if (t.includes('amritsar')) photo = unsplashImages.amritsar;
    } 
    if (t.includes('devi yatra')) {
        region = 'North India';
        cat = 'Pilgrimage Yatra';
        photo = unsplashImages.devi;
    }

    let p = {
        slug: slug,
        title: rawTitle,
        regions: rawTitle,
        region: region,
        duration: duration,
        cat: cat,
        photo: photo,
        hint: rawTitle
    };
    
    newPackages.push({ obj: p, raw: pkg });
});

// Write to JSON for review
fs.writeFileSync(path.join(cwd, 'new_packages.json'), JSON.stringify(newPackages, null, 2));
console.log('Processed', newPackages.length, 'packages into new_packages.json');
