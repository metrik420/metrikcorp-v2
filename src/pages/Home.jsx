// =============================================================================
// src/pages/Home.jsx
// Homepage content for MetrikCorp
// • DefaultSEO for meta tags & JSON‑LD via react‑helmet
// • Site‑wide <Header /> and <Footer />
// • Canvas background injection (network.js)
// • Instant‑reveal fallback for non‑scrollable views
// • GSAP + ScrollTrigger scroll animations
// • React‑Feather SVG icons (.icon-svg styled in style.css)
// • Fully responsive from mobile → 8K
// =============================================================================

import React, { useEffect } from 'react';
import { DefaultSEO } from '../seo.jsx';              // SEO & structured data
import Header from '../components/Header';            // Sticky, theme‑aware header
import Footer from '../components/Footer';            // Theme‑aware footer
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Mail,
  Code,
  Monitor,
  Shield,
  Server,
  BarChart2,
  UserCheck,
  Globe,
  Cpu,
  TrendingUp,
} from 'react-feather';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // 1) Inject network.js canvas background script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/network.js';
    script.defer = true;
    document.body.appendChild(script);
    return () => void document.body.removeChild(script);
  }, []);

  // 2) Scroll animations with instant‑reveal fallback
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll(
        '.section-title, .section-text, .service-card, .why-card'
      )
    );

    if (document.documentElement.scrollHeight <= window.innerHeight) {
      // No scrollbar → reveal all immediately
      gsap.set(els, { opacity: 1, y: 0, scale: 1 });
    } else {
      // Animate each element on scroll
      els.forEach((el, i) => {
        const isCard =
          el.classList.contains('service-card') ||
          el.classList.contains('why-card');
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: isCard ? 'top 90%' : 'top 80%',
            end: isCard ? 'bottom 10%' : 'bottom 20%',
            toggleActions: 'play reverse play reverse',
          },
          opacity: 0,
          y: isCard ? 60 : 40,
          scale: isCard ? 0.95 : 0.98,
          duration: isCard ? 0.7 : 0.8,
          ease: isCard ? 'back.out(1.3)' : 'power3.out',
          delay: isCard ? i * 0.1 : 0,
        });
      });
    }

    window.addEventListener('resize', ScrollTrigger.refresh);
    return () => window.removeEventListener('resize', ScrollTrigger.refresh);
  }, []);

  // 3) Data arrays for Services & “Why MetrikCorp?” sections
  const services = [
    {
      Icon: Mail,
      title: 'Professional Email & DNS',
      description:
        'Setup/manage SPF, DKIM, DMARC; custom mail servers or G Suite—reach the inbox.',
    },
    {
      Icon: Code,
      title: 'Custom Website Development',
      description:
        'Fast, SEO‑friendly sites with React, WordPress or PHP—tailored to your brand.',
    },
    {
      Icon: Monitor,
      title: '24/7 Uptime Monitoring',
      description:
        'Continuous checks, alerts & on‑call fixes—keeping you live around the clock.',
    },
    {
      Icon: Shield,
      title: 'Security & Malware Cleanup',
      description:
        'Regular audits, patching, firewalls & malware removal to lock down your stack.',
    },
    {
      Icon: Server,
      title: 'Hosting & Server Advisory',
      // **UPDATED COPY**: you don’t self‑host— you guide and manage
      description:
        'We help you choose and configure the ideal hosting provider, take over existing accounts, or set up your own servers via remote access.',
    },
    {
      Icon: BarChart2,
      title: 'Growth & Scaling Strategy',
      description:
        'Advice on performance tuning, CDN, caching & next‑level infra.',
    },
  ];

  const values = [
    {
      Icon: UserCheck,
      title: 'Hands‑On Expert Support',
      description:
        'Work directly with a senior full‑stack/Linux pro—no account managers.',
    },
    {
      Icon: Globe,
      title: 'All‑In‑One Partner',
      // **UPDATED COPY**: one expert coordinating their existing or new services
      description:
        'From selecting your hosting partner to ongoing web, email, security & scaling operations—everything orchestrated under one expert.',
    },
    {
      Icon: Cpu,
      title: 'Always Up & Secure',
      description:
        '24/7 monitoring, auto‑updates & proactive hardening.',
    },
    {
      Icon: TrendingUp,
      title: 'Built to Scale',
      description:
        'From mom‑and‑pop shops to high‑traffic platforms—we grow with you.',
    },
  ];

  return (
    <>
      {/* 4) SEO META & JSON‑LD via DefaultSEO */}
      <DefaultSEO
        title="Start Your Online Journey Today | MetrikCorp"
        description="MetrikCorp helps busy businesses launch, maintain, and secure their online presence—websites, email, hosting advice, monitoring, and security."
        url="https://metrikcorp.com/"
        image="https://metrikcorp.com/assets/og-image.jpg"
      />

      {/* 5) SITE HEADER */}
      <Header />

      {/* 6) HERO SECTION */}
      <section className="hero">
        <canvas id="network-bg" />
        <div className="hero-text container">
          <h1 className="section-title">Start Your Online Journey Today!</h1>
          <p className="section-text">
            We help busy businesses launch, maintain and secure their entire
            online presence—websites, email, hosting advice, monitoring and
            security—so you can focus on running your business.
          </p>
          <a className="cta-button" href="/contact">
            Schedule Your Free Consultation
          </a>
        </div>
      </section>

      {/* 7) ABOUT SECTION */}
      <section className="about-section container">
        <h2 className="section-title">Who We Are</h2>
        <p className="section-text">
          MetrikCorp is a one‑person digital engineering studio led by a senior
          Linux administrator and full‑stack developer. We specialize in
          professional email, custom websites, hosting advisory, security, and
          24/7 monitoring—so you never worry about the tech.
        </p>
      </section>

      {/* 8) SERVICES SECTION */}
      <section className="services-section container">
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          {services.map(({ Icon, title, description }, idx) => (
            <div className="service-card" key={idx}>
              <Icon className="icon-svg" aria-hidden="true" />
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9) WHY METRIKCORP SECTION */}
      <section className="why-metrik container">
        <h2 className="section-title">Why MetrikCorp?</h2>
        <div className="why-grid">
          {values.map(({ Icon, title, description }, idx) => (
            <div className="service-card why-card" key={idx}>
              <Icon className="icon-svg" aria-hidden="true" />
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 10) CTA BANNER */}
      <section className="cta-banner container">
        <h2 className="section-title">
          Ready to Simplify Your Online Presence?
        </h2>
        <a className="cta-button" href="/contact">
          Let’s Talk
        </a>
      </section>

      {/* 11) SITE FOOTER */}
      <Footer />
    </>
  );
}
