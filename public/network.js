// ============================================================================
//  MetrikCorp Network Grid Background
//  Custom canvas animation using lines and pulses to simulate a tech network
//  ============================================================================
(() => {
  // Grab the canvas element we injected via <canvas id="network-bg"></canvas>
  const canvas = document.getElementById('network-bg');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  // Resize canvas to full screen whenever window changes size
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Define moving line segments
  const nodes = [];
  const numNodes = 70;

  // Generate nodes with random motion
  for (let i = 0; i < numNodes; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
    });
  }

  // Color styling – dynamic based on theme
  const getColor = () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    return isLight ? '#007bff' : '#00ffc3'; // Light = Royal Blue, Dark = Neon Mint
  };

  // Main animation loop
  const draw = () => {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const strokeColor = getColor();

    // Draw lines between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];

      // Update node position
      a.x += a.vx;
      a.y += a.vy;

      // Bounce off edges
      if (a.x <= 0 || a.x >= canvas.width) a.vx *= -1;
      if (a.y <= 0 || a.y >= canvas.height) a.vy *= -1;

      // Draw to other nodes nearby
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Only draw if close enough
        if (dist < 140) {
          ctx.beginPath();
          ctx.strokeStyle = strokeColor;
          ctx.globalAlpha = 1 - dist / 140; // Fade line based on distance
          ctx.lineWidth = 1;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Draw small dot at each node
      ctx.beginPath();
      ctx.arc(a.x, a.y, 1.2, 0, 2 * Math.PI);
      ctx.fillStyle = strokeColor;
      ctx.globalAlpha = 0.8;
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  };

  // Begin animation
  draw();
})();
