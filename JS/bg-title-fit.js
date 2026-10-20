/* =====================================================================
   BACKGROUND TITLE — exact width fit + position under the nav
   Width: measures the text's actual rendered width and scales it to
   precisely fill the target percentage of the stage.
   Position: reads the *actual* nav height at runtime and places the
   title's top edge a fixed gap below it — accurate even if the nav's
   height changes later, rather than a guessed pixel value baked in.
===================================================================== */
(() => {
  const wrap = document.querySelector('.bg-title');
  const inner = document.querySelector('.bg-title-inner');
  const nav = document.getElementById('dmNav');
  if (!wrap || !inner) return;

  const TARGET_PERCENT = 0.875; // middle of the requested 85–90%
  const Y_STRETCH = 1.45;       // vertical-only stretch, kept from before
  const GAP_BELOW_NAV = 20;     // px

  function fit() {
    inner.style.transform = 'none'; // reset so we measure the natural width
    const naturalWidth = inner.getBoundingClientRect().width;
    const containerWidth = wrap.parentElement.clientWidth; // the stage
    const scaleX = naturalWidth > 0 ? (containerWidth * TARGET_PERCENT) / naturalWidth : 1;
    inner.style.transform = `scale(${scaleX}, ${Y_STRETCH})`;

    if (nav) {
      wrap.style.top = (nav.getBoundingClientRect().height + GAP_BELOW_NAV) + 'px';
    }
  }

  fit();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(fit); // re-fit once Anton has actually loaded
  }

  let resizeT;
  window.addEventListener('resize', () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(fit, 120);
  });
})();
