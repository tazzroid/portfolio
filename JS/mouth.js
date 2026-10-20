/* =====================================================================
   MOUTH EXPRESSION SWAP
   "On the face" is a simple ellipse hit-test using the exact region you
   marked (eyes/nose/mouth), measured directly from your reference file:
     center (603, 387.5), rx 136, ry 247.5   — on the 1200x1600 canvas

   Earlier version tried to read face.png's pixel alpha via a hidden
   canvas — that breaks under file:// (browsers block canvas pixel
   reads there as a security measure, "tainted canvas"). This version
   does plain point-in-ellipse math instead, so it works whether the
   page is opened directly as a file or served from a real host.
===================================================================== */
(() => {
  const rig = document.querySelector('.character-rig');
  const mouthSmile = document.getElementById('mouthSmile');
  const mouthOops = document.getElementById('mouthOops');
  if (!rig || !mouthSmile || !mouthOops) return;

  const ASSET_W = 1200, ASSET_H = 1600;

  // The trigger region, in asset-space pixels.
  const ZONE = { cx: 603, cy: 387.5, rx: 136, ry: 247.5 };

  function isInZone(clientX, clientY) {
    const rect = rig.getBoundingClientRect();
    const ax = ((clientX - rect.left) / rect.width) * ASSET_W;
    const ay = ((clientY - rect.top) / rect.height) * ASSET_H;
    const nx = (ax - ZONE.cx) / ZONE.rx;
    const ny = (ay - ZONE.cy) / ZONE.ry;
    return (nx * nx + ny * ny) <= 1;
  }

  function setExpression(onFace) {
    mouthOops.style.opacity = onFace ? '1' : '0';
    mouthSmile.style.opacity = onFace ? '0' : '1';
  }

  window.addEventListener('mousemove', (e) => {
    setExpression(isInZone(e.clientX, e.clientY));
  });
  document.addEventListener('mouseleave', () => setExpression(false));
})();
