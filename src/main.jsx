// File: src/main.jsx
// ============================================================================
// Main entry – applies saved theme and renders App.jsx as the top‑level wrapper
// ============================================================================

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';         // ← your new layout + router wrapper
import './style.css';            // global styles
import { loadSavedTheme } from './theme';

loadSavedTheme(); // Apply saved or default theme to <html data-theme="">

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
