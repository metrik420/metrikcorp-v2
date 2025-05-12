# MetrikCorp Website – Developer Notes & Structure Guide

> A modern, interactive React/Vite site for MetrikCorp, featuring scroll‑triggered animations, dynamic theme support, a real‑time canvas background, SVG iconography, and a hidden Easter‑egg.

---

## 🚀 Project Overview

**MetrikCorp‑v2** is the completely rebuilt homepage and core layout for MetrikCorp’s web presence. Key features include:

- **React 18 + Vite** for instant HMR and lightning‑fast production builds  
- **GSAP + ScrollTrigger** with fallback “instant‑reveal” logic for both scrollable and non‑scroll contexts  
- **SVG line‑icons** (via React‑Feather) for crisp, themable graphics  
- **Light/Dark theme toggle** powered by CSS variables and persisted in localStorage  
- **Canvas network background** (`network.js`) with interactive mouse‑responsive glow  
- **Responsive design**: mobile‑first, fluid typography, breakpoints up to 8K displays  
- **Easter‑egg modal**: click the logo to reveal `/public/hello.html` directly injected  
- **SEO & metadata**: `<Helmet>` support for title, meta tags, and JSON‑LD structured data  
- **Containerized deployment** with Docker & Docker Compose  

---

## 🧱 Tech Stack

- **React 18** (functional components & hooks)  
- **Vite** (dev server & build tooling)  
- **GSAP + ScrollTrigger** (animations)  
- **react‑feather** (SVG icons)  
- **react‑router‑dom** (client‑side routing)  
- **react‑helmet** (SEO metadata & structured data)  
- **Docker & Docker Compose** (production container)  
- **CSS Variables**, **Poppins** font, and **modern CSS**  

---

## 📁 Project Structure

```text
metrikcorp.com-v2/
├── public/
│   ├── assets/
│   │   ├── bg/            # Hero, About, CTA backgrounds
│   │   └── icons/         # Legacy PNG icons (unused)
│   ├── favicon-transparent.png
│   ├── hello.html         # Easter‑egg page
│   └── network.js         # Canvas background script
├── src/
│   ├── components/
│   │   ├── Header.jsx     # Sticky header + mobile nav + theme toggle + Easter‑egg
│   │   └── Footer.jsx     # Theme‑aware footer
│   ├── pages/
│   │   ├── Home.jsx       # Animated homepage with GSAP & React‑Feather
│   │   ├── About.jsx      # About page with batch scroll animations & SEO tags
│   │   ├── Services.jsx   # Services listing
│   │   ├── Projects.jsx   # Projects placeholder
│   │   └── Contact.jsx    # Contact info
│   ├── style.css          # Global CSS vars, layout, Easter‑egg modal
│   ├── theme.js           # Light/dark mode logic
│   ├── seo.js             # Helmet defaults & JSON‑LD
│   └── main.jsx           # App entry point & routing
├── docker-compose.yml     # Docker Compose definitions
├── Dockerfile             # Production container build
└── README.md              # This file

🎨 Branding & Visual Identity
Primary Brand Colors (style.css)
:root {
  --color-primary: #1a47ff;   /* Royal Blue */
  --color-accent:  #00ffc3;   /* Electric Mint */
  --color-bg:      #0d0d0d;   /* Dark background */
  --color-panel:   #181a1f;   /* Panel background */
  --color-text:    #f0f0f0;   /* Light text */
  --color-subtext: #aaaaaa;   /* Muted text */
}

SVG Iconography
Migrated all PNGs to React‑Feather SVG icons

Themed via stroke: var(--color-accent) and sized with .icon-svg

⚙️ Getting Started
git clone https://github.com/metrik420/metrikcorp-v2.git
cd metrikcorp-v2
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview

🐳 Docker Deployment
docker-compose up --build -d
docker-compose logs -f
docker-compose down

Development Tips
Content: Edit src/pages/*.jsx; use .section-title, .service-card, .why-card.

Icons: Import from react-feather instead of PNG.

Animations: Adjust GSAP ScrollTrigger settings in useEffect.

SEO: Configure per‑page meta & JSON‑LD in src/seo.js with react-helmet.

Easter‑egg: Click the “MetrikCorp” logo to load hello.html in a modal.

📝 Recent Changes
SVG Icon Migration

Easter‑egg Modal

Improved Responsiveness & Accessibility

Enhanced Scroll Animations

SEO & Structured Data Integration

Detailed Code Comments Throughout

🔍 Future Enhancements
Blog/Case Studies pages

Headless CMS integration

Analytics & error‑tracking hooks

Advanced accessibility (ARIA, keyboard nav)

Maintained by MetrikCorp • https://metrikcorp.com
Version: v2 – Rebuilt May 2025
