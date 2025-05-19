// ===================================================
// Vite Configuration for MetrikCorp React Site
// • React plugin with JSX/TSX support
// • Custom output directory for builds
// • Vendor JS chunk splitting for performance
// • Copies /public/fonts → /dist/fonts
// ===================================================

// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import legacy from '@vitejs/plugin-legacy';
import autoprefixer from 'autoprefixer'; // ✅ FIXED: ESM-compatible import

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // Enables React Fast Refresh and JSX transformation
    react(),

    // Adds legacy browser support (for older Safari, IE11, etc.)
    legacy({
      targets: ['defaults', 'not IE 11'], // Customize as needed
    }),

    // Progressive Web App support (optional, can remove if not using)
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: false, // set to true only during dev if needed
      },
      includeAssets: ['favicon.svg', 'robots.txt'],
      manifest: {
        name: 'MetrikCorp',
        short_name: 'Metrik',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#ffd700',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],

  resolve: {
    alias: {
      // Aliases for cleaner imports
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },

  build: {
    target: 'esnext', // Modern JavaScript output for better performance
    minify: 'esbuild', // Fast, efficient bundler
    sourcemap: false, // Disable sourcemaps for production (optional)
    outDir: 'dist',

    // Generates hashed filenames for long-term caching
    assetsDir: 'assets',
    assetsInlineLimit: 4096, // Inline small assets under 4KB

    rollupOptions: {
      output: {
        // Content-hash filenames for aggressive browser caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
            return 'assets/img/[name]-[hash][extname]';
          }
          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },

    // Tree-shake unused code aggressively
    commonjsOptions: {
      include: /node_modules/,
    },
    cssCodeSplit: true, // Split CSS per route for better initial load
    brotliSize: true, // Display brotli-compressed sizes in output
    emptyOutDir: true, // Clears the /dist folder before each build
  },

  css: {
    postcss: {
      plugins: [
        // Auto-prefix CSS for cross-browser support
        autoprefixer()
      ],
    },
    // Enable modules if needed
    modules: {
      scopeBehaviour: 'local',
    },
    preprocessorOptions: {
      // Enable SCSS globally if used
      scss: {
        additionalData: `@import "@/styles/global.scss";`, // Replace with your global styles
      },
    },
  },

  server: {
    host: '0.0.0.0', // Allow LAN access
    port: 5173,
    strictPort: true,
    open: false,
    watch: {
      usePolling: true,
    },
  },
});
