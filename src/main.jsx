// =============================================================================
// src/main.jsx
// Entry point: lazy‑load pages, wrap routes in Suspense, apply global SEO
// =============================================================================

import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DefaultSEO } from './seo';
import './style.css';
import { loadSavedTheme } from './theme';

// Apply saved theme before React renders (no flicker)
loadSavedTheme();

// Lazy‑load page chunks for faster initial load
const Home     = lazy(() => import('./pages/Home'));
const About    = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact  = lazy(() => import('./pages/Contact'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    {/* DefaultSEO provides base <title>, metas & structured data */}
    <DefaultSEO />

    {/* Suspense shows fallback until each chunk loads */}
    <Suspense fallback={<div>Loading…</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Suspense>
  </Router>
);
