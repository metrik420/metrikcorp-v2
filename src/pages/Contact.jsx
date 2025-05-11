// ─────────────────────────────────────────────────────────────────────────────
// File: src/pages/Contact.jsx
// Contact – batch animations for heading and text
// ─────────────────────────────────────────────────────────────────────────────
import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  useEffect(() => {
    ScrollTrigger.batch('.section-title, .section-text', {
      onEnter: b=>gsap.fromTo(b,{opacity:0,y:20},{opacity:1,y:0, stagger:0.1, duration:0.5}),
      start:'top 85%', once:true
    });
  }, []);

  return (
    <section className="container">
      <h1 className="section-title">Contact Us</h1>
      <p className="section-text">Email: support@metrikcorp.com</p>
      <p className="section-text">Let’s build something awesome together.</p>
    </section>
  );
}
