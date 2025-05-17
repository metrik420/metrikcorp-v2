// File: src/pages/Home.jsx
// ============================================================================
// Homepage – MetrikCorp.com
// • Animated hero with CTA
// • Services and company values
// • Injects background animation + ScrollTrigger animations
// • No layout elements (handled globally in App.jsx)
// ============================================================================

import React, { useEffect } from 'react';
import { DefaultSEO } from '../seo.jsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Mail, Code, Monitor, Shield,
  Server, BarChart2, UserCheck,
  Globe, Cpu, TrendingUp
} from 'react-feather';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // Inject canvas background animation
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/network.js';
    script.defer = true;
    document.body.appendChild(script);
    return () => void document.body.removeChild(script);
  }, []);

  // Scroll animations or instant reveal
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(
      '.section-title, .section-text, .service-card, .why-card'
    ));

    if (document.documentElement.scrollHeight <= window.innerHeight) {
      gsap.set(els, { opacity: 1, y: 0, scale: 1 });
    } else {
      els.forEach((el, i) => {
        const isCard = el.classList.contains('service-card') || el.classList.contains('why-card');
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

  // Services section
  const services = [
    { Icon: Mail,      title: 'Professional Email & DNS',    description: 'Setup/manage SPF, DKIM, DMARC; custom mail servers or G Suite—reach the inbox.' },
    { Icon: Code,      title: 'Custom Website Development',  description: 'Fast, SEO‑friendly sites with React, WordPress or PHP—tailored to your brand.' },
    { Icon: Monitor,   title: '24/7 Uptime Monitoring',      description: 'Continuous checks, alerts & on‑call fixes—keeping you live around the clock.' },
    { Icon: Shield,    title: 'Security & Malware Cleanup',  description: 'Regular audits, patching, firewalls & malware removal to lock down your stack.' },
    { Icon: Server,    title: 'Hosting Guidance & Setup',    description: 'We help you choose and configure the ideal hosting provider or manage your existing servers via SSH.' },
    { Icon: BarChart2, title: 'Growth & Scaling Strategy',   description: 'Advice on performance tuning, CDN, caching & next‑level infra for your growth.' },
  ];

  // Why MetrikCorp section
  const values = [
    { Icon: UserCheck, title: 'Hands‑On Expert Support', description: 'Work directly with a senior full‑stack/Linux pro—no middlemen.' },
    { Icon: Globe,     title: 'All‑In‑One Partner',        description: 'Email, web, hosting advice, security & scaling—all under one roof.' },
    { Icon: Cpu,       title: 'Always Up & Secure',        description: '24/7 monitoring, auto‑updates & proactive hardening.' },
    { Icon: TrendingUp,title: 'Built to Scale',            description: 'From mom‑and‑pop shops to high‑traffic platforms—we grow with you.' },
  ];

  return (
    <>
      {/* Global SEO tags */}
      <DefaultSEO
        title="Start Your Online Journey Today | MetrikCorp"
        description="MetrikCorp helps busy businesses launch, maintain, and secure their online presence—websites, email, hosting, monitoring, and security."
        url="https://metrikcorp.com/"
        image="https://metrikcorp.com/assets/og-image.jpg"
      />

      {/* Hero */}
      <section className="hero">
        <canvas id="network-bg" />
        <div className="hero-text container">
          <h1 className="section-title">Start Your Online Journey Today!</h1>
          <p className="section-text">
            We help busy businesses launch, maintain and secure their entire online presence—websites,
            email, hosting, monitoring and security—so you can focus on running your business.
          </p>
          <a className="cta-button" href="/contact">Schedule Your Free Consultation</a>
        </div>
      </section>

      {/* About */}
      <section className="about-section container">
        <h2 className="section-title">Who We Are</h2>
        <p className="section-text">
          MetrikCorp is a one‑person digital engineering studio led by a senior Linux administrator and
          full‑stack developer. We specialize in professional email, custom websites, hosting guidance,
          security, and 24/7 monitoring—so you never worry about the tech.
        </p>
      </section>

      {/* Services */}
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

      {/* Why MetrikCorp */}
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

      {/* CTA Banner */}
      <section className="cta-banner container">
        <h2 className="section-title">Ready to Simplify Your Online Presence?</h2>
        <a className="cta-button" href="/contact">Let’s Talk</a>
      </section>
    </>
  );
}
