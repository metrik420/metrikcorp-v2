// File: src/components/Header.jsx
import React, { useEffect, useState } from 'react';
import { NavLink }                      from 'react-router-dom';
import { applyTheme, loadSavedTheme }   from '../theme';

export default function Header() {
  const [theme, setTheme] = useState('dark');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const saved = loadSavedTheme();
    applyTheme(saved);
    setTheme(saved);
  }, []);

  const toggleTheme  = () => { const nxt = theme==='dark'?'light':'dark'; applyTheme(nxt); setTheme(nxt); };
  const toggleMobile = () => setMobileOpen(o => !o);
  const closeMobile  = () => setMobileOpen(false);

  return (
    <header className="site-header">
      <div className="container nav-container">
        <h1 className="logo">MetrikCorp</h1>

        <nav className="main-nav">
          <NavLink to="/"       end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme==='dark'?'☀️ Light Mode':'🌙 Dark Mode'}
        </button>

        <button className="nav-toggle" onClick={toggleMobile} aria-label="Menu">
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      <nav className={`mobile-nav${mobileOpen?' open':''}`}>
        <NavLink to="/"       end onClick={closeMobile}>Home</NavLink>
        <NavLink to="/about"  onClick={closeMobile}>About</NavLink>
        <NavLink to="/services" onClick={closeMobile}>Services</NavLink>
        <NavLink to="/projects" onClick={closeMobile}>Projects</NavLink>
        <NavLink to="/contact" onClick={closeMobile}>Contact</NavLink>
      </nav>
    </header>
  );
}
