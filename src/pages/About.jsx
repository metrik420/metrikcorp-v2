// File: src/pages/About.jsx
// ============================================================================
// About.jsx – Rich, SEO‑friendly About content only (no Header/Footer here)
// – GSAP ScrollTrigger per‑element animations
// ============================================================================

import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  useEffect(() => {
    const animateIn = (els, offset = 'top 85%') => {
      els.forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: offset,
            toggleActions: 'play reverse play reverse',
          },
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out',
        });
      });
    };
    animateIn(document.querySelectorAll('.section-title'));
    animateIn(document.querySelectorAll('.section-text'));
    animateIn(document.querySelectorAll('.feature-item'), 'top 90%');
  }, []);

  return (
    <>
      {/* INTRODUCTION */}
      <section className="container about-intro">
        <h1 className="section-title">About MetrikCorp</h1>
        <p className="section-text">
          MetrikCorp is a one‑person digital engineering studio specializing in turnkey
          web development, server management, and cybersecurity. Led by a senior Linux
          administrator and full‑stack developer with 10+ years of experience, we empower
          busy business owners to launch, maintain, and protect their online presence.
        </p>
      </section>

      {/* OUR MISSION */}
      <section className="container about-mission">
        <h2 className="section-title">Our Mission</h2>
        <p className="section-text">
          To simplify complex technology for entrepreneurs and small businesses by delivering
          reliable websites, professional email, 24/7 uptime monitoring, and bulletproof
          security—so you can focus on growing your business.
        </p>
      </section>

      {/* EXPERTISE & VALUES */}
      <section className="container about-expertise">
        <h2 className="section-title">Expertise & Core Values</h2>
        <ul className="features-list">
          <li className="feature-item section-text">
            <strong>Hands‑on Expert Support:</strong> Direct access to a senior engineer.
          </li>
          <li className="feature-item section-text">
            <strong>Full‑Stack Delivery:</strong> Everything from DNS to frontend UI.
          </li>
          <li className="feature-item section-text">
            <strong>Security‑First Mindset:</strong> Proactive hardening and malware removal.
          </li>
          <li className="feature-item section-text">
            <strong>Scalable Solutions:</strong> Architectures that grow with you.
          </li>
        </ul>
      </section>

      {/* MEET THE FOUNDER */}
      <section className="container about-founder">
        <h2 className="section-title">Meet the Founder</h2>
        <p className="section-text">
          With over a decade of Linux administration and full‑stack development experience,
          our founder combines deep technical expertise with a passion for making tech
          effortless. You’ll work directly with the same expert at every step.
        </p>
      </section>
    </>
  );
}
