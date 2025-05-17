// =============================================================================
// src/pages/About.jsx
// About page for MetrikCorp – production‑ready content
// • SEO via DefaultSEO (react‑helmet + JSON‑LD)
// • Sticky Header & Footer
// • GSAP ScrollTrigger animations with instant‑reveal fallback
// • Fully responsive, mobile‑first
// =============================================================================

import React, { useEffect } from 'react';
import { DefaultSEO } from '../seo.jsx';           // Global SEO meta tags & JSON‑LD
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  // ────────────────────────────────────────────────────────────────────────────
  // 1) ScrollTrigger animations with “instant‑reveal” fallback
  //    • If non‑scrollable, reveal all immediately
  //    • Otherwise, animate each element as it enters viewport
  // ────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll(
        '.section-title, .section-text, .feature-item'
      )
    );

    if (document.documentElement.scrollHeight <= window.innerHeight) {
      // No scrollbar → reveal at once
      gsap.set(els, { opacity: 1, y: 0 });
    } else {
      // Animate each with staggered delay
      els.forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
            markers: false,
          },
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out',
          delay: i * 0.1,
        });
      });
    }

    // Refresh on resize/orientation change
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* 2) SEO META & JSON‑LD */}
      {/*    via DefaultSEO for title, description, canonical, structured data */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <DefaultSEO
        title="About Us | MetrikCorp"
        description="Discover MetrikCorp’s journey from scripting roots to a full‑service digital engineering studio, empowering businesses with web, email, hosting guidance, and bulletproof security."
        url="https://metrikcorp.com/about"
        image="https://metrikcorp.com/assets/og-image-about.jpg"
      />


      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* 4) HERO / INTRO */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <section className="container about-hero">
        <h1 className="section-title">Our Story</h1>
        <p className="section-text">
          Founded in 2023 by a lifelong Linux enthusiast, MetrikCorp began as a shell‑script hobby
          and has grown into your one‑stop digital partner. Today, we guide entrepreneurs and SMEs
          through every step—websites, professional email, hosting advice, 24/7 monitoring, and
          impenetrable security.
        </p>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* 5) MISSION & VISION */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <section className="container about-mission">
        <h2 className="section-title">Mission & Vision</h2>
        <p className="section-text">
          <strong>Mission:</strong> To demystify technology and deliver reliable, scalable, and
          secure online infrastructures, so business owners can focus on what they do best.
        </p>
        <p className="section-text">
          <strong>Vision:</strong> To become the most trusted family‑run digital engineering studio,
          where every client feels empowered and supported at every step of their growth.
        </p>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* 6) TIMELINE / HISTORY */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <section className="container about-history">
        <h2 className="section-title">Our Journey</h2>
        <ul className="features-list">
          <li className="feature-item section-text">
            <strong>2023:</strong> Launched as a personal Linux scripting project.
          </li>
          <li className="feature-item section-text">
            <strong>2024:</strong> Added custom React/Vite web builds & onboarded first clients.
          </li>
          <li className="feature-item section-text">
            <strong>Early 2025:</strong> Introduced GSAP animations, theme toggle, and containerized Docker deployment.
          </li>
          <li className="feature-item section-text">
            <strong>May 2025:</strong> Migrated to SVG icons, added SEO & structured data, and hid our first family Easter‑egg.
          </li>
        </ul>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* 7) EXPERTISE & CORE VALUES */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <section className="container about-expertise">
        <h2 className="section-title">Expertise & Core Values</h2>
        <ul className="features-list">
          <li className="feature-item section-text">
            <strong>Hands‑On Expert Support:</strong> Direct collaboration with our founder—no account managers.
          </li>
          <li className="feature-item section-text">
            <strong>Client‑Centric Solutions:</strong> Tailored hosting guidance, site builds & security.
          </li>
          <li className="feature-item section-text">
            <strong>Reliability & Uptime:</strong> 24/7 monitoring with on‑call fixes.
          </li>
          <li className="feature-item section-text">
            <strong>Scalability:</strong> Architectures engineered to grow seamlessly.
          </li>
        </ul>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* 8) MEET THE FOUNDER */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <section className="container about-founder">
        <h2 className="section-title">Meet the Founder</h2>
        <p className="section-text">
          <em>“Technology should empower, not overwhelm.”</em><br />
          With over a decade of Linux administration and full‑stack development experience, our founder
          built MetrikCorp to deliver enterprise‑grade solutions with a personal touch. You’ll always work
          directly with him—no middlemen.
        </p>
      </section>
    </>
  );
}
