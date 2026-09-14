const fs = require('fs');
const path = require('path');

const cwd = 'c:/Users/jhash/Downloads/Sahapathika_Holidays';
const newPackages = JSON.parse(fs.readFileSync(path.join(cwd, 'packages', 'new_packages.json'), 'utf-8'));

const templatePath = path.join(cwd, 'package-scenic-beautiful-kerala.html');
let templateHtml = fs.readFileSync(templatePath, 'utf-8');

// The template has specific things we need to replace:
// Title: <title>Scenic & Beautiful Kerala ...</title>
// Hero image: <div style="position:absolute;inset:0;background:url(...)
// Hero Title: Scenic & Beautiful Kerala
// Hero regions: Cochin ...
// Duration: 5N / 6D
// Itinerary loop: We need to replace the itineraryData array inside the script!
// What about FAQ? faqData array.

newPackages.forEach(pkg => {
    let p = pkg.obj;
    let html = templateHtml;

    // Replace Title tag
    html = html.replace(/<title>.*?<\/title>/, `<title>${p.title} | Sahapathika Holidays</title>`);

    // Replace Hero Image (there are two places: meta og:image, and the background url)
    html = html.replace(/<meta property="og:image" content=".*?"\/>/, `<meta property="og:image" content="${p.photo}"/>`);
    html = html.replace(/background:url\('.*?'\)/g, `background:url('${p.photo}')`);

    // Replace Title in Hero
    html = html.replace(/<div style="font-family:'Fraunces',serif;font-size:clamp\(42px,7vw,76px\);font-weight:600;line-height:1\.05;margin-bottom:20px;text-wrap:balance">.*?<\/div>/s, 
        `<div style="font-family:'Fraunces',serif;font-size:clamp(42px,7vw,76px);font-weight:600;line-height:1.05;margin-bottom:20px;text-wrap:balance">${p.title}</div>`);

    // Replace Regions/Destinations
    html = html.replace(/<div style="display:inline-flex;align-items:center;gap:12px;background:rgba\(0,0,0,\.2\);backdrop-filter:blur\(10px\);padding:10px 24px;border-radius:99px;margin-bottom:40px">.*?<\/div>/s, 
        `<div style="display:inline-flex;align-items:center;gap:12px;background:rgba(0,0,0,.2);backdrop-filter:blur(10px);padding:10px 24px;border-radius:99px;margin-bottom:40px">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            <span style="font-size:15px;font-weight:600;letter-spacing:.02em">${p.regions}</span>
          </div>`);

    // Replace Duration
    html = html.replace(/<div style="font-family:'Fraunces',serif;font-size:24px;color:#16211D;margin-top:6px">.*?<\/div>/,
        `<div style="font-family:'Fraunces',serif;font-size:24px;color:#16211D;margin-top:6px">${p.duration}</div>`);

    // We must replace the slug in the state initialization
    html = html.replace(/slug:\s*'.*?'/, `slug: '${p.slug}'`);

    // Replace Itinerary Data in JS
    let newItinerary = "itineraryData = [\n";
    pkg.raw.days.forEach(day => {
        let t = day.title.replace(/'/g, "\\'");
        let b = day.body.replace(/'/g, "\\'").replace(/\n/g, "<br>");
        newItinerary += `      { title: '${t}', body: '${b}' },\n`;
    });
    newItinerary += "    ];";
    
    html = html.replace(/itineraryData\s*=\s*\[[\s\S]*?\];/g, newItinerary);

    // Replace FAQ Data with empty for now since we didn't extract structured FAQ
    let newFaq = "faqData = [\n      { q: 'How do I book a package?', a: 'Send an enquiry through the form or WhatsApp with your dates and group size. We reply with a firm quote and hold your dates; the booking is confirmed on advance payment.' },\n      { q: 'Can the itinerary be customised?', a: 'Yes - every package here is a starting point. Swap stays, add nights, change the pace. Tell us what matters and we rebuild around it.' }\n    ];";
    html = html.replace(/faqData\s*=\s*\[[\s\S]*?\];/g, newFaq);

    // Write file
    let newPath = path.join(cwd, `package-${p.slug}.html`);
    fs.writeFileSync(newPath, html);
    console.log("Generated", newPath);
});
