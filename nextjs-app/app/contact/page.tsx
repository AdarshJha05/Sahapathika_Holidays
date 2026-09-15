'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Check } from 'lucide-react';
import { SITE_CONFIG, OFFICES } from '@/data/site';
import { PACKAGES } from '@/data/packages';

const INITIAL_FORM = {
  name: '', email: '', phone: '', packageName: '', date: '', guests: '2', message: ''
};

export default function ContactPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div style={{ paddingTop: 78, background: '#FAF6EF', minHeight: '100vh' }}>
      {/* Header */}
      <div className="px-6 py-20 text-center" style={{ background: '#16211D' }}>
        <p className="text-xs font-extrabold tracking-[.24em] mb-3" style={{ color: '#FF8B80' }}>GET IN TOUCH</p>
        <h1 className="font-display font-light" style={{ fontSize: 'clamp(36px,5vw,62px)', color: '#FAF6EF' }}>
          Let&apos;s plan your{' '}
          <em className="not-italic" style={{ color: '#E5483D' }}>journey</em>
        </h1>
      </div>

      <div className="mx-auto px-6 py-16 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div>
            <h2 className="font-display font-light text-2xl mb-6" style={{ color: '#1B1A17' }}>
              Reach <em className="not-italic" style={{ color: '#E5483D' }}>us</em>
            </h2>
            <div className="flex flex-col gap-4 mb-10">
              <a href={SITE_CONFIG.mailto} className="flex items-center gap-4 p-4 rounded-2xl bg-white hover:shadow-md transition-shadow" style={{ boxShadow: '0 4px 20px -8px rgba(22,33,29,.1)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#FDE8E4' }}>
                  <Mail size={20} style={{ color: '#E5483D' }} />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-wider mb-0.5" style={{ color: '#B5822A' }}>EMAIL</p>
                  <p className="text-sm font-medium">{SITE_CONFIG.email}</p>
                </div>
              </a>
              <a href={SITE_CONFIG.tel} className="flex items-center gap-4 p-4 rounded-2xl bg-white hover:shadow-md transition-shadow" style={{ boxShadow: '0 4px 20px -8px rgba(22,33,29,.1)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#FDE8E4' }}>
                  <Phone size={20} style={{ color: '#E5483D' }} />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-wider mb-0.5" style={{ color: '#B5822A' }}>PHONE / WHATSAPP</p>
                  <p className="text-sm font-medium">{SITE_CONFIG.phone}</p>
                </div>
              </a>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white" style={{ boxShadow: '0 4px 20px -8px rgba(22,33,29,.1)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#FDE8E4' }}>
                  <MapPin size={20} style={{ color: '#E5483D' }} />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-wider mb-0.5" style={{ color: '#B5822A' }}>OFFICES</p>
                  <p className="text-sm font-medium">Delhi · Kochi</p>
                </div>
              </div>
            </div>

            {/* Office maps */}
            <div className="flex flex-col gap-4">
              {OFFICES.map(office => (
                <div key={office.id}>
                  <p className="text-sm font-bold mb-2">{office.city} Office</p>
                  <div className="rounded-2xl overflow-hidden" style={{ height: 200 }}>
                    <iframe
                      src={office.mapEmbedUrl}
                      width="100%"
                      height="200"
                      style={{ border: 0, display: 'block' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${office.city} office map`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enquiry form */}
          <div>
            <h2 className="font-display font-light text-2xl mb-6" style={{ color: '#1B1A17' }}>
              Send an <em className="not-italic" style={{ color: '#E5483D' }}>enquiry</em>
            </h2>

            {sent ? (
              <div className="text-center py-16 rounded-2xl bg-white" style={{ boxShadow: '0 12px 40px -16px rgba(22,33,29,.15)' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#DCEEE7' }}>
                  <Check size={32} style={{ color: '#2F7A63' }} />
                </div>
                <h3 className="font-semibold text-xl mb-2">Enquiry received!</h3>
                <p className="text-sm mb-6" style={{ color: '#6B655C' }}>We&apos;ll get back to you within 24 hours.</p>
                <button onClick={() => { setSent(false); setForm(INITIAL_FORM); }} className="text-sm font-semibold" style={{ color: '#E5483D' }}>
                  Send another enquiry →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 flex flex-col gap-4" style={{ boxShadow: '0 12px 40px -16px rgba(22,33,29,.15)' }}>
                {[
                  { id: 'ct-name', label: 'Your name *', key: 'name', type: 'text', required: true },
                  { id: 'ct-email', label: 'Email address *', key: 'email', type: 'email', required: true },
                  { id: 'ct-phone', label: 'Phone / WhatsApp', key: 'phone', type: 'tel', required: false },
                  { id: 'ct-date', label: 'Preferred travel date', key: 'date', type: 'date', required: false },
                ].map(field => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="text-xs font-bold block mb-1" style={{ color: '#3A4A44' }}>{field.label}</label>
                    <input
                      id={field.id}
                      type={field.type}
                      required={field.required}
                      value={form[field.key as keyof typeof form]}
                      onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                      className="w-full text-sm px-4 py-2.5 rounded-xl border outline-none"
                      style={{ borderColor: '#e2ddd6', fontSize: 16 }}
                    />
                  </div>
                ))}

                <div>
                  <label htmlFor="ct-pkg" className="text-xs font-bold block mb-1" style={{ color: '#3A4A44' }}>Package of interest</label>
                  <select
                    id="ct-pkg"
                    value={form.packageName}
                    onChange={e => setForm(f => ({ ...f, packageName: e.target.value }))}
                    className="w-full text-sm px-4 py-2.5 rounded-xl border outline-none"
                    style={{ borderColor: '#e2ddd6' }}
                  >
                    <option value="">— Any / Custom —</option>
                    {PACKAGES.map(p => <option key={p.slug} value={p.title}>{p.title}</option>)}
                  </select>
                </div>

                <div>
                  <label htmlFor="ct-msg" className="text-xs font-bold block mb-1" style={{ color: '#3A4A44' }}>Message or requirements</label>
                  <textarea
                    id="ct-msg"
                    rows={4}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full text-sm px-4 py-2.5 rounded-xl border outline-none resize-none"
                    style={{ borderColor: '#e2ddd6', fontSize: 16 }}
                    placeholder="Tell us about your dream trip…"
                  />
                </div>

                <button type="submit" className="w-full py-3.5 rounded-xl font-bold text-sm" style={{ background: '#E5483D', color: '#FAF6EF' }}>
                  Send Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
