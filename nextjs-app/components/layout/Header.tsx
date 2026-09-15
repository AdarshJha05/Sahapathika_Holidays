'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { SITE_CONFIG } from '@/data/site';
import { cn } from '@/lib/utils';

const DESTINATIONS = [
  { label: 'Backwaters & Beaches', href: '/packages?region=South+Kerala', badge: 'BOOKABLE', region: 'South Kerala' },
  { label: 'Hill Stations & Tea', href: '/packages?region=Central+Kerala', badge: 'BOOKABLE', region: 'Central Kerala' },
  { label: 'Heritage & Temples', href: '/packages?category=Heritage+%26+Temple', badge: 'BOOKABLE', region: 'North Kerala' },
  { label: 'Ayurveda & Wellness', href: '/packages?category=Ayurveda+%26+Wellness', badge: 'BOOKABLE', region: 'South Kerala' },
  { label: 'Honeymoon Kerala', href: '/packages?category=Honeymoon', badge: 'BOOKABLE', region: 'South Kerala' },
  { label: 'North Kerala Heritage', href: '/packages/north-kerala-heritage-tour', badge: 'BOOKABLE', region: 'North Kerala' },
  { label: 'Rajasthan', href: '/contact', badge: 'ON ENQUIRY', region: 'India' },
  { label: 'Kashmir Valley', href: '/packages?region=Kashmir', badge: 'BOOKABLE', region: 'India' },
  { label: 'Himachal Pradesh', href: '/packages?region=Himachal+Pradesh', badge: 'BOOKABLE', region: 'India' },
  { label: 'Maldives', href: '/contact', badge: 'ON ENQUIRY', region: 'International' },
  { label: 'Sri Lanka', href: '/contact', badge: 'ON ENQUIRY', region: 'International' },
  { label: 'South East Asia', href: '/contact', badge: 'ON ENQUIRY', region: 'International' },
];

