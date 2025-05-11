// File: public/network.js
// ============================================================================
// MetrikCorp Network Canvas (Lines: Bright Green Glow)
// – Scroll‑reactive speed & glow, click/tap ripples, pointer repulsion,
//   hue‑cycling nodes, organic motion, *bright green glowing lines*,
//   curved connections, depth parallax.
// ============================================================================

(() => {
  const canvas = document.getElementById('network-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // ────────────────────────────────────────────────────────────────────────────
  // Resize to full viewport
  // ────────────────────────────────────────────────────────────────────────────
  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // ────────────────────────────────────────────────────────────────────────────
  // Pointer tracking (mouse & touch)
  // ────────────────────────────────────────────────────────────────────────────
  const pointer = { x: null, y: null };
  function updatePointer(e) {
    const t = e.touches ? e.touches[0] : e;
    pointer.x = t.clientX;
    pointer.y = t.clientY;
  }
  window.addEventListener('mousemove', updatePointer);
  window.addEventListener('touchmove',  updatePointer, { passive: true });
  window.addEventListener('mouseout',   () => (pointer.x = pointer.y = null));
  window.addEventListener('touchend',   () => (pointer.x = pointer.y = null));

  // ────────────────────────────────────────────────────────────────────────────
  // Click/tap ripples
  // ────────────────────────────────────────────────────────────────────────────
  const ripples = [];
  canvas.addEventListener('click', e => {
    ripples.push({ x: e.clientX, y: e.clientY, t: 0 });
  });
  canvas.addEventListener('touchstart', e => {
    const t = e.touches[0];
    ripples.push({ x: t.clientX, y: t.clientY, t: 0 });
  }, { passive: true });

  // ────────────────────────────────────────────────────────────────────────────
  // Particle/node setup
  // ────────────────────────────────────────────────────────────────────────────
  const nodes    = [];
  const COUNT    = 60;
  const MAX_DIST = 120;  // max for inter‑node lines
  const REP_DIST = 80;   // pointer repulsion radius
  for (let i = 0; i < COUNT; i++) {
    nodes.push({
      x:      Math.random() * canvas.width,
      y:      Math.random() * canvas.height,
      vx:     (Math.random() - 0.5) * 0.3,
      vy:     (Math.random() - 0.5) * 0.3,
      baseR:  1 + Math.random() * 2,
      phase:  Math.random() * Math.PI * 2,
      depth:  Math.random()
    });
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Hue cycling for neon node glow
  // ────────────────────────────────────────────────────────────────────────────
  let hue = 0;
  function nextHue() {
    hue = (hue + 0.2) % 360;
    return hue;
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Glow gradient helper (clamps r ≥ 0.5)
  // ────────────────────────────────────────────────────────────────────────────
  function glowGrad(x, y, r, color) {
    const rr = Math.max(0.5, Math.abs(r));
    const grad = ctx.createRadialGradient(x, y, 0, x, y, rr * 4);
    grad.addColorStop(0, color.replace(/, *1\)$/, ', 0.6)'));
    grad.addColorStop(1, color.replace(/, *1\)$/, ', 0)'));
    return grad;
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Bright green line color & shadow
  // ────────────────────────────────────────────────────────────────────────────
  const LINE_COLOR      = '#00ffc3';   // neon mint
  const LINE_SHADOW_BLUR = 12;         // stronger glow for lines

  // ────────────────────────────────────────────────────────────────────────────
  // Main animation loop
  // ────────────────────────────────────────────────────────────────────────────
  let lastTime    = 0;
  let lastScrollY = window.scrollY;
  let scrollBoost = 0;

  function draw(time) {
    const dt = (time - lastTime) * 0.001;
    lastTime = time;

    // Update scroll boost per frame
    const nowY    = window.scrollY;
    scrollBoost  = Math.min(1, Math.abs(nowY - lastScrollY) / 100);
    lastScrollY  = nowY;

    // 1) Draw gradient background
    {
      const bg = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
      bg.addColorStop(0, '#0a0f12');
      bg.addColorStop(1, '#102029');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // 2) Draw ripples
    ripples.forEach((r,i) => {
      r.t += dt;
      const prog = r.t / 0.6;
      if (prog > 1) return ripples.splice(i,1);
      const rad = prog * 200;
      ctx.save();
      ctx.globalAlpha = 1 - prog;
      ctx.lineWidth   = 2 * (1 - prog);
      ctx.strokeStyle = LINE_COLOR;
      ctx.shadowBlur  = LINE_SHADOW_BLUR * (1 - prog);
      ctx.shadowColor = LINE_COLOR;
      ctx.beginPath();
      ctx.arc(r.x, r.y, rad, 0, 2*Math.PI);
      ctx.stroke();
      ctx.restore();
    });

    // 3) Update & draw nodes + connections
    nodes.forEach((p, idx) => {
      // Move with depth & scroll boost
      const speed = (0.5 + p.depth/2) * (1 + scrollBoost*1.5);
      p.x += p.vx * dt * 60 * speed;
      p.y += p.vy * dt * 60 * speed;
      if (p.x<0||p.x>canvas.width)  p.vx*=-1;
      if (p.y<0||p.y>canvas.height) p.vy*=-1;

      // Pointer proximity repulsion
      let prox = 0;
      if (pointer.x!==null) {
        const dx=p.x-pointer.x, dy=p.y-pointer.y, d=Math.hypot(dx,dy);
        if (d<REP_DIST) {
          prox = 1 - d/REP_DIST;
          p.vx += (dx/d)*0.5*prox;
          p.vy += (dy/d)*0.5*prox;
        }
      }

      // Radius: base + pulse + proximity & scroll boost
      const pulse  = Math.sin(time*0.002 + p.phase)*0.5;
      const rawR   = p.baseR + pulse*(1+prox*2+scrollBoost*2);
      const radius = Math.max(0.5, rawR);

      // Node glow color
      const h     = nextHue();
      const color = `hsla(${h},80%,${50+p.depth*20}%,1)`;

      // Node glow
      ctx.shadowBlur  = 8 + prox*16 + scrollBoost*8;
      ctx.shadowColor = color;
      ctx.fillStyle   = glowGrad(p.x,p.y,radius,color);
      ctx.beginPath();
      ctx.arc(p.x,p.y,radius,0,2*Math.PI);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw bright green, glowing curved connections
      ctx.strokeStyle = LINE_COLOR;
      ctx.shadowBlur  = LINE_SHADOW_BLUR;
      ctx.shadowColor = LINE_COLOR;
      ctx.lineWidth   = 1 + scrollBoost;
      for (let j=idx+1; j<nodes.length; j++) {
        const o  = nodes[j];
        const dx = o.x-p.x, dy=o.y-p.y, d=Math.hypot(dx,dy);
        if (d<MAX_DIST) {
          ctx.globalAlpha = (1 - d/MAX_DIST)*(1+scrollBoost);
          ctx.beginPath();
          const mx = (p.x+o.x)/2 + (Math.random()-0.5)*10;
          const my = (p.y+o.y)/2 + (Math.random()-0.5)*10;
          ctx.moveTo(p.x,p.y);
          ctx.quadraticCurveTo(mx,my,o.x,o.y);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    });

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
})();
