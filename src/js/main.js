import { initScrollConfig } from './modules/scroll-config';
import { initLenis } from './modules/lenis';
import { initHero } from './modules/hero';
import { initAbout } from './modules/about';
import { initProjects } from './modules/projects';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * FIX: Timing probleem oplossen
 * 
 * Probleem: ScrollTrigger initialiseert terwijl images/video's nog laden,
 * waardoor trigger posities verkeerd worden berekend.
 * 
 * Oplossing: Wachten op window.load (alle media geladen) voordat we
 * ScrollTriggers aanmaken. Dit zorgt ervoor dat alle element hoogtes
 * correct zijn bij initialisatie.
 */
function initApp() {
  // FIX: Initialiseer scroll configuratie EERST
  // Dit is cruciaal omdat ScrollTrigger configuratie (zoals normalizeScroll)
  // moet gebeuren voordat we ScrollTriggers aanmaken in andere modules
  // Anders werken de mobiele fixes niet correct
  initScrollConfig();

  // Initialize Lenis smooth scroll
  // FIX: Lenis moet na scroll-config maar voor andere modules
  // Dit zorgt ervoor dat Lenis-ScrollTrigger integratie werkt
  const lenis = initLenis();

  // Initialize components
  // Deze kunnen nu veilig ScrollTriggers aanmaken omdat alles geconfigureerd is
  initHero();
  initAbout();
  initProjects();

  // FIX: Refresh ScrollTrigger na alles geïnitialiseerd
  // Dit is belangrijk omdat elementen mogelijk nog aan het laden waren
  // tijdens initialisatie, en nu alle hoogtes correct zijn
  ScrollTrigger.refresh();

  // FIX: Als er een hash in de URL is (#about), scroll daar naartoe met Lenis
  // Dit zorgt ervoor dat smooth scroll werkt bij directe links
  // We gebruiken een kleine delay om zeker te zijn dat alles klaar is
  if (window.location.hash && lenis) {
    setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (target) {
        // Scroll naar target zonder animatie (duration: 0) omdat we al op de juiste plek zijn
        // Dit zorgt ervoor dat Lenis de scroll positie correct instelt
        lenis.scrollTo(target, { offset: 0, duration: 0 });
      }
    }, 100);
  }
}

// FIX: Wachten op window.load in plaats van direct uitvoeren
// window.load wacht tot ALLE resources (images, video's, etc.) geladen zijn
// Dit voorkomt dat ScrollTrigger posities berekent terwijl elementen nog groeien
if (document.readyState === 'complete') {
  // Als de pagina al geladen is (bijvoorbeeld bij directe link of refresh)
  // Direct initialiseren
  initApp();
} else {
  // Wachten tot alles geladen is
  window.addEventListener('load', initApp);
} 