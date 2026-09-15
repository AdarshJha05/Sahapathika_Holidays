import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PACKAGES, getPackageBySlug, getAllSlugs, CATEGORY_COLOR } from '@/data/packages';
import { SITE_CONFIG } from '@/data/site';
import PackageDetailClient from './PackageDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate all static paths at build time
export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

// Programmatic metadata — permanently fixes the copy-paste OG bug
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);

  if (!pkg) {
    return { title: 'Package Not Found' };
  }

  const duration = pkg.duration !== 'TBC' ? ` · ${pkg.duration}` : '';
  const title = `${pkg.title}${duration}`;
  const description = pkg.description;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Sahapathika Holidays`,
      description,
      images: [
        {
          url: `${SITE_CONFIG.baseUrl}${pkg.photo}`,
          width: 1200,
          height: 630,
          alt: pkg.hint || pkg.title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function PackageDetailPage({ params }: Props) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);

  if (!pkg) notFound();

  return <PackageDetailClient pkg={pkg} />;
}
