/* =============================================
   MODUL: LOVE-LIST — lovelist.js
   ============================================= */

(function initLoveList() {

    /* ── Gründe (anpassen!) ───────────────────── */
    const reasons = [
        "Because your laugh is the most beautiful sound in the entire world.",
        "Because you accept me exactly as I am — every flaw, every quirk.",
        "Because your hugs feel like the safest place I have ever been.",
        "Because you make me smile even on the days I forget how to.",
        "Because your eyes light up when you talk about things you love.",
        "Because you are endlessly strong, yet so incredibly gentle.",
        "Because every single moment with you feels like a gift.",
        "Because you are always there for me, no matter what.",
        "Because your heart is the warmest I have ever had the joy of knowing.",
        "Because you are simply, completely, perfectly you — and that is everything."
    ];

    /* ── Elemente ─────────────────────────────── */
    const list = document.getElementById("llList");
    const btn  = document.getElementById("llBtn");
    if (!list) return;

    let allVisible = false;

    /* ── Liste aufbauen ───────────────────────── */
    reasons.forEach((text, i) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="ll-num">${String(i + 1).padStart(2, "0")}</span>
            <span class="ll-heart">❤️</span>
            <span class="ll-text">${text}</span>
        `;
        list.appendChild(li);
    });

    /* ── Punkte nacheinander einblenden ──────────
       Startet automatisch wenn Section in den
       sichtbaren Bereich gescrollt wird.
    ─────────────────────────────────────────────── */
    function revealAll(instant = false) {
        const items = list.querySelectorAll("li");
        items.forEach((item, i) => {
            const delay = instant ? 0 : i * 180;
            setTimeout(() => item.classList.add("ll-visible"), delay);
        });
        if (btn) btn.classList.add("hidden");
        allVisible = true;
    }

    /* IntersectionObserver: automatisch starten */
    const observer = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting || allVisible) return;
        revealAll();
        observer.disconnect();
    }, { threshold: 0.12 });

    observer.observe(list);

    /* Button: alle sofort zeigen */
    if (btn) btn.addEventListener("click", () => revealAll(false));

})();
