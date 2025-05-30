document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.getElementById("overlay");

    const dropdowns = [
        {
            linkId: "company-link",
            dropdownId: "company-dropdown",
            optionsId: "company-options"
        },
        {
            linkId: "services-link",
            dropdownId: "services-dropdown",
            optionsId: "services-options"
        },
        {
            linkId: "products-link",
            dropdownId: "products-dropdown",
            optionsId: "products-options"
        }
    ];

    dropdowns.forEach(({ linkId, dropdownId, optionsId }) => {
        const link = document.getElementById(linkId);
        const dropdown = document.getElementById(dropdownId);
        const options = document.getElementById(optionsId);

        if (link && dropdown && overlay && options) {
            link.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation();

                const isVisible = dropdown.style.display === "block";

                // Tüm dropdownları kapat
                dropdowns.forEach(({ linkId, dropdownId }) => {
                    document.getElementById(dropdownId).style.display = "none";
                    document.getElementById(linkId).classList.remove("active");
                });
                overlay.style.display = "none";

                // Eğer tıklanan zaten açıksa tekrar açma
                if (!isVisible) {
                    const rect = link.getBoundingClientRect();
                    options.style.setProperty("--company-offset", rect.left + "px");

                    dropdown.style.display = "block";
                    overlay.style.display = "block";
                    link.classList.add("active");
                }
            });
        }
    });

    // Navbar dışına tıklanınca dropdownları kapat
    document.addEventListener("click", function (event) {
        const isClickInside = event.target.closest(".nav-link") || event.target.closest(".mega-dropdown");

        if (!isClickInside) {
            dropdowns.forEach(({ linkId, dropdownId }) => {
                document.getElementById(dropdownId).style.display = "none";
                document.getElementById(linkId).classList.remove("active");
            });
            overlay.style.display = "none";
        }
    });
});
