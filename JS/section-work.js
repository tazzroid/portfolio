/* =====================================================================
   SELECTED WORK — section content, kept out of dm-index.html
   Injected into the #work-section-mount placeholder at load. This is a
   plain JS injection (not fetch()) on purpose: fetching a separate
   work.html file would need a local server, since browsers block
   fetch() of local files under file:// — same restriction that broke
   the old canvas-based mouth-tracking earlier. This way works whether
   the page is opened directly or served from a real host.

   TO SWAP IN A REAL PROJECT: replace a .work-card-ph span with
   <img src="..." alt="..."> and point that <a href="..."> at the
   project's page once it exists. Each card appears TWICE (original +
   the duplicate later in the same row) — update both.
===================================================================== */
(() => {
  const mount = document.getElementById('work-section-mount');
  if (!mount) return;

  mount.outerHTML = `
  <section class="work-section" id="work">
    <h2 class="work-heading">Selected Work</h2>

    <div class="marquee-row marquee-row--left">
      <div class="marquee-track">

        <a class="work-card" href="#" aria-label="Branding project 01">
          <span class="work-card-ph" aria-hidden="true"><span class="work-card-tag">Branding 01</span></span>
          <span class="work-card-dim" aria-hidden="true"></span>
          <span class="work-card-view" aria-hidden="true">View Project</span>
        </a>
        <a class="work-card" href="#" aria-label="Merchandise project 01">
          <span class="work-card-ph" aria-hidden="true"><span class="work-card-tag">Merch 01</span></span>
          <span class="work-card-dim" aria-hidden="true"></span>
          <span class="work-card-view" aria-hidden="true">View Project</span>
        </a>
        <a class="work-card" href="#" aria-label="Branding project 02">
          <span class="work-card-ph" aria-hidden="true"><span class="work-card-tag">Branding 02</span></span>
          <span class="work-card-dim" aria-hidden="true"></span>
          <span class="work-card-view" aria-hidden="true">View Project</span>
        </a>
        <a class="work-card" href="#" aria-label="Merchandise project 02">
          <span class="work-card-ph" aria-hidden="true"><span class="work-card-tag">Merch 02</span></span>
          <span class="work-card-dim" aria-hidden="true"></span>
          <span class="work-card-view" aria-hidden="true">View Project</span>
        </a>
        <a class="work-card" href="#" aria-label="Branding project 03">
          <span class="work-card-ph" aria-hidden="true"><span class="work-card-tag">Branding 03</span></span>
          <span class="work-card-dim" aria-hidden="true"></span>
          <span class="work-card-view" aria-hidden="true">View Project</span>
        </a>

        <!-- duplicate set — keeps the loop seamless -->
        <a class="work-card" href="#" aria-label="Branding project 01">
          <span class="work-card-ph" aria-hidden="true"><span class="work-card-tag">Branding 01</span></span>
          <span class="work-card-dim" aria-hidden="true"></span>
          <span class="work-card-view" aria-hidden="true">View Project</span>
        </a>
        <a class="work-card" href="#" aria-label="Merchandise project 01">
          <span class="work-card-ph" aria-hidden="true"><span class="work-card-tag">Merch 01</span></span>
          <span class="work-card-dim" aria-hidden="true"></span>
          <span class="work-card-view" aria-hidden="true">View Project</span>
        </a>
        <a class="work-card" href="#" aria-label="Branding project 02">
          <span class="work-card-ph" aria-hidden="true"><span class="work-card-tag">Branding 02</span></span>
          <span class="work-card-dim" aria-hidden="true"></span>
          <span class="work-card-view" aria-hidden="true">View Project</span>
        </a>
        <a class="work-card" href="#" aria-label="Merchandise project 02">
          <span class="work-card-ph" aria-hidden="true"><span class="work-card-tag">Merch 02</span></span>
          <span class="work-card-dim" aria-hidden="true"></span>
          <span class="work-card-view" aria-hidden="true">View Project</span>
        </a>
        <a class="work-card" href="#" aria-label="Branding project 03">
          <span class="work-card-ph" aria-hidden="true"><span class="work-card-tag">Branding 03</span></span>
          <span class="work-card-dim" aria-hidden="true"></span>
          <span class="work-card-view" aria-hidden="true">View Project</span>
        </a>

      </div>
    </div>

    <div class="marquee-row marquee-row--right">
      <div class="marquee-track">

        <a class="work-card" href="#" aria-label="Merchandise project 03">
          <span class="work-card-ph" aria-hidden="true"><span class="work-card-tag">Merch 03</span></span>
          <span class="work-card-dim" aria-hidden="true"></span>
          <span class="work-card-view" aria-hidden="true">View Project</span>
        </a>
        <a class="work-card" href="#" aria-label="Branding project 04">
          <span class="work-card-ph" aria-hidden="true"><span class="work-card-tag">Branding 04</span></span>
          <span class="work-card-dim" aria-hidden="true"></span>
          <span class="work-card-view" aria-hidden="true">View Project</span>
        </a>
        <a class="work-card" href="#" aria-label="Merchandise project 04">
          <span class="work-card-ph" aria-hidden="true"><span class="work-card-tag">Merch 04</span></span>
          <span class="work-card-dim" aria-hidden="true"></span>
          <span class="work-card-view" aria-hidden="true">View Project</span>
        </a>
        <a class="work-card" href="#" aria-label="Branding project 05">
          <span class="work-card-ph" aria-hidden="true"><span class="work-card-tag">Branding 05</span></span>
          <span class="work-card-dim" aria-hidden="true"></span>
          <span class="work-card-view" aria-hidden="true">View Project</span>
        </a>
        <a class="work-card" href="#" aria-label="Merchandise project 05">
          <span class="work-card-ph" aria-hidden="true"><span class="work-card-tag">Merch 05</span></span>
          <span class="work-card-dim" aria-hidden="true"></span>
          <span class="work-card-view" aria-hidden="true">View Project</span>
        </a>

        <!-- duplicate set — keeps the loop seamless -->
        <a class="work-card" href="#" aria-label="Merchandise project 03">
          <span class="work-card-ph" aria-hidden="true"><span class="work-card-tag">Merch 03</span></span>
          <span class="work-card-dim" aria-hidden="true"></span>
          <span class="work-card-view" aria-hidden="true">View Project</span>
        </a>
        <a class="work-card" href="#" aria-label="Branding project 04">
          <span class="work-card-ph" aria-hidden="true"><span class="work-card-tag">Branding 04</span></span>
          <span class="work-card-dim" aria-hidden="true"></span>
          <span class="work-card-view" aria-hidden="true">View Project</span>
        </a>
        <a class="work-card" href="#" aria-label="Merchandise project 04">
          <span class="work-card-ph" aria-hidden="true"><span class="work-card-tag">Merch 04</span></span>
          <span class="work-card-dim" aria-hidden="true"></span>
          <span class="work-card-view" aria-hidden="true">View Project</span>
        </a>
        <a class="work-card" href="#" aria-label="Branding project 05">
          <span class="work-card-ph" aria-hidden="true"><span class="work-card-tag">Branding 05</span></span>
          <span class="work-card-dim" aria-hidden="true"></span>
          <span class="work-card-view" aria-hidden="true">View Project</span>
        </a>
        <a class="work-card" href="#" aria-label="Merchandise project 05">
          <span class="work-card-ph" aria-hidden="true"><span class="work-card-tag">Merch 05</span></span>
          <span class="work-card-dim" aria-hidden="true"></span>
          <span class="work-card-view" aria-hidden="true">View Project</span>
        </a>

      </div>
    </div>
  </section>
  `;
})();
