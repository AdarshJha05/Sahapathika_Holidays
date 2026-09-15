import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookie Notice',
  description: 'Cookie Notice for Sahapathika Holidays — what cookies we use and how to control them.',
};

export default function CookiesPage() {
  return (
    <div style={{ paddingTop: 78, background: '#FAF6EF', minHeight: '100vh' }}>
      <div className="mx-auto px-6 py-16 max-w-3xl">
        <Link href="/" className="text-sm mb-8 inline-block" style={{ color: '#E5483D' }}>← Back to home</Link>
        <h1 className="font-display font-light text-4xl mb-8" style={{ color: '#1B1A17' }}>Cookie Notice</h1>
        <div style={{ color: '#3A4A44', lineHeight: 1.78 }}>
          <p><strong>Last updated:</strong> September 2026</p>
          <h2 className="font-semibold text-xl mt-8 mb-3">What are cookies?</h2>
          <p>Cookies are small text files placed on your device by a website. They help the site remember your preferences and work efficiently.</p>
          <h2 className="font-semibold text-xl mt-8 mb-3">Cookies we use</h2>
          <table className="w-full text-sm mt-2" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(22,33,29,.1)' }}>
                <th className="text-left py-2 pr-4 font-semibold">Name</th>
                <th className="text-left py-2 pr-4 font-semibold">Purpose</th>
                <th className="text-left py-2 font-semibold">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(22,33,29,.06)' }}>
                <td className="py-2 pr-4">sh-preloader-seen</td>
                <td className="py-2 pr-4">Prevents the intro animation replaying on each page load</td>
                <td className="py-2">Session</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-4">We do not use advertising or analytics cookies at this time.</p>
          <h2 className="font-semibold text-xl mt-8 mb-3">How to control cookies</h2>
          <p>You can delete or block cookies through your browser settings. Note that blocking all cookies may affect site functionality.</p>
          <h2 className="font-semibold text-xl mt-8 mb-3">Contact</h2>
          <p>Questions? <a href="mailto:sahapathika@gmail.com" style={{ color: '#E5483D' }}>sahapathika@gmail.com</a></p>
        </div>
      </div>
    </div>
  );
}
