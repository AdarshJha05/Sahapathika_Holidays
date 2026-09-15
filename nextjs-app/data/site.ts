// Site-wide static data — testimonials, offices, footer nav, gallery items

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Priya Menon',
    location: 'Kochi',
    text: 'Sahapathika handled everything flawlessly — hotel bookings, Ayurveda appointments, houseboat transfers. Our family trip to Kumarakom was the most stress-free holiday we\'ve ever had.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Rahul & Deepa',
    location: 'Bengaluru',
    text: 'We booked the honeymoon package and they truly went above and beyond — the surprise flower arrangement on the houseboat, the private beach dinner in Kovalam. Magical.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Thomas Abraham',
    location: 'Dubai',
    text: 'Travelling from abroad and worried about logistics — they sorted everything, including the Ayurveda resort consultation before I even left Dubai. Highly professional team.',
    rating: 5,
  },
];

export const OFFICES = [
  {
    id: 'delhi',
    city: 'Delhi',
    address: 'New Delhi, India',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.89983789!2d76.81304845!3d28.6273928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1695000000000!5m2!1sen!2sin',
  },
  {
    id: 'kochi',
    city: 'Kochi',
    address: 'Kochi, Kerala, India',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125422.73!2d76.2144!3d9.9312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b087f0b2ba18f27%3A0x5e65d7d1b3acf8b5!2sKochi%2C%20Kerala!5e0!3m2!1sen!2sin!4v1695000000000!5m2!1sen!2sin',
  },
];

export const WHY_US = [
  {
    icon: 'shield',
    title: 'Government Approved',
    body: 'Recognised by the Ministry of Tourism, Govt. of India. Your journey is in fully certified hands.',
  },
  {
    icon: 'award',
    title: 'IATO & ADTOI Members',
    body: 'Active members of India\'s two foremost travel trade associations — held to their code of ethics.',
  },
  {
    icon: 'clock',
    title: '10+ Years of Trust',
    body: 'Operating since 2015, with a decade of personal relationships across Kerala\'s finest resorts and guides.',
  },
  {
    icon: 'map',
    title: 'Kerala Specialists',
    body: 'Every corner of the state, every season, every style — from backwater dawns to Malabar spice country.',
  },
  {
    icon: 'users',
    title: 'MICE & Corporate',
    body: 'End-to-end event planning for conferences, incentive trips, and team retreats — any group size.',
  },
  {
    icon: 'globe',
    title: 'India & Beyond',
    body: 'Our reach extends beyond Kerala — Himachal, Kashmir, pilgrimage circuits, and international getaways.',
  },
];

export const GALLERY_ITEMS = [
  {
    id: 1,
    src: '/images/gallery/backwaters.jpg',
    alt: 'Traditional kettuvallam houseboat gliding through the Alleppey backwaters at golden hour',
    caption: 'Alleppey Backwaters',
    span: 'col-span-2 row-span-2',
  },
  {
    id: 2,
    src: '/images/gallery/munnar.jpg',
    alt: 'Rolling tea garden rows in Munnar with morning mist and a heritage estate in the background',
    caption: 'Munnar Tea Gardens',
    span: '',
  },
  {
    id: 3,
    src: '/images/gallery/kovalam.jpg',
    alt: 'Kovalam lighthouse beach at sunset with fishing boats on the shore',
    caption: 'Kovalam Beach',
    span: '',
  },
  {
    id: 4,
    src: '/images/gallery/thekkady.jpg',
    alt: 'Periyar Lake at dawn with mist rising and a wildlife safari boat',
    caption: 'Periyar Wildlife',
    span: '',
  },
  {
    id: 5,
    src: '/images/gallery/kerala-temple.jpg',
    alt: 'Decorated temple elephant in a Kerala procession at dusk',
    caption: 'Kerala Traditions',
    span: '',
  },
  {
    id: 6,
    src: '/images/gallery/ayurveda.jpg',
    alt: 'Ayurvedic treatment room with herbal oils and tropical garden view',
    caption: 'Authentic Ayurveda',
    span: '',
  },
];

export const MARQUEE_ITEMS = [
  'MINISTRY OF TOURISM APPROVED',
  'IATO MEMBERS',
  'ADTOI MEMBERS',
  'HOTEL BOOKINGS',
  'MICE & EVENTS',
  'CORPORATE TRAVEL',
  'KERALA SPECIALISTS',
  'PAN-INDIA',
  'INTERNATIONAL',
  'SINCE 2015',
  'AYURVEDA SPECIALISTS',
  'CUSTOMISED ITINERARIES',
];

export const FOOTER_NAV = {
  explore: [
    { label: 'Home', href: '/' },
    { label: 'My Packages', href: '/packages' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Royal Life — Journal', href: '/royal-life' },
  ],
  popular: [
    { label: 'Ayurveda & Wellness', href: '/packages?category=Ayurveda+%26+Wellness' },
    { label: 'Backwater Cruises', href: '/packages?category=Beach+%26+Coastal' },
    { label: 'Hill Stations', href: '/packages?category=Hill+Station' },
    { label: 'Temple Tours', href: '/packages?category=Heritage+%26+Temple' },
    { label: 'Honeymoon', href: '/packages?category=Honeymoon' },
  ],
  care: [
    { label: 'FAQs', href: '/faq' },
    { label: 'Booking & Payment', href: '/contact' },
    { label: 'Cancellation Policy', href: '/terms' },
    { label: 'Talk To Us', href: '/contact' },
  ],
};

export const STATS = [
  { label: 'Holiday Packages', value: 10, suffix: '+', verified: true },
  { label: 'Years of Experience', value: 10, suffix: '+', verified: true },
  { label: 'Happy Travellers', value: null, suffix: '', verified: false, tbc: true },
  { label: 'Destinations', value: null, suffix: '', verified: false, tbc: true },
];

export const SITE_CONFIG = {
  name: 'Sahapathika Holidays',
  tagline: 'Kerala specialists, with tour packages across India and abroad',
  email: 'sahapathika@gmail.com',
  phone: '+91 90727 69547',
  whatsapp: 'https://wa.me/919072769547',
  tel: 'tel:+919072769547',
  mailto: 'mailto:sahapathika@gmail.com',
  logo: '/Site-logo1.svg',
  baseUrl: 'https://sahapathika-holidays.vercel.app',
};
