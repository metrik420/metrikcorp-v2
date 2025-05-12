// =============================================================================
// src/seo.jsx
// Site‑wide SEO defaults & JSON‑LD structured data via react‑helmet
// =============================================================================

import React from 'react';
import { Helmet } from 'react-helmet';

export function DefaultSEO({
  title = 'MetrikCorp – Expert Digital Infrastructure',
  description = 'MetrikCorp helps busy businesses launch, scale & secure their online presence—websites, email, hosting, monitoring, and security.',
  url = 'https://metrikcorp.com',
  image = 'https://metrikcorp.com/assets/og-image.jpg',
}) {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Preconnect for fonts (performance) */}
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap"
        rel="stylesheet"
      />

      {/* JSON‑LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "MetrikCorp",
          url,
          logo: "https://metrikcorp.com/favicon-transparent.png",
          contactPoint: [
            {
              "@type": "ContactPoint",
              email: "support@metrikcorp.com",
              contactType: "Customer Support",
            },
          ],
        })}
      </script>
    </Helmet>
  );
}
