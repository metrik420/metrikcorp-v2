// File: src/components/Header.jsx
// ============================================================================
// Header.jsx – Site header with theme toggle, mobile nav, and a single‑letter Easter‑egg trigger
// ----------------------------------------------------------------------------
// - Loads/saves theme (dark/light) from localStorage
// - Renders desktop and mobile menus with toggle
// - Splits “MetrikCorp” so only the letter “k” opens the hidden modal
// - Modal contains Kayesin’s very first “hello.html” page + custom notice
// ============================================================================

import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { applyTheme, loadSavedTheme } from '../theme';

export default function Header() {
  // ─── State Hooks ────────────────────────────────────────────────────────────
  const [theme, setTheme] = useState('dark');        // current theme mode
  const [mobileOpen, setMobileOpen] = useState(false); // mobile menu open/closed
  const [eggOpen, setEggOpen] = useState(false);     // Easter‑egg modal visibility

  // ─── On Mount: initialize theme ──────────────────────────────────────────────
  useEffect(() => {
    const saved = loadSavedTheme();  // read 'dark' or 'light' from localStorage
    applyTheme(saved);               // apply CSS variables to <html data-theme>
    setTheme(saved);
  }, []); // run once on component mount

  // ─── Toggle between dark and light modes ──────────────────────────────────
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);  // update CSS vars
    setTheme(next);    // update UI button text
  };

  // ─── Toggle mobile navigation menu ────────────────────────────────────────
  const toggleMobile = () => setMobileOpen(open => !open);

  // ─── Open the Easter‑egg modal ─────────────────────────────────────────────
  // Only called when the “k” in “MetrikCorp” is clicked
  const openEgg = (e) => {
    e.preventDefault();    // prevent default link behavior
    setEggOpen(true);      // show modal
    setMobileOpen(false);  // close mobile nav if open
  };

  // ─── Close the Easter‑egg modal ────────────────────────────────────────────
  const closeEgg = () => setEggOpen(false);

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* SITE HEADER */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <header className="site-header">
        <div className="container nav-container">

          {/* ─── Logo split: only “k” triggers Easter‑egg ───────────────────── */}
          <div className="logo">
            Metri
            <span
              className="egg-trigger"
              title="👋 Click the 'k' for a secret"
              onClick={openEgg}
            >
              k
            </span>
            Corp
          </div>

          {/* ─── Desktop Navigation (hidden on small screens) ──────────────── */}
          <nav className="main-nav">
            <NavLink to="/"       end>Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>

          {/* ─── Theme Toggle Button ──────────────────────────────────────── */}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle dark/light mode"
          >
            {/* 📍 Switch icon/text based on current theme */}
            {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>

          {/* ─── Mobile Hamburger Toggle ─────────────────────────────────── */}
          <button
            className="nav-toggle"
            onClick={toggleMobile}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* ─── Mobile Navigation Menu ───────────────────────────────────── */}
        <nav className={`mobile-nav${mobileOpen ? ' open' : ''}`}>
          {/* Close mobile menu on link click */}
          <NavLink to="/"       end   onClick={() => setMobileOpen(false)}>Home</NavLink>
          <NavLink to="/about"         onClick={() => setMobileOpen(false)}>About</NavLink>
          <NavLink to="/services"      onClick={() => setMobileOpen(false)}>Services</NavLink>
          <NavLink to="/projects"      onClick={() => setMobileOpen(false)}>Projects</NavLink>
          <NavLink to="/contact"       onClick={() => setMobileOpen(false)}>Contact</NavLink>
        </nav>
      </header>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* EASTER‑EGG MODAL */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      {eggOpen && (
        <div className="easter-egg-modal">
          {/* Close button in top‑right corner */}
          <button
            className="close-btn"
            onClick={closeEgg}
            aria-label="Close Easter‑egg"
          >
            ×
          </button>
	  {/* Modal content container */}
	    <div className="easter-egg-content">
	      {/* Notice about the find */}
	      <h2>🎉 You found the Easter‑egg!</h2>
	      <p>
	        This is the very <strong>first website</strong> Kayesin built on <strong>5‑11‑2025</strong>,<br/>
	        handcrafted in plain HTML and edited in <code>nano</code> within a terminal.
	      </p>
	      <p>
	        As Kayesin’s proud dad, I’ve tucked this piece of history into our site—<br/>
	        the original <code>hello.html</code> lives in our <code>public/</code> folder and will remain<br/>
	        here for as long as our family runs MetrikCorp. One day, it’ll be a treasured memory.
	      </p>
	      <hr />
	
	      {/* Original “hello, World!” content */}
	      <h1>hello, World!</h1>
	      <p>
	        hi this is Kayesin. this is my first website!<br/>
	        5‑11‑25 3:26 PM MST
	      </p>
	    </div>
	  </div> 
      )}
    </>
  );
}
