const fs = require('fs');

let html = fs.readFileSync('packages.html', 'utf8');

// 1. Merge Overview and Highlights
html = html.replace(
  /<h2[^>]*>Overview<\/h2>\s*<p[^>]*>{{ detail\.overview }}<\/p>\s*<h2[^>]*>Highlights<\/h2>\s*<div[^>]*>\s*<sc-for list="{{ detail\.highlights }}"[^>]*>\s*<div[^>]*>\s*<span[^>]*>✓<\/span>\s*<span[^>]*>{{ h\.t }}<\/span>\s*<\/div>\s*<\/sc-for>\s*<\/div>/,
  `<p style="font-size:15.5px;line-height:1.75;color:#3A4A44;margin:0 0 20px;max-width:720px;text-wrap:pretty">{{ detail.overview }}</p>
          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:48px">
            <sc-for list="{{ detail.highlights }}" as="h" hint-placeholder-count="4">
              <div style="display:flex;gap:6px;align-items:center;background:#DCEEE7;color:#2F7A63;border-radius:99px;padding:6px 14px;font-size:13px;font-weight:600;">
                <span style="color:#5FA98C;font-size:14px;">✓</span>
                {{ h.t }}
              </div>
            </sc-for>
          </div>`
);

// 2. Remove Important Notes block and inject it into Included/Excluded block
html = html.replace(
  /<div style="background:#DCEEE7[^>]*>\s*<div[^>]*>IMPORTANT NOTES<\/div>\s*<div[^>]*>\s*<sc-for list="{{ detail\.notes }}"[^>]*><div[^>]*>— {{ n\.t }}<\/div><\/sc-for>\s*<\/div>\s*<\/div>/,
  ''
);

html = html.replace(
  /<\/div>\s*<\/div>\s*<\/div>\s*<h2[^>]*>Frequently asked<\/h2>/,
  `  </div>
              </div>
            </div>

            <details style="margin-bottom:48px;background:#FDE8E4;border-radius:16px;padding:24px;border:1px solid rgba(229,72,61,0.1)">
              <summary style="font-size:14px;font-weight:700;color:#C4362C;cursor:pointer;list-style:none;display:flex;align-items:center;justify-content:space-between">
                <span><span style="margin-right:8px">ℹ️</span> Important Notes</span>
                <span style="font-size:18px;font-weight:400;color:#E5483D">+</span>
              </summary>
              <div style="margin-top:16px;display:grid;gap:10px">
                <sc-for list="{{ detail.notes }}" as="n" hint-placeholder-count="4"><div style="font-size:13.5px;line-height:1.6;color:#6B655C">— {{ n.t }}</div></sc-for>
              </div>
            </details>

            <h2 style="font-family:'Fraunces',serif;font-weight:400;font-size:32px;letter-spacing:-.02em;margin:0 0 20px">Frequently asked</h2>`
);

// 3. Compact Reviews Block
html = html.replace(
  /<div style="background:#fff;border:1px dashed rgba[^>]*>\s*<div[^>]*>—<\/div>\s*<div><div[^>]*>No reviews yet for this package<\/div><div[^>]*>Reviews will populate from the CMS once collected\. We won't seed fabricated ones\.<\/div><\/div>\s*<\/div>/,
  `<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;background:#fff;border-radius:16px;padding:20px 24px;box-shadow:0 6px 16px -12px rgba(22,33,29,.1)">
              <div style="display:flex;align-items:center;gap:12px">
                <div style="color:#F59E0B;font-size:18px;letter-spacing:2px">★★★★★</div>
                <div style="font-size:14px;font-weight:700;color:#1B1A17">5.0 <span style="font-weight:400;color:#6B655C">(0 reviews) — No reviews yet</span></div>
              </div>
              <button style="background:transparent;border:1px solid rgba(22,33,29,.15);padding:8px 16px;border-radius:99px;font-size:13px;font-weight:600;color:#1B1A17;cursor:pointer" style-hover="background:rgba(22,33,29,.04)">See all reviews</button>
            </div>`
);

