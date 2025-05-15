// =============================================================================
// src/theme.js
// Light/Dark Mode Toggle Logic
// • Persists user preference in localStorage
// • Applies CSS variables via `data-theme` on `<html>`
// • Default falls back to system preference if available
// =============================================================================

/**
 * Key under which we store the user's theme preference.
 * @constant {string}
 */
const STORAGE_KEY = 'metrikcorp-theme';

/**
 * Apply a given theme by setting `data-theme` on <html>.
 * @param {'light'|'dark'} theme
 */
export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

/**
 * Load the saved theme from localStorage or system preference.
 * @returns {'light'|'dark'}
 */
export function loadSavedTheme() {
  // 1. Try localStorage
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') {
    return saved;
  }

  // 2. Fallback to OS preference via matchMedia
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  if (mql.matches) {
    return 'dark';
  }

  // 3. Default to 'light'
  return 'light';
}

/**
 * Toggle between 'light' and 'dark' themes.
 * Persists the new preference and applies it.
 */
export function toggleTheme() {
  const current = loadSavedTheme();
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem(STORAGE_KEY, next);
  applyTheme(next);
}
