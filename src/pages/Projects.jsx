// -----------------------------------------------------------------------------
// File: src/pages/Projects.jsx
// Projects – batch animations for title and project cards
// ─────────────────────────────────────────────────────────────────────────────
import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  useEffect(() => {
    ScrollTrigger.batch('.section-title, .project-card', {
      onEnter: b=>gsap.fromTo(b,{opacity:0,y:30},{opacity:1,y:0, stagger:0.1, duration:0.5}),
      start:'top 85%', once:true
    });
  }, []);

  return (
    <section className="container">
      <h1 className="section-title">Projects</h1>
      <div className="why-grid">
        <div className="project-card">
          <p>We're building a showcase of projects. Check back soon!</p>
        </div>
      </div>
    </section>
  );
}