// 4. Update "You may also like" mobile scrolling
html = html.replace(
  /<div style="display:grid;grid-template-columns:repeat\(auto-fit,minmax\(min\(100%,250px\),1fr\)\);gap:22px">/,
  `<div class="mobile-horizontal-scroll" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:22px">`
);

// We need to inject the CSS into the <style> block
const cssStyles = `
    /* Mobile-first density and layout adjustments */
    @media (max-width: 900px) {
      .desktop-booking-aside { 
        display: none !important; 
      }
      .mobile-booking-bar { display: flex !important; }
      
      /* Horizontal scrolling for 'You may also like' */
      .mobile-horizontal-scroll {
        display: flex !important;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        flex-wrap: nowrap;
        gap: 16px !important;
        padding-bottom: 16px;
        scrollbar-width: none; /* Firefox */
      }
      .mobile-horizontal-scroll::-webkit-scrollbar { display: none; }
      .mobile-horizontal-scroll > div {
        flex: 0 0 280px !important;
        scroll-snap-align: start;
      }

      /* Bottom sheet for booking form */
      .booking-sheet-overlay {
        display: block !important;
        position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 95;
        opacity: 0; transition: opacity 0.3s; pointer-events: none;
      }
      .booking-sheet-overlay.open { opacity: 1; pointer-events: auto; }
      
      .booking-sheet {
        position: fixed !important;
        bottom: 0 !important; left: 0 !important; right: 0 !important; top: auto !important;
        background: #fff !important;
        border-radius: 24px 24px 0 0 !important;
        padding: 24px !important;
        max-height: 85vh !important;
        overflow-y: auto !important;
        z-index: 100 !important;
        box-shadow: 0 -10px 40px rgba(0,0,0,0.2) !important;
        transform: translateY(100%);
        transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
        display: grid !important; max-width: none !important;
      }
      .booking-sheet.open { transform: translateY(0); }

      /* Mobile Filters Bottom Sheet */
      .filter-aside-overlay {
        display: block !important;
        position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 95;
        opacity: 0; transition: opacity 0.3s; pointer-events: none;
      }
      .filter-aside-overlay.open { opacity: 1; pointer-events: auto; }
      .filter-aside {
        position: fixed !important; bottom: 0; left: 0; right: 0; top: auto;
        background: #fff; z-index: 100;
        border-radius: 24px 24px 0 0; padding: 24px;
        max-height: 85vh; overflow-y: auto;
        transform: translateY(100%); transition: transform 0.3s;
        box-shadow: 0 -10px 40px rgba(0,0,0,0.2);
        max-width: none !important; margin: 0 !important;
      }
      .filter-aside.open { transform: translateY(0); }
      .mobile-filters-btn { display: flex !important; }
      
      /* Mobile dropdown sheet */
      .search-dropdown-overlay {
        display: block !important; position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 95;
        opacity: 0; transition: opacity 0.3s; pointer-events: none;
      }
      .search-dropdown-overlay.open { opacity: 1; pointer-events: auto; }
      .search-dropdown {
        position: fixed !important; bottom: 0 !important; left: 0 !important; right: 0 !important; top: auto !important;
        border-radius: 24px 24px 0 0 !important; padding: 24px !important; max-height: 80vh !important; overflow-y: auto !important;
        transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.2,0.8,0.2,1); box-shadow: 0 -10px 40px rgba(0,0,0,0.2) !important;
        display: block !important; margin: 0 !important;
      }
      .search-dropdown.open { transform: translateY(0); }
    }
    
    .mobile-booking-bar { display: none; }
    .mobile-filters-btn { display: none; }
    .booking-sheet-overlay { display: none; }
    .filter-aside-overlay { display: none; }
    .search-dropdown-overlay { display: none; }
`;

html = html.replace('</style>', cssStyles + '\n  </style>');

// 5. Itinerary Revamp
const itineraryRegex = /<h2[^>]*>Day-by-day itinerary<\/h2>\s*<sc-if value="{{ detail\.hasItinerary }}"[^>]*>\s*<div[^>]*>\s*<div[^>]*><\/div>\s*<div[^>]*>\s*<sc-for list="{{ detail\.days }}" as="d" hint-placeholder-count="6">\s*<div[^>]*>\s*<span[^>]*><\/span>\s*<button[^>]*>[^<]*<\/button>\s*<div[^>]*><div[^>]*><p[^>]*>{{ d\.t }}<\/p><\/div><\/div>\s*<\/div>\s*<\/sc-for>\s*<\/div>\s*<\/div>\s*<\/sc-if>/;

