const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (!fullPath.includes('node_modules') && !fullPath.includes('.git') && !fullPath.includes('nextjs-app')) {
        results = results.concat(getHtmlFiles(fullPath));
      }
    } else {
      if (fullPath.endsWith('.html') && !fullPath.includes('scratch')) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

const htmlFiles = getHtmlFiles(root);
let modifiedCount = 0;

const durationRegex = /\{ slug: 'shimla-manali-amritsar', title: 'Shimla Manali\s+&\s+Amritsar', regions: 'Shimla Manali\s+&\s+Amritsar', region: 'North India', duration: 'On enquiry', cat: 'Hill & Backwater', photo: 'packages_cards\/amritsar\.jpg', hint: 'Shimla Manali\s+&\s+Amritsar' \}/;
const durationReplacement = `{ slug: 'shimla-manali-amritsar', title: 'Shimla Manali & Amritsar', regions: 'Shimla Manali & Amritsar', region: 'North India', duration: '8 Days 7 Nights', cat: 'Hill & Backwater', photo: 'packages_cards/amritsar.jpg', hint: 'Shimla Manali & Amritsar' }`;

const insertionPoint = "} else if (p.slug === 'shimla-kullu-manali') {";
const amritsarCode = `} else if (p.slug === 'shimla-manali-amritsar') {
      data.overview = 'Experience the best of the Himalayas and Punjab with this thoughtfully planned Himachal and Amritsar tour package from Kerala. The journey combines the cool mountain landscapes of Shimla and Manali with the cultural and spiritual highlights of Amritsar, creating a holiday that offers scenery, sightseeing, adventure, heritage and devotion in one itinerary.\\n\\nStarting with a scenic drive from Delhi to Shimla, the tour takes you through Kufri, Manali, Solang Valley, Kullu and Amritsar, before concluding with visits to the iconic Golden Temple and the Attari-Wagah Border ceremony. It is an excellent choice for families, couples, friends and groups travelling from Kochi, Ernakulam, Thrissur, Kottayam, Kozhikode, Kannur, Malappuram, Alappuzha, Kollam and Thiruvananthapuram.';
      data.highlights = [
        'Shimla and Kufri for Himalayan scenery and hill-station experiences.',
        'Manali and Solang Valley for mountain landscapes and optional adventure activities.',
        'Kullu and Mandi for a scenic Himalayan road journey.',
        'Amritsar for spirituality, history and Punjabi culture.',
        'Golden Temple for a deeply meaningful cultural and spiritual experience.',
        'Attari-Wagah Border for its distinctive ceremonial atmosphere.'
      ];
      data.lodging = '2 Nights Shimla | 3 Nights Manali | 2 Nights Amritsar';
      data.tourType = 'Family, Couple, Group';
      data.includes = [
        '7 nights accommodation in selected hotels on double-sharing basis',
        '7 breakfasts and 7 dinners',
        'Private vehicle for the 8-day itinerary as per family/group size',
        'Fuel, tolls, permits, parking and driver allowance',
        'Welcome drink at the hotel on arrival',
        'Transfers and sightseeing as specified in the itinerary'
      ];
      data.excludes = [
        'Airfare or train tickets',
        'Personal expenses, laundry, telephone calls and beverages',
        'Mineral water and other items of personal consumption',
        'Monument, garden and sightseeing entry fees',
        'River rafting, paragliding and other optional activities',
        'Rohtang Pass transportation and related activities',
        'Tips for drivers, guides, hotel staff and other service personnel',
        'Any service, activity or expense not specifically mentioned under inclusions'
      ];
      data.notes = [
        'The itinerary includes several long road journeys, particularly Delhi–Shimla, Shimla–Manali, Manali–Amritsar and Amritsar–Delhi.',
        'Mountain travel times are approximate and may change because of traffic, weather, road conditions or local restrictions.',
        'Rohtang Pass is not included. Any applicable local transportation and activity charges are payable separately by guests.',
        'River rafting at Kullu is an optional activity and is subject to suitable weather conditions and direct payment.',
        'Adventure activities at Solang Valley are optional and payable separately.',
        'Monument, garden and other applicable entry charges are not included unless specifically mentioned.',
        'Guests should carry suitable warm clothing for the Himalayan portions of the journey, particularly during colder months.',
        'The Wagah Border ceremony is subject to prevailing local arrangements and regulations.',
        'Final accommodation, vehicle and departure arrangements should be confirmed at the time of booking.'
      ];
      data.faqs = [
        { q: 'Can I book a Himachal and Amritsar tour package from Kerala?', a: 'Yes. Sahapathika Holidays can coordinate this North India holiday for travellers originating from Kerala, with travel arrangements discussed according to your preferred dates and requirements.' },
        { q: 'What is the duration of this Himachal–Amritsar package?', a: 'The itinerary is designed as an 8 Days / 7 Nights holiday covering Shimla, Manali and Amritsar.' },
        { q: 'Can I start the trip from Kochi?', a: 'Yes. Flight or train arrangements can be discussed separately according to your preferred departure point in Kerala. The supplied itinerary itself begins with arrival at Delhi Airport or Railway Station.' },
        { q: 'Which places are covered in the package?', a: 'The itinerary covers Delhi, Shimla, Kufri, Manali, Solang Valley, Kullu, Amritsar, Golden Temple, Jallianwala Bagh and the Attari-Wagah Border.' },
        { q: 'Is Rohtang Pass included?', a: 'No. Rohtang Pass sightseeing is specifically excluded from the supplied package and requires separate local transportation arrangements and applicable charges.' },
        { q: 'Is river rafting included at Kullu?', a: 'No. River rafting is an optional activity and is payable directly by the guest, subject to weather conditions.' },
        { q: 'Is this package suitable for families?', a: 'Yes. The itinerary can work well for families who want to combine Himalayan sightseeing with Amritsar\\'s cultural and spiritual attractions.' },
        { q: 'Can senior citizens travel on this itinerary?', a: 'Senior citizens can consider the package, but they should be comfortable with several long road journeys and Himalayan terrain. The itinerary can be discussed and customized according to the group\\'s requirements.' },
        { q: 'Can the accommodation or itinerary be customized?', a: 'Yes. Hotel preferences, travel dates and certain arrangements can be discussed with Sahapathika Holidays while planning the trip.' },
        { q: 'Can I end the trip at Amritsar instead of Delhi?', a: 'The supplied itinerary allows the final drop at Amritsar Airport/Railway Station or Delhi, depending on the travel requirement.' }
      ];
    } else if (p.slug === 'shimla-kullu-manali') {`;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (durationRegex.test(content)) {
    content = content.replace(durationRegex, durationReplacement);
    changed = true;
  }
  
  if (content.includes(insertionPoint) && !content.includes("slug === 'shimla-manali-amritsar'")) {
    content = content.replace(insertionPoint, amritsarCode);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
