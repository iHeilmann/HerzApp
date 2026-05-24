const videoMap = {
    "The Funeral":          "https://www.youtube.com/embed/cMFWFhTFohk",
    "Wonderwall":           "https://www.youtube.com/embed/6hzrDeceEKc",
    "How I Met Your Mother":"https://www.youtube.com/embed/cjJLEYMzpjc",
    "Game of Thrones":      "https://www.youtube.com/embed/BpJYNVhGf1s",
    "Titanic":              "https://www.youtube.com/embed/kVrqfYjkTdQ",
    "Titanic2":             "https://www.youtube.com/embed/kVrqfYjkTdQ"
};

function openVideoPopup(src) {
    const popup  = document.getElementById("videoPopup");
    const iframe = document.getElementById("popupVideo");
    iframe.src = src + "?autoplay=1";
    popup.style.display = "flex";
}

document.getElementById("closePopup").onclick = () => {
    const popup  = document.getElementById("videoPopup");
    const iframe = document.getElementById("popupVideo");
    iframe.src = "";
    popup.style.display = "none";
};

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("#quiz button").forEach(btn => {
        const match = (btn.getAttribute("onclick") || "").match(/'([^']+)'/);
        if (!match) return;

        const key = match[1];
        if (!videoMap[key]) return;

        btn.addEventListener("click", () => openVideoPopup(videoMap[key]));
    });
});
