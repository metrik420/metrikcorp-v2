// =============================================================================
// src/components/Header.jsx
// Site Header & Navigation
// • Sticky header with backdrop blur
// • Desktop & mobile nav (hamburger toggle)
// • Theme toggle (light/dark) via theme.js
// • Easter‑egg trigger: clicking the “k” opens hidden modal
// =============================================================================

import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { applyTheme, loadSavedTheme, toggleTheme } from '../theme';

export default function Header({ onEggTrigger }) {
  // ────────────────────────────────────────────────────────────────────────────
  // State: theme ('light' or 'dark'), mobile menu open, egg modal open
  // ────────────────────────────────────────────────────────────────────────────
  const [theme, setTheme]       = useState('dark');
  const [mobileOpen, setMobile] = useState(false);

  // ────────────────────────────────────────────────────────────────────────────
  // On mount: load & apply saved theme
  // ────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const saved = loadSavedTheme();
    applyTheme(saved);
    setTheme(saved);
  }, []);

  // ────────────────────────────────────────────────────────────────────────────
  // Handlers
  // ────────────────────────────────────────────────────────────────────────────
  const handleToggleTheme = () => {
    toggleTheme(); // updates localStorage & <html>
    setTheme(loadSavedTheme());
  };
  const handleToggleMobile = () => setMobile(o => !o);

  // Easter‑egg: only the “k” in “MetrikCorp” is clickable
  const handleEggClick = e => {
    e.preventDefault();
    onEggTrigger?.();
  };

  return (
    <header className="site-header">
      <div className="container nav-container">

        {/* Logo: “Metri⌞k⌟Corp” with only the “k” clickable for Easter‑egg */}
        <h1 className="logo">
          Metri
          <span className="egg-trigger" onClick={handleEggClick}>k</span>
          Corp
        </h1>

        {/* Desktop nav (shown ≥768px) */}
        <nav className="main-nav">
          <NavLink to="/"       end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        {/* Theme toggle button */}
        <button
          className="theme-toggle"
          onClick={handleToggleTheme}
          aria-label="Toggle light/dark mode"
        >
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>

        {/* Mobile hamburger toggle (hidden ≥768px) */}
        <button
          className="nav-toggle"
          onClick={handleToggleMobile}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile slide‑down menu */}
      <nav className={`mobile-nav${mobileOpen ? ' open' : ''}`}>
        <NavLink to="/"        end onClick={() => setMobile(false)}>Home</NavLink>
        <NavLink to="/about"   onClick={() => setMobile(false)}>About</NavLink>
        <NavLink to="/services" onClick={() => setMobile(false)}>Services</NavLink>
        <NavLink to="/projects" onClick={() => setMobile(false)}>Projects</NavLink>
        <NavLink to="/contact" onClick={() => setMobile(false)}>Contact</NavLink>
      </nav>
    </header>
);
}
