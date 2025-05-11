// File: src/pages/Home.jsx
// ============================================================================
// Home.jsx – Homepage content for MetrikCorp
// - Injects the network.js canvas background
// - Renders Hero, About, Services, Why and CTA sections
// - Batch‑animates all elements with GSAP + ScrollTrigger for instant reveals
// - Fully responsive from phones up to 8K screens
// ============================================================================

import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // ─── Inject network.js canvas script on mount ─────────────────────────────
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/network.js';
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  // ─── GSAP ScrollTrigger.batch for instant batch animations ────────────────
  useEffect(() => {
    // Animate all headings and text blocks
    ScrollTrigger.batch('.section-title, .section-text', {
      onEnter: batch =>
        gsap.fromTo(
          batch,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 }
        ),
      start: 'top 85%',
      once: true,
    });

    // Animate service cards
    ScrollTrigger.batch('.service-card', {
      onEnter: batch =>
        gsap.fromTo(
          batch,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }
        ),
      start: 'top 85%',
      once: true,
    });

    // Animate why‑cards
    ScrollTrigger.batch('.why-card', {
      onEnter: batch =>
        gsap.fromTo(
          batch,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }
        ),
      start: 'top 85%',
      once: true,
    });
  }, []);

  // ─── Data for Services & Why sections ───────────────────────────────────────
  const services = [
    {
      icon: '/assets/icons/web.png',
      title: 'Custom Web Development',
      description:
        'Fully custom websites using React, WordPress, or PHP. Built for performance and tailored to your business.',
    },
    {
      icon: '/assets/icons/stack.png',
      title: 'Server & Stack Optimization',
      description:
        'WHM, Docker, cPanel, AlmaLinux — configured for speed, security, and uptime.',
    },
    {
      icon: '/assets/icons/launch.png',
      title: 'Hosting Setup & Launch',
      description:
        'We’ll deploy your site on any host with DNS, SSL, and mail setup — or manage it for you.',
    },
    {
      icon: '/assets/icons/seo.png',
      title: 'Performance & SEO Tuning',
      description:
        'Core Web Vitals, technical SEO, caching — all handled for speed and visibility.',
    },
    {
      icon: '/assets/icons/shield.png',
      title: 'Security & Malware Cleanup',
      description:
        'Malware removal, code audit, security patches, and server hardening.',
    },
    {
      icon: '/assets/icons/mail.png',
      title: 'Email & DNS Configuration',
      description:
        'SPF, DKIM, DMARC, SMTP routing — stay out of spam and in the inbox.',
    },
  ];

  const values = [
    {
      icon: '/assets/icons/expert.png',
      title: 'Work Directly with the Expert',
      description:
        'No outsourcing, no account managers — just real‑time, expert‑level support from the person who built your system.',
    },
    {
      icon: '/assets/icons/server.png',
      title: 'Full‑Stack Delivery',
      description:
        'From server architecture and hosting to frontend design and launch — you’ll get a single expert across the stack.',
    },
    {
      icon: '/assets/icons/growth.png',
      title: 'Reliable & Scalable',
      description:
        'Everything we build is structured for long‑term success, with clean code, modern tools, and best practices.',
    },
    {
      icon: '/assets/icons/shield.png',
      title: 'Secure by Default',
      description:
        'We harden all environments and deploy strict controls to protect your data and uptime.',
    },
  ];

  return (
    <>
      {/* ─── HERO SECTION ─────────────────────────────────────────────────────── */}
      <section className="hero">
        <canvas id="network-bg" />
        <div className="hero-text container">
          <h1 className="section-title">Digital Infrastructure, Delivered Right</h1>
          <p className="section-text">
            We help businesses launch, scale, and secure their digital presence through expert web development and infrastructure engineering.
          </p>
          <a className="cta-button" href="/contact">
            Schedule Your Free Consultation
          </a>
        </div>
      </section>

      {/* ─── ABOUT SECTION ────────────────────────────────────────────────────── */}
      <section className="about-section container">
        <h2 className="section-title">About MetrikCorp</h2>
        <p className="section-text">
          MetrikCorp is a one‑person digital engineering studio led by a senior Linux administrator and full‑stack developer.
        </p>
        <p className="section-text">
          By combining development and infrastructure under one roof, we deliver streamlined solutions that work flawlessly from launch to long‑term growth.
        </p>
      </section>

      {/* ─── SERVICES SECTION ─────────────────────────────────────────────────── */}
      <section className="services-section container">
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          {services.map((svc, idx) => (
            <div className="service-card" key={idx}>
              <img
                src={svc.icon}
                alt={`${svc.title} icon`}
                className="icon-img"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = '/assets/icons/fallback.png';
                }}
              />
              <h3>{svc.title}</h3>
              <p>{svc.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── WHY METRIKCORP SECTION ───────────────────────────────────────────── */}
      <section className="why-metrik container">
        <h2 className="section-title">Why MetrikCorp?</h2>
        <div className="why-grid">
          {values.map((val, idx) => (
            <div className="service-card why-card" key={idx}>
              <img
                src={val.icon}
                alt={`${val.title} icon`}
                className="icon-img"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = '/assets/icons/fallback.png';
                }}
              />
              <h3>{val.title}</h3>
              <p>{val.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA BANNER ───────────────────────────────────────────────────────── */}
      <section className="cta-banner container">
        <h2 className="section-title">Ready to simplify your online presence?</h2>
        <a className="cta-button" href="/contact">
          Let’s Talk
        </a>
      </section>
    </>
  );
}
