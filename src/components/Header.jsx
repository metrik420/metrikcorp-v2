// src/components/Header.jsx
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { applyTheme, loadSavedTheme } from '../theme';

export default function Header() {
  const [theme, setTheme] = useState('dark');

  // Load previously saved theme on mount
  useEffect(() => {
    const current = loadSavedTheme();
    setTheme(current);
  }, []);

  // Toggle dark/light mode and persist it
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    setTheme(newTheme);
  };

  return (
    <header className="site-header">
      <div className="container nav-container">
        {/* Brand name or logo */}
        <h1 className="logo">MetrikCorp</h1>

        {/* Navigation Menu */}
        <nav className="main-nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        {/* Dark/light theme toggle button */}
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
    </header>
  );
}
