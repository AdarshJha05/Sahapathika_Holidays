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

const durationRegex = /\{ slug: 'kashi-gaya-prayag-ayodhya-pitru-moksha-yatra', title: 'Kashi\s+Gaya\s+Prayag\s+Ayodhya\s+Pitru\s+Moksha\s+Yatra', regions: 'Kashi\s+Gaya\s+Prayag\s+Ayodhya\s+Pitru\s+Moksha\s+Yatra', region: 'North India', duration: 'On enquiry', cat: 'Pilgrimage Yatra', photo: 'packages_cards\/kashi\.jpg', hint: 'Kashi\s+Gaya\s+Prayag\s+Ayodhya\s+Pitru\s+Moksha\s+Yatra' \}/;
const durationReplacement = `{ slug: 'kashi-gaya-prayag-ayodhya-pitru-moksha-yatra', title: 'Kashi Gaya Prayag Ayodhya Pitru Moksha Yatra', regions: 'Kashi Gaya Prayag Ayodhya Pitru Moksha Yatra', region: 'North India', duration: '7 Days 6 Nights', cat: 'Pilgrimage Yatra', photo: 'packages_cards/kashi.jpg', hint: 'Kashi Gaya Prayag Ayodhya Pitru Moksha Yatra' }`;

const insertionPoint = "} else if (p.slug === 'kashi-prayag-chitrakoot-ayodhya-yatra') {";
const kashiCode = `} else if (p.slug === 'kashi-gaya-prayag-ayodhya-pitru-moksha-yatra') {
      data.overview = 'Undertake a deeply spiritual journey through four of North India\\'s most revered pilgrimage destinations with our Kashi–Gaya–Prayag–Ayodhya Pitru Moksha Yatra.\\n\\nThis specially planned pilgrimage combines the sacred traditions of Kashi, ancestral rituals at Gaya, prayers at the holy Triveni Sangam in Prayagraj, and darshan at the revered temples of Ayodhya.\\n\\nFrom the banks of the sacred Ganga and the divine presence of Kashi Vishwanath to the ancestral rites of Gaya and the holy land of Shri Ram, this journey offers devotees an opportunity to connect with some of India\\'s most important spiritual traditions.';
      data.highlights = [
        'Kashi: Seek the blessings of Kashi Vishwanath Mahadev and experience the sacred Ganga and Ganga Aarti.',
        'Gaya: Undertake traditional Pitru Shradh and ancestral offerings at one of India\\'s most important destinations for Pitru-related rituals.',
        'Prayagraj: Visit the sacred Triveni Sangam, where the Ganga, Yamuna and traditionally believed invisible Saraswati meet.',
        'Ayodhya: Complete the journey in the sacred city of Shri Ram, with darshan at Ram Janmabhoomi, Hanuman Garhi, Kanak Bhawan and other important temples.',
        'Professionally planned multi-city journey covering Varanasi, Gaya, Prayagraj and Ayodhya.'
      ];
      data.lodging = '3 Nights Varanasi | 1 Night Gaya | 2 Nights Ayodhya';
      data.tourType = 'Pilgrimage, Family, Senior Citizens, Group';
      data.includes = [
        '6 Nights accommodation in selected hotels on twin/double sharing basis',
        'Daily breakfast',
        'AC vehicle for transfers and sightseeing as per itinerary',
        'Pickup and drop as specified in the itinerary',
        'Sightseeing in Varanasi, Gaya, Prayagraj and Ayodhya as per itinerary',
        'Assistance for the pilgrimage and local sightseeing arrangements',
        'Applicable hotel taxes and service charges'
      ];
      data.excludes = [
        'Flights / train tickets to Varanasi and from Ayodhya',
        'Lunch, dinner and beverages',
        'Pitru Shradh / Pind Daan / special puja charges unless specifically mentioned',
        'Priest/purohit charges and religious offerings unless specifically included',
        'Temple donations and special/VIP/priority darshan charges',
        'E-rickshaw/auto-rickshaw charges in restricted areas unless specifically included',
        'Boat ride charges at Prayagraj unless specifically included',
        'Monument/museum entry fees unless mentioned',
        'Personal expenses, shopping and laundry',
        'Travel insurance',
        'Any service not specifically mentioned under Package Inclusions'
      ];
      data.notes = [
        'Pitru Rituals: Pitru Shradh, Pind Daan and other ancestral ceremonies should be performed according to the devotee\\'s family tradition and religious requirements. Guests should communicate their specific ritual requirements while booking so suitable arrangements can be discussed.',
        'Temple Darshan: Temple entry, darshan timings, security procedures and special darshan facilities are subject to the respective temple authorities.',
        'Varanasi Local Transportation: Due to narrow lanes and restricted vehicle access in several parts of old Varanasi, the main vehicle may not be able to reach some temples directly. Guests may need to use an e-rickshaw, auto-rickshaw or walk a short distance to reach certain temples. Applicable local transportation charges, if any, will be payable directly by the guests unless specifically included in the quotation.',
        'Triveni Sangam Boat Ride: Boat rides at Prayagraj are dependent on weather, river conditions, local regulations and availability.',
        'Travel Schedule: The sightseeing sequence may be adjusted depending on temple timings, traffic, local conditions and operational requirements.'
      ];
      data.faqs = [
        { q: 'Can I book a Kashi–Gaya Pitru Moksha Yatra from Kerala?', a: 'Yes. Sahapathika Holidays can arrange Kashi–Gaya pilgrimage packages from Kerala for individuals, families and groups, with the itinerary extended to Prayagraj and Ayodhya as included in this package.' },
        { q: 'Does this package include Pitru Shradh or Pind Daan?', a: 'The itinerary is designed to accommodate Pitru-related rituals at Varanasi and Gaya. Specific priest, puja, Shradh or Pind Daan arrangements and charges should be confirmed at the time of booking according to your family\\'s requirements.' },
        { q: 'Can the rituals be performed according to our family tradition?', a: 'Yes. Pilgrims should provide their specific requirements while planning the trip. The appropriate local arrangements can then be discussed and coordinated.' },
        { q: 'Is Kashi Vishwanath Darshan included?', a: 'The itinerary includes a visit to Kashi Vishwanath Temple. Actual temple entry and darshan are subject to the prevailing rules, timings and procedures of the temple authorities.' },
        { q: 'Can I travel from Kochi to Varanasi for this pilgrimage?', a: 'Yes. Travellers from Kochi and other parts of Kerala can plan the journey to Varanasi by air or rail, depending on their preferred travel dates and available schedules. Sahapathika Holidays can assist with the overall travel plan.' },
        { q: 'Can people from Kozhikode, Kannur or Thiruvananthapuram book this package?', a: 'Yes. The package is available to travellers from across Kerala. The journey can be planned around the most convenient airport or railway station for your location.' },
        { q: 'Is this package suitable for senior citizens?', a: 'Yes. The itinerary can be adapted for senior travellers with suitable accommodation, private transportation and a more comfortable sightseeing schedule.' },
        { q: 'Can we add more days to the pilgrimage?', a: 'Yes. Additional nights can be added in Varanasi, Gaya or Ayodhya, depending on your requirements.' },
        { q: 'Can Ayodhya and Prayagraj be removed if we only want Kashi and Gaya?', a: 'Yes. The itinerary can be customized depending on the purpose and duration of your pilgrimage.' },
        { q: 'Can Sahapathika Holidays arrange a complete pilgrimage package from Kerala?', a: 'Yes. Depending on your requirements, Sahapathika Holidays can coordinate accommodation, local transportation, sightseeing and other travel arrangements for your pilgrimage from Kerala.' }
      ];
    } else if (p.slug === 'kashi-prayag-chitrakoot-ayodhya-yatra') {`;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (durationRegex.test(content)) {
    content = content.replace(durationRegex, durationReplacement);
    changed = true;
  }
  
  if (content.includes(insertionPoint) && !content.includes("slug === 'kashi-gaya-prayag-ayodhya-pitru-moksha-yatra'")) {
    content = content.replace(insertionPoint, kashiCode);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
