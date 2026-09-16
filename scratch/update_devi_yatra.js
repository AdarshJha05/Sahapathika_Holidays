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

const insertionPoint = "} else if (p.slug === 'shimla-kullu-manali') {";
const deviYatraCode = `} else if (p.slug === 'himachal-devi-yatra-with-vaishno-devi-mansa-devi') {
      data.overview = 'Embark on a spiritually enriching Devi temple pilgrimage from Chandigarh, covering some of the most revered Shakti temples of Himachal Pradesh along with the sacred pilgrimage to Mata Vaishno Devi and Mata Mansa Devi. This carefully planned 7-day journey brings together ancient temples, devotional experiences and the beautiful mountain landscapes around Kangra and Dharamshala.\\n\\nThe pilgrimage takes you through Naina Devi, Chintpurni, Jwala Ji, Baglamukhi, Kangra Devi and Chamunda Devi, followed by Dharamshala sightseeing and the onward journey to Katra for Vaishno Devi Darshan. The return journey includes a visit to Mansa Devi Temple near Panchkula before concluding at Chandigarh.\\n\\nFor Malayalis and travellers from Kerala looking for a Himachal Devi Yatra package from Kerala, this itinerary can be planned with suitable flight or train arrangements to Chandigarh. Sahapathika Holidays can coordinate the pilgrimage, accommodation and private transportation according to your travel dates and group requirements.';
      data.highlights = [
        'Combines several important Devi temples of Himachal Pradesh with Mata Vaishno Devi and Mansa Devi.',
        'Covers the major pilgrimage circuit from Chandigarh through Himachal Pradesh to Katra and back.',
        'Includes visits to Naina Devi, Chintpurni, Jwala Ji, Baglamukhi, Kangra and Chamunda Devi temples.',
        'Adds the spiritual experience of Mata Vaishno Devi Darshan.',
        'Includes Dharamshala and McLeod Ganj sightseeing for a cultural and scenic break.',
        'Suitable for families, devotees and pilgrimage groups seeking a structured multi-temple journey.'
      ];
      data.lodging = '1N Chintpurni | 2N Dharamshala/Kangra | 2N Katra | 1N Chandigarh';
      data.tourType = 'Pilgrimage, Family, Group';
      data.includes = [
        'Hotel accommodation on double/triple sharing basis',
        'Daily breakfast and dinner',
        'Private AC vehicle for the complete itinerary',
        'Chandigarh pickup and drop as applicable',
        'Sightseeing and temple visits as per itinerary',
        'Toll, parking, fuel and applicable state taxes',
        'Driver allowances',
        'Assistance throughout the tour',
        'Temple darshan guidance as specified',
        'Customer support during the journey'
      ];
      data.excludes = [
        'Flights or train tickets to/from Chandigarh',
        'Lunch and personal snacks',
        'Ropeway/cable car charges where applicable',
        'Pony, palki, battery car or helicopter charges for Vaishno Devi',
        'Entry fees and boating/adventure activities not specifically included',
        'Personal expenses, shopping, tips and laundry',
        'Medical expenses and travel insurance',
        'Any special puja, donation or offering not specifically included',
        'Any service or expense not mentioned under inclusions'
      ];
      data.notes = [
        'Temple entry, darshan procedures, queues and operating arrangements can vary. Travellers should follow the prevailing instructions of the respective temple authorities on the day of visit.',
        'The Vaishno Devi visit involves a significant pilgrimage journey. Travellers should consider their physical fitness and comfort when planning the trek.',
        'The source itinerary specifically excludes pony, palki, battery car and helicopter charges. These should therefore be treated as optional/additional expenses rather than included services.',
        'Road journeys through Himachal Pradesh can take longer depending on traffic, weather and road conditions. The itinerary should therefore be followed with reasonable flexibility.',
        'The supplied package includes pickup and drop at Chandigarh Airport/Railway Station or home, depending on the selected arrangement.'
      ];
      data.faqs = [
        { q: 'Can I book this Devi Yatra from Kerala?', a: 'Yes. Sahapathika Holidays can arrange the land package for travellers from Kerala, with the journey beginning and ending at Chandigarh. Flight or train arrangements from Kerala can be coordinated separately if required.' },
        { q: 'What temples are covered in this pilgrimage?', a: 'The detailed itinerary covers Naina Devi, Chintpurni, Jwala Ji, Baglamukhi, Kangra Devi, Chamunda Devi, Mata Vaishno Devi and Mansa Devi.' },
        { q: 'Is Mata Vaishno Devi included in the itinerary?', a: 'Yes. The programme includes a dedicated day for Mata Vaishno Devi Darshan from Katra.' },
        { q: 'Is helicopter travel to Vaishno Devi included?', a: 'No. Helicopter charges are excluded and would be an additional expense if selected.' },
        { q: 'Is this itinerary suitable for senior citizens?', a: 'It can be suitable for senior travellers depending on their mobility and ability to manage the pilgrimage and road journeys. Individual assistance options can be discussed before booking.' },
        { q: 'Are accommodation and meals included?', a: 'Yes. The package includes hotel accommodation on double/triple sharing and daily breakfast and dinner.' },
        { q: 'Is transportation included?', a: 'Yes. The supplied itinerary includes a private AC vehicle for the complete journey, with vehicle size based on group strength.' },
        { q: 'Can the package be customized?', a: 'Yes. Travel dates, hotel preferences, group requirements and other practical arrangements can be discussed with Sahapathika Holidays.' },
        { q: 'Can Sahapathika Holidays arrange flights from Kochi or other Kerala airports?', a: 'Yes. You can discuss flight or train coordination from Kochi or other suitable airports/railway stations in Kerala while planning the complete journey.' },
        { q: 'How do I book this pilgrimage package?', a: 'Share your preferred travel dates, number of travellers and accommodation preference with Sahapathika Holidays. The team can check availability and prepare the applicable quotation.' }
      ];
    } else if (p.slug === 'shimla-kullu-manali') {`;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (content.includes(insertionPoint) && !content.includes("slug === 'himachal-devi-yatra-with-vaishno-devi-mansa-devi'")) {
    content = content.replace(insertionPoint, deviYatraCode);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
