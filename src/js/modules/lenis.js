import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * FIX: Lenis en ScrollTrigger integratie
 * 
 * Probleem: ScrollTrigger wist niet dat Lenis de scroll afhandelt, waardoor
 * triggers niet correct werden gedetecteerd op mobiel (en desktop).
 * 
 * Oplossing: We integreren Lenis met ScrollTrigger door:
 * 1. ScrollTrigger.update aan te roepen tijdens elke scroll
 * 2. ScrollTrigger.refresh aan te roepen na scroll end
 * 3. Lenis instance op window te zetten zodat andere modules erbij kunnen
 */
export function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    // FIX: Mobiele optimalisaties voor betere touch scroll performance
    smoothWheel: true,        // Smooth scroll voor muiswiel
    touchMultiplier: 2,       // Verhoogde touch sensitivity voor mobiel
  });

  // FIX: Integreer Lenis scroll events met ScrollTrigger
  // Dit zorgt ervoor dat ScrollTrigger altijd weet waar we zijn in de scroll
  // Zonder dit werkt ScrollTrigger niet correct met Lenis smooth scroll
  lenis.on('scroll', ScrollTrigger.update);

  // FIX: Refresh ScrollTrigger na scroll end
  // Dit is belangrijk omdat ScrollTrigger soms zijn berekeningen moet updaten
  // na een scroll sessie, vooral bij complexe pinning scenarios
  lenis.on('scrollEnd', () => {
    ScrollTrigger.refresh();
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // FIX: Zet Lenis instance op window object
  // Dit maakt het beschikbaar voor andere modules (zoals projects.js)
  // die mogelijk willen luisteren naar Lenis events
  window.lenis = lenis;

  return lenis;
} 