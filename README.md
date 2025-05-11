# MetrikCorp Website – Developer Notes & Structure Guide

> A modern, interactive React/Vite site for MetrikCorp, featuring scroll‑triggered animations, dynamic theme support, and a real‑time canvas background.

---

## 🚀 Project Overview

MetrikCorp‑v2 is the completely rebuilt homepage and core layout for MetrikCorp’s web presence. Key features include:

- **React + Vite** for instant HMR and fast production builds  
- **GSAP + ScrollTrigger** for scroll‑based entrance animations  
- **Light/Dark theme toggle** powered by CSS variables  
- **Canvas network background** (`network.js`) for live service‑status effect  
- **Reusable components**: `<Header />`, `<Footer />`, `<Home />`  
- **Responsive design** via CSS Grid, Flexbox, and mobile‑first breakpoints  
- **Containerized deployment** with Docker & Docker Compose  

---

## 🧱 Tech Stack

- **React 18** (functional components & hooks)  
- **Vite** (dev server & build tooling)  
- **GSAP + ScrollTrigger** (animations)  
- **react‑router‑dom** (client‑side routing)  
- **Docker & Docker Compose** (production container)  
- **CSS Variables**, **Poppins** font, and **modern CSS**  

---

## 📁 Project Structure

```
metrikcorp.com-v2/
├── public/
│   ├── assets/
│   │   ├── bg/
│   │   │   ├── hero.jpg
│   │   │   ├── about.jpg
│   │   │   └── cta.jpg
│   │   └── icons/
│   │       ├── web.png
│   │       ├── server.png
│   │       ├── launch.png
│   │       ├── seo.png
│   │       ├── shield.png
│   │       ├── mail.png
│   │       ├── expert.png
│   │       ├── stack.png
│   │       └── growth.png
│   └── network.js
├── src/
│   ├── components/
│   │   ├── Header.jsx      # Sticky, theme‑aware header
│   │   └── Footer.jsx      # Theme‑aware footer
│   ├── pages/
│   │   └── Home.jsx        # Fully‑commented homepage with GSAP animations
│   ├── style.css           # Global CSS variables, utilities, section layouts
│   └── theme.js            # Light/dark toggle logic
├── docker-compose.yml      # Docker Compose service definitions
├── Dockerfile              # Production container build
└── README.md               # This file
```

---

## 🎨 Branding & Visual Identity

### Primary Brand Colors (in `style.css`)
```css
:root {
  --color-primary: #1a47ff;   /* Royal Blue */
  --color-accent:  #00ffc3;   /* Electric Mint */
  --color-bg:      #0d0d0d;   /* Deep Charcoal */
  --color-panel:   #181a1f;   /* Panel/Card background */
  --color-text:    #f0f0f0;   /* Light content */
  --color-subtext: #aaaaaa;   /* Muted secondary text */
}
```

### Background Images

All hero, about and CTA backgrounds live in:
```
/public/assets/bg/
├── hero.jpg
├── about.jpg
└── cta.jpg
```

### Icon Assets (PNG)

All branded, transparent PNG icons sized for 38–64 px display:
```
/public/assets/icons/
├── web.png
├── server.png
├── launch.png
├── seo.png
├── shield.png
├── mail.png
├── expert.png
├── stack.png
└── growth.png
```

---

## ⚙️ Getting Started

1. **Clone the repository**  
   ```bash
   git clone https://github.com/metrik420/metrikcorp-v2.git
   cd metrikcorp-v2
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Run in development mode**  
   ```bash
   npm run dev
   ```
   Opens at `http://localhost:5173` with hot reloading.

4. **Build for production**  
   ```bash
   npm run build
   npm run preview
   ```

---

## 🐳 Docker Deployment

1. **Build & launch containers**  
   ```bash
   docker-compose up --build -d
   ```
2. **View logs**  
   ```bash
   docker-compose logs -f
   ```
3. **Shut down**  
   ```bash
   docker-compose down
   ```

---

## 🔧 Development Tips

- **Editing content**  
  - Modify `src/pages/Home.jsx` for homepage text, images, and arrays of services/values.  
  - Each section is clearly marked with comments and mapped from simple data arrays.

- **Updating icons**  
  1. Place your new PNG in `/public/assets/icons/`.  
  2. Update the filename in the `services` or `values` arrays in `Home.jsx`.

- **Animations**  
  - All headings (`.section-title`), service cards (`.service-card`), and why‑cards (`.why-card`) animate on scroll via GSAP + ScrollTrigger.  
  - Customize timings in the `useEffect` hook within `Home.jsx`.

- **Rebuilding**  
  After any code or asset changes, rebuild and redeploy:
  ```bash
  cd /home/metrik/docker/sites/metrikcorp.com-v2
  docker-compose down
  docker-compose up --build -d
  ```

---

## 📝 Recent Changes

- **Header & Footer**  
  - Converted inline styles to CSS classes  
  - Made header sticky with glass‑morphism and theme‑aware variables  
  - Footer now responds to both dark and light modes

- **Homepage (`Home.jsx`)**  
  - Added detailed inline comments and JSDoc  
  - Refactored GSAP animations to target arrays of elements  
  - Standardized icon sizing via global `.icon-img` class  
  - Clean script injection for `network.js`

- **Global Styles (`style.css`)**  
  - Expanded CSS variable palette  
  - Added light‑mode overrides for header, footer, and text  
  - Consolidated section layouts, grid utilities, and text utilities

---

## 🔍 Future Enhancements

- Split Services, Blog, and Contact into dedicated pages  
- Integrate a headless CMS or Markdown‑driven content  
- Add analytics/performance hooks (e.g., Google Analytics, Lighthouse)  
- Improve accessibility with ARIA roles and keyboard navigation  

---

Maintained by: **MetrikCorp**  
Website: [https://metrikcorp.com](https://metrikcorp.com)  
Version: `v2` – Rebuilt May 2025  
