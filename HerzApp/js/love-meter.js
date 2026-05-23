// Elemente
const heart = document.getElementById("loveHeart");
const fill = document.getElementById("loveFill");
const result = document.getElementById("loveResult");

let percentage = 0;

// Klick auf das Herz
heart.addEventListener("click", () => {
    if (percentage < 100) {
        percentage += 10;
        fill.style.height = percentage + "%";
    }

    // Puls-Effekt
    heart.style.transition = "transform 0.15s ease";
    heart.style.transform = "rotate(-45deg) scale(1.1)";
    setTimeout(() => {
        heart.style.transform = "rotate(-45deg) scale(1)";
    }, 150);

    // Wenn voll
    if (percentage === 100) {
        result.textContent = "Du hast mein Herz komplett gefüllt ❤️";
        result.style.opacity = "1";
    }
});
