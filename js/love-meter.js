const svg         = document.getElementById("meterSvg");
const fillRect    = document.getElementById("heartFillRect");
const percentText = document.getElementById("meterPercent");
const result      = document.getElementById("loveResult");

let percentage = 0;

svg.addEventListener("click", () => {
    if (percentage >= 100) return;

    percentage += 10;

    // Füll-Rechteck von unten nach oben animieren
    // y=190 = leer, y=0 = voll
    const newY = 190 - (190 * percentage / 100);
    fillRect.setAttribute("y", newY);
    percentText.textContent = percentage + "%";

    // Puls-Animation
    svg.classList.remove("pulse");
    void svg.offsetWidth; // reflow für Neustart
    svg.classList.add("pulse");

    // Glow steigern
    svg.style.filter = `drop-shadow(0 4px ${14 + percentage * 0.2}px rgba(140,80,30,${0.35 + percentage * 0.004}))`;

    // Vollständig gefüllt
    if (percentage === 100) {
        result.textContent  = "You have completely filled my heart ❤️";
        result.style.opacity = "1";
    }
});
