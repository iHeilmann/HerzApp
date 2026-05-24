// ─────────────────────────────────────────────────────────────
// PARTICLE SYSTEM (Hearts, Stars, Confetti)
// ─────────────────────────────────────────────────────────────

function spawnParticle(emoji, durationMs, size, colors) {
    const el = document.createElement("div");
    el.classList.add("particle");
    el.innerHTML = emoji;

    el.style.left = Math.random() * window.innerWidth + "px";
    el.style.top  = window.innerHeight + "px";
    el.style.fontSize = size + "px";
    el.style.setProperty("--dur", durationMs + "ms");

    if (colors && colors.length) {
        el.style.color = colors[Math.floor(Math.random() * colors.length)];
    }

    document.body.appendChild(el);
    setTimeout(() => el.remove(), durationMs + 500);
}

function spawnHeart() {
    spawnParticle("❤️", 2000, 30, ["#ff4d6d"]);
}

const animationTiers = {
     0: { hearts:  1, stars:  0, confetti:  0, duration: 3000, size: 24, colors: ["#ff9bbd"] },
     2: { hearts:  3, stars:  0, confetti:  0, duration: 2600, size: 26, colors: ["#ff4d6d", "#ff85a1"] },
     4: { hearts:  5, stars:  2, confetti:  0, duration: 2400, size: 28, colors: ["#ff4d6d", "#ff85a1", "#ffb3c6"] },
     6: { hearts:  8, stars:  3, confetti:  0, duration: 2200, size: 28, colors: ["#ff4d6d", "#ff85a1", "#ff1f4d"] },
     8: { hearts: 10, stars:  5, confetti:  2, duration: 2000, size: 30, colors: ["#ff4d6d", "#ff006e", "#ff85a1", "#ffb3c6"] },
    10: { hearts: 14, stars:  7, confetti:  4, duration: 1800, size: 30, colors: ["#ff4d6d", "#ff006e", "#ff85a1", "#c9184a"] },
    12: { hearts: 18, stars: 10, confetti:  6, duration: 1600, size: 32, colors: ["#ff4d6d", "#ff006e", "#ff0a54", "#ff85a1", "#c9184a"] },
    14: { hearts: 22, stars: 12, confetti:  8, duration: 1400, size: 34, colors: ["#ff4d6d", "#ff006e", "#ff0a54", "#ff1f4d", "#ff85a1"] },
    16: { hearts: 28, stars: 14, confetti: 10, duration: 1200, size: 34, colors: ["#ff4d6d", "#ff006e", "#ff0a54", "#ff1f4d", "#c9184a", "#ff85a1"] },
    18: { hearts: 35, stars: 18, confetti: 12, duration: 1000, size: 36, colors: ["#ff4d6d", "#ff006e", "#ff0a54", "#ff1f4d", "#c9184a", "#ffb3c6", "#ff85a1"] },
    20: { hearts: 50, stars: 25, confetti: 18, duration:  800, size: 38, colors: ["#ff4d6d", "#ff006e", "#ff0a54", "#ff1f4d", "#c9184a", "#ffb3c6", "#ff85a1", "#ffd6e8"] },
};

function launchAnimation(score) {
    const cfg = animationTiers[score] || animationTiers[0];
    const delay = 80;

    for (let i = 0; i < cfg.hearts; i++)
        setTimeout(() => spawnParticle("❤️", cfg.duration, cfg.size, cfg.colors), i * delay);

    for (let i = 0; i < cfg.stars; i++)
        setTimeout(() => spawnParticle("⭐", cfg.duration, cfg.size - 2, cfg.colors), 200 + i * delay);

    for (let i = 0; i < cfg.confetti; i++)
        setTimeout(() => spawnParticle("🎊", cfg.duration, cfg.size - 4, cfg.colors), 400 + i * delay);

    if (score === 20) setTimeout(() => launchWave(cfg), 1200);
}

function launchWave(cfg) {
    for (let i = 0; i < 30; i++)
        setTimeout(() => spawnParticle("❤️", cfg.duration, cfg.size, cfg.colors), i * 60);

    for (let i = 0; i < 15; i++)
        setTimeout(() => spawnParticle("✨", cfg.duration, cfg.size, cfg.colors), 300 + i * 60);
}


