// File: src/components/Header.jsx
// ============================================================================
// Header.jsx – Site Header & Navigation
// Uses brand palette, sticks to top, and supports dark/light modes
// ============================================================================

import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { applyTheme, loadSavedTheme } from '../theme';

export default function Header() {
  // ────────────────────────────────────────────────────────────────────────────
  // Track current theme (dark/light) in local state
  // ────────────────────────────────────────────────────────────────────────────
  const [theme, setTheme] = useState('dark');

  // ────────────────────────────────────────────────────────────────────────────
  // On mount, load saved theme and apply it
  // ────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const current = loadSavedTheme();  // returns 'dark' or 'light'
    applyTheme(current);
    setTheme(current);
  }, []);

  // ────────────────────────────────────────────────────────────────────────────
  // Toggle between dark/light, persist and reapply CSS variables
  // ────────────────────────────────────────────────────────────────────────────
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    setTheme(newTheme);
  };

  return (
    <header className="site-header">
      <div className="container nav-container">
        {/* BRAND / LOGO */}
        <h1 className="logo">MetrikCorp</h1>

        {/* MAIN NAVIGATION */}
        <nav className="main-nav">
          <NavLink to="/"       end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        {/* THEME TOGGLE */}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle dark/light mode"
        >
          {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
    </header>
);
}
