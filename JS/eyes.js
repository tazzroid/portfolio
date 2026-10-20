/* =====================================================================
   EYE TRACKING
   Moves the two iris/pupil layers (eye-left.png, eye-right.png) toward
   the cursor, independently of the breathing animation and the
   mouse-parallax on the outer layer — this is a THIRD, separate
   transform, applied directly to each eye <img>.

   Positions below (cx/cy, MAX_X/MAX_Y) were measured directly from the
   1200x1600 export: socket ≈113x95px, iris ≈60x63px, so travel is
   capped well inside the socket in every direction.
===================================================================== */
(() => {
  const rig = document.querySelector('.character-rig');
  const eyeL = document.getElementById('eyeLeft');
  const eyeR = document.getElementById('eyeRight');
  if (!rig || !eyeL || !eyeR) return;

  const ASSET_W = 1200, ASSET_H = 1600;

  // Neutral socket centers, measured from the source PNGs.
  const EYES = [
    { el: eyeL, cx: 708.0, cy: 364.5 },
    { el: eyeR, cx: 489.5, cy: 364.5 },
  ];

  const MAX_X = 20; // px of iris travel at full asset scale (left/right)
  const MAX_Y = 10; // px of iris travel at full asset scale (up/down)
  const EASE = 0.15;

  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!hasFinePointer) return; // leave eyes at rest on touch devices

  const state = EYES.map(() => ({ x: 0, y: 0 }));
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function tick() {
    // rig.getBoundingClientRect() already reflects the current breathing
    // scale AND the parallax translate on ancestors, so eye sockets stay
    // correctly located even while those animations are mid-motion.
    const rect = rig.getBoundingClientRect();
    const scale = rect.width / ASSET_W;

    EYES.forEach((eye, i) => {
      const s = state[i];
      const socketX = rect.left + (eye.cx / ASSET_W) * rect.width;
      const socketY = rect.top + (eye.cy / ASSET_H) * rect.height;

      let dx = mouseX - socketX;
      let dy = mouseY - socketY;

      const maxX = MAX_X * scale;
      const maxY = MAX_Y * scale;

      // elliptical clamp so the iris can't leave the socket in any direction
      const nx = dx / maxX;
      const ny = dy / maxY;
      const mag = Math.hypot(nx, ny);
      if (mag > 1) {
        dx /= mag;
        dy /= mag;
      }

      s.x += (dx - s.x) * EASE;
      s.y += (dy - s.y) * EASE;
      eye.el.style.transform = `translate3d(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px, 0)`;
    });

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();
