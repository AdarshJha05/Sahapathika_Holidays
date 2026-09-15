const fs = require('fs');
const path = require('path');

const filePath = path.join('c:/Users/jhash/Downloads/Sahapathika_Holidays', 'package-varanasi-tour-packages-from-kerala.html');
let html = fs.readFileSync(filePath, 'utf-8');

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

  <h3 style="font-size:18px;font-weight:800;margin:24px 0 12px;color:#E5483D">✈️ By Flight from Kochi</h3>
  <p style="margin-bottom:24px">For travellers from central Kerala, Cochin International Airport (COK) is one of the most convenient starting points. Kochi and Varanasi are approximately 1,835 km apart by air. Current flight schedules include direct services on selected days as well as one-stop options. Depending on the routing, scheduled flight time can be around 4 hours 15&ndash;20 minutes for a direct service, while connecting itineraries can take longer depending on the stopover. This makes flying from Kochi a practical choice for families, senior citizens and travellers who want to maximize their time in Varanasi.</p>

  <h3 style="font-size:18px;font-weight:800;margin:24px 0 12px;color:#E5483D">🚆 By Train from Ernakulam</h3>
  <p style="margin-bottom:24px">For travellers who prefer rail travel, there is a direct train connection between Ernakulam Junction and Varanasi Junction. The current service covers approximately 2,820 km and takes around 49 hours 50 minutes. The direct service is currently scheduled weekly, so availability needs to be checked according to your travel date. A train journey can be particularly suitable for pilgrims who enjoy travelling together as a family or group and prefer the experience of travelling by rail.</p>

  <h3 style="font-size:18px;font-weight:800;margin:24px 0 12px;color:#E5483D">✈️ From Kozhikode / North Kerala</h3>
  <p style="margin-bottom:24px">Travellers from Kozhikode and Malabar can also plan their Varanasi journey from Calicut International Airport. Current schedules show connecting flight options between Kozhikode and Varanasi, with the shortest listed journey times around 7 hours 10 minutes, depending on the routing and connection.</p>

  <h3 style="font-size:18px;font-weight:800;margin:24px 0 12px;color:#E5483D">✈️ From Thiruvananthapuram / South Kerala</h3>
  <p style="margin-bottom:24px">Travellers from Thiruvananthapuram and southern Kerala can use Thiruvananthapuram International Airport. Current schedules indicate that direct TRV&ndash;VNS services are not consistently available, so travellers may need to use a connecting flight. Depending on the connection, total travel time can vary considerably.</p>

  <div style="background:#FAF6EF;border-left:4px solid #B5822A;padding:16px 24px;margin-bottom:40px;border-radius:0 12px 12px 0">
    <div style="font-weight:800;margin-bottom:8px">The practical choice?</div>
    <p style="margin-bottom:8px">For most Kerala travellers, flying is the most convenient way to reach Varanasi, particularly when travelling with children, senior citizens or a limited number of vacation days. Train travel remains an option for those who prefer a longer rail journey or are travelling as a group.</p>
    <p style="margin:0;font-size:14px;color:#6B655C"><em>Travel schedules change frequently. We recommend checking availability for your exact travel dates before finalizing your transportation.</em></p>
  </div>

  <h2 style="font-family:'Fraunces',serif;font-weight:400;font-size:28px;letter-spacing:-.02em;margin:40px 0 16px;color:#16211D;border-top:1px solid rgba(22,33,29,.1);padding-top:40px">Your Varanasi Yatra &mdash; Planned from Kerala</h2>
  <p style="margin-bottom:20px">Once you reach Varanasi, the journey becomes much simpler. Sahapathika Holidays can arrange a private AC vehicle to receive you at Varanasi Airport or Varanasi Junction, depending on your chosen travel arrangement.</p>
  <p style="margin-bottom:16px">From there, your Kashi Yatra can be organized around your priorities &mdash; whether your primary purpose is:</p>
  <ul style="margin-bottom:24px;padding-left:24px;display:grid;gap:8px">
    <li>Kashi Vishwanath Darshan</li>
    <li>Kaal Bhairav Temple</li>
    <li>Ganga Aarti</li>
    <li>Sunrise boat ride on the Ganga</li>
    <li>Sarnath sightseeing</li>
    <li>Temple visits</li>
    <li>Spiritual rituals</li>
    <li>Family pilgrimage</li>
    <li>Senior citizen pilgrimage</li>
    <li>A longer Varanasi&ndash;Ayodhya&ndash;Prayagraj journey</li>
  </ul>
  <p style="margin-bottom:40px">Your travel schedule can be planned according to your arrival and departure timings.</p>

  <h2 style="font-family:'Fraunces',serif;font-weight:400;font-size:28px;letter-spacing:-.02em;margin:40px 0 16px;color:#16211D;border-top:1px solid rgba(22,33,29,.1);padding-top:40px">What Your Varanasi Package Can Include</h2>
  <p style="margin-bottom:16px">Depending on the package selected, your Varanasi tour from Kerala can be arranged with:</p>
  <div style="background:#fff;border-radius:16px;padding:24px;box-shadow:0 12px 30px -14px rgba(22,33,29,.1);margin-bottom:24px">
    <ul style="list-style:none;padding:0;margin:0;display:grid;gap:12px">
      <li style="display:flex;gap:12px"><span style="color:#5FA98C;font-weight:800">✓</span> Private AC vehicle for airport/railway station transfers and local sightseeing</li>
      <li style="display:flex;gap:12px"><span style="color:#5FA98C;font-weight:800">✓</span> Selected hotel accommodation in Varanasi</li>
      <li style="display:flex;gap:12px"><span style="color:#5FA98C;font-weight:800">✓</span> Daily breakfast</li>
      <li style="display:flex;gap:12px"><span style="color:#5FA98C;font-weight:800">✓</span> Varanasi sightseeing as per itinerary</li>
      <li style="display:flex;gap:12px"><span style="color:#5FA98C;font-weight:800">✓</span> Kashi Vishwanath Temple visit</li>
      <li style="display:flex;gap:12px"><span style="color:#5FA98C;font-weight:800">✓</span> Ganga boat ride, where included in the selected package</li>
      <li style="display:flex;gap:12px"><span style="color:#5FA98C;font-weight:800">✓</span> Ganga Aarti experience at Dashashwamedh Ghat</li>
      <li style="display:flex;gap:12px"><span style="color:#5FA98C;font-weight:800">✓</span> Sarnath excursion</li>
      <li style="display:flex;gap:12px"><span style="color:#5FA98C;font-weight:800">✓</span> Local assistance during the pilgrimage</li>
      <li style="display:flex;gap:12px"><span style="color:#5FA98C;font-weight:800">✓</span> Pickup and departure transfer</li>
      <li style="display:flex;gap:12px"><span style="color:#5FA98C;font-weight:800">✓</span> Toll, parking, fuel and driver-related charges as applicable to the selected package</li>
    </ul>
  </div>
  <p style="margin-bottom:40px;font-size:14px;color:#6B655C">Final inclusions depend on the package chosen, hotel category, travel dates and group size.</p>

  <h2 style="font-family:'Fraunces',serif;font-weight:400;font-size:28px;letter-spacing:-.02em;margin:40px 0 16px;color:#16211D;border-top:1px solid rgba(22,33,29,.1);padding-top:40px">Why Book Your Varanasi Trip from Kerala with Sahapathika Holidays?</h2>
  <p style="margin-bottom:24px">A Kashi pilgrimage involves more than simply booking a flight and hotel. The timing of your arrival, temple visits, local transportation, Ganga Aarti, sightseeing and departure all need to work together. Sahapathika Holidays can coordinate the journey so that your travel from Kerala and your Kashi experience fit together as one planned trip.</p>
  
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:24px;margin-bottom:40px">
    <div>
      <div style="font-weight:800;color:#16211D;margin-bottom:8px">Kerala-based travel assistance</div>
      <p style="margin:0;font-size:14.5px">As a travel company with an established presence in Kerala, Sahapathika Holidays understands the requirements of travellers beginning their journey from different parts of the state.</p>
    </div>
    <div>
      <div style="font-weight:800;color:#16211D;margin-bottom:8px">Flexible departure options</div>
      <p style="margin:0;font-size:14.5px">We can help you plan your journey based on your preferred departure airport or railway station, subject to available schedules.</p>
    </div>
    <div>
      <div style="font-weight:800;color:#16211D;margin-bottom:8px">Private travel options</div>
      <p style="margin:0;font-size:14.5px">Private vehicle arrangements can make the Varanasi experience more comfortable for families, couples, senior citizens and small groups.</p>
    </div>
    <div>
      <div style="font-weight:800;color:#16211D;margin-bottom:8px">Customized pilgrimage</div>
      <p style="margin:0;font-size:14.5px">Want only Varanasi? Or would you like to add Ayodhya, Prayagraj, Chitrakoot or Sarnath? Your itinerary can be customized according to your available days and interests.</p>
    </div>
  </div>

  <div style="background:#FDE8E4;border-radius:16px;padding:24px;margin-bottom:40px">
    <h3 style="font-size:18px;font-weight:800;margin:0 0 12px;color:#C4362C">A Note for Kerala Pilgrims Visiting Kashi</h3>
    <p style="margin-bottom:12px">Many travellers from Kerala visit Varanasi primarily for Kashi Vishwanath Darshan, Ganga Aarti and spiritual experiences along the Ganga.</p>
    <p style="margin:0">If your trip has a specific religious purpose or if you have particular temple, ritual or darshan requirements, tell us while planning the package. We can then structure the itinerary around your priorities rather than treating the trip as a standard sightseeing holiday.</p>
  </div>

  <h2 style="font-family:'Fraunces',serif;font-weight:400;font-size:28px;letter-spacing:-.02em;margin:40px 0 16px;color:#16211D;border-top:1px solid rgba(22,33,29,.1);padding-top:40px">Important: Travelling Inside Old Varanasi</h2>
  <p style="margin-bottom:16px">Varanasi is famous for its ancient lanes and dense temple areas. Vehicles cannot reach the entrance of some temples because of narrow lanes and restricted vehicle access.</p>
  <p style="margin-bottom:16px">Depending on the location, guests may need to use an e-rickshaw, auto-rickshaw or walk a short distance to reach certain temples and pilgrimage points. Any applicable local transportation charges will be payable directly by the guests unless specifically included in the quotation.</p>
  <p style="margin-bottom:40px"><strong>This is particularly important for families travelling with elderly members, so we recommend discussing mobility requirements with us before finalizing the itinerary.</strong></p>

  <h2 style="font-family:'Fraunces',serif;font-weight:400;font-size:32px;letter-spacing:-.02em;margin:40px 0 24px;color:#16211D;border-top:1px solid rgba(22,33,29,.1);padding-top:40px">Frequently Asked Questions</h2>
  
  <div style="display:grid;gap:16px;margin-bottom:48px">
    <div style="background:#fff;border-radius:16px;padding:24px;box-shadow:0 12px 30px -14px rgba(22,33,29,.1)">
      <div style="font-weight:800;margin-bottom:8px">1. Can I book a Varanasi tour package from Kerala?</div>
      <p style="margin:0;font-size:14.5px">Yes. Sahapathika Holidays can arrange Varanasi tour packages from Kerala for families, couples, senior citizens, individuals and groups.</p>
    </div>
    <div style="background:#fff;border-radius:16px;padding:24px;box-shadow:0 12px 30px -14px rgba(22,33,29,.1)">
      <div style="font-weight:800;margin-bottom:8px">2. What is the best way to travel from Kerala to Varanasi?</div>
      <p style="margin:0;font-size:14.5px">For most travellers, flying is the quickest and most convenient option. Train travel is also possible, particularly for travellers who prefer a rail journey. From Ernakulam, the current direct rail journey takes approximately 49 hours 50 minutes.</p>
    </div>
    <div style="background:#fff;border-radius:16px;padding:24px;box-shadow:0 12px 30px -14px rgba(22,33,29,.1)">
      <div style="font-weight:800;margin-bottom:8px">3. Can I fly from Kochi to Varanasi?</div>
      <p style="margin:0;font-size:14.5px">Yes. Current schedules include Kochi&ndash;Varanasi flight options, including direct services on selected days and connecting alternatives. Availability varies by date, so the exact schedule should be checked before booking.</p>
    </div>
    <div style="background:#fff;border-radius:16px;padding:24px;box-shadow:0 12px 30px -14px rgba(22,33,29,.1)">
      <div style="font-weight:800;margin-bottom:8px">4. Can I travel by train from Ernakulam to Varanasi?</div>
      <p style="margin:0;font-size:14.5px">Yes. A direct Ernakulam&ndash;Varanasi rail service is currently listed, covering approximately 2,820 km in around 49 hours 50 minutes. Service frequency is limited, so availability should be checked for your travel date.</p>
    </div>
    <div style="background:#fff;border-radius:16px;padding:24px;box-shadow:0 12px 30px -14px rgba(22,33,29,.1)">
      <div style="font-weight:800;margin-bottom:8px">5. Can I book a Varanasi package from Kozhikode or Kannur?</div>
      <p style="margin:0;font-size:14.5px">Yes. Travellers from North Kerala can enquire about suitable flight and travel arrangements from nearby airports and railway stations. The itinerary can be planned based on your preferred departure point.</p>
    </div>
    <div style="background:#fff;border-radius:16px;padding:24px;box-shadow:0 12px 30px -14px rgba(22,33,29,.1)">
      <div style="font-weight:800;margin-bottom:8px">6. Can travellers from Thiruvananthapuram book this package?</div>
      <p style="margin:0;font-size:14.5px">Yes. Travellers from Thiruvananthapuram and other parts of South Kerala can book the package. Flight options may involve a connection depending on the travel date.</p>
    </div>
    <div style="background:#fff;border-radius:16px;padding:24px;box-shadow:0 12px 30px -14px rgba(22,33,29,.1)">
      <div style="font-weight:800;margin-bottom:8px">7. Does the package include Kashi Vishwanath Darshan?</div>
      <p style="margin:0;font-size:14.5px">The itinerary can include a visit to Kashi Vishwanath Temple. Actual darshan arrangements are subject to temple rules, timings and applicable procedures.</p>
    </div>
    <div style="background:#fff;border-radius:16px;padding:24px;box-shadow:0 12px 30px -14px rgba(22,33,29,.1)">
      <div style="font-weight:800;margin-bottom:8px">8. Can I add Ayodhya or Prayagraj to my Varanasi trip?</div>
      <p style="margin:0;font-size:14.5px">Yes. You can extend your Varanasi holiday into a larger Varanasi&ndash;Ayodhya&ndash;Prayagraj pilgrimage circuit. Chitrakoot and other destinations can also be considered depending on the number of days available.</p>
    </div>
    <div style="background:#fff;border-radius:16px;padding:24px;box-shadow:0 12px 30px -14px rgba(22,33,29,.1)">
      <div style="font-weight:800;margin-bottom:8px">9. Is a Varanasi package suitable for senior citizens?</div>
      <p style="margin:0;font-size:14.5px">Yes. We can design a more comfortable itinerary for senior travellers, including suitable hotels, private transportation and a less rushed sightseeing schedule.</p>
    </div>
    <div style="background:#fff;border-radius:16px;padding:24px;box-shadow:0 12px 30px -14px rgba(22,33,29,.1)">
      <div style="font-weight:800;margin-bottom:8px">10. Can the package be customized?</div>
      <p style="margin:0;font-size:14.5px">Yes. The duration, hotel category, transportation, sightseeing and additional destinations can be customized according to your requirements.</p>
    </div>
  </div>

  <div style="text-align:center;padding:48px 24px;background:#16211D;color:#FAF6EF;border-radius:20px;margin-bottom:48px">
    <h2 style="font-family:'Fraunces',serif;font-weight:400;font-size:36px;letter-spacing:-.02em;margin:0 0 16px;color:#fff">The Call of Kashi</h2>
    <p style="margin-bottom:12px;font-size:16px">There are journeys we take for a holiday. And then there are journeys we take because something within us tells us it is time to go.</p>
    <p style="margin-bottom:24px;font-size:16px;color:#D9A441;font-weight:700">Kashi is one of those journeys.</p>
    <p style="margin-bottom:24px;font-size:15px;color:rgba(251,247,238,.8)">Walk through the ancient lanes, stand beside the sacred Ganga, witness the lamps of the Ganga Aarti and seek the blessings of Kashi Vishwanath Mahadev.</p>
    <p style="margin-bottom:32px;font-size:15px;color:rgba(251,247,238,.8)">Whether you are travelling from Kochi, Thrissur, Kottayam, Kozhikode, Kannur, Malappuram, Alappuzha, Kollam, Thiruvananthapuram or anywhere else in Kerala, let Sahapathika Holidays help you plan your journey to Kashi.</p>
    <div style="font-weight:800;font-size:18px;margin-bottom:8px">Your Kashi Yatra Begins from Kerala</div>
    <div style="font-size:24px;font-family:'Fraunces',serif;color:#E5483D;margin-bottom:12px">Call / WhatsApp: +91 9072769547</div>
    <div style="font-size:14px;color:rgba(251,247,238,.5)">Sahapathika Holidays &mdash; Live before you die.</div>
  </div>

  <div style="font-size:13px;color:#6B655C;padding:20px;border-top:1px dashed rgba(22,33,29,.1)">
    <strong>Note:</strong> Transport schedules and fares are dynamic. The figures above are based on current September 2026 information and should be treated as indicative rather than permanent package facts.
  </div>
</div>
`;

// regex approach
const regex = /<h2[^>]*>Day-by-day itinerary<\/h2>([\s\S]*?)<h2[^>]*>Reviews<\/h2>/i;

if (regex.test(html)) {
  const newHtml = html.replace(regex, articleHtml + '\n          <h2 style="font-family:\\\'Fraunces\\\',serif;font-weight:400;font-size:32px;letter-spacing:-.02em;margin:0 0 8px">Reviews</h2>');
  fs.writeFileSync(filePath, newHtml);
  console.log('Successfully updated Varanasi page.');
} else {
  console.log('Regex did not match.');
}
