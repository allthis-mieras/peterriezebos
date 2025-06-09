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
        invalidateOnRefresh: true
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

    // Refresh ScrollTrigger on window resize
    window.addEventListener("resize", () => {
      ScrollTrigger.refresh();
    });
  });
} 