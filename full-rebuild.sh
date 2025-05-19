#!/bin/bash

# ==============================================================================
# MetrikCorp Full Rebuild Script
# Usage: bash full-rebuild.sh
# Author: ChatGPT | Timestamp: 2025-05-18_20-31-11
# Description:
#   • Clears old containers/images
#   • Runs fresh vite build
#   • Inlines critical CSS using latest JS bundle + styles
#   • Rebuilds and starts Docker container
# ==============================================================================

set -e

echo "🧹 Cleaning up previous builds and containers..."
docker-compose down --volumes --remove-orphans || true
rm -rf dist/

echo "📦 Installing/updating node modules..."
npm install

echo "⚙️  Building site with Vite..."
npm run build

echo "🔍 Finding generated CSS file..."
CSS_FILE=$(ls dist/assets/index-*.css | head -n 1)

if [ ! -f "$CSS_FILE" ]; then
  echo "❌ CSS file not found. Exiting."
  exit 1
fi

echo "🧪 Running critical CSS inliner (headless)..."
node scripts/inline-critical.mjs || { echo "❌ Critical inlining failed"; exit 1; }

echo "🐳 Rebuilding Docker container..."
docker-compose build --no-cache

echo "🚀 Starting container..."
docker-compose up -d

echo "✅ MetrikCorp site fully rebuilt and running!"
