import Script from 'next/script';
import { GA_MEASUREMENT_ID } from '@/lib/analytics';

// Renders nothing when no GA4 property is configured — analytics is opt-in
// via env, not a hardcoded ID baked into the bundle.
export default function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
          window.gtag = gtag;
        `}
      </Script>
    </>
  );
}
