// ============================================================================
// MetrikCorp Network Canvas – Full‑Screen & Responsive
// – Always resizes to window innerWidth/innerHeight (on load, resize, orientation)
// – Scroll/touch reactive, pointer repulsion, ripples, depth & pulsing
// ============================================================================

(() => {
  const canvas = document.getElementById('network-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Resize draw buffer + CSS display
  function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width  = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
  }
  window.addEventListener('resize',  resizeCanvas);
  window.addEventListener('orientationchange', resizeCanvas);
  resizeCanvas();

  // Pointer tracking
  const pointer = { x: null, y: null };
  function updatePointer(e) {
    const p = e.touches ? e.touches[0] : e;
    pointer.x = p.clientX;
    pointer.y = p.clientY;
  }
  window.addEventListener('mousemove', updatePointer);
  window.addEventListener('touchmove',  updatePointer, { passive: true });
  window.addEventListener('mouseout',   () => (pointer.x = pointer.y = null));
  window.addEventListener('touchend',   () => (pointer.x = pointer.y = null));

  // Click/tap ripples
  const ripples = [];
  canvas.addEventListener('click', e => ripples.push({ x: e.clientX, y: e.clientY, t: 0 }));
  canvas.addEventListener('touchstart', e => {
    const t = e.touches[0];
    ripples.push({ x: t.clientX, y: t.clientY, t: 0 });
  }, { passive: true });

  // Nodes setup
  const nodes = [];
  const COUNT = 60, MAX_DIST = 120, REP_DIST = 80;
  for (let i = 0; i < COUNT; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      baseR: 1 + Math.random() * 2,
      phase: Math.random() * Math.PI * 2,
      depth: Math.random(),
    });
  }

  // Hue cycling for neon glow
  let hue = 0;
  function nextHue() { hue = (hue + 0.2) % 360; return hue; }

  // Gradient helper (clamp radius ≥ 0.5)
  function glowGrad(x, y, r, color) {
    const rr = Math.max(0.5, Math.abs(r));
    const grad = ctx.createRadialGradient(x, y, 0, x, y, rr * 4);
    grad.addColorStop(0, color.replace(/, *1\)$/, ', 0.6)'));
    grad.addColorStop(1, color.replace(/, *1\)$/, ', 0)'));
    return grad;
  }

  // Line color & glow
  const LINE_COLOR      = '#00ffc3';
  const LINE_SHADOW_BLUR = 12;

  // Animation loop
  let lastTime = 0, lastScrollY = window.scrollY, scrollBoost = 0;

  function draw(time) {
    const dt = (time - lastTime) * 0.001; lastTime = time;
    // Update scroll boost
    const sy = window.scrollY;
    scrollBoost = Math.min(1, Math.abs(sy - lastScrollY) / 100);
    lastScrollY = sy;

    // Background
    const bg = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
    bg.addColorStop(0, '#0a0f12'); bg.addColorStop(1, '#102029');
    ctx.fillStyle = bg;
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // Ripples
    ripples.forEach((r,i) => {
      r.t += dt;
      const prog = r.t / 0.6;
      if (prog > 1) return ripples.splice(i,1);
      const rad = prog * 200;
      ctx.save();
      ctx.globalAlpha = 1 - prog;
      ctx.lineWidth = 2 * (1 - prog);
      ctx.strokeStyle = LINE_COLOR;
      ctx.shadowBlur = LINE_SHADOW_BLUR * (1 - prog);
      ctx.shadowColor = LINE_COLOR;
      ctx.beginPath(); ctx.arc(r.x, r.y, rad, 0, 2*Math.PI); ctx.stroke();
      ctx.restore();
    });

    // Nodes & connections
    nodes.forEach((p, idx) => {
      // Move
      const speed = (0.5 + p.depth/2)*(1 + scrollBoost*1.5);
      p.x += p.vx * dt * 60 * speed; p.y += p.vy * dt * 60 * speed;
      if (p.x<0||p.x>canvas.width) p.vx *= -1;
      if (p.y<0||p.y>canvas.height) p.vy *= -1;

      // Repel from pointer
      let prox = 0;
      if (pointer.x !== null) {
        const dx = p.x-pointer.x, dy = p.y-pointer.y, d = Math.hypot(dx,dy);
        if (d < REP_DIST) { prox = 1-d/REP_DIST; p.vx += dx/d*0.5*prox; p.vy += dy/d*0.5*prox; }
      }

      // Radius & color
      const pulse = Math.sin(time*0.002 + p.phase)*0.5;
      const rawR = p.baseR + pulse*(1+prox*2+scrollBoost*2);
      const radius = Math.max(0.5, rawR);
      const h = nextHue(), color = `hsla(${h},80%,${50+p.depth*20}%,1)`;

      // Draw glow circle
      ctx.shadowBlur = 8 + prox*16 + scrollBoost*8;
      ctx.shadowColor = color;
      ctx.fillStyle = glowGrad(p.x,p.y,radius,color);
      ctx.beginPath(); ctx.arc(p.x,p.y,radius,0,2*Math.PI); ctx.fill();
      ctx.shadowBlur = 0;

      // Connections
      ctx.strokeStyle = LINE_COLOR;
      ctx.shadowBlur = LINE_SHADOW_BLUR; ctx.shadowColor = LINE_COLOR;
      ctx.lineWidth = 1 + scrollBoost;
      for (let j = idx+1; j < nodes.length; j++) {
        const o = nodes[j], dx = o.x-p.x, dy = o.y-p.y, d = Math.hypot(dx,dy);
        if (d < MAX_DIST) {
          ctx.globalAlpha = (1-d/MAX_DIST)*(1+scrollBoost);
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
