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

const durationRegex = /\{ slug: 'kashmir-honeymoon', title: 'Kashmir\s+Honeymoon', regions: 'Kashmir\s+Honeymoon', region: 'North India', duration: '7 Days\s+6 Nights', cat: 'Hill & Backwater', photo: 'packages_cards\/sonamarg\.jpg', hint: 'Kashmir\s+Honeymoon' \}/;
const durationReplacement = `{ slug: 'kashmir-honeymoon', title: 'Kashmir Honeymoon', regions: 'Kashmir Honeymoon', region: 'North India', duration: '7 Days 6 Nights', cat: 'Hill & Backwater', photo: 'packages_cards/sonamarg.jpg', hint: 'Kashmir Honeymoon' }`;

const insertionPoint = "} else if (p.slug === 'kashmir-with-vaishno-devi') {";
const kashmirCode = `} else if (p.slug === 'kashmir-honeymoon') {
      data.overview = 'Begin your married life with an unforgettable journey through the breathtaking landscapes of Kashmir. This Kashmir honeymoon package from Kerala is designed for couples who want to combine beautiful mountain scenery, peaceful lakes, romantic valleys and leisurely sightseeing in one memorable holiday.\\n\\nFrom the tranquil surroundings of Srinagar and Dal Lake to the snow-covered landscapes of Sonmarg and Gulmarg, followed by the scenic beauty of Pahalgam, the itinerary introduces you to some of Kashmir\\'s most celebrated destinations. The experience also includes a 60-minute Shikara ride on Dal Lake, creating a special moment for couples amidst the beautiful surroundings of Srinagar.';
      data.highlights = [
        'Beautiful Srinagar and Dal Lake',
        '60-minute Shikara ride',
        'Mughal gardens and panoramic city views',
        'Scenic Sonmarg excursion',
        'Snow and mountain experiences at Gulmarg (optional Gondola ride)',
        'Romantic landscapes of Pahalgam',
        'Aru Valley, Betaab Valley and Chandanwari',
        'A combination of sightseeing and leisure'
      ];
      data.lodging = '3 Nights Srinagar | 1 Night Gulmarg | 2 Nights Pahalgam';
      data.tourType = 'Honeymoon, Couples';
      data.includes = [
        '6 nights\\' accommodation in selected hotels as per itinerary',
        'Daily breakfast and dinner',
        'Transportation for the complete tour as per itinerary',
        'Srinagar, Sonmarg, Gulmarg and Pahalgam sightseeing',
        '60-minute Shikara ride on Dal Lake',
        'Toll taxes, parking charges and driver allowance',
        'Applicable hotel and transportation taxes',
        'Trip coordination and assistance from Sahapathika Holidays'
      ];
      data.excludes = [
        'Airfare and train fare',
        '5% GST',
        'Garden and monument entrance fees',
        'Guide charges wherever applicable',
        'Gulmarg Gondola/cable car ride',
        'Pony/horse rides',
        'Local union vehicle charges wherever applicable',
        'Skiing, skating, rafting and other adventure activities',
        'Helicopter rides',
        'Additional sightseeing and excursions outside the itinerary',
        'Travel insurance',
        'Tips and gratuities, laundry, room service, telephone expenses, room heaters, beverages',
        'Camera/video camera charges wherever applicable',
        'Any personal expenses or anything not specifically mentioned under Package Inclusions'
      ];
      data.notes = [
        'Kashmir\\'s mountain roads can be affected by weather, traffic and local conditions, so actual travel times may vary.',
        'Some sightseeing around Pahalgam may require transportation operated by the local vehicle union. Applicable charges are separate unless specifically included.',
        'The 60-minute Shikara ride on Dal Lake is included in the package.',
        'Gondola/cable car rides at Gulmarg are excluded and require separate tickets. Pony and horse rides are optional and payable separately.',
        'Adventure activities such as skiing, skating, rafting and similar experiences are not included. Snow is a seasonal natural phenomenon and cannot be guaranteed on a particular travel date.',
        'Any special celebration, room decoration or additional honeymoon arrangements should be confirmed separately and are not automatically included.',
        'Couples travelling during winter should carry adequate warm clothing.'
      ];
      data.faqs = [
        { q: 'Can I book a Kashmir honeymoon package from Kerala?', a: 'Yes. Sahapathika Holidays can arrange this Kashmir honeymoon package from Kerala for couples travelling from Kochi and other cities and districts of Kerala.' },
        { q: 'How many days is this Kashmir honeymoon package?', a: 'The itinerary is designed for 7 Days / 6 Nights, covering Srinagar, Sonmarg, Gulmarg and Pahalgam.' },
        { q: 'Is the Shikara ride included?', a: 'Yes. A 60-minute Shikara ride on Dal Lake is included in the package.' },
        { q: 'Is the Gulmarg Gondola included?', a: 'No. The Gondola cable car ride is excluded. Couples can choose to take the ride separately, subject to availability and applicable charges.' },
        { q: 'Is this package suitable for a winter honeymoon?', a: 'Yes. Winter can be particularly attractive for couples who want to experience snow, especially around Gulmarg. However, actual snow conditions depend on the weather during the travel period.' },
        { q: 'Are Aru Valley, Betaab Valley and Chandanwari included?', a: 'Yes. These three Pahalgam sightseeing locations are included in the itinerary. Local transportation charges, where applicable, are separate.' },
        { q: 'Can we customise this Kashmir honeymoon package?', a: 'Yes. The itinerary can be customised according to your travel dates, preferred hotel category, number of nights, arrival/departure arrangements and other requirements.' },
        { q: 'Can Sahapathika Holidays arrange flights from Kerala?', a: 'Flight tickets are not included in the base package. However, suitable flight arrangements can be discussed based on your departure city and travel dates.' },
        { q: 'Is this Kashmir package suitable for couples celebrating an anniversary?', a: 'Yes. The itinerary is suitable not only for newlyweds but also for couples planning an anniversary or romantic Kashmir holiday.' },
        { q: 'How can we book this Kashmir honeymoon package?', a: 'Contact Sahapathika Holidays with your travel dates, departure city, number of travellers and preferred hotel category. Our team can prepare a suitable honeymoon quotation.' }
      ];
    } else if (p.slug === 'kashmir-with-vaishno-devi') {`;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (durationRegex.test(content)) {
    content = content.replace(durationRegex, durationReplacement);
    changed = true;
  }
  
  if (content.includes(insertionPoint) && !content.includes("slug === 'kashmir-honeymoon'")) {
    content = content.replace(insertionPoint, kashmirCode);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
