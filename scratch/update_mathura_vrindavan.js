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

const durationRegex = /\{ slug: 'mathura-vrindavan-braj-agra-yatra', title: 'Mathura\s+Vrindavan\s+Braj\s+&\s+Agra\s+Yatra', regions: 'Mathura\s+Vrindavan\s+Braj\s+&\s+Agra\s+Yatra', region: 'North India', duration: 'On enquiry', cat: 'Pilgrimage Yatra', photo: 'packages_cards\/mathura\(janambhoomi\)\.jpg', hint: 'Mathura\s+Vrindavan\s+Braj\s+&\s+Agra\s+Yatra' \}/;
const durationReplacement = `{ slug: 'mathura-vrindavan-braj-agra-yatra', title: 'Mathura Vrindavan Braj & Agra Yatra', regions: 'Mathura Vrindavan Braj & Agra Yatra', region: 'North India', duration: '4 Days 3 Nights', cat: 'Pilgrimage Yatra', photo: 'packages_cards/mathura(janambhoomi).jpg', hint: 'Mathura Vrindavan Braj & Agra Yatra' }`;

const insertionPoint = "} else if (p.slug === 'varanasi-tour-packages-from-kerala') {";
const yatraCode = `} else if (p.slug === 'mathura-vrindavan-braj-agra-yatra') {
      data.overview = 'Experience the spiritual heart of Braj Bhoomi with a thoughtfully planned Mathura–Vrindavan tour package from Kerala, covering the sacred places associated with Lord Krishna\\'s life along with the magnificent heritage of Agra. From the birthplace of Lord Krishna in Mathura to the devotional atmosphere of Vrindavan, this journey brings together temples, ghats, sacred kunds and historic landmarks.\\n\\nThe journey also explores Gokul, Govardhan, Nandgaon and Barsana, allowing travellers to experience different facets of the Braj region before concluding with the architectural grandeur of Agra, including the Taj Mahal and Agra Fort. It is an ideal pilgrimage and cultural holiday for families, couples, senior travellers and groups travelling from Kochi, Ernakulam and other parts of Kerala.';
      data.highlights = [
        'Mathura, the sacred heart of Braj',
        'Gokul and its Krishna-associated spiritual landmarks',
        'Vrindavan\\'s famous temples',
        'Govardhan and Radha Kund',
        'Nandgaon and Barsana',
        'Radha Rani Temple',
        'Evening experience at Prem Mandir',
        'Taj Mahal and Agra Fort',
        'A convenient multi-destination route covering both pilgrimage and heritage experiences'
      ];
      data.lodging = '3 Nights Hotel Accommodation (Mathura / Braj Region)';
      data.tourType = 'Pilgrimage, Family, Couples, Senior Citizens, Group';
      data.includes = [
        'Accommodation in selected hotels on twin/double sharing basis',
        'Daily breakfast as specified',
        'AC vehicle for transfers and sightseeing as per itinerary',
        'Pickup and drop as specified',
        'Mathura, Gokul, Vrindavan, Govardhan, Nandgaon, Barsana and Agra sightseeing as per itinerary',
        'Assistance from Sahapathika Holidays',
        'Applicable hotel taxes/service charges'
      ];
      data.excludes = [
        'Flights and train tickets',
        'Lunch and dinner unless specifically mentioned',
        'Personal expenses, shopping and laundry',
        'Temple donations and offerings',
        'Special/VIP/priority darshan or special puja charges',
        'Monument/temple entry fees unless specifically included',
        'Travel insurance',
        'Any local transportation or service not specifically included',
        'Anything not mentioned under Package Inclusions'
      ];
      data.notes = [
        'Temple visits may involve walking and standing in crowded areas, particularly during weekends and festival periods.',
        'Temple entry, darshan procedures and operating arrangements may vary depending on local conditions and religious occasions.',
        'Some temples and sacred sites may have restrictions regarding photography, footwear and personal belongings.',
        'The itinerary involves several road journeys between Mathura, Vrindavan, Govardhan, Nandgaon, Barsana and Agra.',
        'The Braj region can become extremely crowded during major festivals, particularly around Holi and other important religious occasions.',
        'Senior citizens and travellers with mobility concerns should inform Sahapathika Holidays in advance so that the itinerary and transportation arrangements can be planned appropriately.',
        'Any special puja, VIP/priority darshan or temple-specific religious service should be confirmed separately before booking.',
        'Monument entry charges and other services are included only when specifically mentioned in the final quotation.'
      ];
      data.faqs = [
        { q: 'Can I book a Mathura–Vrindavan tour package from Kerala?', a: 'Yes. Sahapathika Holidays can arrange a customised Mathura–Vrindavan–Braj tour package from Kerala, with the travel arrangements planned around your preferred dates and departure point.' },
        { q: 'Can this package be arranged for travellers from Kochi or other parts of Kerala?', a: 'Yes. Travellers can enquire from Kochi, Ernakulam and other districts of Kerala. Flight/train and onward transportation arrangements can be discussed according to the selected package.' },
        { q: 'How many days are required for a Mathura and Vrindavan pilgrimage?', a: 'This itinerary is designed for 4 days and 3 nights, covering Mathura, Gokul, Vrindavan, Govardhan, Nandgaon, Barsana and Agra.' },
        { q: 'Does the package include Agra?', a: 'Yes. The final day includes Agra sightseeing covering the Taj Mahal, Agra Fort and Sikandra before the departure transfer.' },
        { q: 'Is this package suitable for senior citizens?', a: 'Yes, it can be suitable for senior travellers. However, the Braj temples can involve crowds, walking and standing. Senior travellers should inform us about mobility requirements before booking.' },
        { q: 'Can families book this Mathura–Vrindavan package?', a: 'Absolutely. The itinerary works well for families who want to combine spiritual experiences with cultural and historical sightseeing.' },
        { q: 'Can Sahapathika Holidays customise the itinerary?', a: 'Yes. The itinerary can be discussed and customised depending on travel dates, hotel preferences, group size, transportation requirements and other applicable arrangements.' },
        { q: 'Is accommodation included in the package?', a: 'Yes, accommodation in selected hotels is included according to the package quotation and room-sharing arrangement.' },
        { q: 'Are train or flight tickets included?', a: 'Not automatically. Flights or train tickets are excluded unless specifically mentioned in your final quotation. Sahapathika Holidays can discuss suitable travel arrangements based on your departure location.' },
        { q: 'How can I enquire about this Mathura–Vrindavan tour from Kerala?', a: 'Contact Sahapathika Holidays with your preferred travel dates, number of travellers, departure location and hotel preference. Our team can then prepare the appropriate package and quotation.' }
      ];
    } else if (p.slug === 'varanasi-tour-packages-from-kerala') {`;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (durationRegex.test(content)) {
    content = content.replace(durationRegex, durationReplacement);
    changed = true;
  }
  
  if (content.includes(insertionPoint) && !content.includes("slug === 'mathura-vrindavan-braj-agra-yatra'")) {
    content = content.replace(insertionPoint, yatraCode);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
