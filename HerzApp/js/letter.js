// Elemente
const envelope = document.getElementById("envelope");
const openBtn = document.getElementById("openLetterBtn");
const letterContent = document.getElementById("letterContent");

// Öffnen per Button
openBtn.addEventListener("click", () => {
    envelope.classList.add("open");

    setTimeout(() => {
        letterContent.classList.add("show");
    }, 600);
});

// Optional: Öffnen per Klick auf den Umschlag
envelope.addEventListener("click", () => {
    envelope.classList.add("open");

    setTimeout(() => {
        letterContent.classList.add("show");
    }, 600);
});
