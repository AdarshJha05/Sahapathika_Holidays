
  state = {
    page: 'packages', menu: null, field: null,
    dest: '', exp: '', date: null, month: null,
    fRegion: 'All', fCat: 'All', fSort: 'Featured',
    slug: 'kerala-ayurveda-wellness-retreat', day: 1, faq: 0, adults: 2, kids: 0, hdr: 78,
    testi: 0, light: -1, email: '', subscribed: false,
    loading: true, wiping: false, scrolled: false, sy: 0,
    counts: { travellers: 0, destinations: 0, packages: 0, years: 0 },
    form: { name: '', email: '', phone: '', pkg: '', dates: '', message: '' }, sent: false
  };

  catColor = {
    'Ayurveda & Wellness': '#2E6E6A', 'Heritage & Temple': '#B5822A', 'Heritage': '#B5822A',
    'Beach & Coastal': '#3C6F63', 'Hill & Backwater': '#2F7A63', 'Signature': '#E5483D', 'Honeymoon': '#C4362C', 'Pilgrimage Yatra': '#B5822A', 'Kashmir Valley': '#2F7A63', 'East India': '#B5822A'
  };

  packages = [
    { slug: 'shimla-manali', title: 'Shimla Manali', regions: 'Shimla Manali', region: 'North India', duration: '6 Days   5 Nights', cat: 'Hill & Backwater', photo: 'https://i.pinimg.com/736x/b4/88/63/b48863982d7b8c63a8d633405da62b2b.jpg', hint: 'Shimla Manali' },
    { slug: 'shimla-kullu-manali', title: 'Shimla Kullu Manali', regions: 'Shimla Kullu Manali', region: 'North India', duration: '7 Days   6 Nights', cat: 'Hill & Backwater', photo: 'https://i.pinimg.com/736x/b4/88/63/b48863982d7b8c63a8d633405da62b2b.jpg', hint: 'Shimla Kullu Manali' },
    { slug: 'himachal-devi-yatra-with-vaishno-devi-mansa-devi', title: 'Himachal Devi Yatra with Vaishno Devi & Mansa Devi', regions: 'Himachal Devi Yatra with Vaishno Devi & Mansa Devi', region: 'North India', duration: '7 Days   6 Nights', cat: 'Pilgrimage Yatra', photo: 'https://i.pinimg.com/736x/a8/39/4f/a8394fa9408e2472f0672f2bb515d9db.jpg', hint: 'Himachal Devi Yatra with Vaishno Devi & Mansa Devi' },
    { slug: 'shimla-manali-amritsar', title: 'Shimla Manali  & Amritsar', regions: 'Shimla Manali  & Amritsar', region: 'North India', duration: 'On enquiry', cat: 'Hill & Backwater', photo: 'https://i.pinimg.com/736x/a8/39/4f/a8394fa9408e2472f0672f2bb515d9db.jpg', hint: 'Shimla Manali  & Amritsar' },
    { slug: 'himachal-pradesh', title: 'Himachal Pradesh', regions: 'Himachal Pradesh', region: 'North India', duration: '9 Days   8 Nights', cat: 'Hill & Backwater', photo: 'https://i.pinimg.com/736x/b4/88/63/b48863982d7b8c63a8d633405da62b2b.jpg', hint: 'Himachal Pradesh' },

    { slug: 'puri-jagannath-konark-chilika-bhubaneswar', title: 'Puri Jagannath   Konark   Chilika   Bhubaneswar', regions: 'Puri Jagannath   Konark   Chilika   Bhubaneswar', region: 'East India', duration: 'On enquiry', cat: 'Heritage & Temple', photo: 'https://i.pinimg.com/736x/a8/39/4f/a8394fa9408e2472f0672f2bb515d9db.jpg', hint: 'Puri Jagannath   Konark   Chilika   Bhubaneswar' },
    { slug: 'lucknow-naimisharanya-ayodhya-prayagraj-varanasi-y', title: 'Lucknow   Naimisharanya   Ayodhya   Prayagraj   Varanasi Yatra', regions: 'Lucknow   Naimisharanya   Ayodhya   Prayagraj   Varanasi Yatra', region: 'North India', duration: 'On enquiry', cat: 'Pilgrimage Yatra', photo: 'https://i.pinimg.com/736x/a8/39/4f/a8394fa9408e2472f0672f2bb515d9db.jpg', hint: 'Lucknow   Naimisharanya   Ayodhya   Prayagraj   Varanasi Yatra' },
    { slug: 'kashi-gaya-prayag-ayodhya-pitru-moksha-yatra', title: 'Kashi Gaya Prayag Ayodhya Pitru Moksha Yatra', regions: 'Kashi Gaya Prayag Ayodhya Pitru Moksha Yatra', region: 'North India', duration: 'On enquiry', cat: 'Pilgrimage Yatra', photo: 'https://i.pinimg.com/736x/a8/39/4f/a8394fa9408e2472f0672f2bb515d9db.jpg', hint: 'Kashi Gaya Prayag Ayodhya Pitru Moksha Yatra' },
    { slug: 'kashi-prayag-chitrakoot-ayodhya-divya-yatra', title: 'Kashi Prayag Chitrakoot Ayodhya Divya Yatra', regions: 'Kashi Prayag Chitrakoot Ayodhya Divya Yatra', region: 'North India', duration: 'On enquiry', cat: 'Pilgrimage Yatra', photo: 'https://i.pinimg.com/736x/a8/39/4f/a8394fa9408e2472f0672f2bb515d9db.jpg', hint: 'Kashi Prayag Chitrakoot Ayodhya Divya Yatra' },
    { slug: 'kashi-prayag-chitrakoot-ayodhya-yatra', title: 'Kashi Prayag Chitrakoot Ayodhya Yatra', regions: 'Kashi Prayag Chitrakoot Ayodhya Yatra', region: 'North India', duration: '5N 6D', cat: 'Pilgrimage Yatra', photo: 'https://i.pinimg.com/736x/a8/39/4f/a8394fa9408e2472f0672f2bb515d9db.jpg', hint: 'Kashi Prayag Chitrakoot Ayodhya Yatra' },
    { slug: 'kashmir-5-days-srinagar-sonmarg-gulmarg-pahalgam-j', title: 'Kashmir 5 Days    Srinagar  Sonmarg  Gulmarg & Pahalgam Jammu to Jammu', regions: 'Kashmir 5 Days    Srinagar  Sonmarg  Gulmarg & Pahalgam Jammu to Jammu', region: 'Kashmir Valley', duration: 'On enquiry', cat: 'Hill & Backwater', photo: 'https://i.pinimg.com/736x/b4/88/63/b48863982d7b8c63a8d633405da62b2b.jpg', hint: 'Kashmir 5 Days    Srinagar  Sonmarg  Gulmarg & Pahalgam Jammu to Jammu' },
    { slug: 'kashmir-6-days-srinagar-sonmarg-gulmarg-pahalgam', title: 'Kashmir 6 Days    Srinagar  Sonmarg  Gulmarg & Pahalgam', regions: 'Kashmir 6 Days    Srinagar  Sonmarg  Gulmarg & Pahalgam', region: 'Kashmir Valley', duration: 'On enquiry', cat: 'Hill & Backwater', photo: 'https://i.pinimg.com/736x/b4/88/63/b48863982d7b8c63a8d633405da62b2b.jpg', hint: 'Kashmir 6 Days    Srinagar  Sonmarg  Gulmarg & Pahalgam' },
    { slug: 'kashmir-honeymoon', title: 'Kashmir Honeymoon', regions: 'Kashmir Honeymoon', region: 'Kashmir Valley', duration: '7 Days   6 Nights', cat: 'Hill & Backwater', photo: 'https://i.pinimg.com/736x/b4/88/63/b48863982d7b8c63a8d633405da62b2b.jpg', hint: 'Kashmir Honeymoon' },
    { slug: 'kashmir-with-vaishno-devi', title: 'Kashmir with Vaishno Devi', regions: 'Kashmir with Vaishno Devi', region: 'Kashmir Valley', duration: '7 Days   6 Nights', cat: 'Hill & Backwater', photo: 'https://i.pinimg.com/736x/b4/88/63/b48863982d7b8c63a8d633405da62b2b.jpg', hint: 'Kashmir with Vaishno Devi' },
    { slug: 'mathura-vrindavan-braj-agra-yatra', title: 'Mathura Vrindavan Braj & Agra Yatra', regions: 'Mathura Vrindavan Braj & Agra Yatra', region: 'North India', duration: 'On enquiry', cat: 'Pilgrimage Yatra', photo: 'https://i.pinimg.com/736x/a8/39/4f/a8394fa9408e2472f0672f2bb515d9db.jpg', hint: 'Mathura Vrindavan Braj & Agra Yatra' },
    { slug: 'varanasi-tour-packages-from-kerala', title: 'Varanasi Tour Packages from Kerala', regions: 'Varanasi Tour Packages from Kerala', region: 'North India', duration: 'On enquiry', cat: 'Pilgrimage Yatra', photo: 'https://i.pinimg.com/736x/a8/39/4f/a8394fa9408e2472f0672f2bb515d9db.jpg', hint: 'Varanasi Tour Packages from Kerala' },

    { slug: 'kerala-ayurveda-wellness-retreat', title: 'Kerala Ayurveda & Wellness Retreat', regions: 'Kovalam · Poovar · Trivandrum', region: 'South Kerala', duration: '5N / 6D', cat: 'Ayurveda & Wellness', photo: 'https://i.pinimg.com/736x/24/8a/88/248a8829446ddc4864ba2093a40713b2.jpg', hint: 'Ayurveda therapy table with brass vessels, Kovalam' },
    { slug: 'munnar-thekkady-alleppey', title: 'Munnar – Thekkady – Alleppey Tour', regions: 'Munnar · Thekkady · Alleppey', region: 'Central Kerala', duration: 'TBC', cat: 'Hill & Backwater', photo: 'https://i.pinimg.com/736x/b4/88/63/b48863982d7b8c63a8d633405da62b2b.jpg', hint: 'Munnar tea terraces at sunrise' },
    { slug: 'waterfalls-hills-backwaters', title: 'A Perfect Blend of Waterfalls, Hills & Backwaters', regions: 'Alleppey · Munnar · Athirappilly', region: 'Central Kerala', duration: '4N (TBC)', cat: 'Hill & Backwater', photo: 'https://i.pinimg.com/736x/75/1e/96/751e9636e5a9f3b2ef002932b1817d3d.jpg', hint: 'Athirappilly falls in monsoon' },
    { slug: 'kerala-temple-tour', title: 'Kerala Temple Tour', regions: 'Guruvayur · Kalady · Chottanikkara · Sabarimala (seasonal) · Trivandrum', region: 'Central Kerala', duration: '5N (TBC)', cat: 'Heritage & Temple', photo: 'https://i.pinimg.com/736x/a8/39/4f/a8394fa9408e2472f0672f2bb515d9db.jpg', hint: 'Temple gopuram exterior at dawn' },
    { slug: 'kovalam-varkala-tour', title: 'Kovalam & Varkala Tour', regions: 'Kovalam · Varkala', region: 'South Kerala', duration: '2N / 3D', cat: 'Beach & Coastal', photo: 'https://i.pinimg.com/1200x/1f/cc/f1/1fccf111a972587d9c072f8381018c70.jpg', hint: 'Varkala cliff at sunset' },
    { slug: 'north-kerala-heritage-tour', title: 'North Kerala Heritage Tour', regions: 'Bekal · Kannur · Wayanad · Kozhikode', region: 'North Kerala', duration: '6N (TBC)', cat: 'Heritage', photo: 'https://i.pinimg.com/1200x/1e/00/bb/1e00bb9fa2160c94d8b9fd5aa079874b.jpg', hint: 'Bekal fort against the Arabian Sea' },
    { slug: 'beach-and-backwater-tour', title: 'Beach and Backwater Tour', regions: 'Varkala · Backwaters', region: 'South Kerala', duration: 'TBC', cat: 'Beach & Coastal', photo: 'https://i.pinimg.com/1200x/9c/4d/7b/9c4d7b7354f5deff64a143cd3ee10583.jpg', hint: 'Fishing boats on a Kerala beach at dawn' },
    { slug: 'enchanting-captivating-kerala', title: 'Enchanting & Captivating Kerala', regions: 'Multi-region', region: 'Multi-region', duration: '7 Days', cat: 'Signature', photo: 'https://i.pinimg.com/originals/87/8b/84/878b841ad38d1d59cbefa547e995f363.png', hint: 'Kathakali performer close-up' },
    { slug: 'scenic-beautiful-kerala', title: 'Scenic and Beautiful Kerala', regions: 'Multi-region', region: 'Multi-region', duration: '8 Days', cat: 'Signature', photo: 'https://i.pinimg.com/1200x/2e/de/6a/2ede6ae530ca4688f61e8a73046ae302.jpg', hint: 'Chinese fishing nets, Fort Kochi' },
    { slug: 'kerala-short-honeymoon-tour', title: 'Kerala Short Honeymoon Tour', regions: 'Multi-region', region: 'Multi-region', duration: 'TBC', cat: 'Honeymoon', photo: 'https://i.pinimg.com/1200x/7d/92/4c/7d924cc4489932afa59b881fc9f2a523.jpg', hint: 'Private houseboat deck set for two' }
  ];

  galleryItems = [
    { id: 'sh-g1', photo: 'https://i.pinimg.com/736x/b4/88/63/b48863982d7b8c63a8d633405da62b2b.jpg', hint: 'Houseboat convoy, Alleppey', span: 'grid-column:span 2;grid-row:span 2', cap: 'Kettuvallam convoy · Alleppey backwaters' },
    { id: 'sh-g2', photo: 'https://i.pinimg.com/1200x/9c/4d/7b/9c4d7b7354f5deff64a143cd3ee10583.jpg', hint: 'Kathakali eyes, close-up', span: 'grid-column:span 1;grid-row:span 1', cap: 'Kathakali · Kochi' },
    { id: 'sh-g3', photo: 'https://i.pinimg.com/1200x/2e/de/6a/2ede6ae530ca4688f61e8a73046ae302.jpg', hint: 'Tea pickers, Munnar', span: 'grid-column:span 2;grid-row:span 1', cap: 'Tea gardens · Munnar' },
    { id: 'sh-g4', photo: 'https://i.pinimg.com/1200x/b9/74/0a/b9740a34ba67edb133591cb297723efa.jpg', hint: 'Spice market stall', span: 'grid-column:span 1;grid-row:span 2', cap: 'Spice market · Fort Kochi' },
    { id: 'sh-g5', photo: 'https://i.pinimg.com/736x/a8/39/4f/a8394fa9408e2472f0672f2bb515d9db.jpg', hint: 'Temple gopuram at dusk', span: 'grid-column:span 1;grid-row:span 1', cap: 'Gopuram at dusk' },
    { id: 'sh-g6', photo: 'https://i.pinimg.com/1200x/1e/00/bb/1e00bb9fa2160c94d8b9fd5aa079874b.jpg', hint: 'Varkala cliff sunset', span: 'grid-column:span 2;grid-row:span 1', cap: 'Cliff sunset · Varkala' }
  ];

  testis = [
    { name: 'Anjali Nair', city: 'Kochi', initials: 'AN', quote: 'Everything was arranged exactly as promised — the houseboat, the driver, the timings. We just showed up and enjoyed Kerala.' },
    { name: 'Rahul Menon', city: 'Bengaluru', initials: 'RM', quote: 'Booked at short notice and still got a great rate. The team answered every question on WhatsApp within minutes.' },
    { name: 'Priya & Arjun', city: 'Chennai', initials: 'PA', quote: 'Our honeymoon was planned with real care. The Munnar stay was the highlight of the whole year for us.' }
  ];

  destinations = [
    { name: 'Munnar', tag: 'Tea hills', initial: 'M' }, { name: 'Alleppey', tag: 'Backwaters', initial: 'A' },
    { name: 'Kovalam', tag: 'Beaches', initial: 'K' }, { name: 'Wayanad', tag: 'Forests', initial: 'W' },
    { name: 'Kochi', tag: 'Heritage', initial: 'C' }, { name: 'Varkala', tag: 'Cliffs', initial: 'V' }
  ];

  componentDidMount() {
    this.setState({ month: new Date(2026, 8, 1) });
    const params = new URLSearchParams(window.location.search);
    const updates = {};
    if (params.has('cat')) updates.fCat = params.get('cat');
    if (params.has('region')) updates.fRegion = params.get('region');
    if (Object.keys(updates).length > 0) this.setState(updates);
    if (this.headerEl && 'ResizeObserver' in window) {
      this.ro = new ResizeObserver(() => { if (this._measure) this._measure(); });
      this.ro.observe(this.headerEl);
    }
    this.timer = setInterval(() => this.setState(s => ({ testi: (s.testi + 1) % 3 })), 6000);
    this._pre = setTimeout(() => this.setState({ loading: false }), 1750);
    this._measure = () => {
      if (!this.headerEl) return;
      const hh = Math.round(this.headerEl.getBoundingClientRect().height);
      if (hh && hh !== this.state.hdr) this.setState({ hdr: hh });
    };
    requestAnimationFrame(this._measure);
    this._onResize = () => this._measure();
    window.addEventListener('resize', this._onResize);
    this._onScroll = () => {
      const y = window.scrollY || 0;
      const sc = y > 40;
      this._measure();
      if (sc !== this.state.scrolled || Math.abs(y - this.state.sy) > 6) this.setState({ scrolled: sc, sy: y });
    };
    window.addEventListener('scroll', this._onScroll, { passive: true });
    const el = this.statsEl;
    const run = () => {
      const t0 = performance.now(), dur = 1600;
      const tick = now => {
        const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
        this.setState({ counts: { travellers: Math.round(e * 0), destinations: Math.round(e * 0), packages: Math.round(e * 10), years: Math.round(e * 10) } });
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if (el && 'IntersectionObserver' in window) {
      this.io = new IntersectionObserver(es => { es.forEach(e => { if (e.isIntersecting) { run(); this.io.disconnect(); } }); }, { threshold: .3 });
      this.io.observe(el);
    } else run();
  }
  componentWillUnmount() {
    clearInterval(this.timer); clearTimeout(this._pre); clearTimeout(this._t1); clearTimeout(this._t2);
    window.removeEventListener('scroll', this._onScroll);
    window.removeEventListener('resize', this._onResize);
    if (this.io) this.io.disconnect(); if (this.ro) this.ro.disconnect();
  }

  go = (page, extra) => {
    if (this.state.loading) return;
    let url = '';
    if (page === 'home') url = 'index.html';
    else if (page === 'about') url = 'about.html';
    else if (page === 'contact') url = 'contact.html';
    else if (page === 'packages') {
      url = 'packages.html';
      if (extra && (extra.fCat || extra.fRegion)) {
        const params = new URLSearchParams();
        if (extra.fCat && extra.fCat !== 'All') params.set('cat', extra.fCat);
        if (extra.fRegion && extra.fRegion !== 'All') params.set('region', extra.fRegion);
        if (params.toString()) url += '?' + params.toString();
      }
    }
    else if (page === 'detail') {
      url = 'package-' + (extra && extra.slug ? extra.slug : 'kerala-ayurveda-wellness-retreat') + '.html';
    }

    if (url) {
      const isPackagesToPackages = page === 'packages' && window.location.pathname.includes('packages.html');
      const isDetailToSameDetail = page === 'detail' && window.location.pathname.includes(url);
      
      if (isPackagesToPackages || isDetailToSameDetail) {
         this.setState(Object.assign({ page }, extra || {}, { menu: null, field: null }));
         window.history.pushState({}, '', url);
         window.scrollTo({ top: 0, behavior: 'smooth' });
         return;
      }
      
      this.setState({ loading: true, menu: null, field: null });
      setTimeout(() => {
        window.location.href = url;
      }, 200);
    }
  };
  filterTo = (cat, region) => this.go('packages', { fCat: cat || 'All', fRegion: region || 'All' });

  chip(cat) {
    return 'position:absolute;top:14px;left:14px;background:' + (this.catColor[cat] || '#E5483D') + ';color:#fff;font-size:10.5px;font-weight:800;letter-spacing:.08em;padding:7px 12px;border-radius:99px;text-transform:uppercase';
  }

  field(active) {
    return 'display:flex;align-items:center;gap:14px;width:100%;text-align:left;background:#fff;border:1.5px solid ' + (active ? '#E5483D' : 'rgba(22,33,29,.1)') + ';padding:14px 18px;border-radius:16px;cursor:pointer;transition:border-color .2s';
  }

  monthCells() {
    const m = this.state.month || new Date(2026, 8, 1);
    const first = new Date(m.getFullYear(), m.getMonth(), 1);
    const start = new Date(first); start.setDate(1 - first.getDay());
    const today = new Date(2026, 8, 4);
    const out = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(start); d.setDate(start.getDate() + i);
      const other = d.getMonth() !== m.getMonth();
      const iso = d.toISOString().slice(0, 10);
      const sel = this.state.date === iso;
      const past = d < today;
      out.push({
        label: String(d.getDate()), iso,
        style: 'border:0;border-radius:10px;height:34px;cursor:' + (past ? 'default' : 'pointer') + ';font-size:13px;font-weight:' + (sel ? '800' : '600') +
          ';background:' + (sel ? '#E5483D' : 'transparent') + ';color:' + (sel ? '#fff' : other || past ? 'rgba(107,101,92,.45)' : '#1B1A17'),
        pick: past ? () => {} : () => this.setState({ date: iso, field: null })
      });
    }
    return out;
  }

  itineraries = {
    'puri-jagannath-konark-chilika-bhubaneswar': [
      { title: 'Day 1: Bhubaneswar Arrival – Sakhigopal – Raghurajpur – Puri', body: ['Meals: Breakfast', 'Overnight: Puri Arrive at Bhubaneswar Airport, Bhubaneswar Railway Station or Puri Railway Station in the morning. Meet the Sahapathika Holidays representative and begin your road journey towards Puri. En route, visit Sakhigopal Temple, an important pilgrimage stop, followed by Raghurajpur Craft Village, renowned for its traditional artistic heritage and handicraft traditions. Continue to Puri and check in at your hotel. After some time to refresh, proceed for a visit to the revered Shri Jagannath Temple, one of Odisha\'s most important pilgrimage centres. Return to the hotel after your temple visit. Overnight stay in Puri.'] },
      { title: 'Day 2: Chilika Lake at Satapada – Dolphins, Birds & Coastal Experiences', body: ['Meals: Breakfast', 'Overnight: Puri After breakfast, set out for Satapada, located on the Chilika Lake. Chilika is renowned for its extensive lagoon ecosystem, seasonal migratory birds and the presence of the endangered Irrawaddy dolphin. Enjoy a motorboat excursion across the lake, offering opportunities to experience its natural surroundings, observe local birdlife and see the traditional fishing environment of the region. Return to Puri after the excursion. Later, visit Puri\'s Blue Flag Beach and spend some time exploring the nearby beach market and local shopping opportunities. Return to the hotel for the night. Overnight stay in Puri.'] },
      { title: 'Day 3: Puri Temple Heritage – Konark Sun Temple – Chandrabhaga', body: ['Meals: Breakfast', 'Overnight: Puri After breakfast, begin another day of exploration around Puri. Visit Sonar Gauranga Temple, Bedi Hanuman Temple, Sudarshan Patnaik Sand Art Museum and Mausi Maa Temple. You will also have the opportunity for Mahaprasad at the Lord Jagannath Temple, as specified in the itinerary. Later, travel towards Konark to visit the magnificent Konark Sun Temple, an outstanding example of Odisha\'s temple architecture. Enjoy the light and sound show at Konark as per the operating schedule. Continue towards Chandrabhaga Beach, where you can experience the coastal landscape and sunset. The day concludes with a visit to Ramchandi Temple before returning to Puri. Overnight stay in Puri.'] },
      { title: 'Day 4: Puri – Pipli – Dhauli – Bhubaneswar Temple Trail', body: ['Meals: Breakfast', 'Overnight: Bhubaneswar After breakfast, check out from the Puri hotel by around 9:00 AM and begin the journey towards Bhubaneswar. En route, stop at Pipli Appliqué Market, known for its colourful traditional appliqué handicrafts. Continue to Dhauli Shanti Stupa, an important historical and peaceful landmark. On reaching Bhubaneswar, explore some of the city\'s celebrated temples, including Lingaraj Temple, Rajarani Temple and Mukteshwar Temple. After sightseeing, check in to your Bhubaneswar hotel. The remaining time can be used for local shopping. Overnight stay in Bhubaneswar.'] },
      { title: 'Day 5: Bhubaneswar Sightseeing – Departure', body: ['Meals: Breakfast', 'Overnight: Not applicable After breakfast, check out from the hotel and continue with your final day of Bhubaneswar sightseeing. Visit Nandankanan Zoological Park, followed by the historic Khandagiri and Udayagiri Caves. Complete the sightseeing programme with a visit to Kala Bhoomi Museum, subject to its operating schedule. Later, proceed to Bhubaneswar Airport or Railway Station for your onward journey. Tour concludes with memorable experiences of Odisha\'s temples, heritage and coastline. Why Choose This Puri & Odisha Tour Package? This itinerary brings together several of Odisha\'s most appealing experiences within five days. Key highlights include: Spiritual experience at Shri Jagannath Temple, Puri Sakhigopal Temple and Raghurajpur Craft Village Chilika Lake and Satapada Opportunity for an Irrawaddy dolphin viewing boat excursion Puri\'s Blue Flag Beach Konark Sun Temple and light & sound experience Chandrabhaga Beach and Ramchandi Temple Traditional handicrafts at Pipli Dhauli Shanti Stupa Bhubaneswar\'s historic temples Khandagiri and Udayagiri Caves Nandankanan and Kala Bhoomi Museum The route combines pilgrimage, heritage, nature, architecture and local culture, making it particularly appealing for travellers who want more than a temple-only holiday. Why Book With Sahapathika Holidays? A multi-destination Odisha journey involves coordinating hotels, road transportation, sightseeing and different types of experiences across Puri and Bhubaneswar. Sahapathika Holidays can organise these components into one coordinated travel plan. Why travellers from Kerala can consider Sahapathika Holidays: Kerala-based travel support Understanding of travel preferences of Kerala families and groups Professionally structured multi-destination itineraries Hotel and transportation coordination Options suitable for families, couples, senior travellers and groups Assistance in planning travel from different parts of Kerala Customisation based on travel dates and traveller requirements Coordination of applicable flight or train arrangements when requested Assistance during the journey according to the services booked Whether you are travelling from Kochi, Ernakulam, Thrissur, Kottayam, Kozhikode, Kannur, Malappuram, Alappuzha, Kollam or Thiruvananthapuram, your Odisha holiday can be planned around your preferred dates and travel arrangements. Who Is This Package Suitable For? This Puri tour package from Kerala is suitable for: Families Hindu pilgrimage travellers Senior citizens Couples Friends and small groups Cultural and heritage enthusiasts Travellers interested in nature and wildlife Group travellers Best Time to Visit Puri, Konark & Bhubaneswar The Odisha itinerary can be planned during different seasons, but the more comfortable period for extensive sightseeing is generally during the cooler months from October to March. The winter period is also particularly attractive for the Chilika Lake experience because the region is known for seasonal migratory bird activity. Summer can be hot, particularly during daytime sightseeing, so travellers visiting during warmer months should plan outdoor activities accordingly. Travellers visiting during major festivals, particularly around Puri Jagannath Temple, should expect increased crowds and should plan accommodation and transportation well in advance.'] },
    ],
    'lucknow-naimisharanya-ayodhya-prayagraj-varanasi-y': [
      { title: 'Day 1: Arrive in Lucknow – Lucknow Sightseeing – Naimisharanya', body: ['Meals: None', 'Overnight: Naimisharanya Your spiritual journey begins with your arrival at Lucknow Airport or Railway Station. Meet our representative and proceed to your hotel. After check-in and some time to freshen up, begin exploring the historic and architectural treasures of Lucknow. Visit Bara Imambara and Bhool Bhulaiya, an impressive example of Lucknow\'s Nawabi-era architecture and famous for its maze-like passageways. Continue to the Lucknow Clock Tower, one of the city\'s prominent historical landmarks. Later, admire the magnificent Rumi Darwaza and visit Chota Imambara, known for its distinctive architecture and elaborate interiors. After sightseeing, proceed towards Naimisharanya, an ancient pilgrimage destination associated with Hindu religious traditions. Distance from Lucknow toNaimisharanya is 96 Km Check in to your accommodation and relax.  Overnight stay in Naimisharanya.'] },
      { title: 'Day 2: Naimisharanya Pilgrimage – Journey to Ayodhya', body: ['Meals: Breakfast', 'Overnight: Ayodhya Begin your morning by exploring the sacred places of Naimisharanya, an important pilgrimage destination with deep connections to Hindu traditions and mythology. Visit Neemsaar Tirth, one of the principal sacred sites of Naimisharanya. Continue to Chakra Tirth, a revered pilgrimage spot associated with ancient Hindu traditions. Explore other spiritual landmarks included in the itinerary, including Hanuman Garhi, Pandav Kila, Yyas Gaddi, Havan Kund and Sita Kund, subject to local accessibility and the day\'s schedule. After completing the Naimisharanya visit, continue your journey towards Ayodhya, approximately 250 km away. On arrival, check in to your Ayodhya hotel and relax. Overnight stay in Ayodhya.'] },
      { title: 'Day 3: Ayodhya Dham Darshan – Prayagraj', body: ['Meals: Breakfast', 'Overnight: Prayagraj After breakfast, begin exploring Ayodhya Dham, one of India\'s most revered pilgrimage destinations and traditionally associated with the life and legacy of Lord Rama. Begin your visit along the sacred Saryu River. Devotees may take part in holy rituals or a sacred dip according to their personal traditions and prevailing local conditions. Visit Hanuman Garhi, one of Ayodhya\'s most important temples dedicated to Lord Hanuman. Continue to Shri Ram Janmabhoomi, the revered birthplace associated with Lord Rama and home to the magnificent Ram Temple. Later, visit Kanak Bhawan and Ramkot, important spiritual landmarks of Ayodhya. Spend some peaceful moments at Swarg Dwar, another site associated with the spiritual heritage of the city. In the evening, proceed towards Prayagraj, approximately 170 km from Ayodhya. Check in to your hotel on arrival. Overnight stay in Prayagraj.'] },
      { title: 'Day 4: Prayagraj Pilgrimage – Triveni Sangam – Varanasi', body: ['Meals: Breakfast', 'Overnight: Varanasi After breakfast, explore the sacred and historic side of Prayagraj. Proceed to Triveni Sangam, the revered meeting point of the Ganga, Yamuna and the traditionally believed Saraswati. Devotees may take a holy dip and offer prayers according to their traditions. Continue to the famous Bade Hanuman Temple, where Hanuman Ji is worshipped in a distinctive reclining form. Later, visit Anand Bhawan, the historic residence associated with the Nehru family and now a museum presenting an important chapter of India\'s modern history. After sightseeing, continue by road towards Varanasi, approximately 120 km away. On reaching Kashi, check in to your hotel and relax. Overnight stay in Varanasi.'] },
      { title: 'Day 5: Kashi Darshan – Sacred Temples & Ganga Aarti', body: ['Meals: Breakfast', 'Overnight: Varanasi Today is dedicated to exploring the spiritual heart of Varanasi – Kashi. Begin with Shri Kashi Vishwanath Temple, one of the twelve revered Jyotirlingas of Lord Shiva. Seek the blessings of Mahadev and experience the unique spiritual atmosphere of the temple city. Continue to Maa Annapurna Temple, traditionally revered as the goddess of nourishment and abundance. Visit Shri Vishalakshi Mata Temple, one of the prominent Shakti pilgrimage sites associated with Kashi. Later, seek blessings at Kaal Bhairav Mandir, a highly revered shrine dedicated to Kaal Bhairav, traditionally regarded as the guardian deity of Kashi. In the evening, experience the sacred Ganga. Enjoy a boat ride on the Ganga, subject to availability and weather conditions. The boat ride is at the guest\'s own expense unless specifically included in the selected package. Conclude the evening by witnessing the magnificent Ganga Aarti at Dashashwamedh Ghat, one of the most memorable spiritual experiences in Varanasi. Return to your hotel. Overnight stay in Varanasi.'] },
      { title: 'Day 6: Varanasi – Departure', body: ['Meals: Breakfast After breakfast, check out from your hotel. Proceed to Varanasi Airport or Railway Station for your onward journey. Your Lucknow–Naimisharanya–Ayodhya–Prayagraj–Varanasi Yatra concludes with the blessings of the sacred temples, holy rivers and spiritual destinations experienced along the way. Yatra concludes. Why Choose This Uttar Pradesh Yatra? This itinerary brings together a remarkable combination of Hindu pilgrimage, mythology, spirituality, heritage and culture in a single journey. 🕉️ Naimisharanya Explore one of the ancient pilgrimage centres of Uttar Pradesh and its important sacred sites. 🛕 Ayodhya Experience the spiritual atmosphere of Shri Ram Janmabhoomi, Hanuman Garhi, Kanak Bhawan and other revered landmarks. 🌊 Prayagraj Visit the sacred Triveni Sangam, one of India\'s most important pilgrimage destinations. 🔱 Varanasi Complete your journey in Kashi with Kashi Vishwanath Darshan, temple visits and the divine Ganga Aarti. 🏛️ Lucknow Add a cultural dimension to the pilgrimage with the magnificent Nawabi architecture and historic landmarks of Lucknow. Why Book This Package from Kerala with Sahapathika Holidays? Planning a multi-city pilgrimage from Kerala to Uttar Pradesh involves coordinating flights or trains, hotels, road transportation, sightseeing and local arrangements. Sahapathika Holidays brings these elements together into one professionally planned travel experience. Kerala-Based Travel Support Get assistance from a travel company with an established presence in Kerala and experience in planning journeys for travellers from the state. Designed for Travellers from Kerala Whether you are travelling from Kochi, Ernakulam, Thrissur, Kottayam, Kozhikode, Kannur, Malappuram, Alappuzha, Kollam, Thiruvananthapuram or elsewhere in Kerala, your journey can be planned around your preferred departure point. One Coordinated Pilgrimage Instead of arranging each destination separately, this package connects Lucknow, Naimisharanya, Ayodhya, Prayagraj and Varanasi into one planned route. Comfortable Private Travel Private transportation can make a multi-city pilgrimage more convenient, particularly for families, senior citizens and small groups. Flexible Itinerary Options The journey can be customized with different hotel categories, additional nights, transportation options or extensions to other North Indian destinations. Support Throughout the Journey From the initial planning stage to your final departure from Varanasi, Sahapathika Holidays can assist with the travel arrangements included in your selected package. Who Is This Package Suitable For? This Uttar Pradesh pilgrimage tour from Kerala is suitable for: Families planning a spiritual holiday Hindu pilgrimage groups Senior citizens travelling with family Couples seeking a spiritual and cultural journey Friends and community groups Travellers interested in Ayodhya and Kashi Devotees wishing to combine multiple sacred destinations in one trip Best Time to Visit The cooler months are generally more comfortable for visiting Lucknow, Naimisharanya, Ayodhya, Prayagraj and Varanasi, particularly for temple visits and outdoor sightseeing. Travellers planning their journey around major Hindu festivals should expect larger crowds and increased demand for hotels and transportation. Advance planning is recommended during important religious periods.'] },
    ],
    'kashi-gaya-prayag-ayodhya-pitru-moksha-yatra': [
      { title: 'Day 1: Arrival in Kashi – Temple Darshan & Ganga Aarti', body: ['Meals: None', 'Overnight: Varanasi Welcome to Varanasi – the sacred city of Kashi and abode of Lord Shiva. On arrival at Varanasi, meet our representative and proceed to your hotel. After check-in and some time to freshen up, begin your first experience of the holy city. Visit Kaal Bhairav Temple, one of the most revered shrines of Kashi and traditionally worshipped as the guardian deity of the city. Continue to Sankat Mochan Hanuman Temple, followed by a visit to Shri Vishalakshi Mata Temple, one of the revered Shakti Peethas associated with Kashi. As evening approaches, proceed towards the Ganga to witness the spectacular Ganga Aarti at Dashashwamedh Ghat. The illuminated lamps, devotional chants and sacred atmosphere along the river create a memorable beginning to your Kashi pilgrimage. Return to the hotel after the Aarti. Overnight stay in Varanasi.'] },
      { title: 'Day 2: Kashi Rituals – Journey to Gaya', body: ['Meals: Breakfast', 'Overnight: Gaya Begin the day with your planned Pitru-related rituals and ancestral offerings at the sacred ghats of Varanasi, according to your family\'s religious traditions and the arrangements made for the pilgrimage. The morning is dedicated primarily to the spiritual purpose of the journey. Devotees undertaking ancestral rites may follow their family\'s customary procedures with the assistance of the appropriate priest/purohit. After completing the morning rituals, have lunch and prepare for your onward journey. Around 1:00 PM, proceed by road towards Gaya, one of India\'s most important destinations for ancestral rites and Hindu pilgrimage. On arrival in Gaya, check in to your hotel and relax after the journey. Overnight stay in Gaya.'] },
      { title: 'Day 3: Gaya Pitru Shradh & Spiritual Darshan – Return to Varanasi', body: ['Meals: Breakfast', 'Overnight: Varanasi Begin the day with a visit to the revered Vishnupad Temple, one of the principal pilgrimage sites of Gaya. The temple is traditionally associated with the sacred footprint of Lord Vishnu. Devotees undertaking Pitru Shradh / ancestral rituals can perform the prescribed ceremonies and offerings according to their religious requirements and arrangements with the local priest. These rites are traditionally performed for the peace and spiritual wellbeing of departed ancestors. Later, visit Dungeshwari Cave Temple, located near Gaya and associated with the period when Gautama Buddha is believed to have practised severe austerities before attaining enlightenment. Continue to the Japanese Temple and Monastery near the Mahabodhi Temple area, known for its peaceful surroundings and Japanese-style Buddhist architecture. Spend some time exploring the surrounding area and shopping for local souvenirs, subject to available time. Later, proceed by road back to Varanasi. On arrival, check in to your hotel and relax. Overnight stay in Varanasi.'] },
      { title: 'Day 4: Kashi Vishwanath Darshan – Sarnath', body: ['Meals: Breakfast', 'Overnight: Varanasi Begin the day with the most important darshan of your Kashi pilgrimage — Shri Kashi Vishwanath Temple, one of the twelve revered Jyotirlingas of Lord Shiva. Seek the blessings of Mahadev and experience the spiritual atmosphere surrounding the ancient temple precinct. Later, proceed to Sarnath, located approximately 10 km from Varanasi. Sarnath is a major Buddhist pilgrimage destination and is traditionally recognized as the place where Gautama Buddha delivered his first sermon after attaining enlightenment. Explore the important heritage sites of Sarnath, including: Dhamek Stupa Chaukhandi Stupa Ancient Buddhist archaeological remains Other important sites in the Sarnath area, subject to available time Return to Varanasi after sightseeing. Overnight stay in Varanasi.'] },
      { title: 'Day 5: Prayagraj Pilgrimage – Triveni Sangam – Ayodhya', body: ['Meals: Breakfast', 'Overnight: Ayodhya After breakfast, check out from your Varanasi hotel and proceed towards Prayagraj. Your pilgrimage continues at the sacred Triveni Sangam, traditionally regarded as the confluence of the Ganga, Yamuna and the mystical Saraswati. Subject to weather, river conditions and local regulations, enjoy a boat ride towards the Sangam and spend time in prayer and reflection. Continue to other important places of interest: Akshayavat Visit the ancient sacred banyan tree associated with Hindu religious traditions. Bade Hanuman Mandir Seek blessings at the famous temple where Hanuman Ji is worshipped in a distinctive reclining form. Khusro Bagh Explore this historic garden complex and its Mughal-era tombs, providing a cultural dimension to your Prayagraj visit. After completing the Prayagraj sightseeing, continue your journey towards Ayodhya. On arrival, check in to your hotel and relax. Overnight stay in Ayodhya.'] },
      { title: 'Day 6: Ayodhya Dham – Shri Ram Janmabhoomi & Sacred Temples', body: ['Meals: Breakfast', 'Overnight: Ayodhya Today is dedicated to exploring the sacred city of Ayodhya Dham, traditionally associated with Lord Rama. Begin with Hanuman Garhi, one of the most prominent temples in Ayodhya and an important place of worship for devotees. Continue to Shri Ram Janmabhoomi Temple for darshan and prayers. Later, visit Dasharath Mahal, associated with the royal heritage of Ayodhya and the traditions surrounding King Dasharath. Proceed to Kanak Bhawan, one of the city\'s beautifully revered temples dedicated to Shri Ram and Mata Sita. Spend the remainder of the day experiencing the spiritual atmosphere of Ayodhya and its ancient temple traditions. Overnight stay in Ayodhya.'] },
      { title: 'Day 7: Ayodhya – Departure', body: ['Meals: Breakfast After breakfast, check out from your hotel. Proceed to Ayodhya Airport for your onward journey. Your Kashi–Gaya–Prayag–Ayodhya Pitru Moksha Yatra concludes with prayers and blessings for you and your family. Yatra concludes. Why Choose This Pitru Moksha Yatra? This itinerary brings together some of North India\'s most significant Hindu pilgrimage destinations in one carefully coordinated journey. 🕉️ Kashi Seek the blessings of Kashi Vishwanath Mahadev and experience the sacred Ganga and Ganga Aarti. 🙏 Gaya Undertake traditional Pitru Shradh and ancestral offerings at one of India\'s most important destinations for Pitru-related rituals. 🌊 Prayagraj Visit the sacred Triveni Sangam, where the Ganga, Yamuna and traditionally believed invisible Saraswati meet. 🛕 Ayodhya Complete the journey in the sacred city of Shri Ram, with darshan at Ram Janmabhoomi, Hanuman Garhi, Kanak Bhawan and other important temples. Why Book This Package from Kerala with Sahapathika Holidays? A pilgrimage involving Varanasi, Gaya, Prayagraj and Ayodhya requires careful coordination of road travel, accommodation, temple visits and religious rituals. Sahapathika Holidays can organize these elements into one coordinated journey for travellers from Kerala. Kerala-Based Travel Support Get assistance from a travel company with an established presence in Kerala. Designed for Kerala Travellers We can assist travellers from Kochi, Ernakulam, Thrissur, Kottayam, Kozhikode, Kannur, Malappuram, Alappuzha, Kollam, Thiruvananthapuram and other parts of Kerala. Pilgrimage-Focused Planning The itinerary is designed around the spiritual purpose of the journey rather than treating these destinations as ordinary sightseeing stops. Assistance with Multi-City Travel Varanasi, Gaya, Prayagraj and Ayodhya are coordinated as one journey, reducing the need to arrange each destination independently. Suitable for Families & Groups The package can be planned for families, senior citizens, couples, friends and organized pilgrimage groups. Customizable Travel Additional nights, different hotel categories, transportation options and other requirements can be incorporated according to your needs. Assistance Throughout the Journey Our team can coordinate your travel arrangements from arrival through departure, helping make the pilgrimage more organized and comfortable. Who Is This Yatra Suitable For? This pilgrimage is particularly suitable for: Families wishing to perform Pitru-related rituals Devotees undertaking ancestral pilgrimage Hindu pilgrimage groups Senior citizens travelling with family Families visiting Kashi and Gaya together Devotees wishing to combine Kashi with Prayagraj and Ayodhya Travellers interested in Hindu spiritual and cultural heritage Best Time to Undertake the Yatra The pilgrimage can be undertaken throughout much of the year. The cooler months are generally more comfortable for temple visits, outdoor sightseeing and road journeys. Travellers planning specific Pitru rituals or ceremonies should also consider the religious calendar and consult their family priest/purohit regarding suitable dates and ritual requirements. Festival and important religious periods can attract significantly larger crowds, so advance planning is recommended.'] },
    ],
    'kashi-prayag-chitrakoot-ayodhya-divya-yatra': [
      { title: 'Day 1: Arrival in Varanasi – Kashi Temple Darshan & Ganga Aarti', body: ['Meals: None', 'Overnight: Varanasi Welcome to Varanasi – Kashi, the eternal city of Lord Shiva. On arrival at Varanasi Junction, meet our representative and proceed to your hotel. Complete check-in and take some time to freshen up. Begin your spiritual experience with a visit to Kaal Bhairav Temple, one of the most revered temples of Kashi and dedicated to Lord Shiva in his powerful form as Kaal Bhairav. Continue to Sankat Mochan Hanuman Temple, an important place of worship for devotees of Lord Hanuman, followed by a visit to the sacred Durga Temple. As evening approaches, proceed to the banks of the River Ganga to witness the spectacular Ganga Aarti at Dashashwamedh Ghat. The sight of priests performing the elaborate Aarti amidst the sound of bells, chants and devotional music creates one of the most memorable spiritual experiences of a Varanasi pilgrimage. Return to your hotel after the Aarti. Overnight stay in Varanasi.'] },
      { title: 'Day 2: Kashi Vishwanath Darshan – Sarnath – Prayagraj', body: ['Meals: Breakfast', 'Overnight: Prayagraj Begin the day with the much-awaited darshan of Shri Kashi Vishwanath Ji, one of the twelve sacred Jyotirlingas of Lord Shiva. Visit Maa Annapurna Temple and spend some time experiencing the spiritual atmosphere of the Kashi temple area. After the temple visit, proceed towards Sarnath, located approximately 10 km from Varanasi. Sarnath is one of the most important Buddhist heritage sites in India and is traditionally associated with the place where Gautama Buddha delivered his first sermon after attaining enlightenment. Explore important attractions including: Dhamek Stupa Chaukhandi Stupa The ancient Buddhist archaeological remains Other important heritage sites of Sarnath, subject to time Later, drive to Prayagraj, one of India\'s most sacred pilgrimage cities. On arrival, check in to your hotel and relax. Overnight stay in Prayagraj.'] },
      { title: 'Day 3: Prayagraj Pilgrimage – Triveni Sangam – Chitrakoot', body: ['Meals: Breakfast', 'Overnight: Chitrakoot Begin your day with a visit to the sacred Triveni Sangam, the revered confluence of the Ganga, Yamuna and the mystical Saraswati. Enjoy a boat ride towards the Sangam, subject to weather, river conditions and local regulations. For Hindu devotees, taking part in rituals and prayers at the Sangam can be a deeply spiritual experience. Continue your pilgrimage with visits to: Akshayavat Visit the ancient sacred banyan tree, traditionally regarded as an important spiritual landmark associated with Hindu mythology. Bade Hanuman Mandir Seek blessings at the famous temple where Hanuman Ji is worshipped in a distinctive reclining form. Alopi Shankari Shakti Peeth Visit this revered Shakti pilgrimage site associated with Goddess Shakti. Bharadwaj Ashram Explore the sacred site associated with Sage Bharadwaj and Hindu religious traditions. Later, proceed towards Chitrakoot, a destination deeply connected with the Ramayana and the life of Shri Ram. Check in to your hotel on arrival. In the evening, visit Ram Ghat and experience the peaceful atmosphere of the riverside Aarti, with illuminated lamps and devotional chanting. Overnight stay in Chitrakoot.'] },
      { title: 'Day 4: Chitrakoot Darshan – Sacred Ramayana Sites – Ayodhya', body: ['Meals: Breakfast', 'Overnight: Ayodhya Start your day with a visit to the sacred Ram Ghat, traditionally associated with Lord Rama, followed by Kamadgiri Parikrama, one of the most important spiritual experiences in Chitrakoot. Continue exploring the sacred places associated with the Ramayana: Hanuman Dhara Visit this revered hilltop shrine where a natural stream flows over the idol of Lord Hanuman. Sati Anusuya Temple Pay respects at the sacred temple associated with Mata Anusuya, wife of Sage Atri. Janaki Kund Visit this beautiful riverside location traditionally associated with Maa Sita. Gupta Godavari Explore the fascinating caves traditionally connected with Lord Rama and the period of his exile. Sphatik Shila Visit this sacred spot associated with Shri Ram and Maa Sita. Bharat Milap Mandir Pay homage at the place associated with the emotional reunion of Lord Rama and his brother Bharata. After completing the Chitrakoot pilgrimage, proceed towards Ayodhya. On arrival, check in to your hotel. Overnight stay in Ayodhya.'] },
      { title: 'Day 5: Ayodhya Darshan – Saryu Aarti – Departure', body: ['Meals: Breakfast Your final day begins with the spiritual heritage of Ayodhya Dham, the sacred city associated with Lord Rama. Visit the magnificent Shri Ram Janmabhoomi Temple and seek the blessings of Shri Ram. Continue to Hanuman Garhi, one of Ayodhya\'s most important temples and a major pilgrimage stop for devotees. Proceed to Dasharath Mahal, associated with King Dasharath and the royal heritage of Ayodhya. Visit the beautiful Kanak Bhawan, dedicated to Lord Rama and Mata Sita. Later, proceed towards the sacred banks of the Saryu River. Experience the serene atmosphere of Saryu Ghat and, subject to timing, witness the Saryu Aarti, when lamps illuminate the river amidst devotional prayers. Conclude the pilgrimage with a visit to Nageshwarnath Temple, another important temple in Ayodhya. Later, proceed to Ayodhya Junction Railway Station or Airport for your onward journey. Your sacred Kashi–Prayag–Chitrakoot–Ayodhya Yatra concludes with the blessings of Mahadev and Shri Ram. Package Inclusions 4 Nights accommodation in selected hotels on twin/double sharing basis Daily breakfast at the hotel AC vehicle for transfers and sightseeing as per the itinerary Pickup from Varanasi Junction and drop at Ayodhya Junction / Airport Sightseeing in Varanasi, Prayagraj, Chitrakoot and Ayodhya as per itinerary Ganga Aarti at Dashashwamedh Ghat Triveni Sangam visit in Prayagraj Local sightseeing and temple visits as mentioned in the itinerary Assistance from Sahapathika Holidays during the tour Applicable hotel taxes and service charges'] },
    ],
    'kashi-prayag-chitrakoot-ayodhya-yatra': [
      { title: 'Day 1: Arrive in Varanasi – Experience the Divine Ganga Aarti', body: ['Meals: None', 'Overnight: Varanasi Welcome to Varanasi – Kashi, the Eternal City of Lord Shiva. On arrival at Varanasi Airport or Railway Station, meet our representative and proceed to your hotel for check-in and relaxation. Later in the evening, proceed towards the sacred banks of the River Ganga. Enjoy a memorable Ganga boat ride, followed by the spectacular Ganga Aarti at Dashashwamedh Ghat. As hundreds of lamps illuminate the Ganga and devotional chants fill the air, experience one of the most powerful spiritual ceremonies in India. Dashashwamedh Ghat, located close to the revered Kashi Vishwanath Temple, is regarded as one of the most important and visually spectacular ghats of Varanasi. Return to the hotel after the spiritual experience. Overnight stay in Varanasi.'] },
      { title: 'Day 2: Kashi Temple Darshan – Sarnath – Varanasi Local Experience', body: ['Meals: Breakfast', 'Overnight: Varanasi Begin your day with an early morning visit to the sacred temples of Kashi. Seek blessings at: Shri Kashi Vishwanath Temple Maa Annapurna Temple Kaal Bhairav Temple Sankat Mochan Hanuman Temple Durga Temple Tulsi Manas Temple Subject to availability and applicable arrangements, devotees may also have the opportunity to participate in Rudrabhishek Puja at Kashi Vishwanath. Later, visit Banaras Hindu University (BHU) and proceed towards Sarnath, one of the most important Buddhist pilgrimage sites in India. It is traditionally regarded as the place where Gautama Buddha delivered his first sermon after attaining enlightenment. Explore the important attractions of Sarnath, including: Sarnath Museum Ashokan heritage and archaeological remains Ancient Buddhist ruins Mahabodhi Society Temple Return to Varanasi in the evening. The rest of the evening is free to experience the vibrant lanes of the city, shop for traditional Banarasi products and savour the famous flavours of Banaras street food. Overnight stay in Varanasi.'] },
      { title: 'Day 3: Varanasi to Prayagraj – Sacred Triveni Sangam', body: ['Meals: Breakfast', 'Overnight: Prayagraj After breakfast, check out from your Varanasi hotel and proceed to Prayagraj, one of India\'s most sacred pilgrimage cities. Prayagraj, historically known as Prayag, holds a special place in Hindu tradition because of the revered Triveni Sangam, where the Ganga and Yamuna meet, along with the invisible Saraswati. On arrival, proceed for a visit to the Triveni Sangam. Experience the spiritual atmosphere of the confluence and, subject to local conditions, enjoy a boat ride towards the Sangam. Continue your pilgrimage with visits to important sacred sites including: Bade Hanuman Mandir – famous for its unique reclining form of Hanuman Ji Alopi Shankari Shakti Peeth Bharadwaj Ashram Akshayavat The sacred Akshayavat is an ancient banyan tree associated with Hindu religious traditions and mythology. After completing the day\'s pilgrimage, proceed to your hotel. Overnight stay in Prayagraj.'] },
      { title: 'Day 4: Chitrakoot Darshan – The Sacred Land of Shri Rama', body: ['Meals: Breakfast', 'Overnight: Prayagraj After breakfast, embark on a full-day excursion from Prayagraj to Chitrakoot, one of the most spiritually significant destinations associated with the Ramayana. Nestled amidst the Vindhyan landscape, Chitrakoot is revered as a place where Lord Rama, Maa Sita and Lakshmana spent a significant period during their exile. The sacred surroundings of Chitrakoot are closely associated with several episodes and personalities from Hindu tradition, including Sage Atri and Mata Anasuya. Spend the day exploring the spiritual heritage of Chitrakoot and experiencing the peaceful atmosphere of this ancient pilgrimage destination. Chitrakoot is also deeply connected with Goswami Tulsidas, the revered poet traditionally associated with the composition of the Ramcharitmanas. After completing the excursion, return to Prayagraj. Overnight stay in Prayagraj.'] },
      { title: 'Day 5: Prayagraj to Ayodhya – Enter the Sacred Land of Shri Ram', body: ['Meals: Breakfast', 'Overnight: Ayodhya After breakfast, check out from your Prayagraj hotel and proceed towards Ayodhya – the sacred city of Lord Rama. On arrival, check in to your hotel and freshen up. Begin your Ayodhya pilgrimage with a visit to the revered Shri Ram Janmabhoomi Temple, associated with the birthplace of Lord Rama. Continue to Hanuman Garhi, one of the most prominent temples in Ayodhya and an important place of worship for devotees visiting the city. Later, visit: Dasharath Mahal Kanak Bhawan Other important spiritual landmarks around Ayodhya, subject to time and local conditions In the evening, visit the beautifully developed Saryu Ghat and spend some peaceful moments beside the sacred Saryu River. Witness the devotional atmosphere of Ayodhya as the city comes alive with temple bells, prayers and spiritual traditions. Overnight stay in Ayodhya.'] },
      { title: 'Day 6: Ayodhya – Yatra Concludes', body: ['Meals: Breakfast After breakfast, check out from the hotel. Your spiritually enriching Kashi–Prayag–Chitrakoot–Ayodhya Yatra comes to an end. Proceed for your onward journey from Ayodhya or the designated departure point as per your travel arrangements. Yatra concludes with the blessings of Mahadev and Shri Ram. Why Choose This Kashi–Ayodhya Yatra? This is more than a conventional North India sightseeing tour. It brings together four profoundly sacred destinations in one carefully planned pilgrimage: Kashi – the eternal city of Lord Shiva', 'Prayagraj – the sacred Triveni Sangam', 'Chitrakoot – the land associated with Shri Ram\'s exile', 'Ayodhya – the sacred city of Lord Rama The itinerary gives pilgrims the opportunity to experience important temples, sacred rivers, spiritual ceremonies and Ramayana-linked destinations without having to independently coordinate hotels, transfers and local sightseeing. Certainly. For the first 6 Days / 5 Nights Kashi–Prayag–Chitrakoot–Ayodhya Yatra, I would replace the earlier long inclusions/exclusions with this concise version: Package Inclusions 5 Nights accommodation in selected hotels on twin/double sharing basis Daily breakfast at the hotel AC vehicle for transfers and sightseeing as per the itinerary Pickup from Varanasi Airport / Railway Station and drop at Ayodhya Airport / Railway Station Sightseeing in Varanasi, Prayagraj, Chitrakoot and Ayodhya as per itinerary Ganga boat ride and Ganga Aarti at Dashashwamedh Ghat, as mentioned in the itinerary Triveni Sangam visit in Prayagraj Temple visits and sightseeing at all destinations as mentioned in the itinerary Assistance from Sahapathika Holidays during the tour Applicable hotel taxes and service charges'] },
    ],
    'kashmir-5-days-srinagar-sonmarg-gulmarg-pahalgam-j': [
      { title: 'Day 1: Jammu to Srinagar – Scenic Journey to the Kashmir Valley', body: ['Meals: Breakfast & Dinner', 'Overnight: Srinagar Your Kashmir journey begins with pickup from Jammu Railway Station or the designated Jammu arrival point. Proceed towards Srinagar by road. The journey takes approximately 5 hours, subject to traffic, road and weather conditions. On arrival in Srinagar, begin local sightseeing depending on the available time. Later, check in to your hotel and settle in for a relaxing evening. Enjoy dinner and prepare for the beautiful Kashmir experiences ahead. Overnight stay in Srinagar.'] },
      { title: 'Day 2: Srinagar to Sonmarg – Into the Valley of Glaciers', body: ['Meals: Breakfast & Dinner', 'Overnight: Srinagar After breakfast, leave Srinagar for Sonmarg, one of Kashmir\'s spectacular mountain destinations. Surrounded by imposing Himalayan peaks, Sonmarg offers dramatic scenery with mountain landscapes, open meadows and the Sindh River flowing through the valley. During the summer season, visitors may also choose to hire ponies for an excursion towards the Thajiwas Glacier area, subject to local conditions and at an additional cost. Spend time enjoying the natural surroundings before returning to Srinagar. Overnight stay in Srinagar.'] },
      { title: 'Day 3: Srinagar to Gulmarg – Meadows, Mountains & Gondola Experience', body: ['Meals: Breakfast & Dinner', 'Overnight: Houseboat After breakfast, check out and proceed towards Gulmarg, popularly known for its expansive meadows and spectacular mountain surroundings. Gulmarg is a major year-round destination, particularly popular for its winter snow experiences and adventure activities. During your visit, enjoy the beautiful scenery around the resort area. For an elevated mountain experience, you may opt for the famous Gulmarg Gondola cable car ride, subject to availability. Gondola tickets are not included and should be arranged in advance where applicable. After exploring Gulmarg, proceed back towards Srinagar and check in to your Kashmir houseboat. Overnight stay on a houseboat in Srinagar.'] },
      { title: 'Day 4: Srinagar to Pahalgam – The Valley of Shepherds', body: ['Meals: Breakfast & Dinner', 'Overnight: Pahalgam After breakfast, check out and travel towards Pahalgam, one of Kashmir\'s most scenic valley destinations. Known for its beautiful mountain surroundings and pastoral landscapes, Pahalgam provides a refreshing contrast to the busier sightseeing areas. Explore the celebrated ABC Valley circuit, covering: Aru Valley Betaab Valley Chandanwari These locations offer opportunities to experience Kashmir\'s mountain scenery, lush landscapes and peaceful valley environment. Return to Pahalgam after sightseeing. Overnight stay in Pahalgam.'] },
      { title: 'Day 5: Pahalgam – Final Sightseeing & Departure', body: ['Meals: Breakfast', 'Overnight: Not applicable After breakfast, check out from your hotel and spend some time exploring the remaining sightseeing areas of Pahalgam, depending on your departure schedule. Later, begin your onward journey towards Srinagar or Jammu, according to your confirmed departure arrangements. Your Kashmir holiday concludes with beautiful memories of the valley, its mountains, meadows and traditional houseboat experience. End of the tour. Why Choose This Kashmir Package? This compact Kashmir itinerary is designed to cover four of the valley\'s most popular destinations without making the journey excessively long. Highlights include: Scenic Jammu–Srinagar road journey Srinagar local sightseeing Mountain landscapes of Sonmarg Optional Thajiwas Glacier pony excursion Picturesque Gulmarg Optional Gondola cable car experience Traditional Kashmir houseboat stay Scenic Pahalgam Aru Valley, Betaab Valley and Chandanwari A balanced combination of mountains, valleys, snow experiences and leisure It is an excellent choice for travellers who want to experience the essence of Kashmir within a 5-day holiday package. Why Book With Sahapathika Holidays? Planning a Kashmir holiday involves coordinating transportation across several mountain destinations, accommodation, sightseeing and optional activities. Sahapathika Holidays can bring these elements together into one organised travel plan. Travelling with Sahapathika Holidays means you can benefit from: Kerala-based travel support Understanding of the requirements of travellers from Kerala Professionally planned Kashmir itineraries Hotel and transportation coordination Multi-destination travel planning Options for families, couples, senior travellers and groups Customisable travel plans Assistance with flight/train and arrival arrangements when applicable Support during the journey according to the services booked Whether your journey begins from Kochi, Ernakulam, Thrissur, Kottayam, Kozhikode, Kannur or another part of Kerala, we can help coordinate the Kashmir holiday around your preferred dates and travel requirements. Who Is This Kashmir Package Suitable For? This Kashmir tour package from Kerala is suitable for: Families Couples Honeymooners Friends and small groups Senior travellers Nature lovers Snow and mountain enthusiasts First-time Kashmir visitors Best Time to Visit Kashmir Kashmir offers a different experience in every season. March to June is attractive for travellers who want pleasant weather, green valleys and comfortable sightseeing. July to September offers lush landscapes, although mountain travel can be influenced by weather conditions. October to February is particularly appealing to travellers looking for winter scenery and snow experiences, especially around destinations such as Gulmarg. Winter travel can also involve colder conditions and weather-related changes to road accessibility. For travellers specifically interested in snow, the exact experience depends on the prevailing weather and seasonal conditions.'] },
    ],
    'kashmir-6-days-srinagar-sonmarg-gulmarg-pahalgam': [
      { title: 'Day 1: Jammu Arrival – Scenic Drive to Srinagar', body: ['Meals: Dinner', 'Overnight: Srinagar Arrive at Jammu Railway Station where you will be met and assisted for your transfer to Srinagar. Begin the scenic road journey towards the Kashmir Valley. As you leave Jammu behind, the landscape gradually changes as you approach the mountains and the beautiful surroundings of Srinagar. On arrival, check in to your hotel and relax after the journey. Enjoy dinner and settle in for your first night in Kashmir. Overnight stay in Srinagar.'] },
      { title: 'Day 2: Srinagar Sightseeing – Temples, Mughal Gardens & Dal Lake', body: ['Meals: Breakfast & Dinner', 'Overnight: Srinagar After breakfast, begin your exploration of Srinagar. Visit the Shankaracharya Temple, located on a hill overlooking the city, followed by Srinagar\'s renowned Mughal-era gardens. The sightseeing programme includes: Chashme Shahi Nishat Garden Shalimar Garden Pari Mahal Local handicraft shopping The gardens provide an opportunity to experience Kashmir\'s distinctive combination of landscaped greenery, mountain views and water features. Later, explore local Kashmiri handicrafts and browse products such as shawls, jackets, carpets, papier-mâché articles and other traditional items. In the evening, enjoy a 60-minute Shikara ride on Dal Lake, included in the package. The experience offers a peaceful way to appreciate the lake and its surrounding mountain scenery. Return to the hotel for dinner. Overnight stay in Srinagar.'] },
      { title: 'Day 3: Sonmarg Excursion – A Day Amidst the Mountains', body: ['Meals: Breakfast & Dinner', 'Overnight: Srinagar After breakfast, set out for a full-day excursion to Sonmarg, one of Kashmir\'s most scenic mountain destinations. Surrounded by impressive Himalayan landscapes, Sonmarg is known for its meadows, mountain scenery and the Sindh River flowing through the valley. Spend time enjoying the natural surroundings and capturing photographs of the spectacular landscape. Travellers may also choose an optional pony ride towards the glacier/snow areas, subject to local conditions and availability. This activity is payable separately. After completing the excursion, return to Srinagar. Overnight stay in Srinagar.'] },
      { title: 'Day 4: Gulmarg – Meadows, Snow & Mountain Views', body: ['Meals: Breakfast & Dinner', 'Overnight: Srinagar After breakfast, drive from Srinagar to Gulmarg, one of Kashmir\'s most popular mountain destinations. The journey itself offers beautiful views as the landscape gradually transforms into the open meadows and mountain scenery for which Gulmarg is famous. Gulmarg is particularly popular for snow experiences during winter, while its green meadows and pleasant mountain surroundings attract visitors during the warmer months. Enjoy time exploring the destination and, if desired, take the famous Gulmarg Gondola cable car ride at an additional cost and subject to ticket availability. Optional activities such as horse riding and other adventure experiences can also be arranged separately where available. Later, return to Srinagar. Overnight stay in Srinagar.'] },
      { title: 'Day 5: Srinagar – Pahalgam Valley Experience', body: ['Meals: Breakfast & Dinner', 'Overnight: Pahalgam After an early breakfast, check out and proceed towards Pahalgam, popularly associated with the picturesque landscapes of the Kashmir Valley. En route, visit the Awantipura ruins, an important archaeological site associated with the region\'s historic temple heritage. Continue towards Pahalgam and enjoy the beautiful scenery surrounding the valley. The sightseeing programme includes the celebrated Aru Valley, Betaab Valley and Chandanwari. These locations offer contrasting views of rivers, forests, meadows and mountain landscapes. Local sightseeing to these areas may require a local union vehicle, for which applicable charges are payable separately. You may also spend some leisure time enjoying Pahalgam\'s peaceful surroundings. Overnight stay in Pahalgam.'] },
      { title: 'Day 6: Pahalgam – Jammu Departure', body: ['Meals: Breakfast', 'Overnight: Not applicable After breakfast, check out from the hotel. Depending on your confirmed departure arrangements, proceed towards Jammu Airport or Jammu Railway Station for your onward journey. Take home memories of Kashmir\'s magnificent mountains, beautiful gardens, tranquil Dal Lake and scenic valleys. End of the Kashmir tour. Why Choose This Kashmir Tour Package? This six-day itinerary gives you the opportunity to experience several of Kashmir\'s most sought-after destinations in a single journey. Major highlights include: Srinagar city sightseeing Shankaracharya Temple Chashme Shahi, Nishat and Shalimar Gardens Pari Mahal Traditional Kashmiri handicraft shopping 60-minute Shikara ride on Dal Lake Sonmarg mountain excursion Gulmarg\'s famous meadows Optional Gondola experience Historic Awantipura ruins Pahalgam Aru Valley Betaab Valley Chandanwari The itinerary is suitable for travellers looking for a combination of nature, sightseeing, culture, leisure and mountain experiences. Why Book With Sahapathika Holidays? A Kashmir holiday involves more than simply booking a hotel. Multiple destinations, mountain transfers, local sightseeing arrangements and optional activities need to work together smoothly. With Sahapathika Holidays, travellers from Kerala can plan the journey through a travel team familiar with the requirements of Kerala customers. Our package planning can include: Kerala-based travel support Assistance for travellers from different parts of Kerala Professionally structured Kashmir itineraries Hotel and transportation coordination Multi-destination travel planning Family, couple, honeymoon and group options Senior-traveller-friendly planning Customisation according to travel dates and requirements Assistance with flight/train arrangements when requested Support during the journey according to the services booked Whether you are travelling from Kochi, Ernakulam, Thrissur, Kottayam, Kozhikode, Kannur, Malappuram, Alappuzha, Kollam or Thiruvananthapuram, your Kashmir holiday can be planned around your preferred travel arrangements. Who Is This Kashmir Package Suitable For? This Kashmir holiday package from Kerala is suitable for: Families Couples Honeymooners Senior citizens Friends and small groups Nature lovers Snow enthusiasts Photography enthusiasts First-time Kashmir travellers Best Time to Visit Kashmir Kashmir is a year-round destination, but each season offers a different experience. March to June A good period for comfortable sightseeing, green landscapes, gardens and valley experiences. July to September The valley remains scenic and lush, although mountain travel can be affected by weather conditions. October to February Ideal for travellers interested in winter landscapes and snow experiences, particularly around destinations such as Gulmarg. Temperatures can be very cold, and weather conditions may influence road travel. If snow is your primary reason for visiting Kashmir, the actual snow conditions depend on the weather during your travel dates.'] },
    ],
    'kashmir-honeymoon': [
      { title: 'Day 1: Arrive in Srinagar – Your Kashmir Love Story Begins', body: ['Meals: Dinner', 'Overnight: Srinagar Arrive at Srinagar Airport, where you will be received and transferred to your hotel. Your Kashmir honeymoon begins with a relaxed introduction to the beautiful surroundings of Srinagar. After checking in, take some time to unwind after your journey and enjoy the atmosphere of the Kashmir Valley. The evening is free for you to relax together and settle into your holiday. Overnight stay in Srinagar.'] },
      { title: 'Day 2: Srinagar – Mughal Gardens, Temple & Dal Lake', body: ['Meals: Breakfast & Dinner', 'Overnight: Srinagar After breakfast, begin your Srinagar sightseeing. Visit the Shankaracharya Temple, situated on a hill overlooking Srinagar, followed by some of the city\'s renowned Mughal gardens. Explore: Chashme Shahi Nishat Garden Shalimar Garden Pari Mahal These beautifully landscaped gardens offer couples opportunities to enjoy peaceful surroundings and scenic views. Later, explore a local handicraft outlet where you can browse traditional Kashmiri products such as shawls, carpets, jackets and papier-mâché articles. In the evening, enjoy a 60-minute Shikara ride on Dal Lake, included in your package. Glide across the peaceful waters while taking in the surrounding mountains and the distinctive atmosphere of Srinagar. Return to your hotel for dinner. Overnight stay in Srinagar.'] },
      { title: 'Day 3: Sonmarg Excursion – A Romantic Day in the Mountains', body: ['Meals: Breakfast & Dinner', 'Overnight: Srinagar After breakfast, set out on a full-day excursion to Sonmarg, one of Kashmir\'s spectacular mountain destinations. Known for its alpine scenery, open landscapes and mountain surroundings, Sonmarg provides a beautiful setting for couples to spend time together and capture memorable photographs. The Sindh River adds to the natural charm of the valley, while the surrounding mountain scenery changes dramatically with the seasons. Couples who wish to experience the snow and glacier areas can opt for a pony ride towards the glacier, subject to local conditions and availability. This is an optional activity and is payable separately. Later, return to Srinagar. Overnight stay in Srinagar.'] },
      { title: 'Day 4: Srinagar to Gulmarg – The Meadow of Flowers', body: ['Meals: Breakfast & Dinner', 'Overnight: Gulmarg After breakfast, check out and drive towards Gulmarg. The journey through the Kashmir countryside is itself an enjoyable part of the day, with changing landscapes leading towards Gulmarg\'s expansive meadows and mountain scenery. Gulmarg is particularly popular during winter for snow activities, while its green landscapes and pleasant surroundings make it attractive during other seasons as well. Spend time exploring the destination at your own pace and enjoy the beautiful mountain environment together. Optional activities such as the Gulmarg Gondola cable car ride, horse riding and other experiences can be arranged separately, subject to availability and applicable charges. Overnight stay in Gulmarg.'] },
      { title: 'Day 5: Gulmarg to Pahalgam – Through Kashmir\'s Scenic Landscapes', body: ['Meals: Breakfast & Dinner', 'Overnight: Pahalgam After an early breakfast, check out and proceed towards Pahalgam, one of the most picturesque destinations in the Kashmir Valley. En route, visit the Awantipura ruins, an important historical site associated with the ancient temple heritage of the region. Continue towards Pahalgam and check in to your hotel. Spend the rest of the day enjoying the peaceful surroundings. Couples can take a leisurely walk, explore the local area or simply relax amidst the valley scenery. The beautiful landscapes and quieter atmosphere make Pahalgam a particularly appealing part of a Kashmir honeymoon. Overnight stay in Pahalgam.'] },
      { title: 'Day 6: Pahalgam – Aru Valley, Betaab Valley & Chandanwari', body: ['Meals: Breakfast & Dinner', 'Overnight: Pahalgam After breakfast, set out to explore some of the most scenic areas around Pahalgam. Visit: Aru Valley A beautiful mountain village surrounded by forests, meadows and dramatic Himalayan scenery. Betaab Valley Known for its attractive natural surroundings and mountain backdrop, making it a popular stop for sightseeing and photography. Chandanwari A scenic destination surrounded by mountains and associated with the route towards the Amarnath region. The sightseeing to these locations may require a local vehicle, and applicable charges are payable separately. Return to Pahalgam after the excursion. Overnight stay in Pahalgam.'] },
      { title: 'Day 7: Pahalgam to Srinagar – Departure with Beautiful Memories', body: ['Meals: Breakfast', 'Overnight: Not applicable After breakfast, check out from your hotel. Proceed towards Srinagar Airport for your onward flight, according to your confirmed departure schedule. As your honeymoon journey comes to an end, take with you memories of Kashmir\'s mountains, gardens, valleys, Dal Lake and the special moments shared together. End of the Kashmir honeymoon tour. Why Choose This Kashmir Honeymoon Package? This itinerary has been designed for couples who want to experience the major highlights of Kashmir while also having time to enjoy the journey together. Romantic highlights include: Beautiful Srinagar and Dal Lake 60-minute Shikara ride Mughal gardens and panoramic city views Scenic Sonmarg excursion Snow and mountain experiences at Gulmarg Optional Gondola ride Romantic landscapes of Pahalgam Aru Valley, Betaab Valley and Chandanwari Comfortable multi-night stays A combination of sightseeing and leisure The itinerary offers couples a chance to experience Kashmir\'s changing landscapes, from lakes and gardens to meadows, snow-covered mountains and peaceful valleys. Why Book Your Kashmir Honeymoon With Sahapathika Holidays? Your honeymoon should be about enjoying the destination together rather than spending your time coordinating hotels, vehicles and sightseeing arrangements. Sahapathika Holidays provides Kerala-based travel support and can help couples organise the different components of their Kashmir journey. With Sahapathika Holidays, couples can benefit from: Travel support from Kerala Understanding of the travel preferences of Kerala couples Professionally planned honeymoon itineraries Hotel and transportation coordination Multi-destination Kashmir planning Customisation according to your preferred travel style Assistance with flight/train arrangements when applicable Options for different hotel categories Support during the journey according to the services booked Whether you are departing from Kochi, Ernakulam, Thrissur, Kottayam, Kozhikode, Kannur or another part of Kerala, your honeymoon can be planned around your preferred dates and travel requirements. Who Is This Kashmir Honeymoon Package Suitable For? This package is ideal for: Newly married couples Honeymooners Couples celebrating an anniversary Couples looking for a romantic mountain holiday Couples interested in snow experiences Couples who enjoy nature and photography Couples seeking a combination of sightseeing and leisure Best Time for a Kashmir Honeymoon Kashmir is beautiful throughout the year, but the ideal season depends on the experience you want as a couple. March to June A pleasant period for exploring Srinagar\'s gardens, enjoying valley scenery and travelling through the mountain destinations. July to September The landscape is generally lush and green, offering attractive valley views, although mountain weather can influence travel plans. October to February Ideal for couples looking for a winter and snow experience, particularly around Gulmarg. Winter conditions can be cold, and mountain roads may be affected by weather. If seeing snow is a major priority for your honeymoon, the actual snow conditions will depend on the weather during your travel dates.'] },
    ],
    'kashmir-with-vaishno-devi': [
      { title: 'Day 1: Jammu Arrival & Transfer to Katra', body: ['Meals: Dinner', 'Overnight: Katra Arrive at Jammu, where our representative will receive you and assist with the transfer to Katra. Settle into your hotel and take some time to relax before beginning your Vaishno Devi pilgrimage the following day. The evening can be used to prepare for the pilgrimage and keep essential items ready for the journey.'] },
      { title: 'Day 2: Mata Vaishno Devi Darshan', body: ['Meals: Breakfast & Dinner', 'Overnight: Katra After breakfast, proceed towards Banganga, the starting point for the pilgrimage to the Mata Vaishno Devi Shrine. The traditional pilgrimage route involves approximately 13 km one way, making it around 26 km for the return journey. Guests can undertake the trek according to their ability and pace. For those who require assistance, pony, pithoo and palki services are available at additional cost. A valid Yatra Slip needs to be obtained from Katra before commencing the pilgrimage. After completing the darshan and returning to Katra, rest at the hotel.'] },
      { title: 'Day 3: Katra to Srinagar – Enter the Valley of Kashmir', body: ['Meals: Breakfast & Dinner', 'Overnight: Srinagar After breakfast, check out and begin the road journey from Katra towards Srinagar. As the landscape changes from the Jammu region to the Kashmir Valley, the journey gradually introduces you to the dramatic mountain scenery for which Kashmir is renowned. On arrival in Srinagar, check in to the hotel and relax.'] },
      { title: 'Day 4: Srinagar Sightseeing – Mughal Gardens, Temples & Dal Lake', body: ['Meals: Breakfast & Dinner', 'Overnight: Srinagar Begin your Srinagar sightseeing after breakfast. Visit Shankaracharya Temple, located on a hill overlooking Srinagar, followed by the celebrated gardens of Kashmir including Chashme Shahi, Nishat Garden, Shalimar Garden, Tulip Garden and Pari Mahal, as applicable to the travel season. The gardens offer a beautiful combination of landscaped terraces, mountain views and Kashmir\'s distinctive heritage. You can also explore local handicraft outlets featuring traditional products such as shawls, jackets, bed covers, papier-mâché articles and carpets. Later, spend leisure time around Dal Lake and the nearby local markets, experiencing the atmosphere of Srinagar at your own pace.'] },
      { title: 'Day 5: Gulmarg Excursion – Meadows, Mountains & Optional Gondola', body: ['Meals: Breakfast & Dinner', 'Overnight: Srinagar After breakfast, set out for Gulmarg, one of Kashmir\'s most celebrated mountain destinations. The drive from Srinagar offers beautiful views as you approach the green meadows and surrounding Himalayan landscape. Gulmarg is also well known for its winter snow activities, including skiing and snowboarding during the appropriate season. Enjoy time exploring the destination, taking photographs and experiencing its mountain setting. Horse riding and the Gulmarg Gondola cable car are optional activities at additional cost. Guests interested in the Gondola may experience the cable car towards the higher mountain areas, subject to operating conditions and ticket availability. After sightseeing, return to Srinagar for the night.'] },
      { title: 'Day 6: Srinagar to Pahalgam – Valley Landscapes & Scenic Excursions', body: ['Meals: Breakfast & Dinner', 'Overnight: Pahalgam After breakfast, depart for Pahalgam, travelling through the scenic Kashmir countryside. En route, visit the Awantipura ruins, an important historic site associated with the ancient temple complex built during the reign of King Awantivarman. Continue towards Pahalgam, known for its beautiful mountain surroundings and the Lidder River landscape. After arrival, enjoy the natural setting of Pahalgam. Guests may explore Baisaran depending on local conditions and personal preference. The itinerary also covers Aru Valley, Betaab Valley and Chandanwari, with local sightseeing transportation payable separately as applicable. Aru is surrounded by mountains and scenic landscapes, while the route towards Chandanwari offers another perspective of the valley. Enjoy the peaceful atmosphere before returning to your accommodation.'] },
      { title: 'Day 7: Pahalgam to Jammu – Departure', body: ['Meals: Breakfast', 'Overnight: Not applicable After breakfast, check out from the hotel and proceed towards Jammu Railway Station for your onward journey. Take home memories of a trip that combines the spiritual experience of Vaishno Devi with the scenic beauty of Kashmir. Why Choose This Package? Combines Vaishno Devi pilgrimage and Kashmir sightseeing in one holiday. Covers Katra, Srinagar, Gulmarg and Pahalgam. Includes time for both spiritual experiences and leisure travel. Experience Srinagar\'s famous gardens and Dal Lake. Includes a 60-minute Shikara ride as specified in the package. Offers optional experiences such as pony rides and Gondola rides for guests who wish to add them. Suitable for families, couples and groups looking for a combination of pilgrimage and Himalayan sightseeing. Why Book With Sahapathika Holidays? Planning a Kashmir trip along with Vaishno Devi involves coordinating accommodation, intercity transfers, sightseeing and pilgrimage requirements. Sahapathika Holidays can bring these elements together into one planned itinerary. As a travel company serving travellers from Kerala, we understand the practical requirements of customers travelling from different parts of the state. We can assist with: Professionally structured Kashmir and pilgrimage itineraries Hotel and transportation arrangements Multi-destination coordination between Jammu, Katra and Kashmir Family, couple, senior citizen and group travel requirements Customized travel plans according to dates and preferences Assistance with flight/train coordination when required Support during the journey as per the services booked Whether you are travelling from Kochi, Ernakulam, Thrissur, Kottayam, Kozhikode, Kannur, Malappuram, Alappuzha, Kollam or Thiruvananthapuram, you can enquire with Sahapathika Holidays for a suitable travel plan. Who Is This Package Suitable For? Families seeking a Kashmir holiday with Vaishno Devi Couples and honeymooners interested in combining pilgrimage and sightseeing Senior citizens and families planning a spiritual journey with Kashmir sightseeing Friends and small groups Pilgrimage groups Travellers looking for a Kashmir trip from Kerala with a Vaishno Devi visit Best Time to Visit March to June: A pleasant period for Kashmir sightseeing, gardens and valley experiences. July to September: Suitable for travellers interested in the greener side of Kashmir, subject to weather and road conditions. Winter months: Ideal for travellers hoping to experience snow at destinations such as Gulmarg, although snowfall, road conditions and attraction operations can vary. For the Vaishno Devi pilgrimage, weather and crowd levels can vary considerably during festival and holiday periods. Travel dates should therefore be selected according to your preferred experience and physical comfort.'] },
    ],
    'mathura-vrindavan-braj-agra-yatra': [
      { title: 'Day 1: Mathura & Gokul – Enter the Sacred Land of Krishna', body: ['Meals: As per package plan', 'Overnight: Mathura Arrive at Mathura Railway Station or the agreed arrival point from the Delhi NCR side, where our representative will assist you with the transfer to your hotel. After check-in and some time to freshen up, begin your exploration of Gokul, a place deeply associated with the childhood traditions and stories of Lord Krishna. Visit Raman Reti, Chinta Haran Temple and Brahmand Ghat, followed by important spiritual landmarks of Mathura. Continue with visits to Dwarkadhish Temple, one of Mathura\'s prominent temples, and Shri Krishna Janmabhoomi, traditionally revered as the birthplace of Lord Krishna. Later, visit Vishram Ghat, an important sacred ghat on the Yamuna. Return to the hotel after the day\'s sightseeing and relax. Overnight stay in Mathura.'] },
      { title: 'Day 2: Vrindavan – Temples, Devotion & Evening Illumination', body: ['Meals: Breakfast', 'Overnight: Mathura After breakfast, proceed towards Vrindavan, one of the most revered pilgrimage destinations in the Braj region. Begin your temple visits with the famous Banke Bihari Temple, followed by ISKCON Temple. Continue exploring other notable temples and spiritual landmarks including Rangji Temple, Kanch Ka Mandir and Mata Vaishno Devi Temple. Later, visit Pagal Baba Temple and the atmospheric Nidhivan, a place strongly associated with local Krishna traditions and beliefs. In the evening, enjoy the illuminated atmosphere and light show at Prem Mandir, one of Vrindavan\'s popular visitor experiences. Return to Mathura after the day\'s sightseeing. Overnight stay in Mathura.'] },
      { title: 'Day 3: Govardhan – Nandgaon – Barsana: Discover the Sacred Braj Landscape', body: ['Meals: Breakfast', 'Overnight: Hotel Start the day after an early breakfast and proceed towards Govardhan, an important pilgrimage destination in the Braj region. Visit Govardhan Temple, Radha Kund and Kusum Sarovar, experiencing the peaceful spiritual atmosphere surrounding these sacred places. Continue towards Nandgaon, traditionally associated with the childhood years of Lord Krishna. Visit Nand Bhawan before proceeding to Barsana. In Barsana, visit the revered Radha Rani Temple and Rangili Mahal. The day\'s journey offers a deeper experience of the religious traditions and cultural landscape of Braj. After sightseeing, proceed to the hotel for your overnight stay. Overnight stay at the hotel.'] },
      { title: 'Day 4: Agra Heritage Tour – Taj Mahal & Agra Fort | Departure', body: ['Meals: Breakfast', 'Overnight: Not applicable After an early breakfast, check out from the hotel and proceed towards Agra. Explore the magnificent Taj Mahal, one of India\'s most iconic monuments and a globally recognised symbol of Mughal architecture. Continue to Agra Fort, a historic fortified complex that offers an insight into India\'s rich imperial heritage. You will also visit Sikandra, known for the tomb complex of Emperor Akbar. After completing the Agra sightseeing programme, proceed for your transfer to Mathura Railway Station or the Delhi NCR departure point, according to your onward travel arrangements. End of the Braj–Agra journey with cherished memories. Why Choose This Mathura–Vrindavan Package? This itinerary combines the major spiritual highlights of the Braj region with the architectural heritage of Agra in just four days. Highlights include: Mathura, the sacred heart of Braj Gokul and its Krishna-associated spiritual landmarks Vrindavan\'s famous temples Govardhan and Radha Kund Nandgaon and Barsana Radha Rani Temple Evening experience at Prem Mandir Taj Mahal and Agra Fort A convenient multi-destination route covering both pilgrimage and heritage experiences For travellers from Kerala, it offers an opportunity to experience several important North Indian destinations in one professionally coordinated journey. Why Book With Sahapathika Holidays? Planning a Braj pilgrimage involves coordinating multiple towns, temples, sightseeing locations, hotel stays and road transfers. Sahapathika Holidays can help make the journey more organised and convenient. With Sahapathika Holidays, you can benefit from: Kerala-based travel support and assistance Itineraries designed around the needs of Kerala travellers Coordinated hotel and transportation arrangements Multi-destination tour planning Options for families, couples, groups and senior travellers Assistance with customised travel plans Support with applicable flight/train and transfer arrangements Assistance during the journey as per the services booked Whether you are travelling from Kochi, Ernakulam, Thrissur, Kottayam, Kozhikode, Kannur, Malappuram, Alappuzha, Kollam or Thiruvananthapuram, the journey can be planned according to your preferred travel dates and departure arrangements. Who Is This Package Suitable For? This Mathura–Vrindavan tour package from Kerala is particularly suitable for: Hindu pilgrimage travellers Families Senior citizens travelling with family Couples Devotional groups Friends and small groups Travellers interested in Indian culture and heritage Travellers wishing to combine pilgrimage with Agra sightseeing Best Time to Visit Mathura & Vrindavan The Braj region can be visited throughout much of the year, but the experience varies by season. October to March is generally more comfortable for extensive sightseeing because of the relatively pleasant weather. Holi season is especially significant in the Braj region and attracts large numbers of visitors because of the area\'s famous Holi traditions. Travellers visiting during major festivals should expect larger crowds and higher demand for accommodation and transportation. Summer months can be considerably warmer, so travellers should plan sightseeing accordingly and remain hydrated.'] },
    ],
    'varanasi-tour-packages-from-kerala': [
    ],

    'kerala-ayurveda-wellness-retreat': [
      { title: 'Arrival — Kovalam', body: ['Met at Trivandrum airport and driven to your Ayurveda resort in Kovalam. Initial consultation with the resident vaidya, who sets your therapy plan for the week. Evening free on the beach.'] },
      { title: 'Ayurveda Therapy & Yoga', body: ['Sunrise yoga and pranayama, followed by your first prescribed therapies. Sattvic meals through the day. Afternoon at leisure; guided meditation before dinner.'] },
      { title: 'Kovalam to Poovar — where the backwaters, the river and the Arabian Sea meet. Sunset boat ride through the mangroves.' },
      { title: 'Wellness & Nature', body: ['A slower day: therapies, a floating-cottage breakfast, and time on the golden sand bar. Optional Ayurvedic cooking demonstration in the afternoon.'] },
      { title: 'Poovar to Trivandrum Sightseeing', body: ['Drive to Trivandrum for the Sree Padmanabhaswamy Temple exterior, the Napier Museum and Kanakakkunnu Palace grounds. Evening at leisure.'] },
      { title: 'Departure', body: ['Closing consultation and take-home regimen from the vaidya, then transfer to Trivandrum airport for your onward flight.'] }
    ]
  };

  faqData = [
    { q: 'How do I book a package?', a: 'Send an enquiry through the form or WhatsApp with your dates and group size. We reply with a firm quote and hold your dates; the booking is confirmed on advance payment.' },
    { q: 'Can the itinerary be customised?', a: 'Yes — every package here is a starting point. Swap stays, add nights, change the pace. Tell us what matters and we rebuild around it.' },
    { q: 'What payment methods do you accept?', a: 'Bank transfer and UPI today. An online card gateway is planned — flagged as a v2 enhancement.' },
    { q: 'What is the cancellation policy?', a: 'The exact free-cancellation window is being confirmed with the agency. Refunds are processed within 5–10 business days, and medical emergencies are refunded against a certificate.' }
  ];

  detailFor(slug) {
    const p = this.packages.find(x => x.slug === slug) || this.packages[0];
    const ayur = p.slug === 'kerala-ayurveda-wellness-retreat';
    return {
      p, ayur,
      overview: ayur
        ? 'Six unhurried days built around real Ayurvedic treatment rather than a spa menu. You begin with a consultation, follow a prescribed course of therapies with daily yoga and meditation, and eat sattvic food cooked for your constitution. Between sessions there is Kovalam Beach, the Poovar estuary where backwater meets sea, and the temple city of Trivandrum — so the trip restores you without ever feeling like a clinic.'
        : 'The full overview for this package is being carried across verbatim from the live Sahapathika site. The Ayurveda & Wellness Retreat below shows the complete, populated detail template.',
      highlights: ayur
        ? ['Consultation-led Ayurveda therapies', 'Daily yoga and guided meditation', 'Kovalam Beach at sunrise', 'Poovar backwaters and the golden sand bar', 'Sree Padmanabhaswamy Temple exterior', 'Sattvic dining throughout']
        : ['Highlights pending — pull from live package page'],
      lodging: ayur ? 'Ayurveda Resort / Deluxe Wellness Resort' : 'Confirm from source',
      tourType: ayur ? 'Group, Family & Pilgrimage' : 'Confirm from source'
    };
  }

  renderVals() {
    const s = this.state, self = this;
    const navBtn = on => 'background:' + (on ? 'rgba(22,33,29,.06)' : 'transparent') + ';border:0;color:#16211D;padding:10px 15px;border-radius:99px;font-size:14.5px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:6px';
    const dLabel = s.date ? new Date(s.date + 'T00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) : 'Any date';
    const dSub = s.date ? new Date(s.date + 'T00:00').toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric' }) : 'When would you like to travel?';
    const m = s.month || new Date(2026, 8, 1);
    const tbcTag = 'display:inline-block;margin-top:9px;font-size:9.5px;font-weight:800;letter-spacing:.12em;padding:5px 10px;border-radius:99px;background:rgba(217,164,65,.22);color:#8A6316';
    const okTag = 'display:inline-block;margin-top:9px;font-size:9.5px;font-weight:800;letter-spacing:.12em;padding:5px 10px;border-radius:99px;background:rgba(95,169,140,.2);color:#2F7A63';

    return {
      isHome: s.page === 'home', isPackages: s.page === 'packages', isDetail: s.page === 'detail',
      isAbout: s.page === 'about', isContact: s.page === 'contact',
      menuDest: s.menu === 'dest', menuPkg: s.menu === 'pkg',
      closeMenu: () => this.setState({ menu: null }),
      openDest: () => this.setState({ menu: 'dest' }), openPkg: () => this.setState({ menu: 'pkg' }),
      goHome: () => this.go('home'), goPackages: () => this.go('packages', { fCat: 'All', fRegion: 'All' }),
      goAbout: () => this.go('about'), goContact: () => this.go('contact'),
      goDetailAyurveda: () => this.go('detail', { slug: 'kerala-ayurveda-wellness-retreat', day: 1 }),
      navHomeStyle: navBtn(s.page === 'home'), navDestStyle: navBtn(s.menu === 'dest'),
      navPkgStyle: navBtn(s.page === 'packages' || s.menu === 'pkg'),
      navAboutStyle: navBtn(s.page === 'about'), navContactStyle: navBtn(s.page === 'contact'),
      footLinkStyle: 'background:none;border:0;padding:0;text-align:left;color:rgba(251,247,238,.68);font-size:14px;cursor:pointer',
      headerRef: el => { this.headerEl = el; if (el && this._measure) requestAnimationFrame(this._measure); },
      loading: s.loading, wiping: s.wiping,
      preloaderStyle: 'position:fixed;inset:0;z-index:100;background:#FAF6EF;display:flex;flex-direction:column;align-items:center;justify-content:center;animation:wipeout .5s 1.25s both',
      topBarStyle: 'position:fixed;top:0;left:0;height:3px;z-index:99;background:#E5483D;transition:width .28s ease,opacity .3s;width:' + (s.wiping ? '100%' : '0') + ';opacity:' + (s.wiping ? '1' : '0'),
      headerInnerStyle: 'max-width:1280px;margin:0 auto;padding:0 24px;min-height:' + (s.scrolled ? '62px' : '78px') + ';display:flex;align-items:center;gap:24px;flex-wrap:wrap;transition:min-height .32s cubic-bezier(.2,.7,.3,1)',
      logoStyle: 'height:' + (s.scrolled ? '36px' : '46px') + ';width:auto;display:block;transition:height .32s cubic-bezier(.2,.7,.3,1)',
      marquee: ['MINISTRY OF TOURISM APPROVED', 'IATO & ADTOI MEMBERS', 'HOTEL BOOKINGS', 'MICE & EVENTS', 'CORPORATE TRAVEL', 'PAN-INDIA', 'INTERNATIONAL', 'SINCE 2015', 'MINISTRY OF TOURISM APPROVED', 'IATO & ADTOI MEMBERS', 'HOTEL BOOKINGS', 'MICE & EVENTS', 'CORPORATE TRAVEL', 'PAN-INDIA', 'INTERNATIONAL', 'SINCE 2015'].map(label => ({ label })),
      heroVideo: this.props.heroVideoUrl || 'hero_video.mp4',
      hasHeroVideo: true,
      pkgAsideStyle: 'position:sticky;top:' + (s.hdr + 24) + 'px;flex:1 1 240px;max-width:302px;background:#fff;border:1px solid rgba(22,33,29,.08);border-radius:22px;padding:26px',
      detailAsideStyle: 'position:sticky;top:' + (s.hdr + 24) + 'px;flex:1 1 330px;max-width:376px;display:grid;gap:16px',

      destinations: this.destinations.map(d => Object.assign({}, d, { go: () => this.filterTo('All', 'All') })),
      destGroups: [
        {
          title: 'KERALA', badge: 'BOOKABLE NOW', badgeStyle: 'font-size:9px;font-weight:800;letter-spacing:.1em;background:#DCEEE7;color:#2F7A63;padding:4px 9px;border-radius:99px',
          items: [
            { name: 'Kovalam', initial: 'K', photo: 'https://i.pinimg.com/1200x/1f/cc/f1/1fccf111a972587d9c072f8381018c70.jpg', region: 'South Kerala' },
            { name: 'Alleppey', initial: 'A', photo: 'https://i.pinimg.com/736x/b4/88/63/b48863982d7b8c63a8d633405da62b2b.jpg', region: 'Central Kerala' },
            { name: 'Munnar', initial: 'M', photo: 'https://i.pinimg.com/736x/75/1e/96/751e9636e5a9f3b2ef002932b1817d3d.jpg', region: 'Central Kerala' },
            { name: 'Varkala', initial: 'V', photo: 'https://i.pinimg.com/1200x/9c/4d/7b/9c4d7b7354f5deff64a143cd3ee10583.jpg', region: 'South Kerala' },
            { name: 'Wayanad', initial: 'W', photo: 'https://i.pinimg.com/1200x/1e/00/bb/1e00bb9fa2160c94d8b9fd5aa079874b.jpg', region: 'North Kerala' },
            { name: 'Kochi', initial: 'C', photo: 'https://i.pinimg.com/1200x/2e/de/6a/2ede6ae530ca4688f61e8a73046ae302.jpg', region: 'Central Kerala' }
          ]
        },
        {
          title: 'REST OF INDIA — ON ENQUIRY', badgeStyle: 'font-size:9px;font-weight:800;letter-spacing:.1em;background:#FDE8E4;color:#C4362C;padding:4px 9px;border-radius:99px',
          items: ['Rajasthan', 'Golden Triangle', 'Goa', 'Himachal', 'Northeast', 'Ladakh'].map(n => ({ name: n, initial: n[0], photo: '' }))
        },
        {
          title: 'INTERNATIONAL — ON ENQUIRY', badgeStyle: 'font-size:9px;font-weight:800;letter-spacing:.1em;background:#FDE8E4;color:#C4362C;padding:4px 9px;border-radius:99px',
          items: ['Middle East', 'South-East Asia', 'Europe', 'Sri Lanka', 'Maldives', 'Far East'].map(n => ({ name: n, initial: n[0], photo: '' }))
        }
      ].map(g => Object.assign({}, g, {
        items: g.items.map(d => Object.assign({}, d, {
          thumbStyle: 'width:80px;height:80px;border-radius:999px;display:flex;align-items:center;justify-content:center;font-family:Fraunces,serif;font-size:26px;transition:transform .3s;' +
            (d.photo
              ? 'background-image:url(' + d.photo + ');background-size:cover;background-position:center;color:transparent;border:2px solid #fff;box-shadow:0 8px 20px -10px rgba(22,33,29,.5)'
              : 'background:#DCEEE7;color:#5FA98C;border:1px solid rgba(95,169,140,.4)'),
          go: d.photo ? () => this.filterTo('All', d.region) : () => this.go('contact')
        }))
      })),
      menuCats: Object.keys(this.catColor).filter(c => c !== 'Heritage').map(c => ({
        name: c, go: () => this.filterTo(c),
        dot: 'width:9px;height:9px;border-radius:99px;flex:0 0 auto;background:' + this.catColor[c]
      })),
      menuSignature: this.packages.slice(0, 4).map(p => ({ title: p.title, duration: p.duration, go: () => this.go('detail', { slug: p.slug, day: 1 }) })),

      destLabel: s.dest || 'Any destination', expLabel: s.exp || 'Any experience',
      dateLabel: dLabel, dateSub: dSub,
      fieldDestStyle: this.field(s.field === 'dest'), fieldExpStyle: this.field(s.field === 'exp'), fieldDateStyle: this.field(s.field === 'date'),
      openDestList: s.field === 'dest', openExpList: s.field === 'exp', openDateList: s.field === 'date',
      toggleDest: () => this.setState({ field: s.field === 'dest' ? null : 'dest' }),
      toggleExp: () => this.setState({ field: s.field === 'exp' ? null : 'exp' }),
      toggleDate: () => this.setState({ field: s.field === 'date' ? null : 'date' }),
      destOptions: (() => {
        const row = 'width:100%;background:none;border:0;text-align:left;padding:10px 12px;border-radius:10px;cursor:pointer;font-size:14px;font-weight:600;transition:background .18s';
        const head = 'width:100%;background:none;border:0;text-align:left;padding:12px 12px 6px;font-size:9.5px;font-weight:800;letter-spacing:.2em;color:#C4362C;cursor:default';
        const out = [{ label: 'Anywhere', style: row, pick: () => this.setState({ dest: '', field: null }) }];
        [['SOUTH INDIA · KERALA', ['Kovalam', 'Varkala', 'Alleppey', 'Munnar', 'Thekkady', 'Wayanad', 'Kochi', 'Bekal', 'Trivandrum']],
         ['REST OF INDIA — ON ENQUIRY', ['Rajasthan', 'Golden Triangle', 'Goa', 'Himachal', 'Northeast', 'Ladakh']],
         ['INTERNATIONAL — ON ENQUIRY', ['Middle East', 'South-East Asia', 'Europe', 'Sri Lanka', 'Maldives']]
        ].forEach(g => {
          out.push({ label: g[0], style: head, pick: () => {} });
          g[1].forEach(l => out.push({ label: l, style: row, pick: () => this.setState({ dest: l, field: null }) }));
        });
        return out;
      })(),
      expOptions: ['Any experience', 'Ayurveda & Wellness', 'Heritage & Temple', 'Beach & Coastal', 'Hill & Backwater', 'Honeymoon', 'Signature'].map(l => ({ label: l, pick: () => this.setState({ exp: l === 'Any experience' ? '' : l, field: null }) })),
      weekdays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((l, i) => ({ l, i })),
      dayCells: this.monthCells(),
      monthLabel: m.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
      prevMonth: () => this.setState({ month: new Date(m.getFullYear(), m.getMonth() - 1, 1) }),
      nextMonth: () => this.setState({ month: new Date(m.getFullYear(), m.getMonth() + 1, 1) }),
      doSearch: () => this.filterTo(s.exp || 'All', 'All'),

      catCardStyle: 'animation:rise .6s both;background:#fff;border:1px solid rgba(22,33,29,.08);border-radius:22px;padding:28px 24px 26px;text-align:left;cursor:pointer;display:flex;flex-direction:column;align-items:flex-start;transition:transform .3s cubic-bezier(.2,.7,.3,1),box-shadow .3s;box-shadow:0 6px 18px -12px rgba(22,33,29,.2)',
      catKerala: () => this.filterTo('All'), catHoneymoon: () => this.filterTo('Honeymoon'),
      catAyurveda: () => this.filterTo('Ayurveda & Wellness'), catHeritage: () => this.filterTo('Heritage & Temple'),
      catBackwater: () => this.filterTo('Hill & Backwater'), catHill: () => this.filterTo('Hill & Backwater'),
      catBeach: () => this.filterTo('Beach & Coastal'), catIndia: () => this.filterTo('Signature'),

      featured: this.packages.map(p => Object.assign({}, p, {
        slotId: 'sh-pkg-' + p.slug, photoHint: p.hint, price: 'On enquiry',
        chipStyle: this.chip(p.cat), go: () => this.go('detail', { slug: p.slug, day: 1 })
      })),
      railRef: el => { this.rail = el; },
      scrollLeft: () => this.rail && this.rail.scrollBy({ left: -716, behavior: 'smooth' }),
      scrollRight: () => this.rail && this.rail.scrollBy({ left: 716, behavior: 'smooth' }),

      testimonials: this.testis.map((t, i) => Object.assign({}, t, {
        style: 'grid-area:1/1;background:#fff;border-radius:26px;padding:40px;box-shadow:0 16px 44px -22px rgba(22,33,29,.28);transition:opacity .6s,transform .6s;opacity:' +
          (i === s.testi ? '1' : '0') + ';transform:translateY(' + (i === s.testi ? '0' : '16px') + ');pointer-events:' + (i === s.testi ? 'auto' : 'none')
      })),
      testiDots: this.testis.map((t, i) => ({
        style: 'width:' + (i === s.testi ? '34px' : '10px') + ';height:10px;border-radius:99px;border:0;cursor:pointer;transition:all .3s;background:' + (i === s.testi ? '#E5483D' : 'rgba(22,33,29,.18)'),
        pick: () => this.setState({ testi: i })
      })),

      statsRef: el => { this.statsEl = el; },
      stats: [
        { value: s.counts.travellers ? s.counts.travellers + '+' : '—', label: 'Happy Travellers', tag: 'AWAITING CLIENT DATA', tagStyle: tbcTag },
        { value: s.counts.destinations ? s.counts.destinations + '+' : '—', label: 'Destinations Covered', tag: 'AWAITING CLIENT DATA', tagStyle: tbcTag },
        { value: s.counts.packages + '', label: 'Holiday Packages', tag: 'VERIFIED', tagStyle: okTag },
        { value: s.counts.years + '+', label: 'Years of Experience', tag: 'VERIFIED · SINCE 2015', tagStyle: okTag }
      ],

      tags: ['Backwater Houseboat Cruise', 'Ayurveda Spa Therapy', 'Kathakali Evening Show', 'Tea Plantation Walk', 'Periyar Wildlife Safari', 'Spice Plantation Tour', 'Beach Relaxation', 'Temple Darshan', 'Hill-Station Trek', 'Elephant Camp Visit']
        .map(l => ({ label: l, go: () => this.filterTo('All') })),

      journal: [
        { slotId: 'sh-j1', photo: 'https://i.pinimg.com/1200x/b9/74/0a/b9740a34ba67edb133591cb297723efa.jpg', photoHint: 'Monsoon over the backwaters', kicker: 'SEASONS', title: 'When is the best time to visit Kerala?', meta: 'Guide · 6 min read' },
        { slotId: 'sh-j2', photo: 'https://i.pinimg.com/1200x/7d/92/4c/7d924cc4489932afa59b881fc9f2a523.jpg', photoHint: 'Ayurveda consultation', kicker: 'WELLNESS', title: 'Your first Panchakarma: what to expect', meta: 'Guide · 8 min read' },
        { slotId: 'sh-j3', photo: 'https://i.pinimg.com/originals/87/8b/84/878b841ad38d1d59cbefa547e995f363.png', photoHint: 'Thrissur Pooram crowd', kicker: 'FESTIVALS', title: 'Kerala festival calendar, month by month', meta: 'Guide · 5 min read' }
      ],

      gallery: this.galleryItems.map((g, i) => ({
        slotId: g.id, hint: g.hint, photo: g.photo,
        wrapStyle: g.span + ';border-radius:18px;overflow:hidden;cursor:zoom-in;position:relative',
        open: () => this.setState({ light: i })
      })),
      lightboxOpen: s.light >= 0,
      lightboxSlot: s.light >= 0 ? this.galleryItems[s.light].id : 'sh-g1',
      lightboxHint: s.light >= 0 ? this.galleryItems[s.light].hint : '',
      lightboxPhoto: s.light >= 0 ? this.galleryItems[s.light].photo : '',
      lightboxCaption: s.light >= 0 ? this.galleryItems[s.light].cap : '',
      closeLightbox: () => this.setState({ light: -1 }),
      prevLight: e => { e.stopPropagation(); this.setState({ light: (s.light + 5) % 6 }); },
      nextLight: e => { e.stopPropagation(); this.setState({ light: (s.light + 1) % 6 }); },
      stop: e => e.stopPropagation(),

      email: s.email, setEmail: e => this.setState({ email: e.target.value }),
      subscribe: () => this.setState({ subscribed: true }),
      subscribed: s.subscribed, notSubscribed: !s.subscribed,

      /*  === Packages listing ===  */
      catChips: ['All'].concat(Object.keys(this.catColor)).map(c => ({
        label: c === 'All' ? 'All categories' : c,
        count: c === 'All' ? this.packages.length : this.packages.filter(p => p.cat === c).length,
        dot: 'width:8px;height:8px;border-radius:99px;flex:0 0 auto;background:' + (c === 'All' ? '#16211D' : this.catColor[c]),
        style: 'display:flex;align-items:center;gap:9px;width:100%;text-align:left;border:0;border-radius:11px;padding:10px 12px;cursor:pointer;font-size:13.5px;font-weight:' +
          (s.fCat === c ? '800' : '600') + ';background:' + (s.fCat === c ? '#FDE8E4' : 'transparent') + ';color:' + (s.fCat === c ? '#C4362C' : '#1B1A17'),
        pick: () => this.setState({ fCat: c })
      })),
      regionChips: ['All', 'South Kerala', 'Central Kerala', 'North Kerala', 'Multi-region'].map(r => ({
        label: r === 'All' ? 'All regions' : r,
        count: r === 'All' ? this.packages.length : this.packages.filter(p => p.region === r).length,
        style: 'display:flex;align-items:center;gap:9px;width:100%;text-align:left;border:0;border-radius:11px;padding:10px 12px;cursor:pointer;font-size:13.5px;font-weight:' +
          (s.fRegion === r ? '800' : '600') + ';background:' + (s.fRegion === r ? '#DCEEE7' : 'transparent') + ';color:' + (s.fRegion === r ? '#2F7A63' : '#1B1A17'),
        pick: () => this.setState({ fRegion: r })
      })),
      clearFilters: () => this.setState({ fCat: 'All', fRegion: 'All', fSort: 'Featured' }),
      sorts: ['Featured', 'Shortest', 'A–Z'].map(o => ({
        label: o,
        style: 'border:1px solid ' + (s.fSort === o ? '#16211D' : 'rgba(22,33,29,.14)') + ';background:' + (s.fSort === o ? '#16211D' : 'transparent') +
          ';color:' + (s.fSort === o ? '#FAF6EF' : '#3A4A44') + ';padding:9px 15px;border-radius:999px;font-size:12.5px;font-weight:700;cursor:pointer',
        pick: () => this.setState({ fSort: o })
      })),
      results: (() => {
        let r = this.packages.filter(p => (s.fCat === 'All' || p.cat === s.fCat) && (s.fRegion === 'All' || p.region === s.fRegion));
        if (s.fSort === 'A–Z') r = r.slice().sort((a, b) => a.title.localeCompare(b.title));
        if (s.fSort === 'Shortest') {
          const getDays = d => {
            if (!d || d === 'TBC' || d === 'On enquiry') return 99;
            let m = String(d).match(/(\d+)\s*(D|Days?)/i);
            if (m) return parseInt(m[1]);
            m = String(d).match(/(\d+)\s*(N|Nights?)/i);
            if (m) return parseInt(m[1]) + 1;
            return 99;
          };
          r = r.slice().sort((a, b) => getDays(a.duration) - getDays(b.duration));
        }
        return r.map(p => Object.assign({}, p, {
          listSlot: 'sh-pkg-' + p.slug, chipStyle: this.chip(p.cat),
          go: () => this.go('detail', { slug: p.slug, day: 1 })
        }));
      })(),
      resultCount: this.packages.filter(p => (s.fCat === 'All' || p.cat === s.fCat) && (s.fRegion === 'All' || p.region === s.fRegion)).length,
      resultNoun: 'packages',
      noResults: this.packages.filter(p => (s.fCat === 'All' || p.cat === s.fCat) && (s.fRegion === 'All' || p.region === s.fRegion)).length === 0,
      activeLabel: (s.fCat === 'All' ? 'all categories' : s.fCat) + (s.fRegion === 'All' ? '' : ' · ' + s.fRegion),

      /*  === Package detail ===  */
      detail: (() => {
        const d = this.detailFor(s.slug), p = d.p, it = this.itineraries[p.slug];
        return {
          title: p.title, cat: p.cat, region: p.region, regions: p.regions, duration: p.duration, hint: p.hint, photo: p.photo,
          flatChip: 'background:' + (this.catColor[p.cat] || '#E5483D') + ';color:#fff;font-size:10.5px;font-weight:800;letter-spacing:.1em;padding:7px 13px;border-radius:99px;text-transform:uppercase',
          overview: d.overview,
          facts: [
            { k: 'REGION', v: p.regions }, { k: 'DURATION', v: p.duration }, { k: 'LODGING', v: d.lodging },
            { k: 'TOUR TYPE', v: d.tourType }, { k: 'TRANSPORT', v: 'Comfortable private vehicle' }
          ],
          highlights: d.highlights.map(t => ({ t })),
          hasItinerary: !!it, noItinerary: !it,
          days: (it || []).map((x, i) => {
            const n = i + 1, open = s.day === n;
            return {
              n: 'DAY ' + (n < 10 ? '0' + n : n), title: x.title, body: x.body,
              nodeStyle: 'position:absolute;left:-29px;top:22px;width:13px;height:13px;border-radius:99px;background:' + (open ? '#E5483D' : '#FAF6EF') + ';border:2px solid ' + (open ? '#E5483D' : '#5FA98C'),
              headStyle: 'width:100%;text-align:left;background:' + (open ? '#fff' : 'transparent') + ';border:1px solid ' + (open ? 'transparent' : 'rgba(22,33,29,.1)') +
                ';border-radius:16px 16px ' + (open ? '0 0' : '16px 16px') + ';padding:18px 24px;cursor:pointer;position:relative;box-shadow:' + (open ? '0 10px 26px -16px rgba(22,33,29,.3)' : 'none'),
              iconStyle: 'position:absolute;right:22px;top:50%;transform:translateY(-50%) rotate(' + (open ? '90deg' : '0deg') + ');transition:transform .34s cubic-bezier(.2,.7,.3,1);color:#E5483D;font-size:22px;font-weight:800',
              bodyStyle: 'background:#fff;border-radius:0 0 16px 16px;overflow:hidden;max-height:' + (open ? '350px' : '0') + ';transition:max-height .4s cubic-bezier(.2,.7,.3,1);box-shadow:' + (open ? '0 10px 26px -16px rgba(22,33,29,.3)' : 'none'),
              toggle: () => this.setState({ day: open ? 0 : n })
            };
          }),
          includes: (p.slug === 'kerala-ayurveda-wellness-retreat'
            ? ['Accommodation at the named Ayurveda / wellness resorts', 'Ayurveda treatments as per the vaidya consultation', 'All meals — sattvic menu', 'Daily yoga and meditation sessions', 'Comfortable private vehicle throughout', 'Airport pickup and drop', 'All applicable taxes']
            : ['Inclusions pending — pull from live package page']).map(t => ({ t })),
          excludes: (p.slug === 'kerala-ayurveda-wellness-retreat'
            ? ['Airfare and train fare', 'Travel insurance', 'Treatments beyond the prescribed course', 'Personal expenses, tips and laundry', 'Anything not listed under inclusions']
            : ['Exclusions pending — pull from live package page']).map(t => ({ t })),
          notes: ['Prices are per person and subject to change', 'Booking is confirmed only on advance payment', 'Itinerary may be adjusted for weather, temple timings or road conditions', 'Sabarimala and some temple visits are seasonal — confirm before booking'].map(t => ({ t }))
        };
      })(),
      faqs: this.faqData.map((f, i) => {
        const open = s.faq === i;
        return {
          q: f.q, a: f.a,
          headStyle: 'width:100%;text-align:left;background:transparent;border:0;padding:20px 54px 20px 22px;cursor:pointer;position:relative;font-size:16px;font-weight:700',
          iconStyle: 'position:absolute;right:22px;top:50%;transform:translateY(-50%) rotate(' + (open ? '90deg' : '0deg') + ');transition:transform .34s cubic-bezier(.2,.7,.3,1);color:#E5483D;font-size:22px;font-weight:800',
          bodyStyle: 'overflow:hidden;max-height:' + (open ? '350px' : '0') + ';transition:max-height .38s cubic-bezier(.2,.7,.3,1)',
          toggle: () => this.setState({ faq: open ? -1 : i })
        };
      }),
      related: this.packages.filter(p => p.slug !== s.slug).slice(0, 3).map(p => Object.assign({}, p, {
        relSlot: 'sh-pkg-' + p.slug, chipStyle: this.chip(p.cat), go: () => this.go('detail', { slug: p.slug, day: 1 })
      })),
      openGallery: () => this.setState({ light: 0 }),
      bookDateStyle: 'width:100%;text-align:left;background:#fff;border:1.5px solid ' + (s.field === 'date' ? '#E5483D' : 'rgba(22,33,29,.1)') + ';border-radius:14px;padding:13px 16px;cursor:pointer',
      stepBtnStyle: 'width:26px;height:26px;border-radius:99px;border:1px solid rgba(22,33,29,.16);background:transparent;cursor:pointer;font-weight:700;line-height:1',
      adults: s.adults, kids: s.kids,
      adultsUp: () => this.setState({ adults: Math.min(20, s.adults + 1) }),
      adultsDown: () => this.setState({ adults: Math.max(1, s.adults - 1) }),
      kidsUp: () => this.setState({ kids: Math.min(10, s.kids + 1) }),
      kidsDown: () => this.setState({ kids: Math.max(0, s.kids - 1) }),
                  bookNow: () => {
        const p = this.packages.find(x => x.slug === s.slug) || this.packages[0];
        this.setState({
          form: Object.assign({}, s.form, {
            pkg: p.title,
            dates: s.date ? s.date : s.form.dates,
            message: 'Enquiry for ' + p.title + ' - ' + s.adults + ' adults, ' + s.kids + ' children.'
          })
        });
        const formEl = document.getElementById('enquiry-form');
        if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
        else this.go('contact', { form: this.state.form });
      },

      /*  === About ===  */
      whyUs: [
        { n: '01', t: 'Competitive pricing', d: 'Across a wide range of packages, from homestays to backwater villas.' },
        { n: '02', t: '24/7 client support', d: 'Someone answers, whatever the hour of your trip.' },
        { n: '03', t: 'Experienced, friendly team', d: 'Efficient planners who know these roads personally.' },
        { n: '04', t: 'Best hotels in your budget', d: 'We only place you where we would stay ourselves.' },
        { n: '05', t: 'Honest rates across India', d: 'No hidden mark-ups, no surprise line items on arrival.' },
        { n: '06', t: 'Budget trips, India & abroad', d: 'Hotels, MICE, events and corporate travel too.' }
      ],

      /*  === Contact ===  */
      form: s.form, sent: s.sent, notSent: !s.sent,
      labelStyle: 'display:block;font-size:11px;letter-spacing:.14em;font-weight:800;color:#B5822A;margin-bottom:8px',
      inputStyle: 'width:100%;border:1.5px solid rgba(22,33,29,.12);border-radius:13px;padding:14px 16px;font-size:15px;outline:none;background:#FAF6EF',
      textareaStyle: 'width:100%;border:1.5px solid rgba(22,33,29,.12);border-radius:13px;padding:14px 16px;font-size:15px;outline:none;background:#FAF6EF;resize:vertical;font-family:inherit',
      setName: e => this.setState({ form: Object.assign({}, s.form, { name: e.target.value }) }),
      setPhone: e => this.setState({ form: Object.assign({}, s.form, { phone: e.target.value }) }),
      setEmailF: e => this.setState({ form: Object.assign({}, s.form, { email: e.target.value }) }),
      setDates: e => this.setState({ form: Object.assign({}, s.form, { dates: e.target.value }) }),
      setPkg: e => this.setState({ form: Object.assign({}, s.form, { pkg: e.target.value }) }),
      setMessage: e => this.setState({ form: Object.assign({}, s.form, { message: e.target.value }) }),
      pkgOptions: [{ v: 'Not sure yet — help me choose' }].concat(this.packages.map(p => ({ v: p.title }))),
            send: () => {
        const { name, phone, email, dates, pkg } = this.state.form;
        
        if (!name || !name.trim()) return this.setState({ errorMsg: 'Please enter your full name.' });
        if (!phone || !phone.trim()) return this.setState({ errorMsg: 'Please enter your phone number.' });
        if (!email || !email.trim()) return this.setState({ errorMsg: 'Please enter your email address.' });
        if (!dates || !dates.trim()) return this.setState({ errorMsg: 'Please specify your travel dates.' });
        if (!pkg || !pkg.trim()) return this.setState({ errorMsg: 'Please select an interested package.' });

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return this.setState({ errorMsg: 'Please enter a valid email address.' });

        const phoneRegex = /^\+?[0-9\s\-\(\)]{7,15}$/;
        if (!phoneRegex.test(phone)) return this.setState({ errorMsg: 'Please enter a valid phone number.' });

        this.setState({ errorMsg: '' });

        fetch('https://formsubmit.co/ajax/adarsh@rytful.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            name: this.state.form.name,
            phone: this.state.form.phone,
            email: this.state.form.email,
            dates: this.state.form.dates,
            package: this.state.form.pkg,
            message: this.state.form.message,
            _subject: 'New Enquiry from Sahapathika Holidays'
          })
        });

        this.setState({ sent: true });
      },
      resetForm: () => this.setState({ sent: false, form: { name: '', email: '', phone: '', pkg: '', dates: '', message: '' } }),
      offices: [
        { city: 'Kochi', address: '14/5H, 2nd Floor, Thomson and Mathews Building, NH 544, Opposite Navya Bakery, Athani, Airport Junction, Kochi, Kerala 683585' },
        { city: 'New Delhi', address: 'House Plot no 476, Bharthal Dwarka Expressway, Opp: IICC Yashobhoomi, Sec 26 Dwarka, New Delhi 110077' }
      ]
    };
  }
}
</script>
