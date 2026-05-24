// Elemente
const track = document.querySelector(".carousel-track");
const images = Array.from(track.children);
const btnLeft = document.querySelector(".carousel-btn.left");
const btnRight = document.querySelector(".carousel-btn.right");
const dotsContainer = document.querySelector(".carousel-dots");

let index = 0;

// Dots erzeugen
images.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    dotsContainer.appendChild(dot);
});

const dots = Array.from(dotsContainer.children);

// Funktion zum Wechseln
function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`;

    images.forEach(img => img.classList.remove("active"));
    images[index].classList.add("active");

    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
}

// Buttons
btnRight.addEventListener("click", () => {
    index = (index + 1) % images.length;
    updateCarousel();
});

btnLeft.addEventListener("click", () => {
    index = (index - 1 + images.length) % images.length;
    updateCarousel();
});

// Dots klickbar
dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        index = i;
        updateCarousel();
    });
});

// Auto-Slide
setInterval(() => {
    index = (index + 1) % images.length;
    updateCarousel();
}, 4000);

// Swipe für Handy
let startX = 0;

track.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});

track.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    if (endX < startX - 50) btnRight.click();
    if (endX > startX + 50) btnLeft.click();
});
