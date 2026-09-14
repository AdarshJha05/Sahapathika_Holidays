const fs = require('fs');
const path = require('path');

const cwd = 'c:/Users/jhash/Downloads/Sahapathika_Holidays';
const files = fs.readdirSync(cwd).filter(f => f.endsWith('.html'));

const packages = [
    { slug: 'kerala-ayurveda-wellness-retreat', title: 'Kerala Ayurveda & Wellness Retreat', cat: 'Ayurveda & Wellness', photo: 'https://i.pinimg.com/736x/24/8a/88/248a8829446ddc4864ba2093a40713b2.jpg' },
    { slug: 'munnar-thekkady-alleppey', title: 'Munnar – Thekkady – Alleppey Tour', cat: 'Hill & Backwater', photo: 'https://i.pinimg.com/736x/b4/88/63/b48863982d7b8c63a8d633405da62b2b.jpg' },
    { slug: 'waterfalls-hills-backwaters', title: 'A Perfect Blend of Waterfalls, Hills & Backwaters', cat: 'Hill & Backwater', photo: 'https://i.pinimg.com/736x/75/1e/96/751e9636e5a9f3b2ef002932b1817d3d.jpg' },
    { slug: 'kerala-temple-tour', title: 'Kerala Temple Tour', cat: 'Heritage & Temple', photo: 'https://i.pinimg.com/736x/a8/39/4f/a8394fa9408e2472f0672f2bb515d9db.jpg' },
    { slug: 'kovalam-varkala-tour', title: 'Kovalam & Varkala Tour', cat: 'Beach & Coastal', photo: 'https://i.pinimg.com/1200x/1f/cc/f1/1fccf111a972587d9c072f8381018c70.jpg' },
    { slug: 'north-kerala-heritage-tour', title: 'North Kerala Heritage Tour', cat: 'Heritage', photo: 'https://i.pinimg.com/1200x/1e/00/bb/1e00bb9fa2160c94d8b9fd5aa079874b.jpg' },
    { slug: 'beach-and-backwater-tour', title: 'Beach and Backwater Tour', cat: 'Beach & Coastal', photo: 'https://i.pinimg.com/1200x/9c/4d/7b/9c4d7b7354f5deff64a143cd3ee10583.jpg' },
    { slug: 'enchanting-captivating-kerala', title: 'Enchanting & Captivating Kerala', cat: 'Signature', photo: 'https://i.pinimg.com/originals/87/8b/84/878b841ad38d1d59cbefa547e995f363.png' },
    { slug: 'scenic-beautiful-kerala', title: 'Scenic and Beautiful Kerala', cat: 'Signature', photo: 'https://i.pinimg.com/1200x/2e/de/6a/2ede6ae530ca4688f61e8a73046ae302.jpg' },
    { slug: 'kerala-short-honeymoon-tour', title: 'Kerala Short Honeymoon Tour', cat: 'Honeymoon', photo: 'https://i.pinimg.com/1200x/7d/92/4c/7d924cc4489932afa59b881fc9f2a523.jpg' }
];

const defaultImage = 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4f690bd1-881a-4192-82f2-d714d34c8fb9.png';

files.forEach(file => {
    const filePath = path.join(cwd, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Remove any existing title or meta tags to avoid duplicates
    content = content.replace(/<title>.*?<\/title>\s*/g, '');
    content = content.replace(/<meta name="(description|keywords|twitter:card)".*?>\s*/g, '');
    content = content.replace(/<meta property="og:.*?">\s*/g, '');
    content = content.replace(/<link rel="icon".*?>\s*/g, '');

    // Determine page type
    const pageMatch = content.match(/page:\s*'([^']+)'/);
    const slugMatch = content.match(/slug:\s*'([^']+)'/);

    let pageType = pageMatch ? pageMatch[1] : 'home';
    let slug = slugMatch ? slugMatch[1] : null;

    let title = 'Sahapathika Holidays';
    let desc = 'Discover breathtaking tours, authentic Ayurveda wellness retreats, and unforgettable honeymoon experiences in Kerala with Sahapathika Holidays.';
    let keywords = 'Kerala tours, Ayurveda retreats, Kerala honeymoon packages, backwater tours, South India holidays';
    let ogImage = defaultImage;

    if (pageType === 'detail' && slug) {
        const pkg = packages.find(p => p.slug === slug);
        if (pkg) {
            title = `${pkg.title} | Sahapathika Holidays`;
            desc = `Explore the ${pkg.title} with Sahapathika Holidays. Book your unforgettable experience today.`;
            keywords = `${pkg.title}, Kerala travel, holiday package, Sahapathika Holidays`;
            ogImage = pkg.photo;
        }
    } else if (pageType === 'about') {
        title = 'About Us | Sahapathika Holidays';
    } else if (pageType === 'contact') {
        title = 'Contact | Sahapathika Holidays';
    } else if (pageType === 'packages') {
        title = 'All Packages | Sahapathika Holidays';
    } else {
        title = 'Home | Sahapathika Holidays';
    }

    const seoBlock = `
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <meta name="keywords" content="${keywords}">
  <link rel="icon" type="image/svg+xml" href="Site-logo1.svg">
  <meta property="og:site_name" content="Sahapathika Holidays">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
`;

    // Inject before </head>
    content = content.replace(/<\/head>/, `${seoBlock}</head>`);

    fs.writeFileSync(filePath, content);
    console.log(`Injected SEO for ${file} (${title})`);
});
