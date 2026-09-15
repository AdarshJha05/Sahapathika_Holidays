import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'sahapathika.com' },
    ],
  },
  async redirects() {
    return [
      // Shared pages
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/packages.html', destination: '/packages', permanent: true },
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },
      { source: '/privacy.html', destination: '/privacy', permanent: true },
      { source: '/terms.html', destination: '/terms', permanent: true },
      { source: '/cookies.html', destination: '/cookies', permanent: true },
      // Package redirects — all 27 flat files → /packages/[slug]
      { source: '/package-ayurveda.html', destination: '/packages/ayurveda', permanent: true },
      { source: '/package-beach-and-backwater-tour.html', destination: '/packages/beach-and-backwater-tour', permanent: true },
      { source: '/package-enchanting-captivating-kerala.html', destination: '/packages/enchanting-captivating-kerala', permanent: true },
      { source: '/package-himachal-devi-yatra-with-vaishno-devi-mansa-devi.html', destination: '/packages/himachal-devi-yatra-with-vaishno-devi-mansa-devi', permanent: true },
      { source: '/package-himachal-pradesh.html', destination: '/packages/himachal-pradesh', permanent: true },
      { source: '/package-kashi-gaya-prayag-ayodhya-pitru-moksha-yatra.html', destination: '/packages/kashi-gaya-prayag-ayodhya-pitru-moksha-yatra', permanent: true },
      { source: '/package-kashi-prayag-chitrakoot-ayodhya-divya-yatra.html', destination: '/packages/kashi-prayag-chitrakoot-ayodhya-divya-yatra', permanent: true },
      { source: '/package-kashi-prayag-chitrakoot-ayodhya-yatra.html', destination: '/packages/kashi-prayag-chitrakoot-ayodhya-yatra', permanent: true },
      { source: '/package-kashmir-5-days-srinagar-sonmarg-gulmarg-pahalgam-j.html', destination: '/packages/kashmir-5-days-srinagar-sonmarg-gulmarg-pahalgam-j', permanent: true },
      { source: '/package-kashmir-6-days-srinagar-sonmarg-gulmarg-pahalgam.html', destination: '/packages/kashmir-6-days-srinagar-sonmarg-gulmarg-pahalgam', permanent: true },
      { source: '/package-kashmir-honeymoon.html', destination: '/packages/kashmir-honeymoon', permanent: true },
      { source: '/package-kashmir-with-vaishno-devi.html', destination: '/packages/kashmir-with-vaishno-devi', permanent: true },
      { source: '/package-kerala-ayurveda-wellness-retreat.html', destination: '/packages/kerala-ayurveda-wellness-retreat', permanent: true },
      { source: '/package-kerala-short-honeymoon-tour.html', destination: '/packages/kerala-short-honeymoon-tour', permanent: true },
      { source: '/package-kerala-temple-tour.html', destination: '/packages/kerala-temple-tour', permanent: true },
      { source: '/package-kovalam-varkala-tour.html', destination: '/packages/kovalam-varkala-tour', permanent: true },
      { source: '/package-lucknow-naimisharanya-ayodhya-prayagraj-varanasi-y.html', destination: '/packages/lucknow-naimisharanya-ayodhya-prayagraj-varanasi-y', permanent: true },
      { source: '/package-mathura-vrindavan-braj-agra-yatra.html', destination: '/packages/mathura-vrindavan-braj-agra-yatra', permanent: true },
      { source: '/package-munnar-thekkady-alleppey.html', destination: '/packages/munnar-thekkady-alleppey', permanent: true },
      { source: '/package-north-kerala-heritage-tour.html', destination: '/packages/north-kerala-heritage-tour', permanent: true },
      { source: '/package-puri-jagannath-konark-chilika-bhubaneswar.html', destination: '/packages/puri-jagannath-konark-chilika-bhubaneswar', permanent: true },
      { source: '/package-scenic-beautiful-kerala.html', destination: '/packages/scenic-beautiful-kerala', permanent: true },
      { source: '/package-shimla-kullu-manali.html', destination: '/packages/shimla-kullu-manali', permanent: true },
      { source: '/package-shimla-manali-amritsar.html', destination: '/packages/shimla-manali-amritsar', permanent: true },
      { source: '/package-shimla-manali.html', destination: '/packages/shimla-manali', permanent: true },
      { source: '/package-varanasi-tour-packages-from-kerala.html', destination: '/packages/varanasi-tour-packages-from-kerala', permanent: true },
      { source: '/package-waterfalls-hills-backwaters.html', destination: '/packages/waterfalls-hills-backwaters', permanent: true },
    ];
  },
};

export default nextConfig;
