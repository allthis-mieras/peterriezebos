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
      toggleActions: "play none none reverse"
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
        start: "top 90%",
        toggleActions: "play none none reverse"
      }
    });
  });
} 