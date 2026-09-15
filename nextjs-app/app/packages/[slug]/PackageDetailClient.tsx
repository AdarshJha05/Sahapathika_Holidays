'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Clock, MapPin, Check, X, Phone, MessageCircle, ArrowLeft, ChevronRight } from 'lucide-react';
import { type Package, CATEGORY_COLOR } from '@/data/packages';
import { SITE_CONFIG } from '@/data/site';

interface Props {
  pkg: Package;
}

export default function PackageDetailClient({ pkg }: Props) {
  const [openDay, setOpenDay] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeDay, setActiveDay] = useState(0);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquirySent, setEnquirySent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', guests: '2', message: '' });

  const catColor = CATEGORY_COLOR[pkg.category] ?? '#C4432B';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnquirySent(true);
  };

  return (
    <div style={{ paddingTop: 78, background: '#FAF6EF', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div className="px-6 py-4 max-w-[1280px] mx-auto">
        <nav className="flex items-center gap-2 text-sm" style={{ color: '#6B655C' }} aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#E5483D] transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/packages" className="hover:text-[#E5483D] transition-colors">Packages</Link>
          <ChevronRight size={14} />
          <span style={{ color: '#1B1A17' }}>{pkg.title}</span>
        </nav>
      </div>

      {/* Hero image */}
      <div className="relative overflow-hidden mx-6 rounded-3xl mb-10" style={{ height: 'clamp(280px,45vw,520px)', maxWidth: 1280, marginLeft: 'auto', marginRight: 'auto' }}>
        <motion.div className="absolute inset-0" layoutId={`pkg-card-${pkg.slug}`}>
          <Image
            src={pkg.photo}
            alt={pkg.hint || pkg.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 1280px"
          />
        </motion.div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(22,33,29,.6) 0%, transparent 50%)' }} />
        {/* Hero overlay info */}
        <div className="absolute bottom-6 left-8 right-8 flex items-end justify-between gap-4">
          <div>
            <span
              className="text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block"
              style={{ background: catColor + '33', color: catColor, border: `1px solid ${catColor}55`, backdropFilter: 'blur(4px)' }}
            >
              {pkg.category}
            </span>
            <h1 className="font-display font-light text-white" style={{ fontSize: 'clamp(24px,4vw,42px)', lineHeight: 1.2 }}>
              {pkg.title}
            </h1>
            <div className="flex items-center gap-4 mt-2">
              {pkg.duration !== 'TBC' && (
                <span className="flex items-center gap-1.5 text-sm text-white/80">
                  <Clock size={14} /> {pkg.duration}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-sm text-white/80">
                <MapPin size={14} /> {pkg.region}
              </span>
            </div>
          </div>
          <div className="hidden md:flex flex-col items-end gap-2">
            <span className="text-xs font-bold text-white/60 uppercase tracking-wider">Price</span>
            <span className="text-xl font-bold text-white">On enquiry</span>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="mx-auto px-6 pb-20" style={{ maxWidth: 1280 }}>
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Overview */}
            {pkg.overview && (
              <section className="mb-10">
                <h2 className="font-display font-light text-2xl mb-4" style={{ color: '#1B1A17' }}>
                  About this <em className="not-italic" style={{ color: '#E5483D' }}>journey</em>
                </h2>
                <p className="text-base leading-relaxed" style={{ color: '#3A4A44', lineHeight: 1.78 }}>{pkg.overview}</p>
              </section>
            )}

            {/* Highlights */}
            {pkg.highlights && pkg.highlights.length > 0 && (
              <section className="mb-10">
                <h2 className="font-display font-light text-2xl mb-6" style={{ color: '#1B1A17' }}>
                  What&apos;s <em className="not-italic" style={{ color: '#E5483D' }}>included</em>
                </h2>
                <ul className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
                  {pkg.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm" style={{ color: '#3A4A44' }}>
                      <Check size={16} className="flex-shrink-0 mt-0.5" style={{ color: '#5FA98C' }} />
                      {h}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Day-by-day itinerary */}
            {pkg.days && pkg.days.length > 0 && (
              <section className="mb-10">
                <h2 className="font-display font-light text-2xl mb-6" style={{ color: '#1B1A17' }}>
                  Day-by-day <em className="not-italic" style={{ color: '#E5483D' }}>itinerary</em>
                </h2>

                {/* Day tabs */}
                <div className="flex gap-2 flex-wrap mb-4">
                  {pkg.days.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setActiveDay(i); setOpenDay(i); }}
                      className="text-xs font-bold px-3 py-1.5 rounded-full transition-all"
                      style={{
                        background: activeDay === i ? '#E5483D' : 'rgba(229,72,61,.08)',
                        color: activeDay === i ? '#FAF6EF' : '#E5483D',
                      }}
                    >
                      Day {String(i + 1).padStart(2, '0')}
                    </button>
                  ))}
                </div>

                {/* Accordion */}
                <div className="flex flex-col gap-2">
                  {pkg.days.map((day, i) => (
                    <div
                      key={i}
                      className="rounded-2xl overflow-hidden"
                      style={{ border: '1px solid rgba(22,33,29,.1)', background: openDay === i ? '#fff' : 'transparent' }}
                    >
                      <button
                        className="w-full flex items-center justify-between px-5 py-4 text-left"
                        onClick={() => { setOpenDay(openDay === i ? null : i); setActiveDay(i); }}
                        aria-expanded={openDay === i}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: openDay === i ? '#E5483D' : '#FDE8E4', color: openDay === i ? '#FAF6EF' : '#E5483D' }}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="font-semibold text-sm">{day.title}</span>
                        </div>
                        <ChevronDown
                          size={18}
                          className="flex-shrink-0 transition-transform"
                          style={{ transform: openDay === i ? 'rotate(180deg)' : 'none', color: '#6B655C' }}
                        />
                      </button>
                      <AnimatePresence>
                        {openDay === i && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.4, ease: [0.2, 0.7, 0.3, 1] }}
                            style={{ overflow: 'hidden' }}
                          >
                            <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: '#3A4A44', lineHeight: 1.75 }}>
                              {day.body}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Includes / Excludes */}
            {(pkg.includes || pkg.excludes) && (
              <section className="mb-10">
                <div className="grid md:grid-cols-2 gap-6">
                  {pkg.includes && (
                    <div className="rounded-2xl p-5" style={{ background: '#DCEEE7' }}>
                      <h3 className="font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: '#2F7A63' }}>✓ What&apos;s Included</h3>
                      <ul className="flex flex-col gap-2">
                        {pkg.includes.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#16211D' }}>
                            <Check size={14} className="flex-shrink-0 mt-0.5" style={{ color: '#5FA98C' }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {pkg.excludes && (
                    <div className="rounded-2xl p-5" style={{ background: '#FDE8E4' }}>
                      <h3 className="font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: '#C4362C' }}>✗ Not Included</h3>
                      <ul className="flex flex-col gap-2">
                        {pkg.excludes.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#16211D' }}>
                            <X size={14} className="flex-shrink-0 mt-0.5" style={{ color: '#E5483D' }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* FAQ */}
            {pkg.faq && pkg.faq.length > 0 && (
              <section className="mb-10">
                <h2 className="font-display font-light text-2xl mb-6" style={{ color: '#1B1A17' }}>
                  Frequently asked <em className="not-italic" style={{ color: '#E5483D' }}>questions</em>
                </h2>
                <div className="flex flex-col gap-2">
                  {pkg.faq.map((item, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(22,33,29,.1)' }}>
                      <button
                        className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-sm"
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        aria-expanded={openFaq === i}
                      >
                        {item.q}
                        <ChevronDown size={18} className="flex-shrink-0 transition-transform" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', color: '#6B655C' }} />
                      </button>
                      <AnimatePresence>
                        {openFaq === i && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.4, ease: [0.2, 0.7, 0.3, 1] }}
                            style={{ overflow: 'hidden' }}
                          >
                            <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: '#3A4A44' }}>{item.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* No reviews panel */}
            <div className="rounded-2xl p-6 text-center" style={{ background: 'rgba(22,33,29,.04)', border: '1px dashed rgba(22,33,29,.12)' }}>
              <p className="text-sm font-semibold mb-1" style={{ color: '#6B655C' }}>No reviews yet for this package</p>
              <p className="text-xs" style={{ color: '#6B655C' }}>Be the first to travel and share your experience!</p>
            </div>
          </div>

          {/* Sticky sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div
              className="sticky rounded-2xl p-6"
              style={{ top: 90, background: '#fff', boxShadow: '0 12px 40px -16px rgba(22,33,29,.22)' }}
            >
              <p className="text-xs font-bold tracking-widest mb-1" style={{ color: '#B5822A' }}>PRICE</p>
              <p className="text-2xl font-bold mb-1" style={{ color: '#E5483D' }}>On Enquiry</p>
              <p className="text-xs mb-6" style={{ color: '#6B655C' }}>Inclusive of all taxes. Customised quotes available.</p>

              {pkg.duration !== 'TBC' && (
                <div className="flex items-center gap-2 mb-4 text-sm" style={{ color: '#3A4A44' }}>
                  <Clock size={16} style={{ color: '#E5483D' }} />
                  <span>{pkg.duration}</span>
                </div>
              )}
              <div className="flex items-center gap-2 mb-6 text-sm" style={{ color: '#3A4A44' }}>
                <MapPin size={16} style={{ color: '#E5483D' }} />
                <span>{pkg.region} · {pkg.regionGroup}</span>
              </div>

              <button
                onClick={() => setEnquiryOpen(true)}
                className="w-full py-3.5 rounded-xl font-bold text-sm mb-3 transition-all hover:opacity-90"
                style={{ background: '#E5483D', color: '#FAF6EF' }}
              >
                Enquire Now
              </button>

              <a
                href={`${SITE_CONFIG.whatsapp}?text=Hi! I'm interested in the ${encodeURIComponent(pkg.title)} package. Please share details.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90"
                style={{ background: '#25D366', color: '#fff' }}
              >
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>

              <p className="text-xs text-center mt-4" style={{ color: '#6B655C' }}>
                Or call us: <a href={SITE_CONFIG.tel} className="font-semibold" style={{ color: '#E5483D' }}>{SITE_CONFIG.phone}</a>
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile sticky bottom bar */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-30 flex gap-3 p-4"
        style={{ background: 'rgba(250,246,239,.95)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(22,33,29,.1)' }}
      >
        <button
          onClick={() => setEnquiryOpen(true)}
          className="flex-1 py-3 rounded-xl font-bold text-sm"
          style={{ background: '#E5483D', color: '#FAF6EF' }}
        >
          Enquire Now
        </button>
        <a
          href={`${SITE_CONFIG.whatsapp}?text=Hi! I'm interested in ${encodeURIComponent(pkg.title)}.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0"
          style={{ background: '#25D366', color: '#fff' }}
          aria-label="WhatsApp"
        >
          <MessageCircle size={20} />
        </a>
      </div>

      {/* Enquiry dialog */}
      <AnimatePresence>
        {enquiryOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              style={{ background: 'rgba(22,33,29,.5)', backdropFilter: 'blur(4px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEnquiryOpen(false)}
            />
            <motion.div
              className="fixed inset-x-4 bottom-4 top-auto md:inset-auto md:top-1/2 md:left-1/2 z-50 rounded-2xl p-6 overflow-auto"
              style={{ background: '#fff', maxWidth: 500, maxHeight: '90vh' }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              {enquirySent ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#DCEEE7' }}>
                    <Check size={32} style={{ color: '#2F7A63' }} />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">Enquiry sent!</h3>
                  <p className="text-sm mb-6" style={{ color: '#6B655C' }}>We&apos;ll get back to you within 24 hours.</p>
                  <button onClick={() => { setEnquiryOpen(false); setEnquirySent(false); }} className="text-sm font-semibold" style={{ color: '#E5483D' }}>
                    Send another →
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-lg">Enquire about {pkg.title}</h3>
                    <button onClick={() => setEnquiryOpen(false)} aria-label="Close"><X size={20} style={{ color: '#6B655C' }} /></button>
                  </div>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    {[
                      { id: 'eq-name', label: 'Your name', key: 'name', type: 'text', required: true },
                      { id: 'eq-email', label: 'Email address', key: 'email', type: 'email', required: true },
                      { id: 'eq-phone', label: 'Phone / WhatsApp', key: 'phone', type: 'tel', required: false },
                      { id: 'eq-date', label: 'Preferred travel date', key: 'date', type: 'date', required: false },
                    ].map(field => (
                      <div key={field.id}>
                        <label htmlFor={field.id} className="text-xs font-bold block mb-1" style={{ color: '#3A4A44' }}>{field.label}</label>
                        <input
                          id={field.id}
                          type={field.type}
                          required={field.required}
                          value={form[field.key as keyof typeof form]}
                          onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                          className="w-full text-sm px-4 py-2.5 rounded-xl border outline-none transition-all"
                          style={{ borderColor: '#e2ddd6', fontSize: 16 }}
                        />
                      </div>
                    ))}
                    <div>
                      <label htmlFor="eq-msg" className="text-xs font-bold block mb-1" style={{ color: '#3A4A44' }}>Any special requirements?</label>
                      <textarea
                        id="eq-msg"
                        rows={3}
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        className="w-full text-sm px-4 py-2.5 rounded-xl border outline-none resize-none"
                        style={{ borderColor: '#e2ddd6', fontSize: 16 }}
                        placeholder={`I'm interested in the ${pkg.title} package…`}
                      />
                    </div>
                    <button type="submit" className="w-full py-3 rounded-xl font-bold text-sm mt-2" style={{ background: '#E5483D', color: '#FAF6EF' }}>
                      Send Enquiry
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
