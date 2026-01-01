import gsap from 'gsap';

export function initContactForm() {
    const contactForm = document.querySelector(".glass-form");
    const formContent = document.querySelector("#contactForm");
    const successMessage = document.querySelector("#successMessage");

    if (contactForm && formContent && successMessage) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector("button");
            const originalText = btn.innerText;
            btn.innerText = "Processing...";
            btn.disabled = true;

            // Submit to Web3Forms via AJAX
            const formData = new FormData(contactForm);

            fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            })
                .then(() => {
                    // Success UI transition
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
                })
                .catch((error) => {
                    console.error("Form submission error:", error);
                    btn.innerText = "Error! Try again";
                    btn.disabled = false;
                    setTimeout(() => { btn.innerText = originalText; }, 3000);
                });
        });
    }
}
