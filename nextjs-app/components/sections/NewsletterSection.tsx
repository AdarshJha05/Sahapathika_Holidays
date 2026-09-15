'use client';

import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  return (
    <section className="py-20 px-6" style={{ background: '#DCEEE7' }}>
      <div className="mx-auto text-center" style={{ maxWidth: 560 }}>
        <p className="text-xs font-extrabold tracking-[.24em] mb-3" style={{ color: '#2F7A63' }}>
          THE LETTER
        </p>
        <h2
          className="font-display font-light mb-4"
          style={{ fontSize: 'clamp(28px,3.5vw,42px)', color: '#16211D' }}
        >
          Stay in the <em className="not-italic" style={{ color: '#E5483D' }}>know</em>
        </h2>
        <p className="text-sm leading-relaxed mb-8" style={{ color: '#3A4A44' }}>
          Early notice on new itineraries, travel stories and members-only offers.
        </p>

        {done ? (
          <div className="flex items-center justify-center gap-2 text-base font-semibold" style={{ color: '#2F7A63' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            You&apos;re on the list!
          </div>
        ) : (
          <form
            className="flex w-full max-w-sm mx-auto rounded-full overflow-hidden"
            style={{ border: '2px solid #16211D', background: 'rgba(255,255,255,.6)' }}
            onSubmit={(e) => { e.preventDefault(); if (email) setDone(true); }}
          >
            <label htmlFor="nl-email-home" className="sr-only">Email address</label>
            <input
              id="nl-email-home"
              type="email"
              name="email"
              placeholder="Leave your email"
              autoComplete="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 min-w-0 border-0 outline-none bg-transparent text-sm px-5 py-3"
              style={{ fontSize: 16 }}
            />
            <button
              type="submit"
              className="text-sm font-bold px-5 py-3 transition-colors hover:opacity-90"
              style={{ background: '#E5483D', color: '#FAF6EF', borderRadius: '0 100px 100px 0' }}
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
