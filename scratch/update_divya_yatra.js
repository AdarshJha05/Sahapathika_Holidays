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

const durationRegex = /\{ slug: 'kashi-prayag-chitrakoot-ayodhya-divya-yatra', title: 'Kashi\s+Prayag\s+Chitrakoot\s+Ayodhya\s+Divya\s+Yatra', regions: 'Kashi\s+Prayag\s+Chitrakoot\s+Ayodhya\s+Divya\s+Yatra', region: 'North India', duration: 'On enquiry', cat: 'Pilgrimage Yatra', photo: 'packages_cards\/chitrakoot\.jpg', hint: 'Kashi\s+Prayag\s+Chitrakoot\s+Ayodhya\s+Divya\s+Yatra' \}/;
const durationReplacement = `{ slug: 'kashi-prayag-chitrakoot-ayodhya-divya-yatra', title: 'Kashi Prayag Chitrakoot Ayodhya Divya Yatra', regions: 'Kashi Prayag Chitrakoot Ayodhya Divya Yatra', region: 'North India', duration: '5 Days 4 Nights', cat: 'Pilgrimage Yatra', photo: 'packages_cards/chitrakoot.jpg', hint: 'Kashi Prayag Chitrakoot Ayodhya Divya Yatra' }`;

const insertionPoint = "} else if (p.slug === 'lucknow-naimisharanya-ayodhya-prayagraj-varanasi-y') {";
const yatraCode = `} else if (p.slug === 'kashi-prayag-chitrakoot-ayodhya-divya-yatra') {
      data.overview = 'Embark on a spiritually enriching North India pilgrimage tour from Kerala covering four of India\\'s most revered sacred destinations — Varanasi, Prayagraj, Chitrakoot and Ayodhya.\\n\\nBegin your journey in the ancient city of Kashi, seek the blessings of Lord Shiva at Kashi Vishwanath and experience the divine Ganga Aarti. Continue to the sacred Triveni Sangam at Prayagraj, explore the Ramayana-linked spiritual heritage of Chitrakoot, and conclude your pilgrimage in Ayodhya, the sacred city of Shri Ram.\\n\\nThis carefully planned Varanasi–Prayagraj–Chitrakoot–Ayodhya tour package from Kerala is ideal for families, devotees, senior travellers and pilgrimage groups looking for a meaningful spiritual journey through North India.';
      data.highlights = [
        'Kashi – The City of Mahadev: Experience Kashi Vishwanath Darshan, Kaal Bhairav Temple, Ganga Aarti and the spiritual atmosphere of the holy Ganga.',
        'Prayagraj – The Sacred Triveni Sangam: Visit the confluence of the Ganga, Yamuna and the mystical Saraswati and explore important pilgrimage sites.',
        'Chitrakoot – The Land of Shri Ram: Follow the Ramayana trail through sacred places traditionally associated with the exile of Shri Ram, Maa Sita and Lakshmana.',
        'Ayodhya – The Sacred City of Lord Rama: Seek blessings at Shri Ram Janmabhoomi, Hanuman Garhi, Kanak Bhawan and other important temples.',
        'Designed for Kerala Travellers with complete multi-destination planning.'
      ];
      data.lodging = '1 Night Varanasi | 1 Night Prayagraj | 1 Night Chitrakoot | 1 Night Ayodhya';
      data.tourType = 'Pilgrimage, Family, Senior Citizens, Group';
      data.includes = [
        '4 Nights accommodation in selected hotels on twin/double sharing basis',
        'Daily breakfast at the hotel',
        'AC vehicle for transfers and sightseeing as per the itinerary',
        'Pickup from Varanasi Junction and drop at Ayodhya Junction / Airport',
        'Sightseeing in Varanasi, Prayagraj, Chitrakoot and Ayodhya as per itinerary',
        'Ganga Aarti at Dashashwamedh Ghat',
        'Triveni Sangam visit in Prayagraj',
        'Local sightseeing and temple visits as mentioned in the itinerary',
        'Assistance from Sahapathika Holidays during the tour',
        'Applicable hotel taxes and service charges'
      ];
      data.excludes = [
        'Flights / train tickets to Varanasi and from Ayodhya',
        'Lunch, dinner and beverages',
        'Personal expenses, shopping and laundry',
        'Temple donations, offerings and special pujas',
        'VIP / priority darshan charges, wherever applicable',
        'Boat rides unless specifically mentioned in the quotation',
        'Monument / museum entry fees unless specifically mentioned',
        'Travel insurance',
        'Any service not specifically mentioned under Package Inclusions'
      ];
      data.notes = [
        'Important Note on Varanasi Local Travel: Due to the narrow lanes and restricted vehicle access in parts of Varanasi, the vehicle cannot reach the entrance of some temples. Guests may need to travel by e-rickshaw, auto-rickshaw or walk a short distance to reach certain temples and pilgrimage sites. Any such local transportation charges, if applicable, are payable directly by the guests.',
        'Temple darshan is subject to the rules, timings and security procedures of the respective temple authorities.',
        'Special pujas or priority darshan, wherever applicable, are subject to availability and prevailing temple procedures.',
        'Boat rides at the Ganga and Triveni Sangam depend on weather, river conditions and local regulations.',
        'The sightseeing sequence may be modified depending on temple timings, traffic, local conditions and operational requirements.',
        'Travel time between destinations can vary according to road and traffic conditions.'
      ];
      data.faqs = [
        { q: 'Can I book a Varanasi–Prayagraj–Chitrakoot–Ayodhya package from Kerala?', a: 'Yes. Sahapathika Holidays can arrange this North India pilgrimage tour from Kerala for individuals, families and groups travelling from different parts of Kerala.' },
        { q: 'Is this package suitable for senior citizens?', a: 'Yes. The itinerary can be customized for senior travellers by selecting suitable hotels, transportation and a comfortable sightseeing pace.' },
        { q: 'Does this package include Kashi Vishwanath Temple Darshan?', a: 'The itinerary includes Kashi Vishwanath Temple Darshan. Temple entry, darshan procedures and timings remain subject to the rules and regulations of the temple authorities.' },
        { q: 'Can I get a customized package from Kerala?', a: 'Yes. You can customize the duration, hotels, transportation and travel arrangements according to your requirements.' },
        { q: 'Can Sahapathika arrange flights from Kerala?', a: 'Flight arrangements can be included depending on your chosen package and travel requirements. You can enquire about options from airports such as Kochi, Kozhikode, Kannur or Thiruvananthapuram.' },
        { q: 'Can this package be booked for a family or group?', a: 'Yes. The itinerary is suitable for families, friends, pilgrimage groups and community groups. Group-specific arrangements can be planned based on the number of travellers.' },
        { q: 'Which places are covered in this pilgrimage package?', a: 'The main destinations covered are Varanasi, Prayagraj, Chitrakoot and Ayodhya, along with important temples, ghats and spiritual landmarks in each destination.' },
        { q: 'Is Sarnath included in the Varanasi itinerary?', a: 'Yes. The package includes a visit to Sarnath, including important Buddhist heritage sites such as Dhamek Stupa and Chaukhandi Stupa, subject to the available time.' },
        { q: 'Can I extend the trip beyond 5 days?', a: 'Yes. Additional nights can be added in Varanasi, Prayagraj, Chitrakoot or Ayodhya depending on your travel plans.' },
        { q: 'How can I enquire about this package?', a: 'You can contact Sahapathika Holidays for availability, travel dates, hotel options and a customized quotation.' }
      ];
    } else if (p.slug === 'lucknow-naimisharanya-ayodhya-prayagraj-varanasi-y') {`;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (durationRegex.test(content)) {
    content = content.replace(durationRegex, durationReplacement);
    changed = true;
  }
  
  if (content.includes(insertionPoint) && !content.includes("slug === 'kashi-prayag-chitrakoot-ayodhya-divya-yatra'")) {
    content = content.replace(insertionPoint, yatraCode);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
