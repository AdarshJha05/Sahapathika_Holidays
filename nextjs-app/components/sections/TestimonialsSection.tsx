'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '@/data/site';

export default function TestimonialsSection() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);

  const current = TESTIMONIALS[idx];

  return (
    <section className="py-20 px-6" style={{ background: '#16211D' }}>
      <div className="mx-auto text-center" style={{ maxWidth: 700 }}>
        <p className="text-xs font-extrabold tracking-[.24em] mb-8" style={{ color: '#FF8B80' }}>
          WHAT TRAVELLERS SAY
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
          >
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star key={i} size={18} fill="#D9A441" stroke="none" />
              ))}
            </div>

            <blockquote
              className="font-display italic font-light leading-relaxed mb-8"
              style={{ fontSize: 'clamp(20px,2.4vw,28px)', color: '#FAF6EF' }}
            >
              &ldquo;{current.text}&rdquo;
            </blockquote>

            <p className="text-sm font-semibold" style={{ color: 'rgba(250,246,239,.7)' }}>
              {current.name}
            </p>
            <p className="text-xs mt-1" style={{ color: 'rgba(250,246,239,.4)' }}>
              {current.location}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className="rounded-full transition-all"
              style={{
                height: 8,
                width: i === idx ? 34 : 10,
                background: i === idx ? '#E5483D' : 'rgba(250,246,239,.25)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
