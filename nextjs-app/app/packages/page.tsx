import type { Metadata } from 'next';
import { Suspense } from 'react';
import PackagesClientPage from './PackagesClientPage';

export const metadata: Metadata = {
  title: 'All Packages',
  description: 'Browse all Sahapathika Holidays packages — Ayurveda retreats, honeymoon tours, heritage circuits, hill stations, Kashmir and more. Filter by category and region.',
};

export default function PackagesPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: 78 }} />}>
      <PackagesClientPage />
    </Suspense>
  );
}