// ─────────────────────────────────────────────────────────────
// HEART BUTTON
// ─────────────────────────────────────────────────────────────

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


// ─────────────────────────────────────────────────────────────
// QUIZ SYSTEM
// ─────────────────────────────────────────────────────────────

let score = 0;
let answeredQuestions = {};
const totalQuestions = 10;

const correctAnswers = {
    1:  ["Blau", "Hellblau"],
    2:  ["The Funeral", "Wonderwall"],
    3:  ["How I Met Your Mother", "Game of Thrones"],
    4:  ["Titanic", "Titanic2"],
    5:  ["21.03.1996", "21.03"],
    6:  ["Haare", "Alles"],
    7:  ["Sarkasmus", "Situationskomik"],
    8:  ["Chillen", "Serien"],
    9:  ["Loyal", "Romantisch"],
    10: ["Glück", "Zeit"]
};

const pointsPerCorrect = 2;

function quizAnswer(question, answer, btn) {
    if (answeredQuestions[question]) return;

    answeredQuestions[question] = answer;

    const group = document.querySelector(`[data-question="${question}"]`);
    group.querySelectorAll("button").forEach(b => b.disabled = true);

    btn.style.backgroundColor = correctAnswers[question].includes(answer)
        ? "#4CAF50"
        : "#d9534f";
}

function finishQuiz() {
    const quizResult = document.getElementById("quizResult");
    const restartBtn = document.getElementById("restartBtn");

    score = 0;

    for (let q = 1; q <= totalQuestions; q++)
        if (correctAnswers[q].includes(answeredQuestions[q]))
            score += pointsPerCorrect;

    const maxPoints = totalQuestions * pointsPerCorrect;

    launchAnimation(score);

    const tier = Math.min(5, Math.floor(score / 4));
    quizResult.className = "tier-" + tier;

    let message = "";
    if (score === 20)      message = "🎆 WOW! You know me perfectly! You're incredible! ❤️";
    else if (score >= 18)  message = "Almost perfect! You know me SO well 💕";
    else if (score >= 16)  message = "You know me really well! I'm so proud of you 💖";
    else if (score >= 14)  message = "Really good! Just a few gaps left 😊❤️";
    else if (score >= 12)  message = "Not bad at all! Getting there 😄";
    else if (score >= 10)  message = "Halfway there! We'll keep practicing 💕";
    else if (score >= 8)   message = "A bit more study needed 😄";
    else if (score >= 6)   message = "Hmm… we need more time together 😅❤️";
    else if (score >= 4)   message = "Oh dear… series nights are mandatory now 😅";
    else if (score >= 2)   message = "Did you even try? 😂❤️";
    else                   message = "Zero points?! I forgive you though 😂❤️";

    quizResult.innerHTML = `You scored <b>${score}</b> out of <b>${maxPoints}</b> points!<br><br>${message}`;
    restartBtn.style.display = "inline-block";
}

function restartQuiz() {
    score = 0;
    answeredQuestions = {};

    document.querySelectorAll("#quiz button").forEach(btn => {
        btn.disabled = false;
        btn.style.backgroundColor = "";
    });

    document.getElementById("quizResult").innerHTML = "";
    document.getElementById("quizResult").className = "";
    document.getElementById("textBox").innerHTML = "";
    document.getElementById("restartBtn").style.display = "none";

    stopCurrentAudio();
    document.querySelectorAll(".particle").forEach(p => p.remove());

    window.scrollTo({ top: 0, behavior: "smooth" });
}


// ─────────────────────────────────────────────────────────────
// AUDIO SYSTEM
// ─────────────────────────────────────────────────────────────

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
    a.volume = 0.65;
    a.preload = "auto";
});


// ─────────────────────────────────────────────────────────────
// YOUTUBE POPUP
// ─────────────────────────────────────────────────────────────

const videoMap = {
    "The Funeral": "https://www.youtube.com/embed/cMFWFhTFohk",
    "Wonderwall": "https://www.youtube.com/embed/6hzrDeceEKc",
    "How I Met Your Mother": "https://www.youtube.com/embed/cjJLEYMzpjc",
    "Game of Thrones": "https://www.youtube.com/embed/BpJYNVhGf1s",
    "Titanic": "https://www.youtube.com/embed/kVrqfYjkTdQ",
    "Titanic2": "https://www.youtube.com/embed/kVrqfYjkTdQ"
};

