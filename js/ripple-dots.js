/* =====================================================================
   DOT FIELD — cursor-following "tent" bump
   A dense, even grid of dots, fixed to the viewport. Instead of
   traveling ripple rings, this pushes dots smoothly outward from the
   cursor's position — like a blanket draped over a bowl — and the
   whole bump glides toward the cursor rather than snapping to it.
===================================================================== */
(() => {
  const canvas = document.getElementById('dotField');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const SPACING = 22;       // px between dots (denser than before)
  const DOT_R = 1.3;        // base dot radius
  const INFLUENCE = 230;    // px radius of the bump around the cursor
  const AMPLITUDE = 10;     // px of max outward displacement at the peak
  const FOLLOW_EASE = 0.12; // how smoothly the bump glides to the cursor

  let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  let targetX = -9999, targetY = -9999; // real cursor position, off-canvas until first move
  let smoothX = -9999, smoothY = -9999; // eased position the bump actually uses

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });
  document.addEventListener('mouseleave', () => {
    targetX = -9999;
    targetY = -9999;
  });

  function draw() {
    smoothX += (targetX - smoothX) * FOLLOW_EASE;
    smoothY += (targetY - smoothY) * FOLLOW_EASE;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(224,224,224,0.16)';

    for (let gy = SPACING / 2; gy < h; gy += SPACING) {
      for (let gx = SPACING / 2; gx < w; gx += SPACING) {
        const dx = gx - smoothX;
        const dy = gy - smoothY;
        const dist = Math.hypot(dx, dy);

        let px = gx, py = gy, r = DOT_R, alpha = 0.16;

        if (dist < INFLUENCE) {
          // smooth dome falloff: 1 at the cursor, 0 at the influence edge
          const t = dist / INFLUENCE;
          const falloff = 0.5 * (1 + Math.cos(Math.PI * t));
          const offset = falloff * AMPLITUDE;
          const ux = dist > 0.001 ? dx / dist : 0;
          const uy = dist > 0.001 ? dy / dist : 0;
          px = gx + ux * offset; // pushed outward, away from the cursor
          py = gy + uy * offset;
          r = DOT_R + falloff * 1.1;
          alpha = 0.16 + falloff * 0.26;
        }

        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
})();
