'use client';

import { MARQUEE_ITEMS } from '@/data/site';

export default function MarqueeSection() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]; // doubled for seamless loop

  return (
    <div
      className="relative overflow-hidden py-4"
      style={{ background: '#16211D', borderTop: '1px solid rgba(250,246,239,.06)' }}
      aria-label="Accreditations and specialisms"
    >
      <div
        className="flex items-center gap-0 whitespace-nowrap"
        style={{ animation: 'marquee 34s linear infinite', width: 'max-content' }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.animationPlayState = 'paused')}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.animationPlayState = 'running')}
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-0">
            <span
              className="text-xs font-bold tracking-[.18em] px-8 py-1"
              style={{ color: 'rgba(250,246,239,.6)' }}
            >
              {item}
            </span>
            <span style={{ color: '#E5483D', fontSize: 18, lineHeight: 1 }} aria-hidden>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
