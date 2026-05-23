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
    let lineIndex   = 0;
    let colorIndex  = 0;

    function glitchLine(targetLine, callback) {
        let glitchLength = targetLine.length;
        let glitchStep   = 0;

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

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.createElement("canvas");
    canvas.classList.add("matrix-rain");
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters  = "アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fontSize = 16;
    const columns  = Math.floor(canvas.width / fontSize);
    const drops    = Array(columns).fill(1);

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
