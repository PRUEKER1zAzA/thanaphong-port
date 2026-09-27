document.addEventListener("DOMContentLoaded", () => {
    const navbarContainer = document.getElementById("navbar");
    if (!navbarContainer) return;

    fetch("components/navbar.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load navbar component: " + response.statusText);
            }
            return response.text();
        })
        .then(html => {
            navbarContainer.innerHTML = html;

            const menuList = navbarContainer.querySelector("nav > ul");
            const toggleBtn = navbarContainer.querySelector(".nav-toggle");
            if (toggleBtn && menuList) {
                toggleBtn.addEventListener("click", () => {
                    menuList.classList.toggle("open");
                });
                // เลือกเมนูบนมือถือแล้วพับกลับ
                menuList.addEventListener("click", (e) => {
                    if (e.target.closest("a")) {
                        menuList.classList.remove("open");
                    }
                });
            }

            let currentPage = window.location.pathname.split("/").pop();
            if (currentPage === "" || currentPage === "/") {
                currentPage = "index.html";
            }

            const navLinks = Array.from(navbarContainer.querySelectorAll("nav a"));

            // section ที่มี id (เช่น about / skills) ใช้ทำ scroll-spy
            const spySections = document.querySelectorAll("main section[id]");

            function updateScrollSpy() {
                let current = "";
                spySections.forEach(section => {
                    const sectionTop = section.offsetTop - 300;
                    if (window.scrollY >= sectionTop) {
                        current = section.getAttribute("id");
                    }
                });

                navLinks.forEach(link => {
                    const href = link.getAttribute("href") || "";
                    link.classList.remove("active");
                    if (current) {
                        if (href === currentPage + "#" + current || href === "#" + current) {
                            link.classList.add("active");
                        }
                    } else if (href === currentPage) {
                        link.classList.add("active");
                    }
                });
            }

            if (spySections.length > 0) {
                window.addEventListener("scroll", updateScrollSpy, { passive: true });
                window.addEventListener("load", updateScrollSpy);
                updateScrollSpy();
            } else {
                // หน้าที่ไม่มี section[id] — active ตามชื่อไฟล์อย่างเดียว
                updateScrollSpy();
            }

            // Dispatch custom event when navbar is loaded, so index.html's scroll listener can bind to it
            window.dispatchEvent(new CustomEvent("navbar-loaded"));
        })
        .catch(error => {
            console.error("Error loading navbar:", error);
        });
});
function dev_skill() {
    let skills = [
        "HTML", "CSS", "JavaScript", "Python"];
    return skills;
};