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

const durationRegex = /\{ slug: 'himachal-pradesh', title: 'Himachal Pradesh', regions: 'Himachal Pradesh', region: 'North India', duration: '9 Days\s+8 Nights', cat: 'Hill & Backwater', photo: 'packages_cards\/himachal_pradesh\.jpg', hint: 'Himachal Pradesh' \}/;
const durationReplacement = `{ slug: 'himachal-pradesh', title: 'Himachal Pradesh', regions: 'Himachal Pradesh', region: 'North India', duration: '9 Days 8 Nights', cat: 'Hill & Backwater', photo: 'packages_cards/himachal_pradesh.jpg', hint: 'Himachal Pradesh' }`;

const insertionPoint = "} else if (p.slug === 'shimla-manali-amritsar') {";
const hpCode = `} else if (p.slug === 'himachal-pradesh') {
      data.overview = 'Discover the diverse beauty of Himachal Pradesh with this thoughtfully planned Himachal tour package from Kerala, taking you across four of the state\\'s most popular mountain destinations — Shimla, Manali, Dharamshala and Dalhousie. Beginning in Delhi, the journey gradually moves through pine-covered hills, scenic valleys, mountain towns and peaceful landscapes.\\n\\nExplore the colonial charm of Shimla and the scenic surroundings of Kufri, travel through the beautiful Kullu Valley to Manali, and experience the mountain atmosphere of Solang Valley. The journey then continues towards Dharamshala and McLeod Ganj before reaching the picturesque hill station of Dalhousie and the meadow landscapes of Khajjiar.\\n\\nThis Himachal Pradesh holiday package from Kerala is ideal for families, couples, honeymooners, friends and groups who want to experience several iconic destinations in one Himalayan journey. Sahapathika Holidays can also assist travellers from Kochi, Ernakulam, Thrissur, Kottayam, Kozhikode, Kannur, Malappuram, Alappuzha, Kollam and Thiruvananthapuram with suitable travel arrangements to Delhi.';
      data.highlights = [
        'Experience four major Himachal destinations in one extended holiday.',
        'Explore the contrasting landscapes of Shimla, Manali, Dharamshala and Dalhousie.',
        'Visit popular attractions around Kufri, Solang Valley and Khajjiar.',
        'Combine temples, monasteries, heritage landmarks, mountain scenery and local markets.',
        'Includes dedicated time in both Manali and Dalhousie.',
        'Ideal for travellers who want more than a short Shimla–Manali trip.',
        'Offers a balanced Himalayan experience for families, couples and groups.'
      ];
      data.lodging = '2 Nights Shimla | 3 Nights Manali | 1 Night Dharamshala | 2 Nights Dalhousie';
      data.tourType = 'Family, Couple, Honeymoon, Group';
      data.includes = [
        '8 nights accommodation on twin-sharing basis',
        'Daily breakfast and dinner',
        'Private vehicle for transfers and sightseeing as per itinerary',
        'Delhi pickup and drop',
        'Local sightseeing as specified',
        'Toll taxes, parking charges and driver allowances',
        'Applicable hotel taxes',
        'Assistance on arrival and departure'
      ];
      data.excludes = [
        'Flights or train tickets to/from Delhi',
        'Lunch and additional meals',
        'Optional tours and activities',
        'Adventure rides and other personal-choice activities',
        'Monument and attraction entrance fees',
        'Camera fees',
        'Personal expenses, shopping, laundry and telephone charges',
        'Alcoholic and non-alcoholic beverages',
        'Unplanned transportation expenses',
        'Vehicle service during leisure periods when not part of the itinerary',
        'Medical and travel insurance',
        'Expenses arising from natural calamities, landslides, road blockages, strikes or similar unforeseen circumstances',
        'Anything not specifically mentioned under inclusions'
      ];
      data.notes = [
        'Long Mountain Journeys: This is a comprehensive Himachal circuit involving several intercity road transfers. Some travel days can be lengthy, particularly the final Dalhousie–Delhi journey.',
        'Weather & Road Conditions: Mountain weather can change quickly. Rain, snowfall, traffic, road maintenance or unforeseen disruptions may affect journey times or sightseeing.',
        'Adventure Activities: Activities at Solang Valley, including skiing, paragliding, snow-bike rides, zorbing and horse riding, are optional and payable separately.',
        'Sightseeing Flexibility: The actual order of sightseeing may be adjusted depending on road conditions, local accessibility, weather and the available time on a particular day.',
        'Vehicle Usage: The vehicle is provided for the transfers and sightseeing specified in the itinerary. It is not intended to remain at the guests\\' disposal throughout leisure periods unless separately arranged.',
        'Hotel Check-in / Check-out: The supplied package specifies standard hotel check-in and check-out at 12:00 noon. Early check-in or late check-out is subject to hotel availability and additional charges.'
      ];
      data.faqs = [
        { q: 'Can I book this Himachal tour package from Kerala?', a: 'Yes. Sahapathika Holidays can arrange the Himachal land package for travellers from Kerala, with arrival and departure through New Delhi.' },
        { q: 'Can I travel from Kochi to Delhi for this package?', a: 'Yes. The package begins from New Delhi, and Sahapathika Holidays can assist with coordinating flights or trains from Kochi or other suitable locations in Kerala if required.' },
        { q: 'How many nights are included?', a: 'The itinerary includes 8 nights and 9 days, with 2 nights in Shimla, 3 nights in Manali, 1 night in Dharamshala and 2 nights in Dalhousie.' },
        { q: 'Does the package include Solang Valley?', a: 'Yes. Solang Valley is included in the sightseeing itinerary. However, individual adventure activities and rides are payable separately.' },
        { q: 'Is Khajjiar included?', a: 'Yes. Day 8 is dedicated to the Khajjiar excursion from Dalhousie.' },
        { q: 'Is Rohtang Pass included?', a: 'No. This particular itinerary does not include a Rohtang Pass excursion. It focuses on Solang Valley instead.' },
        { q: 'Is this package suitable for honeymoon couples?', a: 'Yes. The combination of Shimla, Manali, Dharamshala and Dalhousie makes this a suitable extended Himalayan holiday for couples and honeymooners.' },
        { q: 'Is the vehicle available throughout the day?', a: 'The vehicle is provided according to the planned transfer and sightseeing programme. Availability during leisure periods or for unplanned sightseeing is not included.' },
        { q: 'Can senior citizens travel on this itinerary?', a: 'Yes, provided they are comfortable with the long road journeys and hill travel involved. The itinerary contains several extended transfers, so individual mobility and comfort should be considered.' },
        { q: 'Can Sahapathika Holidays customize this itinerary?', a: 'Yes. You can discuss travel dates, hotel category, group size, transportation preferences and other requirements while requesting your quotation.' }
      ];
    } else if (p.slug === 'shimla-manali-amritsar') {`;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (durationRegex.test(content)) {
    content = content.replace(durationRegex, durationReplacement);
    changed = true;
  }
  
  if (content.includes(insertionPoint) && !content.includes("slug === 'himachal-pradesh'")) {
    content = content.replace(insertionPoint, hpCode);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
