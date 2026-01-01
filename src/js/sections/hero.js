import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initHero() {
    gsap.registerPlugin(ScrollTrigger);

    // HERO REVEAL (Run always)
    const tl = gsap.timeline({
        onComplete: () => {
            // Refresh ScrollTrigger after intro to ensure positions are correct
            ScrollTrigger.refresh();
        }
    });

    tl.from('.hero-main-card', { y: 100, autoAlpha: 0, duration: 1.5, ease: 'power4.out' })
        .from('.hero-title-large', { y: 50, autoAlpha: 0, duration: 1, ease: 'power3.out' }, '-=1')
        .from('.hero-separator', { scaleX: 0, duration: 0.8, ease: 'power2.out' }, '-=0.8')
        .from('.hero-subtitle', { y: 20, autoAlpha: 0, duration: 1, ease: 'power3.out' }, '-=0.6')
        .from('.hero-buttons a', { y: 20, autoAlpha: 0, stagger: 0.2, duration: 0.8, ease: 'power2.out' }, '-=0.8')
        .from('.scroll-indicator', { autoAlpha: 0, duration: 1 }, '-=0.5');

    // SCROLLTRIGGER MATCHMEDIA FOR RESPONSIVE ANIMATIONS
    let mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
        // DESKTOP ONLY: Hero Apple-style shrink
        const heroScroll = gsap.timeline({
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom top",
                scrub: true,
                pin: true,
                invalidateOnRefresh: true,
            }
        });

        heroScroll
            .to(".hero-main-card", {
                scale: 0.3,
                x: -window.innerWidth * 0.33,
                y: -window.innerHeight * 0.35,
                borderRadius: "50px",
                backdropFilter: "blur(5px)",
                opacity: 0.8,
                ease: "none"
            })
            .to(".hero-title-large", {
                fontSize: "2rem",
                marginBottom: "0.5rem",
                ease: "none"
            }, "<")
            .to(".hero-subtitle", {
                autoAlpha: 0,
                height: 0,
                margin: 0,
                ease: "none"
            }, "<")
            .to(".hero-buttons", {
                autoAlpha: 0,
                display: "none",
                ease: "none"
            }, "<")
            .to(".hero-separator", {
                width: "30px",
                marginBottom: "0.5rem",
                ease: "none"
            }, "<")
            .to(".scroll-indicator", {
                autoAlpha: 0,
                ease: "none"
            }, "<0.2");
    });

    mm.add("(max-width: 768px)", () => {
        // MOBILE ONLY: Simple Hero Fade Out (No Pin)
        gsap.to(".hero-main-card", {
            autoAlpha: 0,
            scale: 0.9,
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // HERO INTERACTION: 3D Tilt on Mouse Move
    const heroCard = document.querySelector('.hero-main-card');
    const heroContainer = document.querySelector('.scene-hero');
    if (heroCard && heroContainer) {
        heroContainer.addEventListener('mousemove', (e) => {
            const { offsetWidth: width, offsetHeight: height } = heroContainer;
            const { clientX: x, clientY: y } = e;
            const xPos = (x / width - 0.5) * 30;
            const yPos = (y / height - 0.5) * -30;
            gsap.to(heroCard, {
                rotationY: xPos,
                rotationX: yPos,
                duration: 0.5,
                ease: 'power2.out',
                transformPerspective: 1000,
                transformOrigin: "center center"
            });
        });
        heroContainer.addEventListener('mouseleave', () => {
            gsap.to(heroCard, { rotationY: 0, rotationX: 0, duration: 1, ease: 'power2.out' });
        });
    }
}
