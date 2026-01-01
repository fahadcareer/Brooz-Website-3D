import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initWork() {
    gsap.registerPlugin(ScrollTrigger);
    let mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
        // DESKTOP ONLY: Production Horizontal Scroll
        const productionSection = document.querySelector("#production");
        const productionTrack = document.querySelector(".production-track");

        if (productionSection && productionTrack) {
            const getScrollAmount = () => -(productionTrack.scrollWidth - window.innerWidth);

            gsap.to(productionTrack, {
                x: getScrollAmount,
                ease: "none",
                scrollTrigger: {
                    trigger: productionSection,
                    start: "top top",
                    end: () => `+=${productionTrack.scrollWidth - window.innerWidth}`,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                }
            });

            const panels = document.querySelectorAll(".production-panel");
            panels.forEach((panel) => {
                gsap.from(panel, {
                    y: 100,
                    autoAlpha: 0,
                    rotateY: -45,
                    duration: 1,
                    scrollTrigger: {
                        trigger: panel,
                        containerAnimation: gsap.getTweensOf(productionTrack)[0],
                        start: "left 90%",
                        toggleActions: "play none none none"
                    }
                });
            });
        }
    });

    mm.add("(max-width: 768px)", () => {
        // Mobile Production: Simple Vertical Reveal (No horizontal scroll)
        const panels = document.querySelectorAll(".production-panel");
        panels.forEach(panel => {
            gsap.from(panel, {
                y: 50,
                autoAlpha: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: panel,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        });
    });

    // PROCESS SECTION ANIMATION
    const processSection = document.querySelector("#process");
    if (processSection) {
        const drawLine = document.querySelector(".draw-line");
        const steps = document.querySelectorAll(".process-step");

        if (drawLine) {
            gsap.fromTo(drawLine,
                { strokeDashoffset: 1000 },
                {
                    strokeDashoffset: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".process-timeline",
                        start: "top 60%",
                        end: "bottom 80%",
                        scrub: 1
                    }
                }
            );
        }

        steps.forEach((step, i) => {
            ScrollTrigger.create({
                trigger: step,
                start: "top 70%",
                end: "bottom 60%",
                onEnter: () => step.classList.add("active"),
                onLeaveBack: () => step.classList.remove("active")
            });
        });
    }
}
