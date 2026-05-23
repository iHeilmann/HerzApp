// Scroll-Fade-In für die Textblöcke
document.addEventListener("scroll", () => {
    const blocks = document.querySelectorAll(".fade-section");

    blocks.forEach(block => {
        const rect = block.getBoundingClientRect();
        const trigger = window.innerHeight * 0.85;

        if (rect.top < trigger) {
            block.classList.add("fade-in");
        }
    });
});
