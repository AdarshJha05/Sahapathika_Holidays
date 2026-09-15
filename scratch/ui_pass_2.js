const fs = require('fs');

function processHtml(file) {
  let html = fs.readFileSync(file, 'utf8');

  // 1. Typography
  // Remove font-style:italic and color changes from Hero Headline
  if (file === 'index.html') {
    html = html.replace(
      /<span style="display:inline-block;animation:blurin \.8s \.14s both;font-style:italic;color:#FF8B80">/,
      '<span style="display:inline-block;animation:blurin .8s .14s both">'
    );
    html = html.replace(
      /font-weight:500;font-size:clamp\(42px,5\.6vw,82px\);line-height:1\.02;/,
      'font-weight:400;font-size:clamp(42px,5.6vw,82px);line-height:1.05;'
    );
  }

  // Standardize other H1s
  // "Journeys we actually run"
  html = html.replace(
    /font-weight:400;font-size:clamp\(36px,4\.6vw,62px\);line-height:1\.04;letter-spacing:-\.025em;margin:0;max-width:820px">Journeys we actually run, across <span style="font-style:italic;color:#E5483D">Kerala — and beyond<\/span>/g,
    'font-weight:400;font-size:clamp(36px,4.6vw,62px);line-height:1.05;letter-spacing:-.025em;margin:0;max-width:820px">Journeys we actually run, across <span style="opacity:0.9">Kerala — and beyond</span>'
  );
  html = html.replace(
    /font-weight:400;font-size:clamp\(36px,4\.6vw,62px\);line-height:1\.04;letter-spacing:-\.025em;margin:0;max-width:820px">Journeys we actually run, across <span style="font-style:italic;color:#E5483D">Kerala \?" and beyond<\/span>/g,
    'font-weight:400;font-size:clamp(36px,4.6vw,62px);line-height:1.05;letter-spacing:-.025em;margin:0;max-width:820px">Journeys we actually run, across <span style="opacity:0.9">Kerala — and beyond</span>'
  );

  // About us "since 2015"
  html = html.replace(
    /font-weight:400;font-size:clamp\(38px,5\.2vw,74px\);line-height:1\.02;letter-spacing:-\.028em;margin:0;max-width:900px">Sahapathika Holidays — a travel agency <span style="font-style:italic;color:#E5483D">since 2015<\/span>/g,
    'font-weight:400;font-size:clamp(38px,5.2vw,74px);line-height:1.05;letter-spacing:-.028em;margin:0;max-width:900px">Sahapathika Holidays — a travel agency <span style="opacity:0.9">since 2015</span>'
  );
  html = html.replace(
    /font-weight:400;font-size:clamp\(38px,5\.2vw,74px\);line-height:1\.02;letter-spacing:-\.028em;margin:0;max-width:900px">Sahapathika Holidays \?" a travel agency <span style="font-style:italic;color:#E5483D">since 2015<\/span>/g,
    'font-weight:400;font-size:clamp(38px,5.2vw,74px);line-height:1.05;letter-spacing:-.028em;margin:0;max-width:900px">Sahapathika Holidays — a travel agency <span style="opacity:0.9">since 2015</span>'
  );

  // Contact us "we'll do the rest"
  html = html.replace(
    /font-weight:400;font-size:clamp\(38px,5vw,68px\);line-height:1\.04;letter-spacing:-\.028em;margin:0;max-width:820px">Tell us where you want to go, <span style="font-style:italic;color:#E5483D">we'll do the rest<\/span>/g,
    'font-weight:400;font-size:clamp(38px,5vw,68px);line-height:1.05;letter-spacing:-.028em;margin:0;max-width:820px">Tell us where you want to go, <span style="opacity:0.9">we\'ll do the rest</span>'
  );

  // 2. Animations & Hover states
  // Fix keyframes
  html = html.replace(
    /@keyframes rise { from { opacity: 0; transform: translateY\(22px\); } to { opacity: 1; transform: none; } }/,
    '@keyframes rise { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }'
  );
  html = html.replace(
    /@keyframes blurin { from { opacity: 0; transform: translateY\(26px\); filter: blur\(10px\); } to { opacity: 1; transform: none; filter: blur\(0\); } }/,
    '@keyframes blurin { from { opacity: 0; transform: translateY(12px); filter: blur(4px); } to { opacity: 1; transform: none; filter: blur(0); } }'
  );
  // Reduce bouncy overshoot if any, standard hover is defined inline
  html = html.replace(/transform:translateY\(-6px\)/g, 'transform:translateY(-2px)');
  html = html.replace(/box-shadow:0 12px 30px -14px rgba\(22,33,29,\.18\)/g, 'box-shadow:0 8px 24px -12px rgba(22,33,29,.12)');
  html = html.replace(/box-shadow:0 14px 40px -10px rgba\(22,33,29,\.18\)/g, 'box-shadow:0 8px 24px -12px rgba(22,33,29,.12)');

  // Subdue idle animations
  html = html.replace(
    /@keyframes pulsering { 0% { transform: scale\(1\); opacity: \.55; } 70% { transform: scale\(1\.9\); opacity: 0; } 100% { opacity: 0; } }/,
    '@keyframes pulsering { 0% { transform: scale(1); opacity: .2; } 70% { transform: scale(1.4); opacity: 0; } 100% { opacity: 0; } }'
  );
  // Remove drift animations from hero blobs to make them static/quiet
  html = html.replace(/animation:drift 18s ease-in-out infinite;/g, '');
  html = html.replace(/animation:drift2 22s ease-in-out infinite;/g, '');

  if (file === 'index.html') {
    // 3. MICE Section (injecting above Contact)
    const miceSection = `
      <section style="max-width:1280px;margin:0 auto;padding:76px 24px 0">
        <div style="font-size:11px;letter-spacing:.24em;font-weight:800;color:#C4362C;margin-bottom:18px">CORPORATE & MICE</div>
        <div style="display:flex;flex-wrap:wrap;gap:40px;align-items:center;justify-content:space-between">
          <h2 style="font-family:'Fraunces',serif;font-weight:400;font-size:clamp(32px,4vw,56px);line-height:1.05;letter-spacing:-.02em;margin:0;max-width:560px">Elevate your corporate retreats and events.</h2>
          <div style="max-width:480px">
            <p style="font-size:16px;line-height:1.6;color:#6B655C;margin:0 0 24px">Sahapathika Holidays specializes in comprehensive MICE (Meetings, Incentives, Conferences, Exhibitions) travel management. We coordinate everything from venue selection to logistics and team-building activities, ensuring a seamless experience for your organization.</p>
            <button onClick="{{ goContact }}" style="background:#2F7A63;color:#fff;border:0;padding:14px 28px;border-radius:99px;font-weight:700;font-size:15px;cursor:pointer">Plan a Corporate Trip</button>
          </div>
        </div>
      </section>
    `;
    html = html.replace(/<section style="max-width:1280px;margin:0 auto;padding:76px 24px 56px">[\s\S]*?CONTACT US/, miceSection + '\n<section style="max-width:1280px;margin:0 auto;padding:76px 24px 56px"><div style="font-size:11px;letter-spacing:.24em;font-weight:800;color:#C4362C;margin-bottom:18px">CONTACT US');

    // 4. Trust Badges above footer
    const trustBadges = `
      <section style="background:#FAF6EF;padding:48px 24px;border-top:1px solid rgba(22,33,29,0.05);margin-top:40px">
        <div style="max-width:1280px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:40px;opacity:0.8;filter:grayscale(100%)">
          <div style="display:flex;align-items:center;gap:12px;font-weight:700;font-size:14px;color:#1B1A17">
            <span style="font-size:24px">🇮🇳</span> Ministry of Tourism Approved
          </div>
          <div style="display:flex;align-items:center;gap:12px;font-weight:700;font-size:14px;color:#1B1A17">
            <span style="font-size:24px">🤝</span> Member IATO
          </div>
          <div style="display:flex;align-items:center;gap:12px;font-weight:700;font-size:14px;color:#1B1A17">
            <span style="font-size:24px">🎖️</span> Member ADTOI
          </div>
        </div>
      </section>
    `;
    html = html.replace(/<footer class="site-footer"/, trustBadges + '\n<footer class="site-footer"');
    
    // Add goContact method for the MICE section
    html = html.replace(/goHome: \(\) => this\.setState\(\{ page: 'home', nav: false \}\),/, `goHome: () => this.setState({ page: 'home', nav: false }),\n        goContact: () => { this.setState({ page: 'contact' }); window.scrollTo(0, 0); },`);
  }

  // Add WhatsApp opt-in to enquiry form in index.html
  if (file === 'index.html') {
    const waCheckbox = `
      <label style="display:flex;align-items:center;gap:12px;cursor:pointer;margin-top:12px">
        <input type="checkbox" onChange="{{ setWhatsapp }}" checked="{{ state.form.whatsapp }}" style="width:18px;height:18px;accent-color:#2F7A63;cursor:pointer" />
        <span style="font-size:14px;color:#6B655C;font-weight:500">Send me updates on WhatsApp</span>
      </label>
    `;
    html = html.replace(/<textarea placeholder="Tell us about your requirements\.\.\." style="{{ textareaStyle }}" rows="4" value="{{ state\.form\.message }}" onInput="{{ setMessage }}"><\/textarea>\s*<\/label>/, `<textarea placeholder="Tell us about your requirements..." style="{{ textareaStyle }}" rows="4" value="{{ state.form.message }}" onInput="{{ setMessage }}"></textarea>\n            </label>\n            ${waCheckbox}`);
    
    // Update state initialization
    html = html.replace(/form: \{ name: '', email: '', phone: '', pkg: '', dates: '', message: '' \}/g, "form: { name: '', email: '', phone: '', pkg: '', dates: '', message: '', whatsapp: true }");
    html = html.replace(/setPkg: e => this\.setState\(\{ form: Object\.assign\(\{\}, s\.form, \{ pkg: e\.target\.value \}\) \}\),/, `setPkg: e => this.setState({ form: Object.assign({}, s.form, { pkg: e.target.value }) }),\n      setWhatsapp: e => this.setState({ form: Object.assign({}, s.form, { whatsapp: e.target.checked }) }),`);
    
    // Update fetch payload
    html = html.replace(/_subject: 'New Enquiry from Sahapathika Holidays'/, `whatsapp_opt_in: this.state.form.whatsapp ? 'Yes' : 'No',\n            _subject: 'New Enquiry from Sahapathika Holidays'`);
  }

  fs.writeFileSync(file, html, 'utf8');
}

