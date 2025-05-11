// File: src/pages/Home.jsx
// ============================================================================
// Home.jsx – Homepage with enhanced scroll animations (GSAP + ScrollTrigger)
// – React‑Feather SVG icons
// – Full hero/about/services/why/CTA sections
// – Responsive from mobile to 8K
// ============================================================================

import React, { useEffect } from 'react';
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
  Cpu,
  Globe,
  TrendingUp
} from 'react-feather';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // ────────────────────────────────────────────────────────────────────────────
  // Inject the network.js canvas background
  // ────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/network.js';
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  // ────────────────────────────────────────────────────────────────────────────
  // Enhanced scroll animations for headings, text and cards
  // ────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    // Animate section titles & text blocks
    gsap.utils.toArray('.section-title, .section-text').forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',         // when top of el hits 80% viewport
          end: 'bottom 20%',
          toggleActions: 'play reverse play reverse',
        },
        opacity: 0,
        y: 40,
        scale: 0.98,
        duration: 0.8,
        ease: 'power3.out',
      });
    });

    // Animate each service & why‑card individually
    gsap.utils.toArray('.service-card, .why-card').forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          end: 'bottom 10%',
          toggleActions: 'play reverse play reverse',
        },
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 0.7,
        ease: 'back.out(1.3)',
        delay: i * 0.1,             // stagger even on fast scroll
      });
    });
  }, []);

  // ────────────────────────────────────────────────────────────────────────────
  // Services (with React‑Feather SVG icons)
  // ────────────────────────────────────────────────────────────────────────────
  const services = [
    { Icon: Mail,      title: 'Professional Email & DNS',    description: 'Setup and manage SPF/DKIM/DMARC, custom mail servers or G Suite—so you always reach the inbox.' },
    { Icon: Code,      title: 'Custom Website Development',  description: 'Fast, SEO‑friendly sites built on React, WordPress or PHP—tailored to your brand and goals.' },
    { Icon: Monitor,   title: '24/7 Uptime Monitoring',      description: 'Continuous checks, alerts & on‑call fixes—keeping your site live around the clock.' },
    { Icon: Shield,    title: 'Security & Malware Cleanup',  description: 'Regular audits, patching, firewall hardening, and malware removal to lock down your infrastructure.' },
    { Icon: Server,    title: 'Hosting & Server Management', description: 'From shared hosting to Docker/Kubernetes clusters—optimized for speed, scale and cost.' },
    { Icon: BarChart2, title: 'Growth & Scaling Strategy',   description: 'Advice on performance tuning, CDN, caching, and next‑level infrastructure to support your growth.' },
  ];

  // ────────────────────────────────────────────────────────────────────────────
  // Why choose MetrikCorp?
  // ────────────────────────────────────────────────────────────────────────────
  const values = [
    { Icon: UserCheck, title: 'Hands‑On Expert Support', description: 'Work directly with a senior full‑stack and Linux pro—no account managers in between.' },
    { Icon: Globe,     title: 'All‑In‑One Partner',        description: 'Email, web, servers, security and scaling—everything under one roof for total peace of mind.' },
    { Icon: Cpu,       title: 'Always Up & Secure',        description: '24/7 monitoring, automatic updates, and proactive hardening to prevent downtime and hacks.' },
    { Icon: TrendingUp,title: 'Built to Scale',            description: 'From mom‑and‑pop shops to high‑traffic platforms—we design systems that grow with you.' },
  ];

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* HERO */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <section className="hero">
        <canvas id="network-bg" />
        <div className="hero-text container">
          <h1 className="section-title">Start Your Online Journey Today!</h1>
          <p className="section-text">
            We help busy businesses launch, maintain and secure their entire online presence—websites, email,
            hosting, monitoring and security—so you can focus on running your business.
          </p>
          <a className="cta-button" href="/contact">
            Schedule Your Free Consultation
          </a>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* ABOUT */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <section className="about-section container">
        <h2 className="section-title">Who We Are</h2>
        <p className="section-text">
          MetrikCorp is a one‑person digital engineering studio led by a senior Linux administrator and full‑stack
          web developer. We specialize in professional email, custom websites, hosting, security, and 24/7 monitoring—so you never worry about the tech.
        </p>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* SERVICES */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <section className="services-section container">
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          {services.map(({ Icon, title, description }, idx) => (
            <div className="service-card" key={idx}>
              <Icon className="icon-svg" />
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* WHY US */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <section className="why-metrik container">
        <h2 className="section-title">Why MetrikCorp?</h2>
        <div className="why-grid">
          {values.map(({ Icon, title, description }, idx) => (
            <div className="service-card why-card" key={idx}>
              <Icon className="icon-svg" />
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* CTA BANNER */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <section className="cta-banner container">
        <h2 className="section-title">Ready to Simplify Your Online Presence?</h2>
        <a className="cta-button" href="/contact">
          Let’s Talk
        </a>
      </section>
    </>
  );
}
