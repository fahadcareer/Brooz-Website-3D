import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initGeneralAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // General Scroll Animations for other sections
    gsap.utils.toArray('.glass-card:not(.hero-main-card):not(.stat-card):not(.service-card):not(.production-panel):not(.project-card):not(.why-card):not(.testimonial-card):not(.overlay-content)').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 50,
            autoAlpha: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Parallax for visual elements
    gsap.utils.toArray('.visual-element').forEach((el, i) => {
        const speed = el.dataset.speed || 1;
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            },
            y: -50 * speed,
            ease: "none"
        });
    });
}
