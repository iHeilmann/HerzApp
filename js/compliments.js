/* =============================================
   MODUL: KOMPLIMENTE
   ============================================= */

(function initCompliments() {

    /* ── Komplimente-Pool ───────────────────────── */
    const compliments = [
        { emoji: "🌸", text: "You are the most beautiful person I have ever seen." },
        { emoji: "✨", text: "Your smile can light up every single room you walk into." },
        { emoji: "💫", text: "You are so much smarter and more capable than you realise." },
        { emoji: "🌙", text: "The world is a genuinely better place because you exist in it." },
        { emoji: "💖", text: "You have the warmest heart I have ever had the joy of knowing." },
        { emoji: "🌹", text: "Everything about you is beautiful — inside and out." },
        { emoji: "🥰", text: "I am so incredibly grateful that you are in my life." },
        { emoji: "💓", text: "You make the impossible feel effortless just by being yourself." },
        { emoji: "🌈", text: "Your kindness inspires everyone around you, every single day." },
        { emoji: "❤️‍🔥", text: "You are my absolute favourite person on this entire planet." },
        { emoji: "🌺", text: "Nobody laughs more beautifully than you do." },
        { emoji: "💕", text: "You give me a reason to smile every single morning." },
        { emoji: "⭐", text: "I love the unique and wonderful way you see the world." },
        { emoji: "🫶", text: "You are more than enough — you are truly everything." },
        { emoji: "💝", text: "Being loved by you is the greatest gift I have ever received." },
        { emoji: "🌟", text: "Your strength and grace never stop taking my breath away." },
        { emoji: "🍀", text: "I consider myself the luckiest person alive because of you." },
    ];

    /* ── Elemente ────────────────────────────────── */
    const btn     = document.getElementById("cpBtn");
    const card    = document.getElementById("cpCard");
    const emoji   = document.getElementById("cpEmoji");
    const text    = document.getElementById("cpText");
    const counter = document.getElementById("cpCounter");

    if (!btn || !card) return;

    let lastIndex  = -1;
    let totalShown = 0;

    /* ── Zufälligen Index wählen (nie derselbe zweimal) ── */
    function pickIndex() {
        if (compliments.length === 1) return 0;
        let idx;
        do { idx = Math.floor(Math.random() * compliments.length); }
        while (idx === lastIndex);
        return idx;
    }

    /* ── Kompliment anzeigen ─────────────────────── */
    function showCompliment() {
        const idx = pickIndex();
        lastIndex = idx;
        totalShown++;

        /* Karte ausblenden */
        card.classList.remove("cp-visible");

        /* Inhalt tauschen, dann wieder einblenden */
        setTimeout(() => {
            emoji.textContent = compliments[idx].emoji;
            text.textContent  = compliments[idx].text;

            /* Zwei Frames warten damit die Transition anspringt */
            requestAnimationFrame(() =>
                requestAnimationFrame(() => card.classList.add("cp-visible"))
            );
        }, 180);

        /* Counter aktualisieren */
        if (counter) {
            counter.textContent =
                `${totalShown} compliment${totalShown !== 1 ? "s" : ""} received 💌`;
        }
    }

    /* ── Button-Klick ────────────────────────────── */
    btn.addEventListener("click", showCompliment);

    /* ── Erstes Kompliment direkt beim Laden zeigen ── */
    showCompliment();

})();
