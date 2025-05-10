import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  return (
    <>
      <Header />
      <section>
        <h1>About MetrikCorp</h1>
        <p>
          MetrikCorp is run by a senior Linux server administrator and full-stack web developer. With real-world expertise in hosting, DNS, Docker, React, WordPress, and beyond — we provide end-to-end digital solutions.
        </p>
        <p>
          Whether you're starting fresh or fixing a mess, MetrikCorp is your partner for digital reliability.
        </p>
      </section>
      <Footer />
    </>
  );
}