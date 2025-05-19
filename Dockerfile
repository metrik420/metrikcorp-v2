# =============================================================
# STAGE 1 – Build React App with Vite + Puppeteer Support
# =============================================================
FROM node:20-slim AS builder

# Install system dependencies required for Puppeteer (headless Chromium)
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
      ca-certificates curl wget fonts-liberation libappindicator3-1 \
      libasound2 libatk-bridge2.0-0 libatk1.0-0 libcups2 libdbus-1-3 \
      libgdk-pixbuf2.0-0 libnspr4 libnss3 libx11-xcb1 libxcomposite1 \
      libxdamage1 libxrandr2 xdg-utils libu2f-udev libvulkan1 \
      libxss1 libgbm-dev libxtst6 \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy only package files first for better cache utilization
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy remaining files
COPY . .

# Make build tools executable if needed
RUN chmod +x node_modules/.bin/vite \
    && chmod +x node_modules/@esbuild/linux-x64/bin/esbuild

# Build the production site with full optimization
RUN npm run build

# =============================================================
# STAGE 2 – Lightweight NGINX to serve static files
# =============================================================
FROM nginx:1.25-alpine AS production

# Clean default NGINX content
RUN rm -rf /usr/share/nginx/html/*

# Copy production build output
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom NGINX configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose HTTP port
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
