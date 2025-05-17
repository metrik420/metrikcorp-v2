// File: src/main.jsx
// ============================================================================
// Entry point for the MetrikCorp app
// • Loads global styles
// • Mounts the full App component
// • Applies saved theme before React renders
// ============================================================================

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';              // ✅ App now manages routes + layout
import './style.css';                     // Global styles
import { loadSavedTheme } from './theme'; // Theme manager (dark/light)

// Apply stored theme setting before hydration (prevents flicker)
loadSavedTheme();

// Create root app instance
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> {/* ✅ Your main layout: header, routes, modal, footer */}
  </React.StrictMode>
);
