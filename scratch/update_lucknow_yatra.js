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

const durationRegex = /\{ slug: 'lucknow-naimisharanya-ayodhya-prayagraj-varanasi-y', title: 'Lucknow\s+Naimisharanya\s+Ayodhya\s+Prayagraj\s+Varanasi Yatra', regions: 'Lucknow\s+Naimisharanya\s+Ayodhya\s+Prayagraj\s+Varanasi Yatra', region: 'North India', duration: 'On enquiry', cat: 'Pilgrimage Yatra', photo: 'packages_cards\/ayodhya\.jpg', hint: 'Lucknow\s+Naimisharanya\s+Ayodhya\s+Prayagraj\s+Varanasi Yatra' \}/;
const durationReplacement = `{ slug: 'lucknow-naimisharanya-ayodhya-prayagraj-varanasi-y', title: 'Lucknow Naimisharanya Ayodhya Prayagraj Varanasi Yatra', regions: 'Lucknow Naimisharanya Ayodhya Prayagraj Varanasi Yatra', region: 'North India', duration: '6 Days 5 Nights', cat: 'Pilgrimage Yatra', photo: 'packages_cards/ayodhya.jpg', hint: 'Lucknow Naimisharanya Ayodhya Prayagraj Varanasi Yatra' }`;

const insertionPoint = "} else if (p.slug === 'puri-jagannath-konark-chilika-bhubaneswar') {";
const lucknowCode = `} else if (p.slug === 'lucknow-naimisharanya-ayodhya-prayagraj-varanasi-y') {
      data.overview = 'Experience a spiritually enriching journey through some of the most revered destinations of Uttar Pradesh with this carefully planned Lucknow–Naimisharanya–Ayodhya–Prayagraj–Varanasi Yatra.\\n\\nBeginning in the historic city of Lucknow, the journey takes you to the sacred land of Naimisharanya, the divine city of Ayodhya, the holy Triveni Sangam of Prayagraj, and finally to Kashi, the eternal city of Lord Shiva.\\n\\nThis Uttar Pradesh pilgrimage package from Kerala is designed for travellers who wish to combine important Hindu pilgrimage sites with the cultural and historical highlights of Lucknow. It is suitable for families, senior citizens, couples and pilgrimage groups travelling from Kerala.';
      data.highlights = [
        'Explore one of the ancient pilgrimage centres of Uttar Pradesh and its important sacred sites at Naimisharanya.',
        'Experience the spiritual atmosphere of Shri Ram Janmabhoomi, Hanuman Garhi and Kanak Bhawan in Ayodhya.',
        'Visit the sacred Triveni Sangam, one of India\\'s most important pilgrimage destinations in Prayagraj.',
        'Complete your journey in Kashi with Kashi Vishwanath Darshan, temple visits and the divine Ganga Aarti.',
        'Add a cultural dimension to the pilgrimage with the magnificent Nawabi architecture and historic landmarks of Lucknow.',
        'One coordinated pilgrimage connecting five major destinations into a planned route.'
      ];
      data.lodging = '1 Night Naimisharanya | 1 Night Ayodhya | 1 Night Prayagraj | 2 Nights Varanasi';
      data.tourType = 'Pilgrimage, Family, Senior Citizens, Group';
      data.includes = [
        '5 Nights accommodation in selected hotels on twin/double sharing basis',
        'Daily breakfast',
        'AC vehicle for transfers and sightseeing as per itinerary',
        'Pickup at Lucknow Airport / Railway Station and drop at Varanasi Airport / Railway Station',
        'Sightseeing in Lucknow, Naimisharanya, Ayodhya, Prayagraj and Varanasi as per itinerary',
        'Assistance from Sahapathika Holidays during the journey',
        'Applicable hotel taxes and service charges'
      ];
      data.excludes = [
        'Flights / train tickets to Lucknow and from Varanasi',
        'Lunch, dinner and beverages',
        'Personal expenses, shopping and laundry',
        'Temple donations and offerings',
        'Special / VIP / priority darshan charges, wherever applicable',
        'Religious rituals or special puja charges',
        'Ganga boat ride unless specifically included',
        'E-rickshaw / auto-rickshaw charges in restricted areas unless specifically included',
        'Monument / museum entry fees unless specifically mentioned',
        'Travel insurance',
        'Any service not specifically mentioned under Package Inclusions'
      ];
      data.notes = [
        'Temple Darshan: Entry, darshan timings, security procedures and special darshan arrangements are subject to the rules and regulations of the respective temple authorities.',
        'Varanasi Local Transportation: Parts of old Varanasi have narrow lanes and restricted vehicle access. Guests may need to use an e-rickshaw, auto-rickshaw or walk a short distance to reach some pilgrimage sites. Applicable local transportation charges are payable directly by guests.',
        'Ganga Boat Ride: The boat ride mentioned in the itinerary is at the guest\\'s own expense unless specifically included in the selected package.',
        'Holy Dips & Rituals: Any religious rituals, holy dips or offerings are undertaken according to the guest\\'s personal beliefs and prevailing local conditions.',
        'Itinerary Flexibility: The sightseeing sequence may be adjusted according to temple timings, traffic, local conditions and operational requirements.'
      ];
      data.faqs = [
        { q: 'Can I book a Lucknow–Ayodhya–Varanasi tour package from Kerala?', a: 'Yes. Sahapathika Holidays can arrange this Uttar Pradesh pilgrimage package from Kerala for families, couples, senior citizens and groups.' },
        { q: 'Which places are covered in this pilgrimage package?', a: 'The itinerary covers Lucknow, Naimisharanya, Ayodhya, Prayagraj and Varanasi, with important temples, pilgrimage sites and cultural attractions included as per the itinerary.' },
        { q: 'Can I travel from Kochi to Lucknow and return from Varanasi?', a: 'Yes. This is a convenient way to approach the itinerary because the journey begins in Lucknow and concludes in Varanasi. Flight or train arrangements can be planned separately according to your travel requirements.' },
        { q: 'Can travellers from Kozhikode, Kannur or Thiruvananthapuram book this package?', a: 'Yes. Travellers from anywhere in Kerala can enquire about the package. The journey can be planned around the most convenient airport or railway station for your location.' },
        { q: 'Is Shri Ram Janmabhoomi included?', a: 'Yes. Shri Ram Janmabhoomi in Ayodhya is included in the Day 3 sightseeing itinerary, subject to prevailing temple entry and darshan procedures.' },
        { q: 'Is Kashi Vishwanath Temple Darshan included?', a: 'The itinerary includes a visit to Kashi Vishwanath Temple. Actual temple entry and darshan are subject to the temple authorities\\' prevailing rules, timings and procedures.' },
        { q: 'Is the Ganga boat ride included in the package?', a: 'The itinerary mentions a Ganga boat ride, but it is at the guest\\'s own expense unless specifically included in the final quotation.' },
        { q: 'Is this package suitable for senior citizens?', a: 'Yes. The itinerary can be customized for senior travellers with appropriate hotel selection, private transportation and a more comfortable sightseeing pace.' },
        { q: 'Can this itinerary be customized?', a: 'Yes. Additional nights, different hotel categories, transportation arrangements and other requirements can be incorporated according to your group\\'s needs.' },
        { q: 'Can I add other pilgrimage destinations to this tour?', a: 'Yes. Depending on the number of additional days available, the itinerary can potentially be extended to include other North India destinations. The exact route should be discussed while planning your package.' }
      ];
    } else if (p.slug === 'puri-jagannath-konark-chilika-bhubaneswar') {`;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (durationRegex.test(content)) {
    content = content.replace(durationRegex, durationReplacement);
    changed = true;
  }
  
  if (content.includes(insertionPoint) && !content.includes("slug === 'lucknow-naimisharanya-ayodhya-prayagraj-varanasi-y'")) {
    content = content.replace(insertionPoint, lucknowCode);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
