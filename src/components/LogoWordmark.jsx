// File: src/components/LogoWordmark.jsx
// ============================================================================
// Animated "MetrikCorp" SVG‑like logo with:
// • Wave animation per letter
// • Realistic jumping shadow
// • Glow trail behind each letter
// • Easter Egg triggered only by “k”
// ============================================================================

import React from 'react';
import './LogoWordmark.css'; // Import animation styles

export default function LogoWordmark({ onEggClick }) {
  // Split the logo into individual characters
  const letters = 'MetrikCorp'.split('');

  return (
    <div className="logo-wordmark" aria-label="MetrikCorp Logo">
      {letters.map((char, i) => (
        <span key={i} className="letter-wrapper">
          {/* Shadow below each letter */}
          <span className={`shadow shadow-${i}`} aria-hidden="true" />

          {/* Each animated letter — only “k” gets the click handler */}
          <span
            className={`letter letter-${i} ${char === 'k' ? 'egg-trigger' : ''}`}
            data-letter={char}
            onClick={char === 'k' ? onEggClick : undefined}
          >
            {char}
          </span>
        </span>
      ))}
    </div>
  );
}
