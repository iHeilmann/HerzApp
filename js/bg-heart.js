// Dieses Modul benötigt keine aktive JS-Interaktion.
// Die Animation läuft vollständig über CSS.

// Optional: sanfter Fade-In beim Laden
document.addEventListener("DOMContentLoaded", () => {
    document.body.style.opacity = "0";
    setTimeout(() => {
        document.body.style.transition = "opacity 1.2s ease";
        document.body.style.opacity = "1";
    }, 50);
});
