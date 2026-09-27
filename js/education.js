document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.getElementById("rb-lightbox");
    const lightboxImg = document.getElementById("rb-lightbox-img");
    const lightboxCaption = document.getElementById("rb-lightbox-caption");
    if (!lightbox || !lightboxImg) return;

    const openLightbox = (fullSrc, caption) => {
        if (fullSrc) {
            lightboxImg.src = fullSrc;
            lightboxImg.alt = caption || lightboxImg.alt;
        }
        if (lightboxCaption && caption) {
            lightboxCaption.textContent = caption;
        }
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("body-locked");
    };

    const closeLightbox = () => {
        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.classList.remove("body-locked");
    };

    document.querySelectorAll(".rb-zoom-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            openLightbox(btn.dataset.full, btn.dataset.caption);
        });
    });

    lightbox.querySelectorAll("[data-close]").forEach((el) => {
        el.addEventListener("click", closeLightbox);
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightbox.classList.contains("open")) {
            closeLightbox();
        }
    });
});
