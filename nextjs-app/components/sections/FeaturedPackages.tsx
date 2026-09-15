'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FEATURED_PACKAGES } from '@/data/packages';
import PackageCard from '@/components/ui/PackageCard';

export default function FeaturedPackages() {
  return (
    <section className="py-20 px-6" style={{ background: '#FAF6EF' }}>
      <div className="mx-auto" style={{ maxWidth: 1280 }}>
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-xs font-extrabold tracking-[.24em] mb-3" style={{ color: '#B5822A' }}>
              FEATURED PACKAGES
            </p>
            <h2
              className="font-display font-light leading-tight"
              style={{ fontSize: 'clamp(32px,4vw,50px)', color: '#1B1A17' }}
            >
              Curated journeys, <em className="not-italic" style={{ color: '#E5483D' }}>thoughtfully crafted</em>
            </h2>
          </div>
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full border-2 transition-all hover:bg-[#E5483D] hover:border-[#E5483D] hover:text-white"
            style={{ borderColor: '#E5483D', color: '#E5483D' }}
          >
            View all packages →
          </Link>
        </div>

        {/* Cards grid */}
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}
        >
          {FEATURED_PACKAGES.map((pkg, i) => (
            <PackageCard
              key={pkg.slug}
              pkg={pkg}
              layoutId={`pkg-card-${pkg.slug}`}
              priority={i < 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
