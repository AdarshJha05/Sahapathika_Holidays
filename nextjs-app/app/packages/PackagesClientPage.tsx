'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, RotateCcw, X, ArrowUpDown } from 'lucide-react';
import { PACKAGES, CATEGORY_COLOR, type Category } from '@/data/packages';
import PackageCard from '@/components/ui/PackageCard';
import Link from 'next/link';

const ALL_CATEGORIES = [...new Set(PACKAGES.map(p => p.category))];
const ALL_REGIONS = [...new Set(PACKAGES.map(p => p.regionGroup))];
const SORTS = ['Featured', 'Shortest', 'A–Z'] as const;

export default function PackagesClientPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedCats, setSelectedCats] = useState<Category[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [sort, setSort] = useState<typeof SORTS[number]>('Featured');
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Sync filters from URL params on mount
  useEffect(() => {
    const cat = searchParams.get('category');
    const region = searchParams.get('region');
    if (cat) setSelectedCats([decodeURIComponent(cat) as Category]);
    if (region) setSelectedRegions([decodeURIComponent(region)]);
  }, [searchParams]);

  const toggleCat = (cat: Category) =>
    setSelectedCats(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);

  const toggleRegion = (region: string) =>
    setSelectedRegions(prev => prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]);

  const reset = () => { setSelectedCats([]); setSelectedRegions([]); setSort('Featured'); };

  // Filtered + sorted packages
  const filtered = PACKAGES
    .filter(p => selectedCats.length === 0 || selectedCats.includes(p.category))
    .filter(p => selectedRegions.length === 0 || selectedRegions.includes(p.regionGroup))
    .sort((a, b) => {
      if (sort === 'A–Z') return a.title.localeCompare(b.title);
      if (sort === 'Shortest') {
        const toNum = (s: string) => parseInt(s) || 999;
        return toNum(a.duration) - toNum(b.duration);
      }
      // Featured: featured first
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });

  const hasFilters = selectedCats.length > 0 || selectedRegions.length > 0;

  return (
    <div style={{ paddingTop: 78, minHeight: '100vh', background: '#FAF6EF' }}>
      {/* Page header */}
      <div
        className="px-6 py-16 text-center"
        style={{ background: '#16211D' }}
      >
        <p className="text-xs font-extrabold tracking-[.24em] mb-3" style={{ color: '#FF8B80' }}>
          OUR PACKAGES
        </p>
        <h1
          className="font-display font-light"
          style={{ fontSize: 'clamp(36px,5vw,62px)', color: '#FAF6EF' }}
        >
          Find your perfect <em className="not-italic" style={{ color: '#E5483D' }}>journey</em>
        </h1>
        <p className="mt-4 text-sm" style={{ color: 'rgba(250,246,239,.6)' }}>
          {PACKAGES.length} curated packages across Kerala, India and beyond
        </p>
      </div>

      <div className="mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8" style={{ maxWidth: 1280 }}>
        {/* Sidebar filters */}
        <aside className="lg:w-64 flex-shrink-0">
          {/* Mobile filter toggle */}
          <button
            className="lg:hidden flex items-center gap-2 mb-4 text-sm font-semibold px-4 py-2 rounded-xl"
            style={{ background: '#16211D', color: '#FAF6EF' }}
            onClick={() => setFiltersOpen(v => !v)}
          >
            <SlidersHorizontal size={16} />
            Filters {hasFilters && `(${selectedCats.length + selectedRegions.length})`}
          </button>

          <div className={`lg:block ${filtersOpen ? 'block' : 'hidden'}`}>
            {/* Sort */}
            <div className="mb-6">
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#B5822A' }}>
                SORT BY
              </p>
              <div className="flex flex-col gap-1">
                {SORTS.map(s => (
                  <button
                    key={s}
                    onClick={() => setSort(s)}
                    className="text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors"
                    style={{
                      background: sort === s ? '#E5483D' : 'transparent',
                      color: sort === s ? '#FAF6EF' : '#1B1A17',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Category filter */}
            <div className="mb-6">
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#B5822A' }}>
                CATEGORY
              </p>
              <div className="flex flex-col gap-1">
                {ALL_CATEGORIES.map(cat => {
                  const count = PACKAGES.filter(p => p.category === cat &&
                    (selectedRegions.length === 0 || selectedRegions.includes(p.regionGroup))
                  ).length;
                  const active = selectedCats.includes(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => toggleCat(cat)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors"
                      style={{
                        background: active ? `${CATEGORY_COLOR[cat]}18` : 'transparent',
                        color: active ? CATEGORY_COLOR[cat] : '#3A4A44',
                        border: `1px solid ${active ? CATEGORY_COLOR[cat] + '44' : 'transparent'}`,
                      }}
                    >
                      <span>{cat}</span>
                      <span className="text-xs opacity-60">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Region filter */}
            <div className="mb-6">
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#B5822A' }}>
                REGION
              </p>
              <div className="flex flex-col gap-1">
                {ALL_REGIONS.map(region => {
                  const count = PACKAGES.filter(p => p.regionGroup === region &&
                    (selectedCats.length === 0 || selectedCats.includes(p.category))
                  ).length;
                  const active = selectedRegions.includes(region);
                  return (
                    <button
                      key={region}
                      onClick={() => toggleRegion(region)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors"
                      style={{
                        background: active ? '#E5483D18' : 'transparent',
                        color: active ? '#E5483D' : '#3A4A44',
                        border: `1px solid ${active ? '#E5483D44' : 'transparent'}`,
                      }}
                    >
                      <span>{region}</span>
                      <span className="text-xs opacity-60">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reset */}
            {hasFilters && (
              <button
                onClick={reset}
                className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl w-full justify-center"
                style={{ border: '1px solid #E5483D', color: '#E5483D' }}
              >
                <RotateCcw size={14} /> Reset filters
              </button>
            )}
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0">
          {/* Active filter chips */}
          {hasFilters && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCats.map(cat => (
                <button
                  key={cat}
                  onClick={() => toggleCat(cat)}
                  className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{ background: CATEGORY_COLOR[cat] + '22', color: CATEGORY_COLOR[cat] }}
                >
                  {cat} <X size={12} />
                </button>
              ))}
              {selectedRegions.map(region => (
                <button
                  key={region}
                  onClick={() => toggleRegion(region)}
                  className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{ background: '#E5483D22', color: '#E5483D' }}
                >
                  {region} <X size={12} />
                </button>
              ))}
            </div>
          )}

          <p className="text-sm mb-6" style={{ color: '#6B655C' }}>
            Showing <strong style={{ color: '#1B1A17' }}>{filtered.length}</strong> packages
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🐘</div>
              <h3 className="text-xl font-semibold mb-2">No packages found</h3>
              <p className="text-sm mb-4" style={{ color: '#6B655C' }}>Try adjusting your filters</p>
              <button onClick={reset} className="text-sm font-bold px-5 py-2.5 rounded-full" style={{ background: '#E5483D', color: '#FAF6EF' }}>
                Clear all filters
              </button>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div
                className="grid gap-6"
                style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
              >
                {filtered.map((pkg, i) => (
                  <motion.div
                    key={pkg.slug}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                  >
                    <PackageCard pkg={pkg} layoutId={`pkg-card-${pkg.slug}`} priority={i < 3} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Honest teaser cards */}
          <div className="mt-12 grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            <div className="rounded-2xl p-6 border-2 border-dashed" style={{ borderColor: '#DCEEE7', background: '#DCEEE7' + '44' }}>
              <span className="text-xs font-bold tracking-widest px-2 py-1 rounded-full mb-3 inline-block" style={{ background: '#DCEEE7', color: '#2F7A63' }}>COMING SOON</span>
              <h3 className="font-semibold text-lg mb-2">Pan-India Packages</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#6B655C' }}>We&apos;re working on more curated journeys across India. Ask us to plan a custom itinerary for your destination.</p>
              <Link href="/contact" className="text-sm font-bold" style={{ color: '#E5483D' }}>Enquire now →</Link>
            </div>
            <div className="rounded-2xl p-6 border-2 border-dashed" style={{ borderColor: '#D9A44122', background: '#D9A44108' }}>
              <span className="text-xs font-bold tracking-widest px-2 py-1 rounded-full mb-3 inline-block" style={{ background: '#FDE8E4', color: '#8A6316' }}>EXPLORE MORE</span>
              <h3 className="font-semibold text-lg mb-2">International Holidays</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#6B655C' }}>Maldives, Sri Lanka, South East Asia and beyond — available on enquiry through our team.</p>
              <Link href="/contact" className="text-sm font-bold" style={{ color: '#E5483D' }}>Join the waitlist →</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
