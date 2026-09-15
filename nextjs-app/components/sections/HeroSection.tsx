'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, MapPin, Compass, Calendar, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

const DESTINATIONS_LIST = [
  { group: 'Kerala', items: ['Backwaters & Beaches', 'Munnar & Hill Stations', 'Ayurveda Retreats', 'Temple Circuits', 'Honeymoon Kerala', 'North Kerala Heritage'] },
  { group: 'Rest of India', items: ['Kashmir Valley', 'Shimla & Manali', 'Varanasi & Kashi', 'Rajasthan', 'Odisha Temples'] },
  { group: 'International', items: ['Maldives', 'Sri Lanka', 'South East Asia', 'Europe'] },
];

const DEST_TO_PARAM: Record<string, string> = {
  'Backwaters & Beaches': 'Beach+%26+Coastal',
  'Munnar & Hill Stations': 'Hill+%26+Backwater',
  'Ayurveda Retreats': 'Ayurveda+%26+Wellness',
  'Temple Circuits': 'Heritage+%26+Temple',
  'Honeymoon Kerala': 'Honeymoon',
  'North Kerala Heritage': 'Heritage+%26+Temple',
  'Kashmir Valley': 'Hill+Station',
  'Shimla & Manali': 'Hill+Station',
  'Varanasi & Kashi': 'Heritage+%26+Temple',
  'Rajasthan': 'Heritage+%26+Temple',
  'Odisha Temples': 'Heritage+%26+Temple',
};

const WORDS = ['Incredible', 'Timeless', 'Unforgettable'];

