// ─────────────────────────────────────────────────────────────────────────────
// File: src/pages/Services.jsx
// Services – batch animations for heading and cards
// ─────────────────────────────────────────────────────────────────────────────
import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const services = [
    /* list of service strings */
  ];

  useEffect(() => {
    ScrollTrigger.batch('.section-title', {
      onEnter: b=>gsap.fromTo(b, {opacity:0,y:30}, {opacity:1,y:0, duration:0.6}),
      start:'top 85%', once:true
    });
    ScrollTrigger.batch('.service-card', {
      onEnter: b=>gsap.fromTo(b, {opacity:0,y:40}, {opacity:1,y:0, stagger:0.1, duration:0.5}),
      start:'top 85%', once:true
    });
  }, []);

  return (
    <section className="container">
      <h1 className="section-title">Our Services</h1>
      <div className="services-grid">
        {services.map((srv,i)=>(
          <div className="service-card" key={i}>
            <p>{srv}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
