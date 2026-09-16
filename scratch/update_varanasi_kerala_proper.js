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

const insertionPoint = "if (p.slug === 'kerala-ayurveda-wellness-retreat') {";
const varanasiCode = `if (p.slug === 'varanasi-tour-packages-from-kerala') {
      data.mapUrl = 'https://maps.google.com/maps?q=Varanasi,+Uttar+Pradesh&t=&z=6&ie=UTF8&iwloc=&output=embed';
      data.overview = 'Planning a Varanasi tour from Kerala? Whether you are travelling from Kochi, Ernakulam, Thrissur, Kottayam, Kozhikode, Kannur, Malappuram, Alappuzha, Kollam or Thiruvananthapuram, Sahapathika Holidays can arrange your journey to the sacred city of Kashi with a carefully planned private tour.\\n\\nVaranasi is one of India\\'s most revered pilgrimage destinations, attracting devotees who come to seek the blessings of Kashi Vishwanath, experience the sacred Ganga, attend the divine Ganga Aarti and explore the spiritual heritage of Kashi.\\n\\nFor travellers from Kerala, flying is generally the most time-efficient option, while travelling by train offers a different experience for pilgrims who prefer an extended rail journey. Sahapathika Holidays can coordinate the journey from Kerala and arrange your Varanasi pilgrimage package, including local transfers, accommodation and sightseeing.';
      data.highlights = [
        'Kashi Vishwanath Darshan and spiritual rituals',
        'Kaal Bhairav Temple',
        'Ganga Aarti experience at Dashashwamedh Ghat',
        'Sunrise boat ride on the sacred Ganga',
        'Sarnath sightseeing',
        'Customizable Varanasi–Ayodhya–Prayagraj journey options',
        'Dedicated Kerala-based travel assistance for flights or trains'
      ];
      data.lodging = 'Customizable (Varanasi / Ayodhya / Prayagraj)';
      data.tourType = 'Pilgrimage, Family, Senior Citizens, Group, Custom';
      data.includes = [
        'Private AC vehicle for airport/railway station transfers and local sightseeing',
        'Selected hotel accommodation in Varanasi',
        'Daily breakfast',
        'Varanasi sightseeing as per itinerary',
        'Kashi Vishwanath Temple visit',
        'Ganga boat ride, where included in the selected package',
        'Ganga Aarti experience at Dashashwamedh Ghat',
        'Sarnath excursion',
        'Local assistance during the pilgrimage',
        'Pickup and departure transfer',
        'Toll, parking, fuel and driver-related charges as applicable to the selected package'
      ];
      data.excludes = [
        'Airfare and train tickets',
        'Lunch and dinner unless specifically mentioned',
        'Personal expenses, shopping and laundry',
        'Temple donations and offerings',
        'Special/VIP/priority darshan or special puja charges',
        'Monument/temple entry fees unless specifically included',
        'Travel insurance',
        'Any local transportation (e-rickshaws in old Varanasi) or service not specifically included',
        'Anything not mentioned under Package Inclusions'
      ];
      data.notes = [
        'Varanasi is famous for its ancient lanes and dense temple areas. Vehicles cannot reach the entrance of some temples because of narrow lanes and restricted vehicle access.',
        'Depending on the location, guests may need to use an e-rickshaw, auto-rickshaw or walk a short distance to reach certain temples and pilgrimage points. Any applicable local transportation charges will be payable directly by the guests unless specifically included.',
        'Many travellers from Kerala visit Varanasi primarily for specific religious purposes. If you have particular temple, ritual or darshan requirements, tell us while planning the package.',
        'Senior citizens and travellers with mobility concerns should inform Sahapathika Holidays in advance so that the itinerary and transportation arrangements can be planned appropriately.',
        'Travel schedules (flight/train) are dynamic. Please confirm current schedules and fares before finalizing your travel dates.'
      ];
      data.faqs = [
        { q: 'Can I book a Varanasi tour package from Kerala?', a: 'Yes. Sahapathika Holidays can arrange Varanasi tour packages from Kerala for families, couples, senior citizens, individuals and groups.' },
        { q: 'What is the best way to travel from Kerala to Varanasi?', a: 'For most travellers, flying is the quickest and most convenient option. Train travel is also possible, particularly for travellers who prefer a rail journey.' },
        { q: 'Can I fly from Kochi to Varanasi?', a: 'Yes. Current schedules include Kochi–Varanasi flight options, including direct services on selected days and connecting alternatives.' },
        { q: 'Can I travel by train from Ernakulam to Varanasi?', a: 'Yes. A direct Ernakulam–Varanasi rail service is currently listed, taking around 49 hours 50 minutes. Service frequency is limited, so availability should be checked.' },
        { q: 'Can I book a Varanasi package from Kozhikode or Kannur?', a: 'Yes. Travellers from North Kerala can enquire about suitable flight and travel arrangements from nearby airports and railway stations.' },
        { q: 'Can travellers from Thiruvananthapuram book this package?', a: 'Yes. Travellers from Thiruvananthapuram and other parts of South Kerala can book the package.' },
        { q: 'Does the package include Kashi Vishwanath Darshan?', a: 'The itinerary can include a visit to Kashi Vishwanath Temple. Actual darshan arrangements are subject to temple rules, timings and applicable procedures.' },
        { q: 'Can I add Ayodhya or Prayagraj to my Varanasi trip?', a: 'Yes. You can extend your Varanasi holiday into a larger Varanasi–Ayodhya–Prayagraj pilgrimage circuit.' },
        { q: 'Is a Varanasi package suitable for senior citizens?', a: 'Yes. We can design a more comfortable itinerary for senior travellers, including suitable hotels, private transportation and a less rushed sightseeing schedule.' },
        { q: 'Can the package be customized?', a: 'Yes. The duration, hotel category, transportation, sightseeing and additional destinations can be customized according to your requirements.' }
      ];
    } else if (p.slug === 'kerala-ayurveda-wellness-retreat') {`;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  if (content.includes(insertionPoint) && !content.includes("slug === 'varanasi-tour-packages-from-kerala'")) {
    content = content.replace(insertionPoint, varanasiCode);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
