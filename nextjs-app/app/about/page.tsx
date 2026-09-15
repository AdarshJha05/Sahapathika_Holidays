import type { Metadata } from 'next';
import { SITE_CONFIG, WHY_US } from '@/data/site';
import { Shield, Award, Clock, Map, Users, Globe } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Kerala specialists since 2015 — government approved, IATO & ADTOI members. Learn about Sahapathika Holidays and our mission to craft journeys that connect and delight.',
};

const ICON_MAP: Record<string, React.ReactNode> = {
  shield: <Shield size={24} />,
  award: <Award size={24} />,
  clock: <Clock size={24} />,
  map: <Map size={24} />,
  users: <Users size={24} />,
  globe: <Globe size={24} />,
};

export default function AboutPage() {
  return (
    <div style={{ paddingTop: 78, background: '#FAF6EF', minHeight: '100vh' }}>
      {/* Header */}
      <div className="px-6 py-20 text-center" style={{ background: '#16211D' }}>
        <p className="text-xs font-extrabold tracking-[.24em] mb-3" style={{ color: '#FF8B80' }}>ABOUT US</p>
        <h1 className="font-display font-light mb-4" style={{ fontSize: 'clamp(36px,5vw,62px)', color: '#FAF6EF' }}>
          Kerala specialists,{' '}
          <em className="not-italic" style={{ color: '#E5483D' }}>since 2015</em>
        </h1>
        <p className="text-base max-w-xl mx-auto" style={{ color: 'rgba(250,246,239,.7)' }}>
          Government approved. IATO & ADTOI members. Crafting journeys that connect, delight and leave a lasting imprint.
        </p>
      </div>

      <div className="mx-auto px-6 py-16 max-w-3xl">
        <h2 className="font-display font-light text-3xl mb-6" style={{ color: '#1B1A17' }}>
          Our <em className="not-italic" style={{ color: '#E5483D' }}>story</em>
        </h2>
        <div className="space-y-4 text-base leading-relaxed" style={{ color: '#3A4A44', lineHeight: 1.78 }}>
          <p>
            Sahapathika Holidays was founded in 2015 with a single conviction: that travel should feel personal, thoughtfully planned, and deeply memorable. Based in Delhi with a strong presence in Kochi, we began as Kerala specialists — and Kerala remains our heartland.
          </p>
          <p>
            Over a decade, we&apos;ve grown to offer curated journeys across India and beyond — from the snow-capped heights of Himachal Pradesh and the sacred ghats of Varanasi to the pristine beaches of the Maldives. But every package, wherever it goes, carries the same attention to detail and care for the traveller that has always defined us.
          </p>
          <p>
            We&apos;re recognised by the Ministry of Tourism, Government of India, and are active members of both IATO (Indian Association of Tour Operators) and ADTOI (Association of Domestic Tour Operators of India) — held to their codes of ethics and professional standards.
          </p>
        </div>
      </div>

      {/* Why us grid */}
      <div className="px-6 py-16" style={{ background: '#DCEEE7' }}>
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display font-light text-3xl mb-10 text-center" style={{ color: '#16211D' }}>
            Why travel with <em className="not-italic" style={{ color: '#E5483D' }}>us</em>
          </h2>
          <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
            {WHY_US.map(item => (
              <div key={item.title} className="bg-white rounded-2xl p-5" style={{ boxShadow: '0 4px 20px -8px rgba(22,33,29,.1)' }}>
                <div className="mb-3 inline-flex" style={{ color: '#E5483D' }}>{ICON_MAP[item.icon]}</div>
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6B655C' }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 py-20 text-center">
        <h2 className="font-display font-light text-3xl mb-4" style={{ color: '#1B1A17' }}>
          Ready to <em className="not-italic" style={{ color: '#E5483D' }}>travel</em>?
        </h2>
        <p className="text-sm mb-8" style={{ color: '#6B655C' }}>Browse our packages or reach out to plan something custom.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/packages" className="px-6 py-3 rounded-full font-bold text-sm" style={{ background: '#E5483D', color: '#FAF6EF' }}>
            Browse packages
          </Link>
          <Link href="/contact" className="px-6 py-3 rounded-full font-bold text-sm border-2" style={{ borderColor: '#E5483D', color: '#E5483D' }}>
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
