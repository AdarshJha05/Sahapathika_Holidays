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

const detailForRegex = /detailFor\(slug\) \{[\s\S]*?\}\s*getGallery\(slug\)/;

const newDetailFor = `detailFor(slug) {
    const p = this.packages.find(x => x.slug === slug) || this.packages[0];
    
    // Default placeholder data
    let data = {
      p,
      overview: 'The full overview for this package is being carried across verbatim from the live Sahapathika site. The Ayurveda & Wellness Retreat below shows the complete, populated detail template.',
      highlights: ['Highlights pending — pull from live package page'],
      lodging: 'Confirm from source',
      tourType: 'Confirm from source',
      includes: ['Inclusions pending — pull from live package page'],
      excludes: ['Exclusions pending — pull from live package page'],
      notes: ['Prices are per person and subject to change', 'Booking is confirmed only on advance payment', 'Itinerary may be adjusted for weather, temple timings or road conditions', 'Sabarimala and some temple visits are seasonal — confirm before booking'],
      faqs: this.faqData
    };

    if (p.slug === 'kerala-ayurveda-wellness-retreat') {
      data.overview = 'Six unhurried days built around real Ayurvedic treatment rather than a spa menu. You begin with a consultation, follow a prescribed course of therapies with daily yoga and meditation, and eat sattvic food cooked for your constitution. Between sessions there is Kovalam Beach, the Poovar estuary where backwater meets sea, and the temple city of Trivandrum — so the trip restores you without ever feeling like a clinic.';
      data.highlights = ['Consultation-led Ayurveda therapies', 'Daily yoga and guided meditation', 'Kovalam Beach at sunrise', 'Poovar backwaters and the golden sand bar', 'Sree Padmanabhaswamy Temple exterior', 'Sattvic dining throughout'];
      data.lodging = 'Ayurveda Resort / Deluxe Wellness Resort';
      data.tourType = 'Group, Family & Pilgrimage';
      data.includes = ['Accommodation at the named Ayurveda / wellness resorts', 'Ayurveda treatments as per the vaidya consultation', 'All meals — sattvic menu', 'Daily yoga and meditation sessions', 'Comfortable private vehicle throughout', 'Airport pickup and drop', 'All applicable taxes'];
      data.excludes = ['Airfare and train fare', 'Travel insurance', 'Treatments beyond the prescribed course', 'Personal expenses, tips and laundry', 'Anything not listed under inclusions'];
    } else if (p.slug === 'shimla-manali') {
      data.overview = 'Experience the charm of the Himalayas with a memorable Shimla Manali tour package from Kerala, combining the colonial-era appeal of Shimla with the dramatic mountain scenery of Manali. Starting from Delhi, this journey takes you through picturesque hill roads, forested valleys, riverside landscapes and popular Himalayan attractions.\\n\\nExplore Shimla, Kufri, Mall Road, the Ridge and Jakhoo Temple, followed by a scenic drive through Mandi and Kullu to Manali. Discover Hadimba Temple, Vashisht, Manu Temple and the vibrant markets of Manali before heading towards Solang Valley and Rohtang Pass, subject to seasonal accessibility and local regulations.\\n\\nThis Shimla Manali holiday package from Kerala is suitable for families, couples, friends and groups looking for a well-planned Himalayan getaway. Travellers from Kochi, Ernakulam, Thrissur, Kottayam, Kozhikode, Kannur, Malappuram, Alappuzha, Kollam and Thiruvananthapuram can enquire about suitable travel arrangements to Delhi.';
      data.highlights = ['Covers the two iconic Himalayan destinations of Shimla and Manali in one itinerary.', 'Includes popular experiences around Kufri, Solang Valley and Rohtang Pass.', 'Combines temples, mountain scenery, local markets and adventure opportunities.', 'Includes a scenic road journey through Mandi and Kullu.', 'Provides free time for shopping and exploring Shimla and Manali.', 'A practical choice for families, couples and groups seeking a classic Himachal holiday.'];
      data.lodging = '2 Nights Shimla | 3 Nights Manali';
      data.tourType = 'Family, Couple, Group';
      data.includes = ['5 nights accommodation in selected deluxe hotels', 'Daily breakfast and dinner', 'Individual vehicle for transfers and sightseeing', 'Delhi pickup and drop as applicable', 'Sightseeing as per the itinerary', 'Destination–hotel–destination transfers', 'Toll taxes, parking charges and applicable permits', 'Driver allowance', 'Applicable fuel and state taxes'];
      data.excludes = ['Airfare or train tickets to/from Delhi', 'Lunch and snacks', 'Rohtang Pass charges', 'Hotel early check-in or late check-out charges', 'Monument and attraction entrance fees', 'Camera charges', 'Adventure activities, rides and optional experiences', 'Personal expenses and shopping', 'Travel insurance or medical expenses', 'Any service or expense not specifically mentioned under inclusions', '5% GST, as specified in the package information'];
      data.notes = ['Rohtang Pass is subject to seasonal accessibility, weather, road conditions and applicable local regulations. Rohtang-related charges are specifically excluded from the package.', 'Activities such as skiing, paragliding, snow-scooter rides and other rides are not included in the package unless specifically mentioned.', 'The Shimla–Manali and Manali–Delhi journeys involve long stretches of mountain and highway travel.', 'Temple visits are subject to the prevailing entry and operating arrangements of the respective temples.'];
      data.faqs = [
        { q: 'Can I book a Shimla Manali tour package from Kerala?', a: 'Yes. Sahapathika Holidays can arrange the land package beginning from Delhi for travellers from Kerala. Flight or train arrangements to Delhi can be coordinated separately if required.' },
        { q: 'Can I start the trip from Kochi or another Kerala airport?', a: 'The itinerary begins with arrival in Delhi. Sahapathika Holidays can assist in coordinating travel from Kochi or other suitable airports in Kerala to Delhi according to your preferred travel dates.' },
        { q: 'How many days are required for this Shimla Manali package?', a: 'This itinerary is planned for 6 days and 5 nights, covering Shimla, Kufri, Manali, Solang Valley and Rohtang Pass before returning to Delhi.' },
        { q: 'Is Rohtang Pass guaranteed in the itinerary?', a: 'No. Rohtang Pass access depends on seasonal conditions, weather, road status and local regulations. Applicable Rohtang charges are also excluded.' },
        { q: 'Are adventure activities included?', a: 'No. Activities such as skiing, paragliding and snow-scooter rides are optional and payable separately.' },
        { q: 'Is accommodation included?', a: 'Yes. The source package provides deluxe hotel accommodation for five nights, along with breakfast and dinner.' },
        { q: 'Is private transportation included?', a: 'Yes. The package includes sightseeing and transfers by an individual vehicle, with vehicle size based on the group requirement.' },
        { q: 'Is this suitable for families?', a: 'Yes. The itinerary is suitable for families, couples and groups. Families travelling with young children or elderly members should consider the long road journeys involved.' },
        { q: 'Can this Shimla Manali package be customized?', a: 'Yes. You can discuss hotel category, travel dates, vehicle requirements and other itinerary preferences with Sahapathika Holidays.' },
        { q: 'How can I enquire or book?', a: 'Share your preferred travel dates, number of travellers and accommodation requirements with Sahapathika Holidays to receive the applicable availability and quotation.' }
      ];
    }
    return data;
  }

  getGallery(slug)`;


const detailPropsRegex = /includes:\s*\([\s\S]*?\)\.map\(t => \(\{ t \}\)\)\,[\s\S]*?excludes:\s*\([\s\S]*?\)\.map\(t => \(\{ t \}\)\)\,[\s\S]*?notes:\s*\[[\s\S]*?\]\.map\(t => \(\{ t \}\)\)[\s\S]*?\}\;\s*\}\)\(\)\,[\s\S]*?faqs:\s*this\.faqData\.map\(\(f, i\) => \{/m;

const newDetailProps = `includes: d.includes.map(t => ({ t })),
          excludes: d.excludes.map(t => ({ t })),
          notes: d.notes.map(t => ({ t })),
          faqs: d.faqs
        };
      })(),
      faqs: (() => {
        const d = this.detailFor(s.slug);
        return d.faqs.map((f, i) => {`;


htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (detailForRegex.test(content)) {
    content = content.replace(detailForRegex, newDetailFor);
    changed = true;
  }
  
  if (detailPropsRegex.test(content)) {
    content = content.replace(detailPropsRegex, newDetailProps);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified files:', modifiedCount);
