// File: src/pages/Home.jsx
// ============================================================================
// Home.jsx – MetrikCorp Homepage
// Fully structured and animated React component with theme‑compatible styling
// ============================================================================

import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP’s ScrollTrigger plugin once
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // ────────────────────────────────────────────────────────────────────────────
  // Inject the animated network background script when component mounts
  // ────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/network.js';    // real‑time canvas animation
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // ────────────────────────────────────────────────────────────────────────────
  // GSAP ScrollTrigger animations for section titles, service cards, and why‑cards
  // ────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    // Animate each section title as it scrolls into view
    gsap.utils.toArray('.section-title').forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',       // when the top of the element hits 80% of viewport
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
      });
    });

    // Animate service cards one by one
    gsap.utils.toArray('.service-card').forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
        opacity: 0,
        y: 40,
        duration: 0.5,
        delay: i * 0.2,           // stagger by 0.2s per card
      });
    });

    // Animate “Why MetrikCorp” cards
    gsap.utils.toArray('.why-card').forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: i * 0.15,
      });
    });
  }, []);

  // ────────────────────────────────────────────────────────────────────────────
  // Data arrays driving the Services & Why‑MetrikCorp sections
  // ────────────────────────────────────────────────────────────────────────────
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
        'No outsourcing, no account managers — just real-time, expert‑level support from the person who built your system.',
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
      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* SITE HEADER */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <Header />

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* HERO SECTION */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <section className="hero always-light-text">
        <canvas id="network-bg"></canvas>
        <div className="hero-text container">
          <h1>Digital Infrastructure, Delivered Right</h1>
          <p>
            We help businesses launch, scale, and secure their digital presence through expert web development
            and infrastructure engineering.
          </p>
          <a className="cta-button" href="/contact">
            Schedule Your Free Consultation
          </a>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* ABOUT SECTION */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <section className="about-section container">
        <h2 className="section-title always-light-text">About MetrikCorp</h2>
        <p className="always-light-text">
          MetrikCorp is a one-person digital engineering studio led by a senior Linux administrator and full-stack
          developer. We specialize in transforming complex business needs into simple, secure, and scalable systems —
          from websites to server stacks. By combining development and infrastructure under one roof, we deliver
          streamlined solutions that work flawlessly from launch to long-term growth.
        </p>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* SERVICES SECTION */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <section className="services-section container">
        <h2 className="section-title always-light-text">Our Services</h2>
        <div className="services-grid">
          {services.map((service, idx) => (
            <div className="service-card always-light-text" key={idx}>
              {/* Icon with consistent sizing, lazy load, and fallback */}
              <img
                src={service.icon}
                className="icon-img"
                alt={`${service.title} icon`}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = '/assets/icons/fallback.png';
                }}
              />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* WHY METRIKCORP SECTION */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <section className="why-metrik container">
        <h2 className="section-title always-light-text">Why MetrikCorp?</h2>
        <div className="why-grid">
          {values.map((value, idx) => (
            <div className="service-card why-card always-light-text" key={idx}>
              {/* Icon with fallback */}
              <img
                src={value.icon}
                className="icon-img"
                alt={`${value.title} icon`}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = '/assets/icons/fallback.png';
                }}
              />
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* CTA BANNER */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <section className="cta-banner always-light-text">
        <h2>Ready to simplify your online presence?</h2>
        <a className="cta-button" href="/contact">
          Let’s Talk
        </a>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* SITE FOOTER */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <Footer />
    </>
  );
}
