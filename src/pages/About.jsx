// =============================================================================
// src/pages/About.jsx
// About page for MetrikCorp – production‑ready content
// • SEO via DefaultSEO (react‑helmet + JSON‑LD)
// • Sticky Header & Footer
// • GSAP ScrollTrigger animations with instant‑reveal fallback
// • Fully responsive, mobile‑first
// =============================================================================

import React, { useEffect } from 'react';
import { DefaultSEO } from '../seo.jsx';           // SEO metadata + structured data
import Header from '../components/Header';         // Sticky, theme‑aware header
import Footer from '../components/Footer';         // Theme‑aware footer
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  // ────────────────────────────────────────────────────────────────────────────
  // 1) ScrollTrigger animations w/ instant‑reveal fallback
  // ────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll(
        '.section-title, .section-text, .feature-item'
      )
    );
    if (document.documentElement.scrollHeight <= window.innerHeight) {
      // no scrollbar → show immediately
      gsap.set(els, { opacity: 1, y: 0 });
    } else {
      els.forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
          },
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out',
          delay: i * 0.1,
        });
      });
    }
    window.addEventListener('resize', ScrollTrigger.refresh);
    return () => window.removeEventListener('resize', ScrollTrigger.refresh);
  }, []);

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* 2) SEO META & JSON‑LD */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <DefaultSEO
        title="About Us | MetrikCorp"
        description="Discover MetrikCorp’s journey from humble scripting roots to a full‑service digital engineering studio, empowering businesses with expert web, email, hosting guidance, and bulletproof security."
        url="https://metrikcorp.com/about"
        image="https://metrikcorp.com/assets/og-image-about.jpg"
      />

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* 3) SITE HEADER */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <Header />

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* HERO / INTRO */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <section className="container about-hero">
        <h1 className="section-title">Our Story</h1>
        <p className="section-text">
          Founded in 2023 by a lifelong Linux enthusiast, MetrikCorp began as a shell‑script hobby and has grown into your one‑stop digital partner. Today, we guide entrepreneurs and SMEs through every step of their online journey—custom websites, professional email, hosting advice, 24/7 uptime monitoring, and impenetrable security.
        </p>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* MISSION & VISION */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <section className="container about-mission">
        <h2 className="section-title">Mission & Vision</h2>
        <p className="section-text">
          <strong>Mission:</strong> To demystify technology and deliver reliable, scalable, and secure online infrastructures, so business owners can focus on what they do best.
        </p>
        <p className="section-text">
          <strong>Vision:</strong> To become the most trusted family‑run digital engineering studio, where every client feels empowered and supported at every step of their growth.
        </p>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* TIMELINE / HISTORY */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <section className="container about-history">
        <h2 className="section-title">Our Journey</h2>
        <ul className="features-list">
          <li className="feature-item section-text">
            <strong>2023:</strong> Launched as a personal Linux scripting project.
          </li>
          <li className="feature-item section-text">
            <strong>2024:</strong> Added custom React/Vite web builds & initial clients.
          </li>
          <li className="feature-item section-text">
            <strong>Early 2025:</strong> Introduced GSAP animations, theme toggle, and containerized Docker deployment.
          </li>
          <li className="feature-item section-text">
            <strong>May 2025:</strong> Migrated to SVG icons, added SEO, structured data, and buried our first family Easter‑egg.
          </li>
        </ul>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* EXPERTISE & CORE VALUES */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <section className="container about-expertise">
        <h2 className="section-title">Expertise & Core Values</h2>
        <ul className="features-list">
          <li className="feature-item section-text">
            <strong>Hands‑On Expert Support:</strong> Direct collaboration with our founder at every step.
          </li>
          <li className="feature-item section-text">
            <strong>Client‑Centric Solutions:</strong> Tailored strategies—from hosting recommendations to security hardening.
          </li>
          <li className="feature-item section-text">
            <strong>Reliability & Uptime:</strong> 24/7 monitoring and proactive fixes.
          </li>
          <li className="feature-item section-text">
            <strong>Scalability:</strong> Architectures designed to grow seamlessly with your needs.
          </li>
        </ul>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* MEET THE FOUNDER */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <section className="container about-founder">
        <h2 className="section-title">Meet the Founder</h2>
        <p className="section-text">
          <em>“Technology should empower, not overwhelm.”</em><br/>
          <strong>Kayesin’s proud dad</strong>, with over a decade of Linux administration and full‑stack development, built MetrikCorp to deliver enterprise‑grade solutions with a personal touch. You’ll always work directly with him—no middlemen, no account managers.
        </p>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* 4) SITE FOOTER */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <Footer />
    </>
  );
}
