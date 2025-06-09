import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(SplitText, ScrollTrigger);

export function initHero() {
  // Split text animation
  let split = SplitText.create(".hero__heading", { type: "chars" });
  gsap.from(split.chars, {
    y: 0,
    autoAlpha: 0,
    stagger: 0.055,
    duration: 0.2,
    ease: "none"
  });

  const heroVideo = document.querySelector(".hero__video");

  // Hero scroll animation
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "+=200%",
      scrub: true,
      pin: true,
      onUpdate: (self) => {
        const progress = self.progress;
        if (progress >= 1) {
          heroVideo.pause();
          gsap.to(heroVideo, { opacity: 0.4, duration: 0.1, ease: "power2.out" });
        } else {
          heroVideo.play();
          gsap.to(heroVideo, { opacity: 1, duration: 0.1, ease: "power2.out" });
        }
      }
    }
  });

  tl.to(".hero__bg", { backgroundColor: "transparent", ease: "power4.out" }, 0);
  tl.to(".hero__type", { autoAlpha: 0, ease: "power4.out" }, 0);
  tl.to(".hero__portrait", { scale: 1.2, autoAlpha: 0, ease: "power2.out" }, 0);
  tl.from(".hero__video", { autoAlpha: 0, scale: 0.9, ease: "power2.out" }, 0.2);
  tl.to(
    ".hero__heading",
    {
      color: "white",
      scale: 0.5,
      mixBlendMode: "normal",
      ease: "power4.out"
    },
    0.1
  );

  // Fit text to container
  fitText(".hero__heading", 1.5);
}

// Helper function to fit text to container
function fitText(selector, compressor = 1) {
  const elements = document.querySelectorAll(selector);
  function resize() {
    elements.forEach((element) => {
      const parentWidth = element.parentElement.offsetWidth;
      const textLength = element.textContent.length;
      const newFontSize = (parentWidth / textLength) * compressor;
      element.style.fontSize = `${newFontSize}px`;
    });
  }
  resize();
  window.addEventListener("resize", resize);
} 