function openVideoPopup(src) {
    const popup = document.getElementById("videoPopup");
    const iframe = document.getElementById("popupVideo");

    iframe.src = src + "?autoplay=1";
    popup.style.display = "flex";
}

document.getElementById("closePopup").onclick = () => {
    const popup = document.getElementById("videoPopup");
    const iframe = document.getElementById("popupVideo");

    iframe.src = "";
    popup.style.display = "none";
};


// ─────────────────────────────────────────────────────────────
// AUDIO UNLOCK
// ─────────────────────────────────────────────────────────────

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

document.addEventListener("click", unlockAudio, { once: true });
document.addEventListener("touchstart", unlockAudio, { once: true });


// ─────────────────────────────────────────────────────────────
// HOVER AUDIO + YOUTUBE POPUP LISTENER
// ─────────────────────────────────────────────────────────────

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

    document.querySelectorAll("#quiz button").forEach(btn => {
        const match = (btn.getAttribute("onclick") || "").match(/'([^']+)'/);
        if (!match) return;

        const key = match[1];
        if (!videoMap[key]) return;

        btn.addEventListener("click", () => openVideoPopup(videoMap[key]));
    });

});


// ─────────────────────────────────────────────────────────────
// MATRIX ASCII GLITCH + MULTICOLOR + INDONESISCHER TEXT
// ─────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {

    const colorCycle = ["#ffffff", "#ffd6e8", "#ffb3d9", "#ff80bf", "#ff4d99", "#ff0033"];

    const asciiLines = [
        "   .:::.   .:::.",
        "  :::::::.:::::::",
        "  :::::::::::::::",
        "  ':::::::::::::'",
        "    ':::::::::'",
        "      ':::::'",
        "        ':'"
    ];

    const indoText = [
        "",
        "  Untukmu, cintaku.",
        "  Setiap detik bersamamu terasa manis.",
        "  Kamu adalah tempat pulang terbaikku.",
        ""
    ];

    const art = document.getElementById("asciiArt");
    if (!art) return;

    const glitchChars = "!<>-_\\/[]{}—=+*^?#________";

    let currentText = "";
    let lineIndex = 0;
    let colorIndex = 0;

    function glitchLine(targetLine, callback) {
        let glitchLength = targetLine.length;
        let glitchStep = 0;

        const glitchInterval = setInterval(() => {
            let output = "";

            for (let i = 0; i < glitchLength; i++) {
                output += (i < glitchStep)
                    ? targetLine[i]
                    : glitchChars[Math.floor(Math.random() * glitchChars.length)];
            }

            art.style.color = colorCycle[colorIndex % colorCycle.length];
            art.textContent = currentText + output;

            glitchStep++;

            if (glitchStep > glitchLength) {
                clearInterval(glitchInterval);
                currentText += targetLine + "\n";
                colorIndex++;
                callback();
            }
        }, 25);
    }

    function buildAscii() {
        if (lineIndex < asciiLines.length) {
            glitchLine(asciiLines[lineIndex], () => {
                lineIndex++;
                setTimeout(buildAscii, 80);
            });
        } else {
            setTimeout(() => buildIndoText(0), 400);
        }
    }

    function buildIndoText(i) {
        if (i >= indoText.length) return;

        glitchLine(indoText[i], () => {
            setTimeout(() => buildIndoText(i + 1), 120);
        });
    }

    buildAscii();

    setTimeout(() => {
        const a = document.getElementById("asciiStart");
        if (a) a.style.display = "none";
    }, 14500);
});


// ─────────────────────────────────────────────────────────────
// MATRIX REGEN (verlängert)
// ─────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.createElement("canvas");
    canvas.classList.add("matrix-rain");
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);

    const drops = Array(columns).fill(1);

    function drawMatrixRain() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#ff4d99";
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const char = letters[Math.floor(Math.random() * letters.length)];
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975)
                drops[i] = 0;

            drops[i]++;
        }
    }

    const interval = setInterval(drawMatrixRain, 50);

    setTimeout(() => {
        clearInterval(interval);
        canvas.remove();
    }, 14500);

});
