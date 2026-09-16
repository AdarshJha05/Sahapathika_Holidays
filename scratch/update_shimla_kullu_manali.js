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

const shimlaManaliCondition = "} else if (p.slug === 'shimla-manali') {";
const shimlaKulluManaliCode = `} else if (p.slug === 'shimla-kullu-manali') {
      data.overview = 'Escape into the Himalayas with a memorable Shimla Kullu Manali tour package from Kerala, designed around the scenic hill stations of Himachal Pradesh. Starting from New Delhi, the journey takes you through the charming landscapes of Shimla and Kufri before continuing into the valleys of Kullu and Manali.\\n\\nExplore Shimla\\'s famous Mall Road, the Ridge, Jakhoo Temple and Christ Church, travel through the beautiful Kullu Valley and experience Manali\\'s temples, monasteries, markets and mountain scenery. The itinerary also includes an excursion towards Rohtang Pass, subject to seasonal accessibility and applicable local regulations.\\n\\nThis Shimla Manali holiday package from Kerala is an appealing choice for families, couples, honeymooners, friends and groups looking for a Himalayan holiday. Travellers from Kochi, Ernakulam, Thrissur, Kottayam, Kozhikode, Kannur, Malappuram, Alappuzha, Kollam and Thiruvananthapuram can enquire about flight or train coordination to New Delhi along with the land arrangements.';
      data.highlights = [
        'Covers three popular Himachal destinations — Shimla, Kullu and Manali.',
        'Includes sightseeing in Kufri and Shimla.',
        'Combines Himalayan scenery with temples, monasteries and local markets.',
        'Includes a dedicated Rohtang Pass excursion, subject to seasonal access.',
        'Provides four nights in Manali, allowing more time to experience the valley.',
        'Includes both scenic road journeys and relaxed sightseeing.',
        'Suitable for families, couples, honeymooners, friends and groups.'
      ];
      data.lodging = '2 Nights Shimla | 4 Nights Manali';
      data.tourType = 'Family, Couple, Honeymoon, Group';
      data.includes = [
        '6 nights accommodation on twin-sharing basis',
        'Daily breakfast and dinner',
        'Exclusive vehicle for transfers and sightseeing as per itinerary',
        'New Delhi pickup and drop',
        'Destination–hotel–destination transfers',
        'Sightseeing as mentioned in the itinerary',
        'Toll taxes, parking charges and applicable permits',
        'Driver allowance',
        'Applicable fuel and state taxes',
        'Assistance on arrival and departure'
      ];
      data.excludes = [
        'Flights or train tickets to/from New Delhi',
        'Lunch and snacks',
        'Rohtang Pass taxi/transport charges',
        'Monument and attraction entrance fees',
        'Guide charges',
        'Camera charges',
        'Adventure activities, snow rides and other optional rides',
        'Personal expenses such as laundry, telephone calls and tips',
        'Alcoholic beverages',
        'Early check-in or late check-out charges',
        'Costs arising from landslides, road blockages, strikes, political disturbances or other unforeseen disruptions',
        'Travel insurance',
        '5% GST, as specified in the source package',
        'Anything not specifically mentioned under inclusions'
      ];
      data.notes = [
        'Rohtang Pass access depends on the season, weather, road conditions and applicable permissions or regulations. Rohtang Pass sightseeing and taxi charges are extra.',
        'Certain sightseeing areas around Manali may be subject to local transportation rules.',
        'The journey between New Delhi, Shimla and Manali involves long road travel which can vary because of traffic and weather.',
        'Vehicle is provided for transfers and sightseeing according to the itinerary and is not at the guests\\' disposal throughout the day.',
        'Snow rides, skiing, and adventure activities are not included unless specifically mentioned.'
      ];
      data.faqs = [
        { q: 'Can I book a Shimla Kullu Manali tour package from Kerala?', a: 'Yes. Sahapathika Holidays can arrange the Himachal land package for travellers from Kerala, with the itinerary beginning and ending in New Delhi.' },
        { q: 'Can Sahapathika Holidays arrange flights from Kochi or other Kerala airports?', a: 'Yes. You can discuss flight or train coordination from Kochi and other suitable airports or railway stations in Kerala while planning the trip.' },
        { q: 'How many nights are included in this Shimla Manali package?', a: 'The itinerary is planned for 7 days and 6 nights, with 2 nights in Shimla and 4 nights in Manali.' },
        { q: 'Is Rohtang Pass included?', a: 'The excursion is part of the itinerary, but Rohtang Pass taxi/transport charges are excluded. Access is also subject to seasonal conditions and local regulations.' },
        { q: 'Can we see snow during the trip?', a: 'Snow availability depends on the travel season, altitude, weather and prevailing conditions. It cannot be guaranteed.' },
        { q: 'Are activities such as skiing and snow scooter rides included?', a: 'No. Optional rides and adventure activities are payable separately.' },
        { q: 'Is transportation private?', a: 'Yes. The source itinerary provides an exclusive vehicle for transfers and sightseeing according to the planned itinerary.' },
        { q: 'Is this package suitable for honeymoon couples?', a: 'Yes. Shimla, Kullu and Manali are well suited to couples seeking mountain scenery, leisure time and a romantic Himalayan holiday.' },
        { q: 'Can senior citizens travel on this itinerary?', a: 'Yes, provided they are comfortable with the long road journeys and hill travel involved. Travellers with mobility concerns should discuss their requirements before booking.' },
        { q: 'Can the itinerary be customized?', a: 'Yes. Hotel preferences, travel dates, transportation requirements and sightseeing arrangements can be discussed with Sahapathika Holidays.' }
      ];
    } else if (p.slug === 'shimla-manali') {`;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (content.includes(shimlaManaliCondition) && !content.includes("slug === 'shimla-kullu-manali'")) {
    content = content.replace(shimlaManaliCondition, shimlaKulluManaliCode);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
