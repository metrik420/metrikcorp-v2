// =============================================================================
// src/pages/Services.jsx
// Services page for MetrikCorp – production‑ready content
// • SEO via DefaultSEO (react‑helmet + JSON‑LD)
// • Sticky Header & Footer
// • Uses React-Feather SVG icons (no missing assets)
// • Fully responsive, mobile‑first
// =============================================================================

import React from 'react';
import { DefaultSEO } from '../seo.jsx';      // Global SEO meta tags & structured data
import {
  Mail,
  Code,
  Monitor,
  Shield,
  Server,
  BarChart2
} from 'react-feather';

export default function Services() {
  // ────────────────────────────────────────────────────────────────────────────
  // Data for Services – mapping each to a React‑Feather icon
  // ────────────────────────────────────────────────────────────────────────────
  const services = [
    {
      Icon: Mail,
      title: 'Professional Email & DNS',
      description:
        'Setup and manage SPF, DKIM, DMARC; custom mail servers or G Suite—ensure deliverability.',
    },
    {
      Icon: Code,
      title: 'Custom Website Development',
      description:
        'Fast, SEO‑friendly sites on React, WordPress or PHP—tailored to your brand & goals.',
    },
    {
      Icon: Monitor,
      title: '24/7 Uptime Monitoring',
      description:
        'Continuous checks, alerts & on‑call fixes—keeping your site live around the clock.',
    },
    {
      Icon: Shield,
      title: 'Security & Malware Cleanup',
      description:
        'Regular audits, patching, firewall hardening, and malware removal to lock down your infrastructure.',
    },
    {
      Icon: Server,
      title: 'Hosting Guidance & Onboarding',
      description:
        'We’ll help you pick and configure the perfect hosting environment—and take over management if you already have one.',
    },
    {
      Icon: BarChart2,
      title: 'Growth & Scaling Strategy',
      description:
        'Advice on performance tuning, CDN, caching, and next‑level infrastructure to support your growth.',
    },
  ];

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* 1) SEO META & JSON‑LD */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <DefaultSEO
        title="Our Services | MetrikCorp"
        description="Explore MetrikCorp’s full suite: email & DNS setup, custom site builds, uptime monitoring, security hardening, hosting guidance, and growth strategy."
        url="https://metrikcorp.com/services"
        image="https://metrikcorp.com/assets/og-image-services.jpg"
      />

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* 3) SERVICES GRID */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <section className="services-section container">
        <h1 className="section-title">Our Services</h1>
        <div className="services-grid">
          {services.map(({ Icon, title, description }, idx) => (
            <div className="service-card" key={idx}>
              {/* Icon sizing and color via global .icon-svg class */}
              <Icon className="icon-svg" aria-hidden="true" />
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
