import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enable ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// FIX: normalizeScroll is verwijderd - wordt nu globaal gedaan in scroll-config.js
// Dit voorkomt dubbele initialisatie en zorgt voor consistente configuratie

export function initProjects() {
  document.querySelectorAll(".project").forEach((project) => {
    const slides = project.querySelector(".project__slides");
    const sticky = project.querySelector(".project__sticky");
    const overlay = project.querySelector(".project__overlay");
    const title = project.querySelector(".project__title");
    const slideCount = slides.children.length;
    const bgColor = project.dataset.bg;

    // Set initial background color from data-bg
    if (bgColor) {
      sticky.style.backgroundColor = bgColor;
    }

    function getScrollLength() {
      return (slideCount + 1) * sticky.getBoundingClientRect().width;
    }

    // Horizontale scroll
    gsap.to(slides, {
      x: () => `-${getScrollLength() - sticky.getBoundingClientRect().width}px`,
      ease: "none",
      scrollTrigger: {
        trigger: project,
        start: "top top",
        end: () => `+=${getScrollLength()}`,
        scrub: true,
        pin: sticky,
        invalidateOnRefresh: true,
        // FIX: anticipatePin verbetert pinning performance op mobiel
        // Het anticipeert op pinning en berekent ruimte van tevoren
        // Dit voorkomt "jump" effecten tijdens scroll op mobiele apparaten
        anticipatePin: 1,
        // FIX: pinSpacing zorgt voor correcte spacing tijdens pinning
        // Zonder dit kan de layout "springen" omdat de gepinde element ruimte inneemt
        pinSpacing: true,
      }
    });

    // Title fade out (sneller)
    gsap.to(title, {
      autoAlpha: 0.2,
      duration: 0.5,
      delay: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: project,
        start: "top top",
        end: "top top",
        toggleActions: "play none none reverse"
      }
    });

    // Overlay fade out
    gsap.to(overlay, {
      autoAlpha: 0.2,
      duration: 0.75,
      delay: 0.2,
      ease: "power1.out",
      scrollTrigger: {
        trigger: project,
        start: "top top",
        end: "top top",
        toggleActions: "play none none reverse"
      }
    });

    // Sticky background fade direct
    gsap.to(sticky, {
      backgroundColor: "var(--projects-panel)",
      duration: 0.75,
      delay: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: project,
        start: "top top",
        end: "top top",
        toggleActions: "play none none reverse"
      }
    });
  });

  // FIX: Resize handler verwijderd - wordt nu globaal afgehandeld in scroll-config.js
  // Dit voorkomt meerdere resize listeners en zorgt voor debounced refresh
  // De globale handler is geoptimaliseerd voor betere performance

  // FIX: Lenis scrollEnd handler is nu overbodig
  // Dit wordt al afgehandeld in lenis.js waar Lenis en ScrollTrigger geïntegreerd zijn
  // We houden deze check voor backwards compatibility, maar het zou niet nodig moeten zijn
  if (window.lenis) {
    window.lenis.on("scrollEnd", () => {
      ScrollTrigger.refresh();
    });
  }
} 