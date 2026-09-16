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

const durationRegex = /\{ slug: 'puri-jagannath-konark-chilika-bhubaneswar', title: 'Puri Jagannath\s+Konark\s+Chilika\s+Bhubaneswar', regions: 'Puri Jagannath\s+Konark\s+Chilika\s+Bhubaneswar', region: 'East India', duration: 'On enquiry', cat: 'Heritage & Temple', photo: 'packages_cards\/jaganathpuri\.jpg', hint: 'Puri Jagannath\s+Konark\s+Chilika\s+Bhubaneswar' \}/;
const durationReplacement = `{ slug: 'puri-jagannath-konark-chilika-bhubaneswar', title: 'Puri Jagannath Konark Chilika Bhubaneswar', regions: 'Puri Jagannath Konark Chilika Bhubaneswar', region: 'East India', duration: '5 Days 4 Nights', cat: 'Heritage & Temple', photo: 'packages_cards/jaganathpuri.jpg', hint: 'Puri Jagannath Konark Chilika Bhubaneswar' }`;

const insertionPoint = "} else if (p.slug === 'himachal-pradesh') {";
const puriCode = `} else if (p.slug === 'puri-jagannath-konark-chilika-bhubaneswar') {
      data.overview = 'Discover the spiritual and cultural treasures of Odisha with this carefully planned Puri Jagannath tour package from Kerala. The journey combines the sacred atmosphere of Puri with the architectural brilliance of Konark, the natural beauty of Chilika Lake and the ancient temples and heritage sites of Bhubaneswar.\\n\\nBeginning at Bhubaneswar, the itinerary takes you to Puri, with visits to Sakhigopal, Raghurajpur, the revered Jagannath Temple and the beautiful Puri coastline. You will also explore Chilika Lake at Satapada, experience a boat ride in search of Irrawaddy dolphins and enjoy the coastal landscape.\\n\\nThe journey continues through Konark, Chandrabhaga and Ramchandi before returning to Bhubaneswar for a fascinating exploration of its temples, caves, museums and cultural attractions. This makes the itinerary suitable for Kerala families, pilgrimage travellers, couples, senior citizens and groups looking for a well-rounded Odisha holiday.';
      data.highlights = [
        'Spiritual experience at Shri Jagannath Temple, Puri',
        'Sakhigopal Temple and Raghurajpur Craft Village',
        'Chilika Lake and Satapada',
        'Opportunity for an Irrawaddy dolphin viewing boat excursion',
        'Puri\\'s Blue Flag Beach',
        'Konark Sun Temple and light & sound experience',
        'Chandrabhaga Beach and Ramchandi Temple',
        'Traditional handicrafts at Pipli',
        'Dhauli Shanti Stupa',
        'Bhubaneswar\\'s historic temples',
        'Khandagiri and Udayagiri Caves',
        'Nandankanan and Kala Bhoomi Museum'
      ];
      data.lodging = '3 Nights Puri | 1 Night Bhubaneswar';
      data.tourType = 'Pilgrimage, Family, Heritage, Group';
      data.includes = [
        'Accommodation in selected A/C hotels on twin/double sharing basis',
        'Daily breakfast',
        'AC vehicle for transfers and sightseeing as per itinerary',
        'Airport/Railway Station pickup and drop as specified',
        'Puri, Chilika, Konark and Bhubaneswar sightseeing as per itinerary',
        'Driver allowance, tolls, parking and applicable state taxes',
        'Hotel taxes',
        'Assistance from Sahapathika Holidays'
      ];
      data.excludes = [
        'Airfare and train tickets',
        'Monument and attraction entry fees',
        'Chilika boating charges',
        'Guide charges',
        'Personal expenses',
        'Camera/video camera fees wherever applicable',
        'Porterage at hotels and airports',
        'Tips and gratuities',
        'Travel insurance',
        'Laundry and telephone expenses',
        'Alcoholic beverages',
        'Any meal other than those specifically included',
        'Any service or expense not mentioned under Package Inclusions'
      ];
      data.notes = [
        'Shri Jagannath Temple has specific entry and visitor regulations. Temple rules should be followed as applicable on the date of travel.',
        'Photography may be restricted in certain religious or heritage locations.',
        'Temple visits can involve walking and waiting, particularly during busy periods.',
        'The Chilika boat ride is subject to local operating conditions, weather and availability.',
        'Dolphin sightings during the Chilika excursion are a natural experience and therefore cannot be guaranteed.',
        'Nandankanan Zoo is closed on Mondays, according to the itinerary information.',
        'Kala Bhoomi Museum is closed on Mondays and government holidays, as specified in the source itinerary.',
        'Light and sound programmes at Konark are subject to the prevailing operating schedule.',
        'Travellers should carry comfortable footwear and clothing suitable for temple visits and outdoor sightseeing.',
        'Senior citizens or guests with mobility concerns should inform Sahapathika Holidays before travel so suitable arrangements can be considered.',
        'Monument, temple and activity charges are included only when specifically mentioned in the final quotation.'
      ];
      data.faqs = [
        { q: 'Can I book a Puri Jagannath tour package from Kerala?', a: 'Yes. Sahapathika Holidays can arrange this Puri–Konark–Chilika–Bhubaneswar tour package from Kerala, with travel arrangements planned according to your preferred dates.' },
        { q: 'How many days are required for a Puri and Bhubaneswar trip?', a: 'This itinerary is designed as a 5 Days / 4 Nights journey covering Puri, Chilika, Konark and Bhubaneswar.' },
        { q: 'Can Sahapathika Holidays arrange the trip from Kochi or another airport in Kerala?', a: 'Yes. Your journey can be planned based on your preferred departure point in Kerala, including arrangements involving Kochi or other suitable airports and railway stations.' },
        { q: 'Does this package include the Jagannath Temple?', a: 'Yes. The itinerary includes visits to Shri Jagannath Temple in Puri, along with other temples and spiritual landmarks.' },
        { q: 'Is Chilika Lake included in the package?', a: 'Yes. The itinerary includes a visit to Satapada on Chilika Lake and a motorboat excursion. Boating charges are listed separately under exclusions.' },
        { q: 'Can we see dolphins at Chilika Lake?', a: 'Satapada is known for its Irrawaddy dolphin population, and the boat excursion provides an opportunity to look for them. However, as they are wild animals, sightings cannot be guaranteed.' },
        { q: 'Is this Puri package suitable for senior citizens?', a: 'Yes, the itinerary can be suitable for senior travellers. However, some temple visits and sightseeing locations involve walking and standing. Mobility requirements should be communicated before booking.' },
        { q: 'Are flight or train tickets included?', a: 'No. Airfare and train tickets are excluded unless specifically added to your customised quotation. Sahapathika Holidays can assist with suitable travel arrangements.' },
        { q: 'Can this Odisha tour be customised?', a: 'Yes. Depending on your travel dates, group size, hotel preference and transportation requirements, the itinerary can be discussed and customised.' },
        { q: 'How can I book this Puri tour package from Kerala?', a: 'Contact Sahapathika Holidays with your travel dates, number of travellers, departure location and preferred hotel category. Our team can prepare the appropriate package and quotation for you.' }
      ];
    } else if (p.slug === 'himachal-pradesh') {`;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (durationRegex.test(content)) {
    content = content.replace(durationRegex, durationReplacement);
    changed = true;
  }
  
  if (content.includes(insertionPoint) && !content.includes("slug === 'puri-jagannath-konark-chilika-bhubaneswar'")) {
    content = content.replace(insertionPoint, puriCode);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
