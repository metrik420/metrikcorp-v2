// File: src/components/Footer.jsx
// ============================================================================
// Footer.jsx – Site footer with dynamic version display
// ----------------------------------------------------------------------------
// - Reads current version from package.json
// - Renders version alongside copyright
// - Theme‑aware styling via .site-footer class
// ============================================================================

import React from 'react';
// Import version directly from package.json (ensure bundler supports this)
import { version } from '../../package.json';

export default function Footer() {
  return (
    <footer className="site-footer">
      {/* Main copyright line */}
      <p>&copy; {new Date().getFullYear()} MetrikCorp. All rights reserved.</p>
      {/* Revision/version line */}
      <p className="footer-version">Version {version}</p>
    </footer>
  );
}