const PACKAGE_CATS = [
  { label: 'Ayurveda & Wellness', href: '/packages?category=Ayurveda+%26+Wellness' },
  { label: 'Beach & Coastal', href: '/packages?category=Beach+%26+Coastal' },
  { label: 'Heritage & Temple', href: '/packages?category=Heritage+%26+Temple' },
  { label: 'Hill Stations', href: '/packages?category=Hill+Station' },
  { label: 'Honeymoon', href: '/packages?category=Honeymoon' },
  { label: 'Hill & Backwater', href: '/packages?category=Hill+%26+Backwater' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);
  const [pkgOpen, setPkgOpen] = useState(false);
  const pathname = usePathname();
  const destRef = useRef<HTMLDivElement>(null);
  const pkgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setDestOpen(false);
    setPkgOpen(false);
  }, [pathname]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (destRef.current && !destRef.current.contains(e.target as Node)) setDestOpen(false);
      if (pkgRef.current && !pkgRef.current.contains(e.target as Node)) setPkgOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Packages', href: '/packages', hasMega: 'pkg' },
    { label: 'Destinations', href: '#', hasMega: 'dest' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          background: '#16211D',
          minHeight: scrolled ? 62 : 78,
        }}
      >
        <div
          className="mx-auto flex items-center justify-between px-6"
          style={{ maxWidth: 1280, height: scrolled ? 62 : 78, transition: 'height 0.32s ease' }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0" aria-label="Sahapathika Holidays — Home">
            <Image
              src={SITE_CONFIG.logo}
              alt="Sahapathika Holidays"
              width={scrolled ? 36 : 46}
              height={scrolled ? 36 : 46}
              className="invert transition-all duration-300"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              if (link.hasMega === 'dest') {
                return (
                  <div key="dest" ref={destRef} className="relative">
                    <button
                      className="flex items-center gap-1 text-sm font-medium transition-colors"
                      style={{ color: destOpen ? '#FF8B80' : 'rgba(250,246,239,.82)', fontSize: 14.5 }}
                      onClick={() => { setDestOpen(v => !v); setPkgOpen(false); }}
                      aria-expanded={destOpen}
                      aria-haspopup="true"
                    >
                      Destinations
                      <ChevronDown size={14} className={cn('transition-transform', destOpen && 'rotate-180')} />
                    </button>
                    {destOpen && (
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 rounded-2xl shadow-2xl p-6"
                        style={{ background: '#16211D', border: '1px solid rgba(250,246,239,.08)', width: 520, zIndex: 50 }}
                      >
                        {['Kerala', 'India', 'International'].map(group => (
                          <div key={group} className="mb-4">
                            <p className="text-xs font-bold tracking-widest mb-2" style={{ color: '#FF8B80' }}>{group.toUpperCase()}</p>
                            <div className="grid grid-cols-2 gap-1">
                              {DESTINATIONS.filter(d => d.region === group || (group === 'India' && ['India','Kashmir','Himachal Pradesh'].includes(d.region))).map(d => (
                                <Link
                                  key={d.label}
                                  href={d.href}
                                  className="flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors hover:bg-white/10"
                                  style={{ color: 'rgba(250,246,239,.8)' }}
                                >
                                  {d.label}
                                  <span
                                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                                    style={{
                                      background: d.badge === 'BOOKABLE' ? 'rgba(94,169,140,.18)' : 'rgba(217,164,65,.15)',
                                      color: d.badge === 'BOOKABLE' ? '#5FA98C' : '#D9A441',
                                    }}
                                  >
                                    {d.badge}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              if (link.hasMega === 'pkg') {
                return (
                  <div key="pkg" ref={pkgRef} className="relative">
                    <button
                      className="flex items-center gap-1 text-sm font-medium transition-colors"
                      style={{ color: pkgOpen ? '#FF8B80' : 'rgba(250,246,239,.82)', fontSize: 14.5 }}
                      onClick={() => { setPkgOpen(v => !v); setDestOpen(false); }}
                      aria-expanded={pkgOpen}
                      aria-haspopup="true"
                    >
                      Packages
                      <ChevronDown size={14} className={cn('transition-transform', pkgOpen && 'rotate-180')} />
                    </button>
                    {pkgOpen && (
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 rounded-2xl shadow-2xl p-6"
                        style={{ background: '#16211D', border: '1px solid rgba(250,246,239,.08)', width: 360, zIndex: 50 }}
                      >
                        <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#FF8B80' }}>BROWSE BY CATEGORY</p>
                        <div className="flex flex-col gap-1">
                          {PACKAGE_CATS.map(cat => (
                            <Link
                              key={cat.label}
                              href={cat.href}
                              className="px-3 py-2 rounded-xl text-sm transition-colors hover:bg-white/10"
                              style={{ color: 'rgba(250,246,239,.8)' }}
                            >
                              {cat.label}
                            </Link>
                          ))}
                        </div>
                        <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(250,246,239,.08)' }}>
                          <Link
                            href="/packages"
                            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-colors"
                            style={{ background: '#E5483D', color: '#FAF6EF' }}
                          >
                            View all packages →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium transition-colors"
                  style={{
                    color: isActive ? '#FF8B80' : 'rgba(250,246,239,.82)',
                    fontSize: 14.5,
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={SITE_CONFIG.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold px-4 py-2 rounded-full transition-all hover:opacity-90"
              style={{ background: '#E5483D', color: '#FAF6EF', letterSpacing: '.04em' }}
            >
              Book Now
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-xl transition-colors hover:bg-white/10"
            style={{ color: '#FAF6EF' }}
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div
            className="md:hidden absolute top-full left-0 right-0 py-4 px-6"
            style={{ background: '#16211D', borderTop: '1px solid rgba(250,246,239,.08)' }}
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {[
                { label: 'Home', href: '/' },
                { label: 'All Packages', href: '/packages' },
                { label: 'About', href: '/about' },
                { label: 'Contact', href: '/contact' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors"
                  style={{ color: pathname === link.href ? '#FF8B80' : 'rgba(250,246,239,.82)' }}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={SITE_CONFIG.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 text-center text-sm font-bold px-4 py-3 rounded-xl"
                style={{ background: '#E5483D', color: '#FAF6EF' }}
              >
                Book Now via WhatsApp
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
