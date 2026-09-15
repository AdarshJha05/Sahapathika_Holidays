'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { SITE_CONFIG } from '@/data/site';

export default function Preloader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show once per session
    const seen = sessionStorage.getItem('sh-preloader-seen');
    if (!seen) {
      setVisible(true);
      sessionStorage.setItem('sh-preloader-seen', '1');
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#16211D' }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 2.2 }}
          onAnimationComplete={(def) => {
            // After exit, unmount
            if ((def as { clipPath?: string }).clipPath === 'inset(0 0 100% 0)') {
              setVisible(false);
            }
          }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <Image
              src={SITE_CONFIG.logo}
              alt="Sahapathika Holidays"
              width={80}
              height={80}
              className="invert"
              priority
            />
          </motion.div>

          {/* Progress bar */}
          <div
            className="mt-8 rounded-full overflow-hidden"
            style={{ width: 210, height: 3, background: 'rgba(255,255,255,.15)' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: '#E5483D', transformOrigin: 'left' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.4 }}
            />
          </div>

          {/* Caption */}
          <motion.p
            className="mt-4 text-xs tracking-[0.26em] font-semibold"
            style={{ color: 'rgba(250,246,239,.55)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            PREPARING YOUR JOURNEY
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
