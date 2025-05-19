// scripts/full-rebuild.mjs
// ========================================================================
// 🔧 MetrikCorp – Full Production Build Script
// • Vite build trigger
// • Critical CSS injection
// • Lazy image loading
// • Font preload injection
// • Built for performance and CI/CD resilience
// ========================================================================

import { build } from 'vite';
import { generate } from 'critical';
import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';

const distDir = path.resolve('dist');

async function runBuild() {
  console.log('🚀 Running Vite build...');
  await build(); // Loads vite.config.mjs and builds to /dist
}

// Injects Critical CSS using 'critical' into index.html
async function injectCriticalCSS() {
  console.log('🎯 Inlining critical CSS...');
  const [cssFile] = glob.sync('dist/assets/css/index-*.css'); // Grab hashed CSS file

  if (!cssFile) {
    throw new Error('❌ Critical CSS injection failed: No CSS file found in dist/assets/css');
  }

  const htmlPath = path.join(distDir, 'index.html');
  const htmlContent = await fs.readFile(htmlPath, 'utf-8');

  const { html } = await generate({
    base: distDir,
    html: htmlContent,
    css: [cssFile],
    inline: true,
    extract: true,
    width: 375,  // iPhone X dimensions
    height: 812
  });

  await fs.writeFile(htmlPath, html);
  console.log('✅ Critical CSS inlined into index.html');
}

// Adds loading="lazy" to all <img> tags without it
async function enableLazyLoading() {
  console.log('🖼️ Enabling lazy loading for <img> tags...');
  const htmlPath = path.join(distDir, 'index.html');
  let html = await fs.readFile(htmlPath, 'utf-8');

  const updated = html.replace(/<img(?![^>]*loading=)[^>]*?>/g, (match) => {
    return match.replace('<img', '<img loading="lazy"');
  });

  await fs.writeFile(htmlPath, updated);
  console.log('✅ Lazy loading attribute injected');
}

// Ensures font preload tag is in <head>
async function prioritizeFontPreloads() {
  console.log('🔡 Checking for font preload...');
  const htmlPath = path.join(distDir, 'index.html');
  let html = await fs.readFile(htmlPath, 'utf-8');

  const preloadTag = `<link rel="preload" href="/fonts/poppins.woff2" as="font" type="font/woff2" crossorigin="anonymous">`;

  if (!html.includes(preloadTag)) {
    html = html.replace('<head>', `<head>\n  ${preloadTag}`);
    await fs.writeFile(htmlPath, html);
    console.log('✅ Font preload added to <head>');
  } else {
    console.log('ℹ️ Font preload already present');
  }
}

// Main build pipeline
async function main() {
  const start = Date.now();
  try {
    await runBuild();
    await injectCriticalCSS();
    await enableLazyLoading();
    await prioritizeFontPreloads();

    const totalTime = ((Date.now() - start) / 1000).toFixed(2);
    console.log(`🎉 Optimized production build complete in ${totalTime}s`);
  } catch (err) {
    console.error('🔥 Build process failed:', err.message);
    process.exit(1);
  }
}

main();
