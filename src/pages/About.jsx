// ─────────────────────────────────────────────────────────────────────────────
// File: src/pages/About.jsx
// About – batch animations for title and text
// ─────────────────────────────────────────────────────────────────────────────
import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  useEffect(() => {
    ScrollTrigger.batch('.section-title, .section-text', {
      onEnter: b=>gsap.fromTo(b, {opacity:0,y:20}, {opacity:1,y:0, stagger:0.1, duration:0.5}),
      start:'top 85%', once:true
    });
  }, []);

  return (
    <section className="container">
      <h1 className="section-title">About MetrikCorp</h1>
      <p className="section-text">MetrikCorp is run by a senior Linux server administrator...</p>
      <p className="section-text">Whether you're starting fresh or fixing a mess...</p>
    </section>
  );
}
