import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAbout() {
  // Change body to white
  gsap.to("body", {
    backgroundColor: "var(--bw-white)",
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      id: "toWhite",
      trigger: ".about",
      start: "top bottom",
      end: "bottom top",
      toggleActions: "play none none reverse",
      // FIX: markers kunnen handig zijn voor debugging op mobiel
      // Zet markers: true aan tijdens development om te zien waar triggers zijn
      // markers: false, // Uncomment voor debugging
    }
  });

  // Moments fade-in per item
  document.querySelectorAll(".moment").forEach((moment) => {
    gsap.from(moment, {
      autoAlpha: 0,
      y: 50,
      duration: 1.25,
      ease: "power4.out",
      scrollTrigger: {
        trigger: moment,
        // FIX: start: "top 90%" werkt goed op mobiel
        // Dit triggert de animatie wanneer het element 90% van viewport hoogte bereikt
        // Op mobiel is dit vaak beter dan "top bottom" omdat schermen kleiner zijn
        start: "top 90%",
        toggleActions: "play none none reverse",
        // FIX: once: false zorgt ervoor dat animatie kan herhalen bij scroll terug
        // Dit is standaard gedrag, maar expliciet maken voor duidelijkheid
        // once: false, // Uncomment als je animatie maar 1x wilt afspelen
      }
    });
  });
} 