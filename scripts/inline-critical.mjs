// scripts/inline-critical.mjs
// ========================================================
// ✅ Inlines critical-path CSS into dist/index.html
// ✅ Adds loading="lazy" to all <img> tags
// ✅ Auto-detects hashed CSS filenames
// ========================================================

import { generate } from 'critical';
import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

const htmlPath = 'dist/index.html';

// Step 1: Find the hashed CSS filename
const [cssFile] = await glob('dist/assets/index-*.css');

if (!cssFile) {
  console.error('❌ No CSS file found in dist/assets/');
  process.exit(1);
}

// Step 2: Inline critical CSS
try {
  const { html } = await generate({
    base: 'dist/',
    html: readFileSync(htmlPath, 'utf8'),
    css: [cssFile],
    inline: true,
    extract: true,
    width: 375,
    height: 812
  });

  // Step 3: Lazy-load all <img> tags
  const optimized = html.replace(/<img /g, '<img loading="lazy" ');

  // Step 4: Write the result back to index.html
  writeFileSync(htmlPath, optimized);
  console.log('✅ Successfully inlined critical CSS and enabled lazy loading!');
} catch (err) {
  console.error('❌ Failed to inline critical CSS:', err);
  process.exit(1);
}
