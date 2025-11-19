import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Globale ScrollTrigger configuratie voor mobiele optimalisatie
 * 
 * FIX: Dit bestand centraliseert alle ScrollTrigger instellingen die nodig zijn
 * voor goede werking op mobiele apparaten. Problemen op mobiel ontstaan vaak door:
 * - ScrollTrigger die niet weet dat Lenis de scroll afhandelt
 * - Verschillende scroll gedrag tussen desktop en mobiel
 * - Timing issues bij resize/orientation change
 */
export function initScrollConfig() {
  // FIX: Globale configuratie voor betere performance en compatibiliteit
  // autoRefreshEvents zorgt ervoor dat ScrollTrigger automatisch refresh bij belangrijke events
  // ignoreMobileResize voorkomt onnodige refreshes tijdens mobiele resize events
  ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    ignoreMobileResize: true,
  });

  // FIX: normalizeScroll normaliseert scroll gedrag tussen verschillende browsers en apparaten
  // Dit is cruciaal voor mobiel omdat iOS Safari, Chrome Android, etc. allemaal anders scrollen
  // Door dit globaal te zetten werken alle ScrollTriggers consistent
  ScrollTrigger.normalizeScroll(true);

  // FIX: matchMedia laat ons verschillende instellingen gebruiken voor mobiel vs desktop
  // Dit voorkomt problemen zoals pinning die niet goed werkt op kleine schermen
  // NIEUWE SYNTAX: matchMedia verwacht nu functies die een object met 'add' en 'remove' retourneren
  // Dit is de nieuwe API sinds GSAP 3.12+ en vervangt de oude directe functie syntax
  ScrollTrigger.matchMedia({
    // Mobiele instellingen (schermen kleiner dan 768px)
    "(max-width: 768px)": () => ({
      add: () => {
        // Hier kunnen we specifieke mobiele aanpassingen doen indien nodig
        // Bijvoorbeeld: bepaalde pinning uitschakelen of andere start/end punten gebruiken
        // Deze functie wordt aangeroepen wanneer de media query matcht
      },
      remove: () => {
        // Cleanup functie (optioneel) - wordt aangeroepen wanneer media query niet meer matcht
      }
    }),
    // Desktop instellingen (schermen groter dan 768px)
    "(min-width: 769px)": () => ({
      add: () => {
        // Desktop specifieke instellingen kunnen hier
        // Deze functie wordt aangeroepen wanneer de media query matcht
      },
      remove: () => {
        // Cleanup functie (optioneel) - wordt aangeroepen wanneer media query niet meer matcht
      }
    }),
  });

  // FIX: Debounced resize handler voorkomt performance problemen
  // Zonder debounce wordt ScrollTrigger.refresh() te vaak aangeroepen tijdens resize
  // Dit veroorzaakt janky scroll gedrag, vooral op mobiel
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    // Wacht 250ms na de laatste resize event voordat we refresh doen
    // Dit zorgt ervoor dat we niet refresh tijdens het resize proces, maar pas erna
    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
  });

  // FIX: Orientation change handler voor mobiele apparaten
  // Wanneer een gebruiker het apparaat draait, veranderen viewport dimensies drastisch
  // ScrollTrigger moet dan opnieuw berekenen waar triggers zijn
  // We gebruiken een langere timeout (500ms) omdat orientatie change langer duurt
  window.addEventListener("orientationchange", () => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
  });
}

