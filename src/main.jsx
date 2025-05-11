// ─────────────────────────────────────────────────────────────────────────────
// File: src/main.jsx
// Entry point: load theme, global styles, then render <App/>
// ─────────────────────────────────────────────────────────────────────────────
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';               // now wraps all pages
import './style.css';
import { loadSavedTheme } from './theme';

loadSavedTheme(); // apply saved or default theme

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
