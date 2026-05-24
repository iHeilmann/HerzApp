const envelope      = document.getElementById("envelope");
const openBtn       = document.getElementById("openLetterBtn");
const letterContent = document.getElementById("letterContent");

function openLetter() {
    // Button sofort verstecken damit er nicht überdeckt werden kann
    openBtn.classList.add("hidden");

    // Klappe öffnen
    envelope.classList.add("open");

    // Brief einblenden
    setTimeout(() => {
        letterContent.classList.add("show");
    }, 650);
}

openBtn.addEventListener("click", openLetter);
envelope.addEventListener("click", openLetter);
