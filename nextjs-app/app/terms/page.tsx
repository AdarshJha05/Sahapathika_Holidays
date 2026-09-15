import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Policies',
  description: 'Terms and Policies for Sahapathika Holidays — booking conditions, cancellation policy, and general terms.',
};

export default function TermsPage() {
  return (
    <div style={{ paddingTop: 78, background: '#FAF6EF', minHeight: '100vh' }}>
      <div className="mx-auto px-6 py-16 max-w-3xl">
        <Link href="/" className="text-sm mb-8 inline-block" style={{ color: '#E5483D' }}>← Back to home</Link>
        <h1 className="font-display font-light text-4xl mb-8" style={{ color: '#1B1A17' }}>Terms & Policies</h1>
        <div style={{ color: '#3A4A44', lineHeight: 1.78 }}>
          <p><strong>Last updated:</strong> September 2026</p>
          <h2 className="font-semibold text-xl mt-8 mb-3">Booking & Payment</h2>
          <p>All packages are priced on enquiry. A confirmed booking requires a written quotation accepted by the client and a deposit (amount specified in the quotation). Balance is due per the schedule stated in the booking confirmation.</p>
          <h2 className="font-semibold text-xl mt-8 mb-3">Cancellation Policy</h2>
          <p>Cancellation terms are specified in each booking confirmation and vary by package, season, and supplier conditions. Free cancellation windows (where applicable) are stated at time of booking. Please contact us to confirm your specific cancellation terms before booking.</p>
          <h2 className="font-semibold text-xl mt-8 mb-3">Liability</h2>
          <p>Sahapathika Holidays acts as an agent for transportation, accommodation, and activity providers. We are not liable for any loss, damage, injury, or delay caused by the failure of any supplier to provide their services.</p>
          <h2 className="font-semibold text-xl mt-8 mb-3">Travel Insurance</h2>
          <p>We strongly recommend that all travellers take out comprehensive travel insurance before departure.</p>
          <h2 className="font-semibold text-xl mt-8 mb-3">Governing Law</h2>
          <p>These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in New Delhi.</p>
          <h2 className="font-semibold text-xl mt-8 mb-3">Contact</h2>
          <p>For any queries regarding these terms: <a href="mailto:sahapathika@gmail.com" style={{ color: '#E5483D' }}>sahapathika@gmail.com</a></p>
        </div>
      </div>
    </div>
  );
}
