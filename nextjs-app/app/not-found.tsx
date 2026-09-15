import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ paddingTop: 78, background: '#FAF6EF', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
      {/* Elephant SVG */}
      <div style={{ fontSize: 80, marginBottom: 24 }} aria-hidden>🐘</div>
      <h1 className="font-display font-light" style={{ fontSize: 'clamp(32px,5vw,54px)', color: '#1B1A17', marginBottom: 16 }}>
        Lost on the <em className="not-italic" style={{ color: '#E5483D' }}>trail</em>?
      </h1>
      <p className="text-base mb-8 max-w-sm" style={{ color: '#6B655C', lineHeight: 1.7 }}>
        We couldn&apos;t find that page. Perhaps the itinerary changed — let&apos;s find you a better route.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/" className="px-6 py-3 rounded-full font-bold text-sm" style={{ background: '#E5483D', color: '#FAF6EF' }}>
          Go home
        </Link>
        <Link href="/packages" className="px-6 py-3 rounded-full font-bold text-sm border-2" style={{ borderColor: '#E5483D', color: '#E5483D' }}>
          Browse packages
        </Link>
      </div>
    </div>
  );
}
