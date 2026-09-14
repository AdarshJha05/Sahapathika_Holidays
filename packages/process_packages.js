const fs = require('fs');
const path = require('path');

const cwd = 'c:/Users/jhash/Downloads/Sahapathika_Holidays';
const extracted = JSON.parse(fs.readFileSync(path.join(cwd, 'packages', 'extracted.json'), 'utf-8'));

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
    'kashmir': 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'varanasi': 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'puri': 'https://images.unsplash.com/photo-1627885408543-c9e99214d0a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'mathura': 'https://images.unsplash.com/photo-1601058349271-e4eb9f315a6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'kashi': 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'ayodhya': 'https://images.unsplash.com/photo-1599813184650-327c13054173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'default': 'https://images.unsplash.com/photo-1601058349271-e4eb9f315a6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
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
    let cat = 'Pilgrimage Yatra';
    let photo = unsplashImages.default;
    
    let t = rawTitle.toLowerCase();
    if (t.includes('kashmir')) {
        region = 'Kashmir Valley';
        cat = 'Hill & Backwater';
        photo = unsplashImages.kashmir;
    } else if (t.includes('puri') || t.includes('odisha') || t.includes('bhubaneswar')) {
        region = 'East India';
        cat = 'Heritage & Temple';
        photo = unsplashImages.puri;
    } else if (t.includes('varanasi') || t.includes('kashi') || t.includes('ayodhya') || t.includes('mathura')) {
        region = 'North India';
        cat = 'Pilgrimage Yatra';
        if (t.includes('varanasi') || t.includes('kashi')) photo = unsplashImages.varanasi;
        else if (t.includes('ayodhya')) photo = unsplashImages.ayodhya;
        else if (t.includes('mathura')) photo = unsplashImages.mathura;
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
fs.writeFileSync(path.join(cwd, 'packages', 'new_packages.json'), JSON.stringify(newPackages, null, 2));
console.log('Processed', newPackages.length, 'packages into new_packages.json');
