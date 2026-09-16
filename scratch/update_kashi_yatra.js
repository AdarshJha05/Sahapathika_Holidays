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

const durationRegex = /\{ slug: 'kashi-prayag-chitrakoot-ayodhya-yatra', title: 'Kashi\s+Prayag\s+Chitrakoot\s+Ayodhya\s+Yatra', regions: 'Kashi\s+Prayag\s+Chitrakoot\s+Ayodhya\s+Yatra', region: 'North India', duration: '5N\s+6D', cat: 'Pilgrimage Yatra', photo: 'packages_cards\/prayagraj\.jpg', hint: 'Kashi\s+Prayag\s+Chitrakoot\s+Ayodhya\s+Yatra' \}/;
const durationReplacement = `{ slug: 'kashi-prayag-chitrakoot-ayodhya-yatra', title: 'Kashi Prayag Chitrakoot Ayodhya Yatra', regions: 'Kashi Prayag Chitrakoot Ayodhya Yatra', region: 'North India', duration: '6 Days 5 Nights', cat: 'Pilgrimage Yatra', photo: 'packages_cards/prayagraj.jpg', hint: 'Kashi Prayag Chitrakoot Ayodhya Yatra' }`;

const insertionPoint = "} else if (p.slug === 'kashi-prayag-chitrakoot-ayodhya-divya-yatra') {";
const kashiCode = `} else if (p.slug === 'kashi-prayag-chitrakoot-ayodhya-yatra') {
      data.overview = 'Embark on a spiritually enriching journey through some of the most revered pilgrimage destinations in North India. This specially planned Kashi–Prayag–Chitrakoot–Ayodhya Yatra takes you from the eternal city of Lord Shiva to the sacred birthplace of Lord Rama, covering the divine destinations of Varanasi, Prayagraj, Chitrakoot and Ayodhya.\\n\\nExperience the sacred Ganga Aarti at Dashashwamedh Ghat, seek blessings at Kashi Vishwanath Temple, offer prayers at the holy Triveni Sangam, explore the Ramayana-linked spiritual heritage of Chitrakoot and conclude your pilgrimage in Ayodhya, the sacred city associated with Shri Ram.\\n\\nThis itinerary is thoughtfully designed for pilgrims and families travelling from Kerala, combining important temple visits, spiritual experiences and comfortable intercity travel.';
      data.highlights = [
        'Kashi – the eternal city of Lord Shiva',
        'Prayagraj – the sacred Triveni Sangam',
        'Chitrakoot – the land associated with Shri Ram\\'s exile',
        'Ayodhya – the sacred city of Lord Rama',
        'Experience important temples, sacred rivers, spiritual ceremonies and Ramayana-linked destinations',
        'Professionally coordinated holiday with Kerala-based travel assistance'
      ];
      data.lodging = '2 Nights Varanasi | 2 Nights Prayagraj | 1 Night Ayodhya';
      data.tourType = 'Pilgrimage, Family, Senior Citizens, Group';
      data.includes = [
        '5 Nights accommodation in selected hotels on twin/double sharing basis',
        'Daily breakfast at the hotel',
        'AC vehicle for transfers and sightseeing as per the itinerary',
        'Pickup from Varanasi Airport / Railway Station and drop at Ayodhya Airport / Railway Station',
        'Sightseeing in Varanasi, Prayagraj, Chitrakoot and Ayodhya as per itinerary',
        'Ganga boat ride and Ganga Aarti at Dashashwamedh Ghat, as mentioned in the itinerary',
        'Triveni Sangam visit in Prayagraj',
        'Temple visits and sightseeing at all destinations as mentioned in the itinerary',
        'Assistance from Sahapathika Holidays during the tour',
        'Applicable hotel taxes and service charges'
      ];
      data.excludes = [
        'Flights / train tickets to Varanasi and from Ayodhya',
        'Lunch, dinner and beverages',
        'Personal expenses, shopping and laundry',
        'Temple donations, offerings and special pujas',
        'Rudrabhishek / special puja charges, if applicable',
        'VIP / priority darshan charges, wherever applicable',
        'Boat rides at Prayagraj / Triveni Sangam unless specifically mentioned in the quotation',
        'Monument / museum entry fees unless specifically mentioned',
        'Travel insurance',
        'Any service not specifically mentioned under Package Inclusions'
      ];
      data.notes = [
        'Important Note on Varanasi Local Travel: Due to the narrow lanes and restricted vehicle access in parts of Varanasi, the vehicle cannot reach the entrance of some temples. Guests may need to travel by e-rickshaw, auto-rickshaw or walk a short distance to reach certain temples and pilgrimage sites. Any such local transportation charges, if applicable, are payable directly by the guests.',
        'Temple entry and darshan procedures are subject to the rules and regulations of the respective temple authorities.',
        'Special pujas such as Rudrabhishek are subject to availability and applicable temple procedures.',
        'Boat rides at the Sangam and Ganga may depend on weather, river conditions and local regulations.',
        'The sequence of sightseeing may be adjusted according to local conditions, temple timings and operational requirements.',
        'The final package price and inclusions depend on the selected hotel category, transportation, travel dates and other services.'
      ];
      data.faqs = [
        { q: 'Can I book a Varanasi–Ayodhya tour package from Kerala?', a: 'Yes. Sahapathika Holidays can arrange Varanasi, Prayagraj, Chitrakoot and Ayodhya tour packages for travellers from Kerala, including customized travel arrangements based on your requirements.' },
        { q: 'Is this package suitable for senior citizens?', a: 'Yes. The itinerary can be customized for senior citizens with suitable hotels, transportation and a more relaxed sightseeing schedule wherever possible.' },
        { q: 'Does the package include Kashi Vishwanath Temple darshan?', a: 'The itinerary includes a visit for Kashi Vishwanath Temple darshan. Actual darshan arrangements are subject to temple rules, timings and applicable booking procedures.' },
        { q: 'Can Rudrabhishek Puja be arranged at Kashi Vishwanath?', a: 'Rudrabhishek may be arranged subject to availability and the prevailing temple procedures.' },
        { q: 'Can this package be customized?', a: 'Yes. The number of nights, hotel category, transportation, sightseeing and travel arrangements can be customized according to your group and travel requirements.' },
        { q: 'Can travellers from different parts of Kerala book this package?', a: 'Yes. Travellers from Kochi, Ernakulam, Thrissur, Kottayam, Kozhikode, Kannur, Malappuram, Alappuzha, Kollam, Thiruvananthapuram and other parts of Kerala can enquire about the package.' },
        { q: 'Is this a good pilgrimage package for a family?', a: 'Yes. The combination of Kashi, Prayagraj, Chitrakoot and Ayodhya makes this an excellent North India spiritual tour for families interested in temples, Hindu heritage and sacred places.' }
      ];
    } else if (p.slug === 'kashi-prayag-chitrakoot-ayodhya-divya-yatra') {`;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (durationRegex.test(content)) {
    content = content.replace(durationRegex, durationReplacement);
    changed = true;
  }
  
  if (content.includes(insertionPoint) && !content.includes("slug === 'kashi-prayag-chitrakoot-ayodhya-yatra'")) {
    content = content.replace(insertionPoint, kashiCode);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
