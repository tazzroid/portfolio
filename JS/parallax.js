/* =====================================================================
   MOUSE PARALLAX ENGINE
   Works on any .p-layer[data-depth] inside #stage. To add a new layer:
     1. Give the element class="p-layer" and a data-depth="0.00–0.30"
     2. That's it — this script picks it up automatically.
===================================================================== */
(() => {
  const stage = document.getElementById('stage');
  if (!stage) return;

  const layers = Array.from(stage.querySelectorAll('.p-layer[data-depth]')).map(el => ({
    el,
    depth: parseFloat(el.dataset.depth) || 0,
    x: 0, y: 0,      // current (smoothed) position
    tx: 0, ty: 0,     // target position
  }));

  // Devices without a real mouse (touch-only) skip the effect —
  // layers just render at rest instead of chasing a finger around.
  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const MAX_SHIFT = 90;   // px of travel at full depth when cursor is at the stage edge
  const EASE = 0.08;      // lower = smoother/laggier, higher = snappier

  let mouseX = 0.5, mouseY = 0.5; // normalized 0–1 across the stage
  let ticking = false;

  function onPointerMove(e) {
    const rect = stage.getBoundingClientRect();
    mouseX = (e.clientX - rect.left) / rect.width;
    mouseY = (e.clientY - rect.top) / rect.height;

    // -1 .. 1 relative to center
    const nx = (mouseX - 0.5) * 2;
    const ny = (mouseY - 0.5) * 2;

    layers.forEach(l => {
      l.tx = nx * MAX_SHIFT * l.depth;
      l.ty = ny * MAX_SHIFT * l.depth;
    });

    if (!ticking) {
      ticking = true;
      requestAnimationFrame(render);
    }
  }

  function render() {
    let stillMoving = false;

    layers.forEach(l => {
      l.x += (l.tx - l.x) * EASE;
      l.y += (l.ty - l.y) * EASE;
      l.el.style.transform = `translate3d(${l.x.toFixed(2)}px, ${l.y.toFixed(2)}px, 0)`;
      if (Math.abs(l.tx - l.x) > 0.05 || Math.abs(l.ty - l.y) > 0.05) stillMoving = true;
    });

    if (stillMoving) {
      requestAnimationFrame(render);
    } else {
      ticking = false;
    }
  }

  if (hasFinePointer) {
    stage.addEventListener('mousemove', onPointerMove);
    stage.addEventListener('mouseleave', () => {
      // drift back to rest when the cursor leaves the stage
      layers.forEach(l => { l.tx = 0; l.ty = 0; });
      if (!ticking) { ticking = true; requestAnimationFrame(render); }
    });
  }
})();
