# MetrikCorp Website – Developer Notes & Structure Guide

This document serves as a guide to maintaining and extending the MetrikCorp React-based website located at `/home/metrik/docker/sites/metrikcorp.com-v2`.

---

## 📁 Project Structure

```
metrikcorp.com-v2/
├── public/
│   ├── assets/
│   │   ├── bg/          # Hero, About, CTA background images
│   │   └── icons/       # Branded transparent .png icons
├── src/
│   ├── components/
│   │   ├── Header.jsx   # Site-wide header
│   │   └── Footer.jsx   # Footer with links
│   ├── pages/
│   │   └── Home.jsx     # Main homepage file
│   └── style.css        # Full branding layout + CSS variables
├── docker-compose.yml   # Docker service definition
└── Dockerfile           # Builds production container
```

---

## 🎨 Branding & Visual Identity

### Primary Brand Colors (in `style.css`)
```css
:root {
  --color-primary: #1a47ff;     /* Royal Blue */
  --color-accent:  #00ffc3;     /* Electric Mint */
  --color-bg:      #0d0d0d;     /* Deep Charcoal */
  --color-panel:   #181a1f;     /* Card backgrounds */
  --color-text:    #f0f0f0;     /* Light content */
  --color-subtext: #aaaaaa;     /* Muted tone */
}
```

### Background Images
Located in:
```
/public/assets/bg/
├── hero.jpg
├── about.jpg
└── cta.jpg
```

### Custom Icons (PNG)
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

Each `.png` is transparent, branded, and sized for 38–64px display.

---

## ⚙️ Development Tips

### ✏️ Editing Content
- Edit **`src/pages/Home.jsx`** for homepage layout and section content
- Services and features are defined in `arrays` and rendered via `.map()`
- Text and icon filenames can be easily updated

### 💡 Updating Icons
To replace an icon:
1. Place a new transparent `.png` in `/public/assets/icons/`
2. Update the filename inside `Home.jsx` in the corresponding array

### 🎬 Animations
- Uses `GSAP` with `ScrollTrigger` to animate elements on scroll
- All cards animate in with `.stagger-card` class

### 🧼 Rebuild Docker App
After editing:
```bash
cd /home/metrik/docker/sites/metrikcorp.com-v2
docker-compose down
docker-compose up --build -d
```

---

## 🔍 Future Enhancements

- Add separate pages for Services, Blog, or Contact
- Consider dynamic content support (Markdown, CMS)
- Add analytics or performance monitoring hooks
- Enhance accessibility with ARIA tags & keyboard nav

---

Maintained by: **MetrikCorp**  
Website: [https://metrikcorp.com](https://metrikcorp.com)  
Version: `v2` – Rebuilt May 2025