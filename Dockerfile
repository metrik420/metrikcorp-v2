# ================================
# Stage 1: Build the React app
# ================================
FROM node:20-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# 🔧 Fix permissions for Vite and esbuild
RUN chmod +x node_modules/.bin/vite \
    && chmod +x node_modules/@esbuild/linux-x64/bin/esbuild

RUN npm run build

# ================================
# Stage 2: Serve the built app
# ================================
FROM node:20-slim

WORKDIR /app

COPY --from=builder /app/dist ./dist
RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
