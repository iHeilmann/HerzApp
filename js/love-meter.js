// Elements
const heart  = document.getElementById("loveHeart");
const fill   = document.getElementById("loveFill");
const result = document.getElementById("loveResult");

let percentage = 0;

// Click on the heart
heart.addEventListener("click", () => {
    if (percentage < 100) {
        percentage += 10;
        fill.style.height = percentage + "%";
    }

    // Pulse effect
    heart.style.transition = "transform 0.15s ease";
    heart.style.transform  = "rotate(-45deg) scale(1.1)";
    setTimeout(() => {
        heart.style.transform = "rotate(-45deg) scale(1)";
    }, 150);

    // When full
    if (percentage === 100) {
        result.textContent  = "You have completely filled my heart ❤️";
        result.style.opacity = "1";
    }
});
