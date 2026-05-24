// Elements
const envelope      = document.getElementById("envelope");
const openBtn       = document.getElementById("openLetterBtn");
const letterContent = document.getElementById("letterContent");

// Open via button
openBtn.addEventListener("click", () => {
    envelope.classList.add("open");
    setTimeout(() => {
        letterContent.classList.add("show");
    }, 600);
});

// Open via click on envelope
envelope.addEventListener("click", () => {
    envelope.classList.add("open");
    setTimeout(() => {
        letterContent.classList.add("show");
    }, 600);
});
