// File: src/App.jsx
// ============================================================================
// MetrikCorp V2 – Main App Component
// • Renders layout + routed pages
// • Handles "k" Easter Egg popup with tribute to Kayesin
// ============================================================================

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import Header from './components/Header';
import Footer from './components/Footer';

// Page Routes
import Home     from './pages/Home';
import About    from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Contact  from './pages/Contact';

// App Component
export default function App() {
  // ───────────────────────────────────────────────────────────────────────────
  // 1. STATE – Easter Egg popup toggle
  // ───────────────────────────────────────────────────────────────────────────
  const [eggActive, setEggActive] = useState(false);

  // 2. Handler – called when letter “k” in logo is clicked
  const handleEggTrigger = () => {
    console.log("🥚 Easter Egg triggered");
    setEggActive(true);
  };

  // 3. Handler – closes modal when ✕ clicked
  const closeEgg = () => {
    console.log("❌ Easter Egg closed");
    setEggActive(false);
  };

  return (
    <Router>
      <div className="app-wrapper">
        {/* ─────────────────────────────────────────────────────────────────────
            HEADER: Includes logo + navigation + dark mode toggle
        ───────────────────────────────────────────────────────────────────── */}
        <Header onEggTrigger={handleEggTrigger} />

        {/* ─────────────────────────────────────────────────────────────────────
            MAIN ROUTED PAGES
        ───────────────────────────────────────────────────────────────────── */}
        <main className="main-content">
          <Routes>
            <Route path="/"         element={<Home />} />
            <Route path="/about"    element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact"  element={<Contact />} />
          </Routes>
        </main>

        {/* ─────────────────────────────────────────────────────────────────────
            FOOTER – Static across all routes
        ───────────────────────────────────────────────────────────────────── */}
        <Footer />

        {/* ─────────────────────────────────────────────────────────────────────
            EASTER EGG MODAL – Hidden tribute to Kayesin’s first website
        ───────────────────────────────────────────────────────────────────── */}
        {eggActive && (
          <div className="easter-egg-modal easter-egg-animate">
            {/* Close Button */}
            <button
              className="close-btn"
              onClick={closeEgg}
              aria-label="Close Easter Egg"
            >
              × Close
            </button>

            {/* Family Tribute Message */}
            <div className="easter-egg-content">
              <h2>🥚 You Found the Easter Egg</h2>
              <p>
                This is hidden on every MetrikCorp site as a tribute to the first site
                my son <strong>Kayesin</strong> ever made.
              </p>
              <p>
                MetrikCorp is a piece of my love for my kids. I hope this helps you remember
                that even when I’m gone, I’m still with you. Always.
              </p>
            </div>

            {/* Replica of his first HTML file */}
            <div className="easter-egg-replica">
              <h1>hello, World!</h1>
              <p>
                hi this is <strong>Kayesin</strong>. this is my first wedsite!<br />
                <span>5-11-25 3:26 PM MST</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}