function processSupportJS() {
  let js = fs.readFileSync('support.js', 'utf8');
  
  // 5. Package Counts
  // We need to inject count calculation logic into destGroups and categories mapping.
  // wait, destGroups is defined in index.html, not support.js. 
  // Let me check index.html for destGroups.
  // Actually, I can just modify index.html for destGroups and categories.
  
  fs.writeFileSync('support.js', js, 'utf8');
}

function processIndexJS() {
  let html = fs.readFileSync('index.html', 'utf8');
  
  // Update destGroups counts
  html = html.replace(
    /g\[2\]\.forEach\(l => out\.push\(\{ label: l, initial: l\[0\], popular: \(l === 'Munnar' \|\| l === 'Alleppey' \|\| l === 'Goa'\), style: row, pick: \(\) => this\.setState\(\{ dest: l, field: null \}\), isItem: true \}\)\);/,
    `g[2].forEach(l => {
              const count = this.packages.filter(p => p.regions && p.regions.includes(l)).length;
              out.push({ label: l, initial: l[0], count: count, popular: (l === 'Munnar' || l === 'Alleppey' || l === 'Goa'), style: row, pick: () => this.setState({ dest: l, field: null }), isItem: true });
            });`
  );
  
  // Update search dropdown rendering for counts
  html = html.replace(
    /<span style="font-size:14\.5px;font-weight:600;color:#1B1A17">{{ o\.label }}<\/span>/,
    `<span style="font-size:14.5px;font-weight:600;color:#1B1A17">{{ o.label }}</span>
                            <sc-if value="{{ o.count > 0 }}" hint-placeholder-val="{{ true }}">
                              <span style="font-size:11px;color:#6B655C;font-weight:500;margin-top:2px">{{ o.count }} {{ o.count === 1 ? 'journey' : 'journeys' }}</span>
                            </sc-if>`
  );

  // Add counts to Category Cards
  // `categories: [` is in index.html
  const categoryCountsLogic = `categories: [
          { t: 'Kerala', style: s.catCardStyle, go: s.catKerala },
          { t: 'Honeymoon', style: s.catCardStyle, go: s.catHoneymoon },
          { t: 'Ayurveda & Wellness', style: s.catCardStyle, go: s.catAyurveda },
          { t: 'Heritage & Temple', style: s.catCardStyle, go: s.catHeritage },
          { t: 'Hill & Backwater', style: s.catCardStyle, go: s.catBackwater },
          { t: 'Beach & Coastal', style: s.catCardStyle, go: s.catBeach },
          { t: 'North India', style: s.catCardStyle, go: s.catIndia }
        ].map(c => {
           let ct = this.packages.filter(p => c.t === 'Kerala' ? true : (p.cat === c.t || p.region === c.t)).length;
           return Object.assign({}, c, { count: ct });
        }),`;
        
  html = html.replace(/categories: \[[\s\S]*?catIndia \} *\],/, categoryCountsLogic);
  
  // Render category counts
  html = html.replace(
    /<div style="font-size:16px;font-weight:600;color:#1B1A17;margin-top:auto">{{ c\.t }}<\/div>/,
    `<div style="font-size:16px;font-weight:600;color:#1B1A17;margin-top:auto">{{ c.t }}</div>
                  <div style="font-size:12.5px;color:#6B655C;margin-top:4px">{{ c.count }} {{ c.count === 1 ? 'journey' : 'journeys' }}</div>`
  );

  fs.writeFileSync('index.html', html, 'utf8');
}

processHtml('index.html');
processHtml('packages.html');
processSupportJS();
processIndexJS();

console.log('Applied UI/UX pass 2 changes.');
