import gsap from 'gsap';

export function initCursor() {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        // Set initial position off-screen or center
        gsap.set(cursor, { xPercent: -50, yPercent: -50 });

        window.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.15,
                ease: "power2.out"
            });
        });

        // Optional: Hover effects for links/buttons
        const hoverables = document.querySelectorAll('a, button, .service-card');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(cursor, { scale: 2, backgroundColor: "rgba(255,255,255,0.1)", duration: 0.2 });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(cursor, { scale: 1, backgroundColor: "transparent", duration: 0.2 });
            });
        });
    }
}
