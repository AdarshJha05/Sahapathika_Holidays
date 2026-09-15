const fs = require('fs');

const srcPath = 'c:/Users/jhash/Downloads/Sahapathika_Holidays/package-scenic-beautiful-kerala.html';
const targetPath = 'c:/Users/jhash/Downloads/Sahapathika_Holidays/package-varanasi-tour-packages-from-kerala.html';
let html = fs.readFileSync(srcPath, 'utf-8');

// 1. Fix the state slug
html = html.replace(/slug:\s*'scenic-beautiful-kerala'/, "slug: 'varanasi-tour-packages-from-kerala'");

// 2. Fix the title tag and meta tags?
// Let's just fix <title> to be accurate
html = html.replace(/<title>.*?<\/title>/, "<title>Varanasi Tour Packages from Kerala | Sahapathika Holidays</title>");
html = html.replace(/<meta property="og:title" content="[^"]*">/, '<meta property="og:title" content="Varanasi Tour Packages from Kerala | Sahapathika Holidays">');

// 3. Inject the Varanasi content
const articleHtml = `
<div style="font-family:inherit;color:#3A4A44;line-height:1.75;font-size:15.5px;margin-bottom:48px;">
  <h2 style="font-family:'Fraunces',serif;font-weight:400;font-size:32px;letter-spacing:-.02em;margin:0 0 22px;color:#16211D">From Kerala to Kashi &mdash; Your Sacred Journey to the City of Lord Shiva</h2>
  <div style="font-size:14px;letter-spacing:.12em;font-weight:800;color:#B5822A;margin-bottom:24px;text-transform:uppercase">Kerala &rarr; Varanasi | Air or Rail | Private Kashi Yatra</div>
  
  <p style="margin-bottom:20px">Planning a Varanasi tour from Kerala? Whether you are travelling from Kochi, Ernakulam, Thrissur, Kottayam, Kozhikode, Kannur, Malappuram, Alappuzha, Kollam or Thiruvananthapuram, Sahapathika Holidays can arrange your journey to the sacred city of Kashi with a carefully planned private tour.</p>
  <p style="margin-bottom:20px">Varanasi is one of India's most revered pilgrimage destinations, attracting devotees who come to seek the blessings of Kashi Vishwanath, experience the sacred Ganga, attend the divine Ganga Aarti and explore the spiritual heritage of Kashi.</p>
  <p style="margin-bottom:32px">For travellers from Kerala, flying is generally the most time-efficient option, while travelling by train offers a different experience for pilgrims who prefer an extended rail journey. Current rail schedules show an Ernakulam&ndash;Varanasi journey of approximately 49 hours 50 minutes, covering around 2,820 km.</p>
  
  <div style="background:#DCEEE7;border-radius:16px;padding:24px;margin-bottom:40px;border:1px solid rgba(95,169,140,.4)">
    <p style="margin:0;font-weight:700;color:#2F7A63">Sahapathika Holidays can coordinate the journey from Kerala and arrange your Varanasi pilgrimage package, including local transfers, accommodation and sightseeing.</p>
  </div>

  <h2 style="font-family:'Fraunces',serif;font-weight:400;font-size:28px;letter-spacing:-.02em;margin:40px 0 16px;color:#16211D;border-top:1px solid rgba(22,33,29,.1);padding-top:40px">Travelling to Varanasi from Kerala</h2>
  <p style="margin-bottom:24px"><strong>Flight or Train &mdash; Choose What Suits Your Journey</strong><br>Kerala is well connected to North India by both air and rail, but the best option depends on your departure city, travel dates, budget and the needs of your group.</p>

  <h3 style="font-size:18px;font-weight:800;margin:24px 0 12px;color:#E5483D">&#9992; By Flight from Kochi</h3>
  <p style="margin-bottom:24px">For travellers from central Kerala, Cochin International Airport (COK) is one of the most convenient starting points. Kochi and Varanasi are approximately 1,835 km apart by air. Current flight schedules include direct services on selected days as well as one-stop options. Depending on the routing, scheduled flight time can be around 4 hours 15&ndash;20 minutes for a direct service, while connecting itineraries can take longer depending on the stopover. This makes flying from Kochi a practical choice for families, senior citizens and travellers who want to maximize their time in Varanasi.</p>

  <h3 style="font-size:18px;font-weight:800;margin:24px 0 12px;color:#E5483D">&#128642; By Train from Ernakulam</h3>
  <p style="margin-bottom:24px">For travellers who prefer rail travel, there is a direct train connection between Ernakulam Junction and Varanasi Junction. The current service covers approximately 2,820 km and takes around 49 hours 50 minutes. The direct service is currently scheduled weekly, so availability needs to be checked according to your travel date. A train journey can be particularly suitable for pilgrims who enjoy travelling together as a family or group and prefer the experience of travelling by rail.</p>

  <h3 style="font-size:18px;font-weight:800;margin:24px 0 12px;color:#E5483D">&#9992; From Kozhikode / North Kerala</h3>
  <p style="margin-bottom:24px">Travellers from Kozhikode and Malabar can also plan their Varanasi journey from Calicut International Airport. Current schedules show connecting flight options between Kozhikode and Varanasi, with the shortest listed journey times around 7 hours 10 minutes, depending on the routing and connection.</p>

  <h3 style="font-size:18px;font-weight:800;margin:24px 0 12px;color:#E5483D">&#9992; From Thiruvananthapuram / South Kerala</h3>
  <p style="margin-bottom:24px">For those in southern Kerala, Trivandrum International Airport offers connecting flights to Varanasi. The journey time typically varies between 6 hours 25 minutes and 8 hours depending on the chosen connection.</p>
  
  <div style="background:#FAF6EF;border-left:4px solid #B5822A;padding:16px 24px;margin-bottom:40px;border-radius:0 12px 12px 0">
    <div style="font-weight:800;margin-bottom:8px">Travel Planning Note</div>
    <p style="margin:0;font-size:14px;color:#6B655C">Sahapathika Holidays can assist with arranging your flight or train tickets in conjunction with your tour package. Early booking is recommended, particularly for train travel or during major festival seasons in Varanasi.</p>
  </div>

  <h2 style="font-family:'Fraunces',serif;font-weight:400;font-size:28px;letter-spacing:-.02em;margin:40px 0 16px;color:#16211D;border-top:1px solid rgba(22,33,29,.1);padding-top:40px">Varanasi Tour Package Options from Kerala</h2>
  <p style="margin-bottom:16px">Sahapathika Holidays offers customisable Varanasi tour packages. Journeys are conducted on a private basis, providing a dedicated vehicle and driver for your sightseeing and transfers. This ensures a comfortable and flexible experience, particularly for families or senior travellers.</p>
  
  <div style="margin-bottom:24px;padding-left:24px;display:grid;gap:8px">
    <div style="display:flex;gap:12px"><div style="color:#5FA98C;font-weight:800">&check;</div><div>3-Day Varanasi Pilgrimage Tour</div></div>
    <div style="display:flex;gap:12px"><div style="color:#5FA98C;font-weight:800">&check;</div><div>4-Day Kashi &amp; Prayagraj Tour</div></div>
    <div style="display:flex;gap:12px"><div style="color:#5FA98C;font-weight:800">&check;</div><div>5-Day Varanasi, Prayagraj &amp; Ayodhya Yatra</div></div>
    <div style="display:flex;gap:12px"><div style="color:#5FA98C;font-weight:800">&check;</div><div>6-Day Varanasi, Gaya &amp; Prayagraj Pilgrimage</div></div>
  </div>

  <p style="margin-bottom:40px;font-size:14px;color:#6B655C"><em>*Itineraries can be tailored according to your flight or train timings.</em></p>

  <h2 style="font-family:'Fraunces',serif;font-weight:400;font-size:28px;letter-spacing:-.02em;margin:40px 0 16px;color:#16211D;border-top:1px solid rgba(22,33,29,.1);padding-top:40px">What Can Be Included in Your Varanasi Package?</h2>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:24px;margin-bottom:40px">
    
    <div style="background:#fff;border-radius:16px;padding:24px;box-shadow:0 12px 30px -14px rgba(22,33,29,.1)">
      <div style="font-weight:800;color:#16211D;margin-bottom:8px">Accommodation</div>
      <p style="margin:0;font-size:14.5px">Options ranging from comfortable 3-star hotels to premium heritage properties near the Ghats, selected for convenience and comfort.</p>
    </div>

    <div style="background:#fff;border-radius:16px;padding:24px;box-shadow:0 12px 30px -14px rgba(22,33,29,.1)">
      <div style="font-weight:800;color:#16211D;margin-bottom:8px">Private Transportation</div>
      <p style="margin:0;font-size:14.5px">A private AC vehicle (such as a Sedan, Innova or Tempo Traveller depending on group size) for airport/railway station transfers and all listed sightseeing.</p>
    </div>

    <div style="background:#fff;border-radius:16px;padding:24px;box-shadow:0 12px 30px -14px rgba(22,33,29,.1)">
      <div style="font-weight:800;color:#16211D;margin-bottom:8px">Temple Visits</div>
      <p style="margin:0;font-size:14.5px">Coordinated visits to Kashi Vishwanath Temple, Annapurna Devi Temple, Sankat Mochan Hanuman Temple, and other significant religious sites.</p>
    </div>

    <div style="background:#fff;border-radius:16px;padding:24px;box-shadow:0 12px 30px -14px rgba(22,33,29,.1)">
      <div style="font-weight:800;color:#16211D;margin-bottom:8px">Ghat Experiences</div>
      <p style="margin:0;font-size:14.5px">Assistance with arranging boat rides on the Ganges (usually at sunrise) and facilitating attendance at the evening Ganga Aarti at Dashashwamedh Ghat.</p>
    </div>

    <div style="background:#fff;border-radius:16px;padding:24px;box-shadow:0 12px 30px -14px rgba(22,33,29,.1)">
      <div style="font-weight:800;color:#16211D;margin-bottom:8px">Sarnath Excursion</div>
      <p style="margin:0;font-size:14.5px">A visit to Sarnath, the significant Buddhist site where Lord Buddha delivered his first sermon, located a short drive from Varanasi.</p>
    </div>

  </div>

  <div style="background:#FDE8E4;border-radius:16px;padding:24px;margin-bottom:40px">
    <h3 style="font-size:18px;font-weight:800;margin:0 0 12px;color:#C4362C">Why Book Your Varanasi Tour with Sahapathika Holidays?</h3>
    <ul style="list-style:none;padding:0;margin:0;display:grid;gap:12px">
      <li style="display:flex;gap:12px"><div style="color:#C4362C;font-weight:800">&check;</div><div><strong>Kerala-Based Assistance:</strong> Deal with a team that understands the specific preferences of travellers from Kerala.</div></li>
      <li style="display:flex;gap:12px"><div style="color:#C4362C;font-weight:800">&check;</div><div><strong>Coordinated Travel:</strong> Seamless planning covering flights/trains, hotels, and local travel.</div></li>
      <li style="display:flex;gap:12px"><div style="color:#C4362C;font-weight:800">&check;</div><div><strong>Private and Customised:</strong> Tours conducted privately rather than as part of a large, inflexible group.</div></li>
      <li style="display:flex;gap:12px"><div style="color:#C4362C;font-weight:800">&check;</div><div><strong>Reliable Local Network:</strong> Experienced local drivers and support staff in Varanasi to assist you during the journey.</div></li>
    </ul>
  </div>

  <h2 style="font-family:'Fraunces',serif;font-weight:400;font-size:28px;letter-spacing:-.02em;margin:40px 0 16px;color:#16211D;border-top:1px solid rgba(22,33,29,.1);padding-top:40px">Best Time to Visit</h2>
  <p style="margin-bottom:12px">The most comfortable time for sightseeing and temple visits in Varanasi is during the cooler months, generally from October to March. During this period, daytime temperatures are relatively pleasant, making it suitable for walking through the ghats and the narrow alleys leading to the temples.</p>
  <p style="margin:0">The summer months (April to June) can be intensely hot, which can make daytime sightseeing challenging. The monsoon season (July to September) brings rainfall, which can cause the water levels in the Ganges to rise, sometimes affecting the availability of boat rides. However, pilgrims visit Varanasi throughout the year according to their religious vows and preferred dates.</p>

</div>
`;

// Replace from 'Day-by-day itinerary' to 'Reviews'
const regex = /<h2[^>]*>Day-by-day itinerary<\/h2>([\s\S]*?)<h2[^>]*>Reviews<\/h2>/i;
const newHtml = html.replace(regex, articleHtml + '\n          <h2 style="font-family:\'Fraunces\',serif;font-weight:400;font-size:32px;letter-spacing:-.02em;margin:0 0 8px">Reviews</h2>');

fs.writeFileSync(targetPath, newHtml, 'utf-8');
console.log("Successfully rebuilt Varanasi page.");
