import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initCTA() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".cta-glass-panel", {
        scrollTrigger: {
            trigger: ".scene-cta",
            start: "top 75%",
            toggleActions: "play none none none"
        },
        scale: 1,
        autoAlpha: 1, // Ensure opacity:1 and visibility:visible
        duration: 1.2,
        ease: "power3.out"
    });
}
