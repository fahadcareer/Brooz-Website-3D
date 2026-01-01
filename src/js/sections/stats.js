import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initStats() {
    gsap.registerPlugin(ScrollTrigger);

    const stats = document.querySelectorAll('.stat-card');
    if (stats.length > 0) {
        gsap.from(stats, {
            scrollTrigger: {
                trigger: ".stats-grid",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 100,
            autoAlpha: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out"
        });

        gsap.utils.toArray('.counters').forEach(counter => {
            const target = +counter.getAttribute('data-target');
            gsap.to(counter, {
                innerHTML: target,
                duration: 2,
                scrollTrigger: {
                    trigger: counter,
                    start: "top 85%",
                    once: true
                },
                snap: { innerHTML: 1 },
                ease: "power2.out",
                onUpdate: function () {
                    counter.innerHTML = Math.ceil(this.targets()[0].innerHTML);
                }
            });
        });
    }
}
