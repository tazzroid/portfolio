// Mobile nav toggle — the only interaction this build needs so far.
const burger = document.getElementById('dmBurger');
const links = document.getElementById('dmLinks');

if (burger && links) {
  burger.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}
const customCursor = document.getElementById('customCursor');

let mouseX = 0;
let mouseY = 0;

let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.15;
  cursorY += (mouseY - cursorY) * 0.15;

  customCursor.style.left = `${cursorX}px`;
  customCursor.style.top = `${cursorY}px`;

  requestAnimationFrame(animateCursor);
}

animateCursor();