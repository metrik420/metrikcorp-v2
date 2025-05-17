// File: src/components/Header.jsx
// ============================================================================
// MetrikCorp Header Component
// • Includes animated SVG-like wordmark with glow + wave + shadow
// • Only the letter “k” is clickable and triggers Easter Egg
// • Sticky, responsive layout with theme toggle and mobile nav
// ============================================================================

import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { applyTheme, loadSavedTheme, toggleTheme } from '../theme';
import AnimatedWordmark from './LogoWordmark'; // Logo with animation
import './LogoWordmark.css';

export default function Header({ onEggTrigger }) {
  // Track dark/light mode
  const [theme, setTheme] = useState('dark');

  // Track whether mobile nav is open
  const [mobileOpen, setMobile] = useState(false);

  // Load and apply saved theme on mount
  useEffect(() => {
    const saved = loadSavedTheme();
    applyTheme(saved);
    setTheme(saved);
  }, []);

  // Toggle site theme (light ↔ dark)
  const handleToggleTheme = () => {
    toggleTheme();                   // Update <html> class
    setTheme(loadSavedTheme());     // Update local state
  };

  // Toggle mobile dropdown
  const handleToggleMobile = () => {
    setMobile((prev) => !prev);
  };

  // Easter Egg click trigger — only used for letter "k"
  const handleEggClick = (e) => {
    e.preventDefault();
    console.log("🔥 Easter Egg clicked");
    onEggTrigger?.(); // Notify parent (App.jsx) to display the modal
  };

  return (
    <header className="site-header">
      <div className="container nav-container">

        {/* ────────────────────────────────────────────────────────────────────────
            MetrikCorp Logo (animated wordmark with wave + glow + shadow)
        ──────────────────────────────────────────────────────────────────────── */}
        <div className="logo-wrapper">
          <AnimatedWordmark onEggClick={handleEggClick} />
        </div>

        {/* ────────────────────────────────────────────────────────────────────────
            Desktop Navigation
        ──────────────────────────────────────────────────────────────────────── */}
        <nav className="main-nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        {/* ────────────────────────────────────────────────────────────────────────
            Theme Toggle Button
        ──────────────────────────────────────────────────────────────────────── */}
        <button
          className="theme-toggle"
          onClick={handleToggleTheme}
          aria-label="Toggle light/dark theme"
        >
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>

        {/* ────────────────────────────────────────────────────────────────────────
            Mobile Navigation Hamburger Button
        ──────────────────────────────────────────────────────────────────────── */}
        <button
          className="nav-toggle"
          onClick={handleToggleMobile}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* ────────────────────────────────────────────────────────────────────────
          Slide-down Mobile Nav (only visible when toggled open)
      ──────────────────────────────────────────────────────────────────────── */}
      <nav className={`mobile-nav${mobileOpen ? ' open' : ''}`}>
        <NavLink to="/" end onClick={() => setMobile(false)}>Home</NavLink>
        <NavLink to="/about" onClick={() => setMobile(false)}>About</NavLink>
        <NavLink to="/services" onClick={() => setMobile(false)}>Services</NavLink>
        <NavLink to="/projects" onClick={() => setMobile(false)}>Projects</NavLink>
        <NavLink to="/contact" onClick={() => setMobile(false)}>Contact</NavLink>
      </nav>
    </header>
  );
}
