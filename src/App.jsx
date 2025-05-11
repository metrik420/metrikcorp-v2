// File: src/App.jsx
// ============================================================================
// App.jsx – Top‑level layout: sticky Header, routed pages in main-content, sticky Footer
// ============================================================================

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header   from './components/Header';
import Footer   from './components/Footer';
import Home     from './pages/Home';
import About    from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Contact  from './pages/Contact';

export default function App() {
  return (
    <Router>
      <div className="app-wrapper">
        {/* Sticky header */}
        <Header />

        {/* Main scrolling content */}
        <main className="main-content">
          <Routes>
            <Route path="/"         element={<Home />} />
            <Route path="/about"    element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact"  element={<Contact />} />
          </Routes>
        </main>

        {/* Sticky footer */}
        <Footer />
      </div>
    </Router>
  );
}
