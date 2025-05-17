// =============================================================================
// src/pages/Contact.jsx
// Contact page for MetrikCorp
// • SEO via DefaultSEO (react‑helmet + JSON‑LD)
// • Sticky Header & Footer
// • Fully responsive, mobile‑first
// =============================================================================

import React from 'react';
import { DefaultSEO } from '../seo.jsx';      // Only DefaultSEO is exported

export default function Contact() {
  return (
    <>
      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* 1) SEO META & JSON‑LD */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <DefaultSEO
        title="Contact Us | MetrikCorp"
        description="Get in touch with MetrikCorp for expert web development, hosting guidance, and digital infrastructure support."
        url="https://metrikcorp.com/contact"
        image="https://metrikcorp.com/assets/og-image-contact.jpg"
      />

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* 3) CONTACT CONTENT */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <section className="container">
        <h1 className="section-title">Contact Us</h1>
        <p className="section-text">
          Email: <a href="mailto:support@metrikcorp.com">support@metrikcorp.com</a>
        </p>
        <p className="section-text">
          Let’s build something awesome together. Whether you need a new website, server optimization,
          or ongoing digital infrastructure support, we’re here to help.
        </p>
      </section>
    </>
  );
}
