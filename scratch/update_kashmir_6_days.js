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

const durationRegex = /\{ slug: 'kashmir-6-days-srinagar-sonmarg-gulmarg-pahalgam', title: 'Kashmir\s+6\s+Days\s+Srinagar\s+Sonmarg\s+Gulmarg\s+&\s+Pahalgam', regions: 'Kashmir\s+6\s+Days\s+Srinagar\s+Sonmarg\s+Gulmarg\s+&\s+Pahalgam', region: 'North India', duration: 'On enquiry', cat: 'Hill & Backwater', photo: 'packages_cards\/gulmarg\.jpg', hint: 'Kashmir\s+6\s+Days\s+Srinagar\s+Sonmarg\s+Gulmarg\s+&\s+Pahalgam' \}/;
const durationReplacement = `{ slug: 'kashmir-6-days-srinagar-sonmarg-gulmarg-pahalgam', title: 'Kashmir 6 Days Srinagar Sonmarg Gulmarg & Pahalgam', regions: 'Kashmir 6 Days Srinagar Sonmarg Gulmarg & Pahalgam', region: 'North India', duration: '6 Days 5 Nights', cat: 'Hill & Backwater', photo: 'packages_cards/gulmarg.jpg', hint: 'Kashmir 6 Days Srinagar Sonmarg Gulmarg & Pahalgam' }`;

const insertionPoint = "} else if (p.slug === 'kashmir-honeymoon') {";
const kashmirCode = `} else if (p.slug === 'kashmir-6-days-srinagar-sonmarg-gulmarg-pahalgam') {
      data.overview = 'Experience the breathtaking beauty of the Kashmir Valley with this thoughtfully planned Kashmir tour package from Kerala. Covering Srinagar, Sonmarg, Gulmarg and Pahalgam, this six-day journey combines scenic mountain landscapes, historic gardens, traditional Kashmiri culture and the unforgettable experience of a Shikara ride on Dal Lake.\\n\\nYour journey begins in Jammu before continuing to Srinagar, the gateway to some of Kashmir\\'s most celebrated destinations. Explore the Mughal gardens and Shankaracharya Temple, experience the mountain scenery of Sonmarg, discover the meadows of Gulmarg and spend a memorable day amid the valleys of Pahalgam.\\n\\nIdeal for families, couples, honeymooners, senior travellers and groups from Kerala, this itinerary offers a balanced introduction to Kashmir without rushing through its major destinations.';
      data.highlights = [
        'Srinagar city sightseeing including Shankaracharya Temple and Mughal Gardens (Chashme Shahi, Nishat, Shalimar)',
        'Traditional Kashmiri handicraft shopping',
        '60-minute Shikara ride on Dal Lake',
        'Sonmarg mountain excursion',
        'Gulmarg\\'s famous meadows and optional Gondola experience',
        'Historic Awantipura ruins',
        'Pahalgam sightseeing including Aru Valley, Betaab Valley, and Chandanwari'
      ];
      data.lodging = '4 Nights Srinagar | 1 Night Pahalgam';
      data.tourType = 'Family, Couples, Honeymoon, Group';
      data.includes = [
        '5 nights\\' accommodation in selected hotels as per itinerary',
        'Daily breakfast and dinner',
        'Transportation for the complete tour as per itinerary',
        'Sightseeing as specified',
        '60-minute Shikara ride on Dal Lake',
        'Toll taxes, parking charges and driver allowance',
        'Applicable hotel and transportation taxes',
        'Permits where applicable',
        'Welcome arrangements',
        'Trip coordination and assistance from Sahapathika Holidays'
      ];
      data.excludes = [
        'Airfare and train fare',
        '5% GST',
        'Garden and monument entrance fees',
        'Guide charges wherever applicable',
        'Gulmarg Gondola/cable car tickets',
        'Pony/horse rides',
        'Local union vehicle charges where applicable',
        'Skiing, skating, rafting and other adventure activities',
        'Helicopter rides',
        'Additional sightseeing or excursions outside the itinerary',
        'Insurance',
        'Personal expenses, tips, gratuities, laundry, room service, telephone expenses, room heaters, beverages',
        'Camera/video camera charges wherever applicable',
        'Anything not specifically mentioned under Package Inclusions'
      ];
      data.notes = [
        'Mountain travel times can vary due to weather, traffic and road conditions. The Jammu–Srinagar road journey can take longer than the planned duration.',
        'Shikara ride for 60 minutes on Dal Lake is included.',
        'Gondola/cable car rides at Gulmarg are not included and require separate tickets. Pony rides and horse rides are optional and payable separately.',
        'Local union vehicles may be required for sightseeing around parts of Pahalgam, including Aru Valley, Betaab Valley and Chandanwari.',
        'Garden entrance charges and applicable guide charges are excluded.',
        'Adventure activities such as skiing, skating, rafting are not included. Snow availability cannot be guaranteed for a particular travel date.',
        'Guests should carry suitable warm clothing during winter and for visits to higher-altitude destinations. Some sightseeing locations involve walking and uneven surfaces.'
      ];
      data.faqs = [
        { q: 'Can I book a Kashmir tour package from Kerala?', a: 'Yes. Sahapathika Holidays can arrange this 6-day Kashmir tour package from Kerala, with the itinerary and travel arrangements planned around your preferred dates.' },
        { q: 'Which places are covered in this Kashmir package?', a: 'The package covers Jammu, Srinagar, Sonmarg, Gulmarg and Pahalgam, with sightseeing at the major attractions mentioned in the itinerary.' },
        { q: 'Is the Shikara ride included?', a: 'Yes. A 60-minute Shikara ride on Dal Lake is included in the package.' },
        { q: 'Is the Gulmarg Gondola ride included?', a: 'No. The Gondola cable car ride is excluded and can be taken separately at the applicable cost, subject to availability.' },
        { q: 'Is a pony ride included at Sonmarg or Pahalgam?', a: 'No. Pony/horse rides are optional and excluded from the package price.' },
        { q: 'Is this Kashmir tour suitable for honeymoon couples?', a: 'Yes. Srinagar, Dal Lake, Gulmarg and Pahalgam make this itinerary well suited to couples and honeymoon travellers.' },
        { q: 'Is this package suitable for senior citizens?', a: 'Yes, with appropriate planning. However, Kashmir involves mountain travel, walking and sightseeing at different elevations. Senior travellers should inform us about mobility requirements before booking.' },
        { q: 'Can Sahapathika Holidays arrange travel from Kochi or other cities in Kerala?', a: 'Yes. The Kashmir package can be planned around your departure arrangements from Kochi or other suitable airports/railway stations in Kerala.' },
        { q: 'Can the Kashmir itinerary be customised?', a: 'Yes. Depending on your travel dates, group size, hotel category, arrival/departure arrangements and optional activities, the itinerary can be customised.' },
        { q: 'What is the best time to book this Kashmir package?', a: 'Kashmir can be visited throughout the year. Travellers seeking greenery and comfortable sightseeing generally prefer the warmer months, while those specifically looking for snow often choose the winter season.' }
      ];
    } else if (p.slug === 'kashmir-honeymoon') {`;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (durationRegex.test(content)) {
    content = content.replace(durationRegex, durationReplacement);
    changed = true;
  }
  
  if (content.includes(insertionPoint) && !content.includes("slug === 'kashmir-6-days-srinagar-sonmarg-gulmarg-pahalgam'")) {
    content = content.replace(insertionPoint, kashmirCode);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
