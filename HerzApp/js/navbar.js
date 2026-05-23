/* =============================================
   GLOBALE NAVBAR
   ============================================= */

(function initNavbar() {

    /* ── Aktive Seite hervorheben ─────────────── */
    const current = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".navbar-menu a").forEach(link => {
        const href = link.getAttribute("href");
        if (href === current || (current === "" && href === "index.html")) {
            link.classList.add("nav-active");
        }
    });

    /* ── Hamburger-Toggle ─────────────────────── */
    const toggle = document.getElementById("navToggle");
    const menu   = document.getElementById("navMenu");

    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("open");
        toggle.classList.toggle("open", isOpen);
        toggle.setAttribute("aria-expanded", isOpen);
    });

    /* ── Menü schließen beim Klick auf Link ───── */
    menu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("open");
            toggle.classList.remove("open");
            toggle.setAttribute("aria-expanded", false);
        });
    });

    /* ── Menü schließen beim Klick außerhalb ──── */
    document.addEventListener("click", e => {
        if (!toggle.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.remove("open");
            toggle.classList.remove("open");
            toggle.setAttribute("aria-expanded", false);
        }
    });

})();