const newItineraryBlock = `<h2 style="font-family:'Fraunces',serif;font-weight:400;font-size:32px;letter-spacing:-.02em;margin:0 0 22px">Day-by-day itinerary</h2>
            <sc-if value="{{ detail.hasItinerary }}" hint-placeholder-val="{{ true }}">
              <!-- Horizontal Day Tabs -->
              <div class="mobile-horizontal-scroll" style="display:flex;overflow-x:auto;scrollbar-width:none;gap:10px;margin-bottom:24px;padding-bottom:8px;scroll-snap-type:x mandatory">
                <sc-for list="{{ detail.days }}" as="d" idx="i" hint-placeholder-count="6">
                  <button onClick="{{ d.select }}" style="{{ d.tabStyle }}">
                    Day {{ i + 1 }}
                  </button>
                </sc-for>
              </div>
              
              <!-- Active Day Card -->
              <div style="background:#fff;border-radius:24px;padding:28px;box-shadow:0 12px 30px -14px rgba(22,33,29,.08);min-height:220px;position:relative;overflow:hidden">
                <div style="{{ detail.dayCardAnimStyle }}">
                  <div style="font-size:11.5px;font-weight:800;color:#E5483D;letter-spacing:.14em;margin-bottom:10px;display:flex;align-items:center;gap:12px">
                    <span>DAY {{ state.activeDayIndex + 1 }}</span>
                    <span style="height:1px;flex:1;background:rgba(229,72,61,.15)"></span>
                  </div>
                  <h3 style="font-family:'Fraunces',serif;font-weight:400;font-size:24px;margin:0 0 16px;line-height:1.25">{{ detail.activeDayTitle }}</h3>
                  <div style="display:flex;gap:12px;margin-bottom:20px;flex-wrap:wrap">
                    <span style="font-size:12.5px;color:#2F7A63;background:#DCEEE7;padding:4px 10px;border-radius:6px;font-weight:700">☕ Meals Included</span>
                    <span style="font-size:12.5px;color:#B5822A;background:#FAF6EF;padding:4px 10px;border-radius:6px;font-weight:700">🚙 Sightseeing / Transfer</span>
                  </div>
                  <div style="font-size:15px;line-height:1.7;color:#4A6159;white-space:pre-wrap">{{ detail.activeDayText }}</div>
                </div>
              </div>
            </sc-if>`;

html = html.replace(itineraryRegex, newItineraryBlock);

// Add mobile booking bar and overlays
const bookingAsideRegex = /<aside style="{{ detailAsideStyle }}" class="desktop-booking-aside">/;
html = html.replace(bookingAsideRegex, 
  `<div class="mobile-booking-bar" style="position:fixed;bottom:0;left:0;right:0;background:#fff;padding:16px 24px;box-shadow:0 -4px 20px rgba(0,0,0,0.08);z-index:90;align-items:center;justify-content:space-between;border-top:1px solid rgba(0,0,0,.05)">
      <div>
        <div style="font-size:11px;font-weight:700;color:#6B655C;text-transform:uppercase;letter-spacing:1px">Price</div>
        <div style="font-size:18px;font-weight:800;color:#1B1A17">{{ detail.price || 'On enquiry' }}</div>
      </div>
      <button onClick="{{ toggleBookingSheet }}" style="background:#E5483D;color:#fff;border:0;padding:12px 24px;border-radius:99px;font-weight:700;font-size:15px;cursor:pointer">Book Now</button>
    </div>
    
    <div class="booking-sheet-overlay {{ state.showBooking ? 'open' : '' }}" onClick="{{ toggleBookingSheet }}"></div>
    <aside style="{{ detailAsideStyle }}" class="desktop-booking-aside booking-sheet {{ state.showBooking ? 'open' : '' }}">`
);

