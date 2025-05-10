import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Services() {
  const services = [
    'Custom Web Development (React, PHP, WordPress)',
    'Responsive UI/UX Design',
    'Website Launch & Hosting Setup',
    'Server Stack Setup (Docker, WHM, AlmaLinux)',
    'Performance & SEO Optimization',
    'Email Deliverability & DNS Configuration',
    'Security Hardening & Malware Cleanup',
    'Monitoring & Automation',
    'Maintenance & Support'
  ];

  return (
    <>
      <Header />
      <section>
        <h1>Services</h1>
        <ul>
          {services.map((srv, i) => (
            <li key={i}>{srv}</li>
          ))}
        </ul>
      </section>
      <Footer />
    </>
  );
}