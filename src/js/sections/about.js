import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initAbout() {
    gsap.registerPlugin(ScrollTrigger);

    // WHY CHOOSE US
    const whySection = document.querySelector("#why-choose");
    if (whySection) {
        const glowBg = document.querySelector(".why-glow-bg");
        const cards = document.querySelectorAll(".why-card");
        if (glowBg) {
            gsap.to(glowBg, {
                opacity: 0.8,
                scale: 1.2,
                scrollTrigger: {
                    trigger: "#why-choose",
                    start: "top 60%",
                    end: "bottom 60%",
                    scrub: 1
                }
            });
        }
        gsap.from(cards, {
            y: 60,
            autoAlpha: 0,
            rotateX: -15,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".why-grid",
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    }

    // TESTIMONIALS
    const testimonials = document.querySelector("#testimonials");
    if (testimonials) {
        const track = document.querySelector(".carousel-track");
        if (track && track.children.length < 8) {
            const items = track.innerHTML;
            track.innerHTML += items;
        }

        gsap.to(track, {
            xPercent: -50,
            ease: "none",
            duration: 30,
            repeat: -1
        });

        gsap.from(".testimonial-card", {
            y: 50,
            autoAlpha: 0,
            stagger: 0.1,
            duration: 1,
            scrollTrigger: {
                trigger: "#testimonials",
                start: "top 75%",
                toggleActions: "play none none none"
            }
        });
    }
}