// Add mobile filters overlay
const filterAsideRegex = /<aside style="{{ pkgAsideStyle }}" class="filter-aside">/;
html = html.replace(filterAsideRegex,
  `<div class="filter-aside-overlay {{ state.showFilters ? 'open' : '' }}" onClick="{{ toggleFilters }}"></div>
  <aside style="{{ pkgAsideStyle }}" class="filter-aside {{ state.showFilters ? 'open' : '' }}">`
);

// Add state properties
html = html.replace(
  /state = \{/,
  `state = {\n    activeDayIndex: 0, showBooking: false, showFilters: false,`
);

// Update render logic for detail.days
html = html.replace(
  /days: packageData\.dayByDay\s*\?\s*packageData\.dayByDay\.map\(\(d, i\) => \(\{/,
  `activeDayTitle: packageData.dayByDay && packageData.dayByDay[this.state.activeDayIndex] ? packageData.dayByDay[this.state.activeDayIndex].title : '',
        activeDayText: packageData.dayByDay && packageData.dayByDay[this.state.activeDayIndex] ? packageData.dayByDay[this.state.activeDayIndex].body.join('\\n\\n') : '',
        dayCardAnimStyle: 'animation:fadein 0.4s ease',
        days: packageData.dayByDay ? packageData.dayByDay.map((d, i) => ({`
);

html = html.replace(
  /headStyle: 'width:100%;text-align:left;background:none;border:0;padding:0;margin:0;cursor:pointer;font-family:\\'Fraunces\\',serif;font-size:19px;color:#1B1A17;transition:color \.2s',/,
  `tabStyle: 'padding:10px 20px;border-radius:99px;font-size:13.5px;font-weight:700;cursor:pointer;transition:background 0.2s,color 0.2s;white-space:nowrap;border:1px solid ' + (s.activeDayIndex === i ? '#E5483D' : 'rgba(22,33,29,0.1)') + ';background:' + (s.activeDayIndex === i ? '#E5483D' : '#fff') + ';color:' + (s.activeDayIndex === i ? '#fff' : '#1B1A17'),
          select: () => this.setState({ activeDayIndex: i }),`
);

// Add toggle functions
html = html.replace(
  /toggleDest: \(\) => this\.setState\(\{ field: s\.field === 'dest' \? null : 'dest' \}\),/,
  `toggleBookingSheet: () => this.setState({ showBooking: !s.showBooking }),
        toggleFilters: () => this.setState({ showFilters: !s.showFilters }),
        toggleDest: () => this.setState({ field: s.field === 'dest' ? null : 'dest' }),`
);

// Mute "Coming Soon" and "Explore More" blocks
// Find the COMING SOON block and EXPLORE MORE block
html = html.replace(
  /style="background:#DCEEE7;border-radius:24px;padding:32px;display:flex;flex-direction:column;gap:14px;animation:rise .6s both"/,
  `style="background:#DCEEE7;border-radius:24px;padding:32px;display:flex;flex-direction:column;gap:14px;animation:rise .6s both;opacity:0.75;filter:grayscale(60%)"`
);
html = html.replace(
  /style="background:#FDE8E4;border-radius:24px;padding:32px;display:flex;flex-direction:column;gap:14px;animation:rise .6s both"/,
  `style="background:#FDE8E4;border-radius:24px;padding:32px;display:flex;flex-direction:column;gap:14px;animation:rise .6s both;opacity:0.75;filter:grayscale(60%)"`
);

// Insert mobile filter toggle button
const mobileFiltersBtnRegex = /<div style="font-size:14\.5px;color:#6B655C"><strong>{{ s\.fCount }}<\/strong> packages<\/div>/;
html = html.replace(mobileFiltersBtnRegex,
  `<div style="font-size:14.5px;color:#6B655C"><strong>{{ s.fCount }}</strong> packages</div>
  <button onClick="{{ toggleFilters }}" class="mobile-filters-btn" style="background:#FAF6EF;border:1px solid rgba(22,33,29,.1);color:#1B1A17;padding:8px 16px;border-radius:99px;font-size:13px;font-weight:700;cursor:pointer;margin-left:auto">Filters</button>`
);

fs.writeFileSync('packages.html', html, 'utf8');
console.log('UI structural changes applied successfully.');
