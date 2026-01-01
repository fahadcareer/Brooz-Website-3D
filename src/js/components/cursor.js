import gsap from 'gsap';

export function initCursor() {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        // Set initial position off-screen
        gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0 });

        const moveCursor = (x, y) => {
            gsap.to(cursor, {
                x: x,
                y: y,
                opacity: 1,
                duration: 0.2,
                ease: "power2.out"
            });
        };

        // Desktop Mouse Tracking
        window.addEventListener('mousemove', (e) => {
            moveCursor(e.clientX, e.clientY);
        });

        // Mobile/Tablet Touch Tracking
        window.addEventListener('touchstart', (e) => {
            if (e.touches.length > 0) {
                gsap.set(cursor, { x: e.touches[0].clientX, y: e.touches[0].clientY, opacity: 1 });
            }
        });

        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                moveCursor(e.touches[0].clientX, e.touches[0].clientY);
            }
        });

        window.addEventListener('touchend', () => {
            // Optional: Hide cursor when touch ends to avoid "ghost" cursor
            // gsap.to(cursor, { opacity: 0, duration: 0.3 });
        });

        // Hover effects
        const hoverables = document.querySelectorAll('a, button, .service-card, .btn-glass, .nav-link');
        hoverables.forEach(el => {
            el.addEventListener('pointerenter', () => {
                gsap.to(cursor, {
                    scale: 2.5,
                    backgroundColor: "rgba(255,255,255,0.15)",
                    borderWidth: '0px',
                    duration: 0.3
                });
            });
            el.addEventListener('pointerleave', () => {
                gsap.to(cursor, {
                    scale: 1,
                    backgroundColor: "transparent",
                    borderWidth: '1px',
                    duration: 0.3
                });
            });
        });
    }
}
