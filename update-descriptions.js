const fs = require('fs');
const path = require('path');

const cwd = 'c:/Users/jhash/Downloads/Sahapathika_Holidays';
const files = fs.readdirSync(cwd).filter(f => f.endsWith('.html'));

const descriptions = {
    'kerala-ayurveda-wellness-retreat': 'Rejuvenate your mind and body with our 5N/6D Kerala Ayurveda & Wellness Retreat in South Kerala. Experience authentic Ayurvedic therapies in Kovalam, Poovar, and Trivandrum.',
    'munnar-thekkady-alleppey': 'Embark on a classic Central Kerala journey through Munnar, Thekkady, and Alleppey. Experience breathtaking tea gardens, wildlife, and a serene houseboat cruise on the backwaters.',
    'waterfalls-hills-backwaters': 'Discover the perfect blend of Kerala\'s natural beauty with our 4N tour. Visit the majestic Athirappilly waterfalls, the rolling hills of Munnar, and the tranquil backwaters of Alleppey.',
    'kerala-temple-tour': 'Embark on a spiritual 5N Kerala Temple Tour. Visit sacred sites in Guruvayur, Kalady, Chottanikkara, Sabarimala, and Trivandrum to experience the rich heritage of South India.',
    'kovalam-varkala-tour': 'Enjoy a relaxing 2N/3D beach getaway in South Kerala. Unwind on the pristine sands of Kovalam and explore the dramatic cliffside beaches of Varkala.',
    'north-kerala-heritage-tour': 'Uncover the hidden gems of North Kerala on a 6N heritage tour. Explore historic Bekal fort, the beaches of Kannur, misty Wayanad hills, and the culture of Kozhikode.',
    'beach-and-backwater-tour': 'Experience the best of South Kerala coastal life. Relax on the beautiful beaches of Varkala and glide peacefully through the iconic Kerala backwaters on a traditional houseboat.',
    'enchanting-captivating-kerala': 'Our 7-Day Signature tour offers an enchanting and captivating journey across Kerala\'s most iconic landscapes, from lush hill stations to serene coastal backwaters.',
    'scenic-beautiful-kerala': 'Immerse yourself in a scenic 8-Day Signature tour of Kerala. Discover the state\'s diverse beauty, rich culture, and breathtaking landscapes on this comprehensive holiday package.',
    'kerala-short-honeymoon-tour': 'Celebrate your romance with our Kerala Short Honeymoon Tour. Enjoy private moments amidst beautiful landscapes, romantic backwater cruises, and premium accommodations.',
    'home': 'Welcome to Sahapathika Holidays, your trusted travel agency since 2015. We offer curated tours, Ayurveda wellness retreats, and unforgettable holiday packages across incredible Kerala.',
    'about': 'Learn more about Sahapathika Holidays. Since 2015, we have been crafting personalized travel experiences, heritage tours, and honeymoon packages across Kerala and South India.',
    'contact': 'Get in touch with Sahapathika Holidays to plan your dream Kerala vacation. Contact our expert travel planners today to customize your itinerary and book your tour.',
    'packages': 'Browse our wide range of meticulously crafted Kerala holiday packages. From beach getaways and hill station retreats to Ayurvedic wellness and romantic honeymoons, find your perfect trip.'
};

files.forEach(file => {
    const filePath = path.join(cwd, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    const slugMatch = content.match(/slug:\s*'([^']+)'/);
    const pageMatch = content.match(/page:\s*'([^']+)'/);
    
    let slug = slugMatch ? slugMatch[1] : null;
    let page = pageMatch ? pageMatch[1] : 'home';

    let desc = '';
    if (page === 'detail' && slug && descriptions[slug]) {
        desc = descriptions[slug];
    } else if (descriptions[page]) {
        desc = descriptions[page];
    } else {
        desc = descriptions['home'];
    }

    // Replace <meta name="description" content="...">
    content = content.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${desc}">`);
    
    // Replace <meta property="og:description" content="...">
    content = content.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${desc}">`);

    fs.writeFileSync(filePath, content);
    console.log(`Updated detailed descriptions for ${file}`);
});
