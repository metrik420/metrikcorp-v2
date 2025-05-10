// ------------------------------
// Main entry point for MetrikCorp React app
// Includes route definitions and global theme loading
// ------------------------------

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Page Components
import App from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

// Global Stylesheet
import './style.css';

// Load saved theme preference (dark/light mode) before app renders
import { loadSavedTheme } from './theme';
loadSavedTheme();  // Applies saved or default theme to <html data-theme="">

// Render React App with all client-side routes
ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  </Router>
);
