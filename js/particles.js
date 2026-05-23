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
