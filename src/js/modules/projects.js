import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initProjects() {
  document.querySelectorAll(".project").forEach((project) => {
    const slides = project.querySelector(".project__slides");
    const sticky = project.querySelector(".project__sticky");
    const overlay = project.querySelector(".project__overlay");
    const title = project.querySelector(".project__title");
    const slideCount = slides.children.length;

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
        invalidateOnRefresh: true
      }
    });

    // Overlay + title fade out
    gsap.to([overlay, title], {
      autoAlpha: 0.2,
      scrollTrigger: {
        trigger: project,
        start: "top top",
        end: () => `+=${sticky.getBoundingClientRect().width}`,
        scrub: true,
        invalidateOnRefresh: true
      }
    });

    // Sticky background fade
    gsap.to(sticky, {
      backgroundColor: "var(--projects-panel)",
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: project,
        start: "top top",
        end: () => `+=${sticky.getBoundingClientRect().width}`,
        invalidateOnRefresh: true
      }
    });
  });

  // Refresh ScrollTrigger on resize
  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });
} 