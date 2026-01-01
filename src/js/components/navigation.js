import gsap from 'gsap';

export function initNavigation() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener("scroll", () => {
            let current = "";

            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= window.innerHeight * 0.4) {
                    current = section.getAttribute("id");
                }
            });

            // Map content sections to nav links for continuity
            if (current === "trust") current = "hero";          // Stats -> Home
            if (current === "process") current = "production"; // Workflow -> Work
            if (current === "testimonials") current = "why-choose"; // Testimonials -> About

            navLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${current}`) {
                    link.classList.add("active");
                }
            });
        });
    }

    // Intro Animation for Nav
    gsap.from('.glass-nav', { y: -20, autoAlpha: 0, duration: 1, ease: 'power3.out', delay: 2 });
}
