import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initProjects() {
    gsap.registerPlugin(ScrollTrigger);

    const projectsSection = document.querySelector("#projects");
    if (projectsSection) {
        const vLine = document.querySelector(".vertical-glass-line");
        const projectCards = document.querySelectorAll(".project-card");

        if (vLine) {
            gsap.from(vLine, {
                scaleY: 0,
                transformOrigin: "top center",
                ease: "none",
                scrollTrigger: {
                    trigger: ".projects-grid",
                    start: "top 70%",
                    end: "bottom 80%",
                    scrub: 1
                }
            });
        }

        gsap.from(projectCards, {
            y: 50,
            autoAlpha: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".projects-grid",
                start: "top 75%",
                toggleActions: "play none none none"
            }
        });
    }
}
