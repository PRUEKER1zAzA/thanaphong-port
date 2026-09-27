document.addEventListener("DOMContentLoaded", () => {
    const intro = document.getElementById("intro");
    if (!intro) return;

    const pct = document.getElementById("intro-pct");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.body.classList.add("body-locked");

    let finished = false;
    const finish = () => {
        if (finished) return;
        finished = true;
        intro.classList.add("done");
        document.body.classList.remove("body-locked");
        setTimeout(() => intro.remove(), 700);
    };

    if (reduceMotion) {
        finish();
        return;
    }

    // ตัวเลขนับ 0-100% ให้ตรงกับแถบโหลด (1.7s + ดีเลย์ 1s)
    const start = performance.now();
    const DELAY = 1000;
    const DURATION = 1700;
    const tick = (now) => {
        if (finished) return;
        const p = Math.max(0, Math.min(100, Math.round(((now - start - DELAY) / DURATION) * 100)));
        if (pct) pct.textContent = p + "%";
        if (p < 100) {
            requestAnimationFrame(tick);
        } else {
            setTimeout(finish, 450);
        }
    };
    requestAnimationFrame(tick);

    // แตะที่ไหนก็ข้ามได้
    intro.addEventListener("click", finish);

    // กันค้าง
    setTimeout(finish, 6000);
});
