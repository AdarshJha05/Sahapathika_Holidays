import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import MarqueeSection from '@/components/sections/MarqueeSection';
import FeaturedPackages from '@/components/sections/FeaturedPackages';
import WhyUsSection from '@/components/sections/WhyUsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import StatsSection from '@/components/sections/StatsSection';
import NewsletterSection from '@/components/sections/NewsletterSection';

export const metadata: Metadata = {
  title: 'Sahapathika Holidays — Kerala Specialists',
  description: 'Kerala specialists, with tour packages across India and abroad. Government approved, IATO & ADTOI members. Ayurveda retreats, honeymoon packages, heritage tours, hill stations.',
  openGraph: {
    title: 'Sahapathika Holidays — Kerala Specialists',
    description: 'Crafting journeys that connect, delight and leave a lasting imprint.',
    images: ['/og-images/default.png'],
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <FeaturedPackages />
      <WhyUsSection />
      <StatsSection />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}
