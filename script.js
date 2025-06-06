function initDropdowns() {
    const overlay = document.getElementById("overlay");

    const dropdowns = [
        {
            linkId: "company-link",
            dropdownId: "company-dropdown"
        },
        {
            linkId: "services-link",
            dropdownId: "services-dropdown"
        },
        {
            linkId: "products-link",
            dropdownId: "products-dropdown"
        }
    ];

    dropdowns.forEach(({ linkId, dropdownId }) => {
        const link = document.getElementById(linkId);
        const dropdown = document.getElementById(dropdownId);

        if (link && dropdown) {
            link.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation();

                const isVisible = dropdown.style.display === "block";

                closeAllDropdowns();

                if (!isVisible) {
                    dropdown.style.display = "block";
                    overlay.style.display = "block";
                    link.classList.add("active");
                }
            });
        }
    });

    overlay.addEventListener("click", closeAllDropdowns);
    document.addEventListener("click", function (e) {
        if (!e.target.closest('.mega-dropdown') && !e.target.closest('.nav-link')) {
            closeAllDropdowns();
        }
    });

    function closeAllDropdowns() {
        dropdowns.forEach(({ linkId, dropdownId }) => {
            const d = document.getElementById(dropdownId);
            const l = document.getElementById(linkId);
            if (d && l) {
                d.style.display = "none";
                l.classList.remove("active");
            }
        });
        overlay.style.display = "none";
    }

    document.addEventListener("DOMContentLoaded", function () {
        // Eğer URL'de hash varsa ve sayfa yüklenmişse ilgili bölüme kaydır
        if (window.location.pathname.endsWith("/services.html") && window.location.hash) {
            const id = window.location.hash.substring(1); // "#baslik" -> "baslik"
            const target = document.getElementById(id);
            if (target) {
                setTimeout(() => {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 300); // Sayfa yüklenme süresi için küçük bekleme
            }
        }
    });
}

function initPortfolioCarousel() {
    const track = document.querySelector(".portfolio-carousel-track");
    const leftBtn = document.querySelector(".portfolio-carousel-nav.left");
    const rightBtn = document.querySelector(".portfolio-carousel-nav.right");

    if (!track || !leftBtn || !rightBtn) return;

    const scrollAmount = track.clientWidth / 3;

    leftBtn.addEventListener("click", () => {
        track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    rightBtn.addEventListener("click", () => {
        track.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
}
