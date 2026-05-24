function choice(answer) {
    const box = document.getElementById("textBox");

    if (answer === "yes") {
        box.innerHTML = "Here, take several! ❤️❤️❤️";
        for (let i = 0; i < 10; i++) setTimeout(spawnHeart, i * 150);
    } else {
        box.innerHTML = "Wrong answer… but I forgive you 😄";
        for (let i = 0; i < 5; i++) setTimeout(spawnHeart, i * 200);
    }
}

let currentAudio = null;

function stopCurrentAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
}

const audioFiles = {
    "The Funeral": new Audio("soundtracks/funreal.mp3"),
    "Wonderwall":  new Audio("soundtracks/Wonderwall.mp3"),
};

Object.values(audioFiles).forEach(a => {
    a.volume  = 0.65;
    a.preload = "auto";
});

let audioUnlocked = false;

function unlockAudio() {
    if (audioUnlocked) return;
    audioUnlocked = true;

    Object.values(audioFiles).forEach(a => {
        a.play().then(() => {
            a.pause();
            a.currentTime = 0;
        }).catch(() => {});
    });

    const banner = document.getElementById("audioBanner");
    if (banner) banner.style.display = "none";
}

document.addEventListener("click",      unlockAudio, { once: true });
document.addEventListener("touchstart", unlockAudio, { once: true });

document.addEventListener("DOMContentLoaded", () => {
    const audioHoverMap = { 2: ["The Funeral", "Wonderwall"] };

    Object.entries(audioHoverMap).forEach(([question, keys]) => {
        document.querySelectorAll(`[data-question="${question}"] button`).forEach(btn => {
            const match = (btn.getAttribute("onclick") || "").match(/'([^']+)'/);
            if (!match) return;

            const key = match[1];
            if (!keys.includes(key)) return;

            const audio = audioFiles[key];
            if (!audio) return;

            btn.addEventListener("mouseenter", () => {
                if (btn.disabled) return;
                stopCurrentAudio();
                audio.currentTime = 0;
                audio.play().catch(() => {});
                currentAudio = audio;
            });

            btn.addEventListener("mouseleave", () => stopCurrentAudio());
        });
    });
});
