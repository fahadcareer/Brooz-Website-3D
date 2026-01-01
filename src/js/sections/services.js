import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initServices(lenis) {
    gsap.registerPlugin(ScrollTrigger);

    const services = document.querySelectorAll('.service-card');
    console.log("Initializing Services Animation. Found cards:", services.length);

    if (services.length > 0) {
        gsap.set(services, { autoAlpha: 0, y: 60 }); // Set initial state immediately

        ScrollTrigger.batch(services, {
            onEnter: batch => gsap.to(batch, { autoAlpha: 1, y: 0, stagger: 0.15, overwrite: true, ease: "power2.out" }),
            onLeave: batch => gsap.set(batch, { autoAlpha: 0, overwrite: true }), // Optional: fade out when leaving? Maybe just keep them visible.
            onEnterBack: batch => gsap.to(batch, { autoAlpha: 1, y: 0, stagger: 0.15, overwrite: true, ease: "power2.out" }),
            onLeaveBack: batch => gsap.set(batch, { autoAlpha: 0, overwrite: true }),

            // Simplified trigger config for batch
            start: "top 85%",
        });

        // Simpler fallback if batch is too complex: passing standard query
        /* 
        gsap.to(services, {
            scrollTrigger: {
                trigger: ".services-grid",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
        });
        */
    }

    // SERVICE OVERLAY LOGIC
    const overlay = document.querySelector('.service-overlay');
    const closeBtn = document.querySelector('.close-overlay');
    const overlayTitle = document.getElementById('overlayTitle');
    const overlayDesc = document.getElementById('overlayDesc');

    // Content mapping for demo
    const serviceDetails = {
        "1": {
            title: "Brand Identity",
            desc: "We craft visual systems that dominate markets. From logo design to comprehensive style guides, our identity solutions Ensure your brand is instantly recognizable and impossible to ignore."
        },
        "2": {
            title: "Digital Strategy",
            desc: "Our data-driven approach penetrates noise. We analyze market trends, user behavior, and competitive landscapes to build digital roadmaps that guarantee ROI and sustainable growth."
        },
        "3": {
            title: "3D Prototyping",
            desc: "Visualize perfection before production. Our photorealistic 3D rendering and interactive prototyping allow you to iterate faster, reduce costs, and wow stakeholders with immersive product demos."
        },
        "4": {
            title: "Global Outreach",
            desc: "Connect borders, erase limits. Our localization strategies and global marketing frameworks ensure your message resonates culturally and linguistically in every target region."
        }
    };

    services.forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-service');
            const data = serviceDetails[id];

            if (data && overlay) {
                overlayTitle.innerText = data.title;
                overlayDesc.innerText = data.desc;
                overlay.style.opacity = '1';
                overlay.style.pointerEvents = 'auto'; // Re-enable clicks
                document.body.style.overflow = 'hidden'; // Stop scrolling
                if (lenis) lenis.stop(); // Stop Lenis scroll
            }
        });
    });

    const closeOverlay = () => {
        if (overlay) {
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
            document.body.style.overflow = '';
            if (lenis) lenis.start();
        }
    };

    if (closeBtn) closeBtn.addEventListener('click', closeOverlay);
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay || e.target.classList.contains('overlay-backdrop')) {
                closeOverlay();
            }
        });
    }
}
