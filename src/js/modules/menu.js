// Menu animatie met GSAP SplitText
// Vereist: gsap en SplitText (via CDN of bundler)

gsap.registerPlugin(SplitText);

let splitInstances = [];
let tl;

function animateMenuItems() {
  // Oude splits opruimen
  splitInstances.forEach(split => split.revert && split.revert());
  splitInstances = [];

  // Selecteer alle menu-item-mask elementen
  const items = document.querySelectorAll('.menu-item-mask');
  tl = gsap.timeline();

  items.forEach((item, idx) => {
    // Split per letter
    const split = new SplitText(item, { type: "chars", charsClass: "char" });
    splitInstances.push(split);

    // Animatie: van onder naar boven, stagger per letter
    tl.from(split.chars, {
      yPercent: 100,
      opacity: 0,
      duration: 0.4,
      stagger: 0.04,
      ease: "power2.out"
    }, idx * 0.1); // kleine delay tussen de menu-items
  });
}

// Init bij load
window.addEventListener('DOMContentLoaded', animateMenuItems);

// (optioneel) Opnieuw animeren bij resize
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(animateMenuItems, 250);
}); 