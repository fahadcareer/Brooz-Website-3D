import gsap from 'gsap';

export function initContactForm() {
    const contactForm = document.querySelector(".glass-form");
    const formContent = document.querySelector("#contactForm");
    const successMessage = document.querySelector("#successMessage");

    if (contactForm && formContent && successMessage) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector("button");
            btn.innerText = "Processing...";

            setTimeout(() => {
                // Fade out form
                gsap.to(formContent, {
                    opacity: 0,
                    y: -20,
                    duration: 0.5,
                    onComplete: () => {
                        formContent.style.display = "none";
                        successMessage.style.display = "flex";

                        // Fade in success
                        gsap.fromTo(successMessage,
                            { opacity: 0, scale: 0.8 },
                            { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
                        );
                    }
                });
            }, 1500);
        });
    }
}
