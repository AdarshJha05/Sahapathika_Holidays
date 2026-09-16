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

const durationRegex = /\{ slug: 'kashmir-with-vaishno-devi', title: 'Kashmir\s+with\s+Vaishno\s+Devi', regions: 'Kashmir\s+with\s+Vaishno\s+Devi', region: 'North India', duration: '7 Days\s+6 Nights', cat: 'Hill & Backwater', photo: 'packages_cards\/vaishnodevi\.jpg', hint: 'Kashmir\s+with\s+Vaishno\s+Devi' \}/;
const durationReplacement = `{ slug: 'kashmir-with-vaishno-devi', title: 'Kashmir with Vaishno Devi', regions: 'Kashmir with Vaishno Devi', region: 'North India', duration: '7 Days 6 Nights', cat: 'Hill & Backwater', photo: 'packages_cards/vaishnodevi.jpg', hint: 'Kashmir with Vaishno Devi' }`;

const insertionPoint = "} else if (p.slug === 'mathura-vrindavan-braj-agra-yatra') {";
const kashmirCode = `} else if (p.slug === 'kashmir-with-vaishno-devi') {
      data.overview = 'Combine the blessings of Mata Vaishno Devi with the breathtaking landscapes of Kashmir on this specially planned Kashmir with Vaishno Devi tour package from Kerala. The journey begins at Katra with the pilgrimage to the revered Vaishno Devi Shrine before taking you towards the serene lakes, gardens, snow-covered mountains and picturesque valleys of Kashmir.\\n\\nFrom the spiritual atmosphere of Katra and the Vaishno Devi pilgrimage to the beauty of Srinagar, Gulmarg and Pahalgam, this itinerary brings together devotion, nature and memorable holiday experiences in one journey. Enjoy Srinagar\\'s famous Mughal Gardens, spend time beside Dal Lake, experience a traditional Shikara ride and explore the scenic surroundings of Gulmarg and Pahalgam.';
      data.highlights = [
        'Combines Vaishno Devi pilgrimage and Kashmir sightseeing in one holiday.',
        'Covers Katra, Srinagar, Gulmarg and Pahalgam.',
        'Includes time for both spiritual experiences and leisure travel.',
        'Experience Srinagar\\'s famous gardens and Dal Lake.',
        'Includes a 60-minute Shikara ride as specified in the package.',
        'Offers optional experiences such as pony rides and Gondola rides for guests who wish to add them.',
        'Suitable for families, couples and groups looking for a combination of pilgrimage and Himalayan sightseeing.'
      ];
      data.lodging = '2 Nights Katra | 3 Nights Srinagar | 1 Night Dal Lake Houseboat';
      data.tourType = 'Pilgrimage, Family, Couples, Group';
      data.includes = [
        'Accommodation for 6 nights: 2 nights Katra, 3 nights Srinagar and 1 night Dal Lake houseboat',
        'Daily breakfast and dinner as specified',
        'Private cab for transfers and sightseeing as per itinerary',
        'Sightseeing according to the programme',
        '60-minute Shikara ride on Dal Lake',
        'Applicable hotel and transportation taxes',
        'Toll charges, parking fees and driver allowances',
        'Applicable taxes included as specified in the package'
      ];
      data.excludes = [
        'Airfare or railway tickets',
        '5% GST, as specified in the source package',
        'Vaishno Devi pony, pithoo and palki charges',
        'Gulmarg Gondola/cable car charges',
        'Horse/pony rides and other optional activities',
        'Local sightseeing charges where specifically payable by guests',
        'Garden entrance fees and guide charges where applicable',
        'Travel insurance',
        'Personal expenses, tips, laundry, room service and telephone charges',
        'Food and beverages other than the included meals',
        'Room heater charges, where applicable',
        'Additional sightseeing or excursions outside the itinerary',
        'Camera/video charges where applicable',
        'Any service or expense not specifically mentioned under inclusions'
      ];
      data.notes = [
        'Vaishno Devi Yatra: The pilgrimage involves approximately 13 km each way. Guests should consider their physical fitness before undertaking the trek.',
        'Yatra Slip: A Yatra Slip is required before beginning the pilgrimage.',
        'Pony, Pithoo & Palki: These services are not included in the package cost and can be arranged at the guest\\'s own expense.',
        'Gulmarg Gondola: The Gondola ride is an optional activity and is not included.',
        'Pahalgam Local Sightseeing: Sightseeing to places such as Aru Valley, Betaab Valley and Chandanwari may require local vehicles. Any applicable local transportation cost is payable separately.',
        'Seasonal Conditions: Mountain weather can change quickly. Snowfall, rain, road conditions and local operating restrictions may affect sightseeing or optional activities.',
        'Accommodation: The final duration and accommodation plan should be confirmed at the time of booking.'
      ];
      data.faqs = [
        { q: 'Can I book a Kashmir with Vaishno Devi tour package from Kerala?', a: 'Yes. Sahapathika Holidays can arrange this Kashmir and Vaishno Devi itinerary for travellers from Kerala, subject to travel dates, hotel and transportation availability.' },
        { q: 'Can Sahapathika Holidays arrange the trip from Kochi or other airports in Kerala?', a: 'Yes. You can discuss your preferred departure point, including Kochi and other airports in Kerala. Flight arrangements can also be coordinated if required and booked as part of your travel plan.' },
        { q: 'How difficult is the Vaishno Devi pilgrimage?', a: 'The pilgrimage involves approximately 13 km each way according to the supplied itinerary. The physical effort can be considerable, so travellers should assess their fitness and choose suitable assistance if required.' },
        { q: 'Are pony, pithoo or palki services included?', a: 'No. These services are specifically listed as additional expenses and are payable by the traveller.' },
        { q: 'Is the Shikara ride included?', a: 'Yes. The package includes a 60-minute Shikara ride on Dal Lake.' },
        { q: 'Is the Gulmarg Gondola included?', a: 'No. The Gondola cable car is an optional activity and its charges are payable separately.' },
        { q: 'Is this package suitable for families and senior citizens?', a: 'Yes, families and senior travellers can consider the itinerary. However, the Vaishno Devi pilgrimage involves substantial walking, so senior citizens should assess their comfort level and consider available assistance.' },
        { q: 'Can this Kashmir package be customized?', a: 'Yes. You can enquire about modifying the itinerary, hotel category, travel dates, transportation or other requirements according to availability and feasibility.' },
        { q: 'Are flights or train tickets included?', a: 'No. Airfare and railway tickets are excluded from the package. Sahapathika Holidays can discuss and coordinate these arrangements separately if required.' },
        { q: 'How can I enquire about this package?', a: 'Contact Sahapathika Holidays with your preferred travel dates, number of travellers and requirements. The team can then provide the applicable package quotation and availability.' }
      ];
    } else if (p.slug === 'mathura-vrindavan-braj-agra-yatra') {`;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (durationRegex.test(content)) {
    content = content.replace(durationRegex, durationReplacement);
    changed = true;
  }
  
  if (content.includes(insertionPoint) && !content.includes("slug === 'kashmir-with-vaishno-devi'")) {
    content = content.replace(insertionPoint, kashmirCode);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
