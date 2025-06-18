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
        if (window.location.pathname.endsWith("/services.html") && window.location.hash) {
            const id = window.location.hash.substring(1);
            const target = document.getElementById(id);
            if (target) {
                setTimeout(() => {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 300);
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

function toggleSearchInput() {
    const input = document.getElementById("searchInput");
    input.style.display = input.style.display === "inline-block" ? "none" : "inline-block";
    if (input.style.display === "inline-block") {
        input.focus();
    }
}

document.addEventListener("click", function (e) {
    const resultsBox = document.getElementById("searchResults");
    const input = document.getElementById("searchInput");
    if (!resultsBox || !input) return;

    const isClickInside = resultsBox.contains(e.target) || input.contains(e.target);

    if (!isClickInside) {
        resultsBox.style.display = "none";
    }
});

const searchablePages = [
    { title: "Overview", url: "/pages/company/overview.html" },
    { title: "Vision & Mission", url: "/pages/company/vision-mission.html" },
    { title: "Our Policies", url: "/pages/company/policies.html" },
    { title: "Certificates", url: "/pages/company/certificates.html" },
    { title: "Services", url: "/pages/services/services.html" },
    { title: "Contact", url: "/pages/contact.html" },
    { title: "Technical Infrastructure", url: "/pages/technical-infrastructure.html" }
];

function handleSearchKey(event) {
    if (event.key === "Enter") {
        const query = event.target.value.trim().toLowerCase();
        const resultsContainer = document.getElementById("searchResults");
        resultsContainer.innerHTML = "";
        resultsContainer.style.display = "none";

        if (!query) return;

        let results = [];
        let pending = searchablePages.length;

        searchablePages.forEach(page => {
            fetch(page.url)
                .then(res => res.text())
                .then(html => {
                    const cleanText = html.replace(/<[^>]*>/g, '');
                    const index = cleanText.toLowerCase().indexOf(query);
                    if (index !== -1) {
                        const excerpt = extractExcerpt(cleanText, query);
                        results.push(`
                            <a href="${page.url}">
                                <strong>${page.title}</strong>
                                <div class="excerpt">${excerpt}</div>
                            </a>
                        `);
                    }
                })
                .catch(() => { })
                .finally(() => {
                    pending--;
                    if (pending === 0) {
                        if (results.length > 0) {
                            resultsContainer.innerHTML = results.join("");
                        } else {
                            resultsContainer.innerHTML = "<div style='padding:10px'>No results found.</div>";
                        }
                        resultsContainer.style.display = "block";
                    }
                });
        });
    }
}

function extractExcerpt(text, keyword, length = 80) {
    const lower = text.toLowerCase();
    const index = lower.indexOf(keyword.toLowerCase());
    if (index === -1) return "";

    const start = Math.max(index - length / 2, 0);
    const end = Math.min(index + length / 2, text.length);
    let excerpt = text.substring(start, end).trim();

    // Aranan kelimeyi vurgula
    const regex = new RegExp(`(${keyword})`, 'gi');
    excerpt = excerpt.replace(regex, `<span class="highlight">$1</span>`);

    return "..." + excerpt.replace(/\s+/g, ' ') + "...";
}
