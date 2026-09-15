'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { Mail, Phone, MapPin, ArrowRight, MessageCircle } from 'lucide-react';
import { FOOTER_NAV, SITE_CONFIG } from '@/data/site';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // In production: wire to email service
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer
      className="site-footer relative isolate overflow-hidden"
      style={{
        background: '#F1EAE1',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-body)',
        color: '#16211D',
      }}
    >
      {/* Background video */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <video
          className="absolute inset-0 w-full h-full object-cover object-bottom"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4f690bd1-881a-4192-82f2-d714d34c8fb9.png"
          style={{ animation: 'fade-in 1.35s ease both' }}
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260901_122529_931c22c8-8d2d-47c0-ad51-b97f56a91e42.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div
        className="relative flex-1 flex flex-col w-full mx-auto"
        style={{
          maxWidth: 1440,
          padding: 'clamp(2.25rem,4.5vh,4rem) clamp(1.25rem,4vw,4.5rem)',
        }}
      >
        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gap: 'clamp(1.5rem,3vw,3.25rem)',
            gridTemplateColumns: 'minmax(240px,1.45fr) repeat(3,minmax(130px,.85fr)) minmax(260px,1.25fr)',
            alignItems: 'start',
          }}
        >
          {/* Brand column */}
          <div>
            <div className="flex items-center" style={{ gap: 'clamp(.65rem,1vw,1rem)', animation: 'rise-in .72s cubic-bezier(.22,1,.36,1) .04s both' }}>
              <Image src={SITE_CONFIG.logo} alt="Sahapathika Holidays" width={74} height={74} style={{ width: 'clamp(52px,4.4vw,74px)', height: 'auto' }} />
            </div>
            <p
              className="leading-relaxed"
              style={{
                marginTop: 'clamp(1.15rem,2.4vh,1.9rem)',
                maxWidth: '24ch',
                lineHeight: 1.62,
                fontSize: 'clamp(.9rem,.5vw+.8rem,1.02rem)',
                color: '#3A4A44',
                animation: 'rise-in .72s cubic-bezier(.22,1,.36,1) .12s both',
              }}
            >
              Kerala specialists, with tour packages across India and abroad — crafting journeys that connect, delight and leave a lasting imprint.
            </p>
            {/* Contacts */}
            <ul className="list-none mt-6 flex flex-col" style={{ gap: 'clamp(.6rem,1.2vh,.95rem)', animation: 'rise-in .72s cubic-bezier(.22,1,.36,1) .2s both' }}>
              <li className="flex items-center gap-3">
                <Mail size={19} style={{ color: '#E5483D', flexShrink: 0 }} aria-hidden />
                <a href={SITE_CONFIG.mailto} className="text-sm hover:underline" style={{ textUnderlineOffset: 3, color: '#16211D' }}>
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={19} style={{ color: '#E5483D', flexShrink: 0 }} aria-hidden />
                <a href={SITE_CONFIG.tel} className="text-sm hover:underline" style={{ textUnderlineOffset: 3, color: '#16211D' }}>
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={19} style={{ color: '#E5483D', flexShrink: 0 }} aria-hidden />
                <span className="text-sm" style={{ color: '#16211D' }}>Delhi · Kochi</span>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <nav aria-label="Explore">
            <p className="font-semibold uppercase tracking-wider mb-5" style={{ fontSize: 'clamp(.95rem,.5vw+.8rem,1.12rem)', letterSpacing: '.055em' }}>
              Explore
            </p>
            <ul className="flex flex-col" style={{ gap: 'clamp(.62rem,1.35vh,1.05rem)' }}>
              {FOOTER_NAV.explore.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-block text-sm transition-all hover:opacity-60 hover:translate-x-0.5" style={{ color: '#16211D' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Popular */}
          <nav aria-label="Popular">
            <p className="font-semibold uppercase tracking-wider mb-5" style={{ fontSize: 'clamp(.95rem,.5vw+.8rem,1.12rem)', letterSpacing: '.055em' }}>
              Popular
            </p>
            <ul className="flex flex-col" style={{ gap: 'clamp(.62rem,1.35vh,1.05rem)' }}>
              {FOOTER_NAV.popular.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="inline-block text-sm transition-all hover:opacity-60 hover:translate-x-0.5" style={{ color: '#16211D' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Care */}
          <nav aria-label="Care and service">
            <p className="font-semibold uppercase tracking-wider mb-5" style={{ fontSize: 'clamp(.95rem,.5vw+.8rem,1.12rem)', letterSpacing: '.055em' }}>
              Care & Service
            </p>
            <ul className="flex flex-col" style={{ gap: 'clamp(.62rem,1.35vh,1.05rem)' }}>
              {FOOTER_NAV.care.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="inline-block text-sm transition-all hover:opacity-60 hover:translate-x-0.5" style={{ color: '#16211D' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Newsletter */}
          <div>
            <p className="font-semibold uppercase tracking-wider mb-5" style={{ fontSize: 'clamp(.95rem,.5vw+.8rem,1.12rem)', letterSpacing: '.055em' }}>
              The Letter
            </p>
            <p className="text-sm leading-relaxed mb-5" style={{ maxWidth: '32ch', lineHeight: 1.62, color: '#3A4A44' }}>
              Sign up for early notice on new itineraries, travel stories & members-only offers.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: '#2F7A63' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                You&apos;re on the list!
              </div>
            ) : (
              <form onSubmit={handleSubscribe}>
                <label htmlFor="nl-email" className="sr-only">Email address</label>
                <div
                  className="flex w-full"
                  style={{
                    maxWidth: 380,
                    border: '1px solid #16211D',
                    background: 'rgba(255,255,255,.4)',
                  }}
                >
                  <input
                    ref={inputRef}
                    id="nl-email"
                    type="email"
                    name="email"
                    placeholder="Leave your email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="flex-1 min-w-0 border-0 outline-none bg-transparent text-sm"
                    style={{
                      padding: '.95rem 1.05rem',
                      fontSize: 'clamp(.9rem,.55vw+.75rem,1.02rem)',
                      color: '#16211D',
                    }}
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="flex items-center justify-center transition-colors hover:bg-[#C4362C]"
                    style={{
                      width: 'clamp(56px,4vw,66px)',
                      border: 0,
                      background: '#E5483D',
                      color: '#F1EAE1',
                    }}
                  >
                    <ArrowRight size={22} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex items-center justify-between flex-wrap mt-auto pt-12"
          style={{ gap: '1.25rem 2rem', paddingTop: 'clamp(2.5rem,6vh,4.5rem)' }}
        >
          {/* Socials */}
          <div className="flex items-center" style={{ gap: 'clamp(.9rem,1.5vw,1.5rem)' }}>
            <a href="#" aria-label="Sahapathika Holidays on Facebook" className="transition-all hover:opacity-65 hover:-translate-y-0.5">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" aria-label="Sahapathika Holidays on Instagram" className="transition-all hover:opacity-65 hover:-translate-y-0.5">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
            </a>
            <a href="#" aria-label="Sahapathika Holidays on LinkedIn" className="transition-all hover:opacity-65 hover:-translate-y-0.5">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href={SITE_CONFIG.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="transition-all hover:opacity-65 hover:-translate-y-0.5">
              <MessageCircle size={26} />
            </a>
          </div>

          {/* Legal */}
          <nav aria-label="Legal" className="flex flex-wrap" style={{ gap: 'clamp(1.15rem,2.6vw,3rem)' }}>
            <span className="text-sm" style={{ color: '#3A4A44' }}>© 2026 Sahapathika Holidays</span>
            <span className="text-sm" style={{ color: '#3A4A44' }}>Govt. Approved</span>
            <Link href="/privacy" className="text-sm hover:underline" style={{ color: '#3A4A44', textUnderlineOffset: 3 }}>Privacy Notice</Link>
            <Link href="/terms" className="text-sm hover:underline" style={{ color: '#3A4A44', textUnderlineOffset: 3 }}>Terms & Policies</Link>
            <Link href="/cookies" className="text-sm hover:underline" style={{ color: '#3A4A44', textUnderlineOffset: 3 }}>Cookie Notice</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
