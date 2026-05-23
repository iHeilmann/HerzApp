// Alle Listenelemente holen
const items = document.querySelectorAll(".love-list li");

// Animation nacheinander starten
let delay = 200;

items.forEach((item, i) => {
    setTimeout(() => {
        item.classList.add("show");
    }, delay * (i + 1));
});
