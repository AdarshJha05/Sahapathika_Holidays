'use client';

import { useEffect, useRef, useState } from 'react';
import { STATS } from '@/data/site';

function CountUp({ target, suffix, active }: { target: number | null; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active || target === null) return;
    let start = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 40);
    return () => clearInterval(timer);
  }, [active, target]);

  if (target === null) return <span style={{ color: '#6B655C' }}>—</span>;
  return <>{count}{suffix}</>;
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-20 px-6" style={{ background: '#FAF6EF' }} ref={ref}>
      <div className="mx-auto" style={{ maxWidth: 1280 }}>
        <div
          className="grid gap-8"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-display text-5xl font-light mb-2"
                style={{ color: stat.tbc ? '#6B655C' : '#E5483D' }}
              >
                <CountUp target={stat.value} suffix={stat.suffix} active={active} />
              </div>
              <p className="text-sm font-semibold mb-2" style={{ color: '#1B1A17' }}>{stat.label}</p>
              {stat.tbc ? (
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: '#FDE8E4', color: '#8A6316' }}
                >
                  AWAITING DATA
                </span>
              ) : (
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: '#DCEEE7', color: '#2F7A63' }}
                >
                  VERIFIED
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
