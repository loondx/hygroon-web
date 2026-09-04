import type { Metadata } from 'next';
import { brandConfig } from '@/config/brand.config';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Security & Data Protection',
  description: `How ${brandConfig.name} protects client data, credentials, and payment information: data ownership, credential isolation, and infrastructure detail.`,
  alternates: { canonical: '/security' },
};

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd trail={[{ name: 'Security', path: '/security' }]} />
      {children}
    </>
  );
}
