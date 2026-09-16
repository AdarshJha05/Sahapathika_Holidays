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

const durationRegex = /\{ slug: 'kashmir-5-days-srinagar-sonmarg-gulmarg-pahalgam-j', title: 'Kashmir\s+5\s+Days\s+Srinagar\s+Sonmarg\s+Gulmarg\s+&\s+Pahalgam\s+Jammu\s+to\s+Jammu', regions: 'Kashmir\s+5\s+Days\s+Srinagar\s+Sonmarg\s+Gulmarg\s+&\s+Pahalgam\s+Jammu\s+to\s+Jammu', region: 'North India', duration: 'On enquiry', cat: 'Hill & Backwater', photo: 'packages_cards\/srinagar\.jpg', hint: 'Kashmir\s+5\s+Days\s+Srinagar\s+Sonmarg\s+Gulmarg\s+&\s+Pahalgam\s+Jammu\s+to\s+Jammu' \}/;
const durationReplacement = `{ slug: 'kashmir-5-days-srinagar-sonmarg-gulmarg-pahalgam-j', title: 'Kashmir 5 Days Srinagar Sonmarg Gulmarg & Pahalgam Jammu to Jammu', regions: 'Kashmir 5 Days Srinagar Sonmarg Gulmarg & Pahalgam Jammu to Jammu', region: 'North India', duration: '5 Days 4 Nights', cat: 'Hill & Backwater', photo: 'packages_cards/srinagar.jpg', hint: 'Kashmir 5 Days Srinagar Sonmarg Gulmarg & Pahalgam Jammu to Jammu' }`;

const insertionPoint = "} else if (p.slug === 'kashmir-6-days-srinagar-sonmarg-gulmarg-pahalgam') {";
const kashmirCode = `} else if (p.slug === 'kashmir-5-days-srinagar-sonmarg-gulmarg-pahalgam-j') {
      data.overview = 'Experience the breathtaking landscapes of the Kashmir Valley with a specially planned Kashmir tour package from Kerala covering Srinagar, Sonmarg, Gulmarg and Pahalgam. From snow-covered mountain scenery and peaceful valleys to the famous meadows of Gulmarg and the picturesque landscapes of Pahalgam, this short Kashmir holiday brings together some of the region\\'s most sought-after experiences.\\n\\nThe journey begins with a scenic drive from Jammu to Srinagar before exploring the natural beauty around Srinagar, Sonmarg, Gulmarg and Pahalgam. A stay on a traditional Kashmir houseboat adds a distinctive element to the holiday, making this itinerary suitable for families, couples, friends and travellers looking for a memorable North India escape from Kerala.';
      data.highlights = [
        'Scenic Jammu–Srinagar road journey',
        'Srinagar local sightseeing',
        'Mountain landscapes of Sonmarg',
        'Optional Thajiwas Glacier pony excursion',
        'Picturesque Gulmarg',
        'Optional Gondola cable car experience',
        'Traditional Kashmir houseboat stay',
        'Scenic Pahalgam: Aru Valley, Betaab Valley and Chandanwari'
      ];
      data.lodging = '2 Nights Srinagar | 1 Night Houseboat | 1 Night Pahalgam';
      data.tourType = 'Family, Couples, Honeymoon, Group';
      data.includes = [
        'Accommodation in selected hotels/houseboat as per itinerary',
        'Breakfast and dinner as specified',
        'AC vehicle for transfers and sightseeing as per itinerary',
        'Jammu pickup and applicable departure drop',
        'Srinagar, Sonmarg, Gulmarg and Pahalgam sightseeing as planned',
        'Driver allowance, tolls, parking and applicable permits',
        'Welcome arrangements as specified',
        'Trip coordination and assistance from Sahapathika Holidays'
      ];
      data.excludes = [
        'Airfare and train tickets',
        'Lunch',
        'Gondola/cable car tickets',
        'Pony rides',
        'Adventure activities',
        'Entry tickets wherever applicable',
        'Guide charges unless specifically included',
        'Personal expenses, laundry and telephone expenses',
        'Travel insurance',
        'Alcoholic beverages',
        'Any sightseeing, activity, or service not included in the itinerary'
      ];
      data.notes = [
        'Kashmir\\'s mountain roads are subject to weather, traffic and local conditions, so actual travel times may vary.',
        'Gulmarg Gondola tickets are not included and should be pre-booked where applicable.',
        'Pony rides, including excursions towards areas such as Thajiwas Glacier, are optional and payable separately.',
        'Snow availability is seasonal and cannot be guaranteed on a particular travel date.',
        'Certain sightseeing areas around Pahalgam and Gulmarg may require local transportation arrangements depending on prevailing local regulations.',
        'Guests should carry warm clothing during colder months, particularly when visiting higher-altitude areas.',
        'Houseboat accommodation is subject to availability and the category confirmed at the time of booking.',
        'Guests with mobility concerns should inform Sahapathika Holidays before booking, as some sightseeing locations involve walking and uneven terrain.'
      ];
      data.faqs = [
        { q: 'Can I book a Kashmir tour package from Kerala?', a: 'Yes. Sahapathika Holidays can arrange this 5-day Kashmir tour package from Kerala, with travel arrangements planned according to your preferred dates and departure location.' },
        { q: 'What places are covered in this Kashmir package?', a: 'The itinerary covers Srinagar, Sonmarg, Gulmarg and Pahalgam, beginning with arrival at Jammu and a road journey to Srinagar.' },
        { q: 'Is this a good Kashmir package for a first-time visitor?', a: 'Yes. The itinerary covers several of Kashmir\\'s most popular destinations and combines mountain scenery, valleys, sightseeing and a houseboat stay within five days.' },
        { q: 'Is the Gulmarg Gondola ride included?', a: 'No. The Gondola ride is specifically listed as an exclusion. It can be added separately subject to availability and applicable charges.' },
        { q: 'Is the pony ride at Sonmarg included?', a: 'No. The source itinerary specifies the pony excursion towards Thajiwas Glacier as an optional activity at the traveller\\'s own cost.' },
        { q: 'Does the package include a houseboat stay?', a: 'Yes. The itinerary includes a houseboat stay in Srinagar on Day 3.' },
        { q: 'Is this Kashmir package suitable for senior citizens?', a: 'It can be suitable for senior travellers, but Kashmir involves mountain roads, walking and changes in altitude. Guests should share any mobility requirements with Sahapathika Holidays before booking so the itinerary can be planned appropriately.' },
        { q: 'Can couples or honeymooners book this Kashmir package?', a: 'Yes. The combination of Srinagar, Gulmarg, Pahalgam and a houseboat stay makes this itinerary suitable for couples and honeymoon travellers as well.' },
        { q: 'Can Sahapathika Holidays arrange flights or trains from Kerala?', a: 'Travel tickets are not included in the base package. However, Sahapathika Holidays can discuss and coordinate suitable flight/train arrangements based on your departure city and travel dates.' },
        { q: 'Can this Kashmir itinerary be customised?', a: 'Yes. The itinerary can be customised depending on your travel dates, group size, hotel category, preferred arrival/departure point and optional activities.' }
      ];
    } else if (p.slug === 'kashmir-6-days-srinagar-sonmarg-gulmarg-pahalgam') {`;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (durationRegex.test(content)) {
    content = content.replace(durationRegex, durationReplacement);
    changed = true;
  }
  
  if (content.includes(insertionPoint) && !content.includes("slug === 'kashmir-5-days-srinagar-sonmarg-gulmarg-pahalgam-j'")) {
    content = content.replace(insertionPoint, kashmirCode);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
