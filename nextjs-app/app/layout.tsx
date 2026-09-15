import type { Metadata } from 'next';
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Preloader from '@/components/layout/Preloader';
import WhatsAppFAB from '@/components/layout/WhatsAppFAB';
import { SITE_CONFIG } from '@/data/site';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.baseUrl),
  title: {
    default: 'Sahapathika Holidays — Kerala Specialists',
    template: '%s | Sahapathika Holidays',
  },
  description: 'Kerala specialists, with tour packages across India and abroad — crafting journeys that connect, delight and leave a lasting imprint. Government approved, IATO & ADTOI members.',
  keywords: ['Kerala tours', 'Ayurveda retreats', 'Kerala honeymoon packages', 'backwater tours', 'South India holidays', 'Shimla Manali', 'Kashmir tour'],
  openGraph: {
    siteName: 'Sahapathika Holidays',
    type: 'website',
    locale: 'en_IN',
  },
  icons: {
    icon: '/Site-logo1.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${plusJakarta.variable}`}>
      <body>
        <Preloader />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFAB />
      </body>
    </html>
  );
}
