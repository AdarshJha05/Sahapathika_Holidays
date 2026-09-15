import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Notice',
  description: 'Privacy Notice for Sahapathika Holidays — how we collect, use, and protect your personal data.',
};

export default function PrivacyPage() {
  return (
    <div style={{ paddingTop: 78, background: '#FAF6EF', minHeight: '100vh' }}>
      <div className="mx-auto px-6 py-16 max-w-3xl">
        <Link href="/" className="text-sm mb-8 inline-block" style={{ color: '#E5483D' }}>← Back to home</Link>
        <h1 className="font-display font-light text-4xl mb-8" style={{ color: '#1B1A17' }}>Privacy Notice</h1>
        <div className="prose" style={{ color: '#3A4A44', lineHeight: 1.78 }}>
          <p><strong>Last updated:</strong> September 2026</p>
          <p>Sahapathika Holidays ("we", "us", "our") is committed to protecting your personal data. This notice explains what data we collect, how we use it, and your rights.</p>
          <h2>What we collect</h2>
          <p>When you submit an enquiry or newsletter sign-up, we collect your name, email address, phone number, and travel preferences. We do not collect payment card data.</p>
          <h2>How we use it</h2>
          <p>We use your data solely to respond to your enquiry, provide travel services, and — with your consent — send you our newsletter. We do not sell your data to third parties.</p>
          <h2>Data retention</h2>
          <p>Enquiry data is retained for 2 years. You may request deletion at any time by emailing <a href="mailto:sahapathika@gmail.com" style={{ color: '#E5483D' }}>sahapathika@gmail.com</a>.</p>
          <h2>Your rights</h2>
          <p>Under applicable law you have the right to access, correct, delete, or restrict processing of your data. Contact us at the email above to exercise these rights.</p>
          <h2>Cookies</h2>
          <p>We use minimal, functional cookies only. See our <Link href="/cookies" style={{ color: '#E5483D' }}>Cookie Notice</Link> for details.</p>
          <h2>Contact</h2>
          <p>For privacy queries: <a href="mailto:sahapathika@gmail.com" style={{ color: '#E5483D' }}>sahapathika@gmail.com</a></p>
        </div>
      </div>
    </div>
  );
}
