// =============================================================================
// src/components/Footer.jsx
// Site Footer
// • Theme‑aware styling via CSS variables
// • Displays current version for easy reference
// =============================================================================

import React from 'react';

// Update this when bumping version (e.g. via `npm version`)
const SITE_VERSION = 'v2.2.1';

export default function Footer() {
  return (
    <footer className="site-footer">
      {/* Copyright */}
      <p>&copy; 2025 MetrikCorp. All rights reserved.</p>

      {/* Version number for reference */}
      <p className="footer-version">
        Version {SITE_VERSION}
      </p>
    </footer>
  );
}
