'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight } from 'lucide-react';
import { Package, CATEGORY_COLOR } from '@/data/packages';
import { cn } from '@/lib/utils';

interface PackageCardProps {
  pkg: Package;
  layoutId?: string;
  priority?: boolean;
}

export default function PackageCard({ pkg, layoutId, priority }: PackageCardProps) {
  const catColor = CATEGORY_COLOR[pkg.category] ?? '#C4432B';

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="group relative flex flex-col overflow-hidden bg-white"
      style={{ borderRadius: 24, boxShadow: 'var(--shadow-card)' }}
    >
      {/* Image */}
      <Link href={`/packages/${pkg.slug}`} className="block overflow-hidden" style={{ height: 220 }}>
        <motion.div
          className="w-full h-full"
          whileHover={{ scale: 1.09 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          layoutId={layoutId}
        >
          <Image
            src={pkg.photo}
            alt={pkg.hint || pkg.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
          />
        </motion.div>
      </Link>

      {/* Category chip */}
      <span
        className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full"
        style={{
          background: catColor + '22',
          color: catColor,
          border: `1px solid ${catColor}44`,
          backdropFilter: 'blur(4px)',
        }}
      >
        {pkg.category}
      </span>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <Link href={`/packages/${pkg.slug}`}>
          <h3
            className="font-semibold leading-snug mb-2 group-hover:text-[#E5483D] transition-colors"
            style={{ fontSize: 17 }}
          >
            {pkg.title}
          </h3>
        </Link>
        <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: '#6B655C' }}>
          {pkg.description.slice(0, 100)}…
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5" style={{ color: '#6B655C' }}>
            <Clock size={14} />
            <span className="text-xs font-medium">{pkg.duration}</span>
          </div>
          <div className="text-sm font-semibold" style={{ color: '#E5483D' }}>
            On enquiry
          </div>
        </div>

        <Link
          href={`/packages/${pkg.slug}`}
          className={cn(
            'mt-4 flex items-center justify-center gap-2 text-sm font-bold py-3 rounded-xl transition-all hover:opacity-90 hover:gap-3'
          )}
          style={{ background: '#E5483D', color: '#FAF6EF' }}
        >
          View Package <ArrowRight size={15} />
        </Link>
      </div>
    </motion.article>
  );
}
