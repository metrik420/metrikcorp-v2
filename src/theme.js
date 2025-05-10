// Apply the selected theme to the <html> root element and save preference
export function applyTheme(mode) {
  const root = document.documentElement;
  root.setAttribute('data-theme', mode);       // This allows [data-theme="light"] CSS selectors
  localStorage.setItem('theme', mode);          // Persist preference for future visits
}

// Load saved theme from localStorage or default to dark mode
export function loadSavedTheme() {
  const saved = localStorage.getItem('theme') || 'dark';
  applyTheme(saved);
  return saved;
}