export default function HeroSection() {
  const router = useRouter();
  const [wordIdx, setWordIdx] = useState(0);
  const [destQuery, setDestQuery] = useState('');
  const [destOpen, setDestOpen] = useState(false);
  const [selectedDest, setSelectedDest] = useState('');
  const destRef = useRef<HTMLDivElement>(null);

  // Rotate accent word
  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % WORDS.length), 3500);
    return () => clearInterval(t);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (destRef.current && !destRef.current.contains(e.target as Node)) setDestOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = () => {
    const param = DEST_TO_PARAM[selectedDest];
    if (param) {
      router.push(`/packages?category=${param}`);
    } else {
      router.push('/packages');
    }
  };

  const filteredDests = DESTINATIONS_LIST.map(g => ({
    ...g,
    items: g.items.filter(i => i.toLowerCase().includes(destQuery.toLowerCase())),
  })).filter(g => g.items.length > 0);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ paddingTop: 78 }}
      aria-label="Hero"
    >
      {/* Video background */}
      <div className="absolute inset-0 -z-10">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero_image.jpg"
        >
          <source src="/hero_video.mp4" type="video/mp4" />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(22,33,29,.72) 0%, rgba(22,33,29,.38) 100%)' }} />
        {/* Ambient blobs */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 560, height: 560, top: '10%', left: '8%',
            background: 'radial-gradient(circle, rgba(229,72,61,.28) 0%, transparent 65%)',
            filter: 'blur(40px)',
            animation: 'drift 18s ease-in-out infinite',
          }}
          aria-hidden
        />
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 420, height: 420, bottom: '15%', right: '10%',
            background: 'radial-gradient(circle, rgba(94,169,140,.22) 0%, transparent 65%)',
            filter: 'blur(40px)',
            animation: 'drift2 22s ease-in-out infinite',
          }}
          aria-hidden
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 w-full max-w-5xl mx-auto">
        {/* Kicker */}
        <motion.p
          className="text-xs font-extrabold tracking-[.24em] mb-6"
          style={{ color: '#D9A441' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          KERALA SPECIALISTS · INDIA & ABROAD
        </motion.p>

        {/* H1 */}
        <h1
          className="font-display font-light leading-tight mb-8"
          style={{ fontSize: 'clamp(42px,5.6vw,82px)', color: '#FAF6EF' }}
        >
          {['Discover', 'India'].map((word, i) => (
            <motion.span
              key={word}
              className="inline-block mr-[0.25em]"
              initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
              transition={{ delay: 0.2 + i * 0.09, duration: 0.7 }}
            >
              {word}
            </motion.span>
          ))}
          <motion.span
            key={WORDS[wordIdx]}
            className="italic"
            style={{ color: '#E5483D' }}
            initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            {WORDS[wordIdx]}
          </motion.span>
          <motion.span
            className="inline-block ml-[0.25em]"
            initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
            transition={{ delay: 0.46, duration: 0.7 }}
          >
            & beyond
          </motion.span>
        </h1>

        <motion.p
          className="text-base leading-relaxed mb-10 mx-auto"
          style={{ color: 'rgba(250,246,239,.78)', maxWidth: '46ch' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Government-approved travel specialists crafting journeys that connect, delight, and leave a lasting imprint.
        </motion.p>

        {/* Search card */}
        <motion.div
          className="mx-auto rounded-2xl p-3 flex flex-col md:flex-row gap-2 items-stretch"
          style={{
            background: 'rgba(250,246,239,.95)',
            boxShadow: '0 28px 64px -20px rgba(22,33,29,.55)',
            maxWidth: 700,
            willChange: 'transform',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
        >
          {/* Destination dropdown */}
          <div ref={destRef} className="relative flex-1">
            <button
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-black/5 transition-colors text-left"
              onClick={() => setDestOpen(v => !v)}
            >
              <MapPin size={18} style={{ color: '#E5483D', flexShrink: 0 }} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold tracking-wider" style={{ color: '#8A6316' }}>DESTINATION</p>
                <p className="text-sm font-medium truncate" style={{ color: selectedDest ? '#1B1A17' : '#6B655C' }}>
                  {selectedDest || 'Where to?'}
                </p>
              </div>
              <ChevronDown size={16} style={{ color: '#6B655C' }} className={destOpen ? 'rotate-180' : ''} />
            </button>
            {destOpen && (
              <div
                className="absolute top-full left-0 mt-2 rounded-2xl shadow-2xl overflow-auto py-3"
                style={{ background: '#fff', zIndex: 50, minWidth: 280, maxHeight: 320, width: '100%' }}
              >
                <div className="px-4 pb-2">
                  <input
                    type="text"
                    placeholder="Search destinations…"
                    className="w-full text-sm px-3 py-2 rounded-xl border outline-none"
                    style={{ borderColor: '#DCEEE7' }}
                    value={destQuery}
                    onChange={e => setDestQuery(e.target.value)}
                    autoFocus
                  />
                </div>
                {filteredDests.map(group => (
                  <div key={group.group}>
                    <p className="px-4 pt-2 pb-1 text-xs font-bold tracking-widest" style={{ color: '#B5822A' }}>
                      {group.group.toUpperCase()}
                    </p>
                    {group.items.map(item => (
                      <button
                        key={item}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-[#FAF6EF] transition-colors"
                        style={{ color: '#1B1A17' }}
                        onClick={() => { setSelectedDest(item); setDestOpen(false); }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="w-px self-stretch" style={{ background: 'rgba(22,33,29,.1)' }} />

          {/* Experience */}
          <div className="flex-1 flex items-center gap-3 px-4 py-3">
            <Compass size={18} style={{ color: '#E5483D', flexShrink: 0 }} />
            <div>
              <p className="text-xs font-bold tracking-wider" style={{ color: '#8A6316' }}>EXPERIENCE</p>
              <p className="text-sm font-medium" style={{ color: '#6B655C' }}>Any experience</p>
            </div>
          </div>

          <div className="w-px self-stretch hidden md:block" style={{ background: 'rgba(22,33,29,.1)' }} />

          {/* Date */}
          <div className="flex-1 flex items-center gap-3 px-4 py-3">
            <Calendar size={18} style={{ color: '#E5483D', flexShrink: 0 }} />
            <div>
              <p className="text-xs font-bold tracking-wider" style={{ color: '#8A6316' }}>DATE</p>
              <p className="text-sm font-medium" style={{ color: '#6B655C' }}>Flexible</p>
            </div>
          </div>

          {/* Search */}
          <button
            onClick={handleSearch}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 hover:scale-[1.02]"
            style={{ background: '#E5483D', color: '#FAF6EF', flexShrink: 0 }}
          >
            <Search size={16} />
            <span>Search</span>
          </button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {['🏛️ Govt. Approved', '🌿 IATO Member', '⭐ Since 2015'].map(badge => (
            <span
              key={badge}
              className="text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(250,246,239,.15)', color: 'rgba(250,246,239,.85)', backdropFilter: 'blur(4px)' }}
            >
              {badge}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 rounded-full border-2 flex items-start justify-center pt-1.5" style={{ borderColor: 'rgba(250,246,239,.4)' }}>
          <div className="w-1.5 h-3 rounded-full" style={{ background: '#E5483D', animation: 'rise 1.5s ease-in-out infinite alternate' }} />
        </div>
      </motion.div>
    </section>
  );
}
