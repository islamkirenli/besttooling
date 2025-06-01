document.addEventListener("DOMContentLoaded", function () {
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

                // Diğerlerini kapat
                closeAllDropdowns();

                if (!isVisible) {
                    dropdown.style.display = "block";
                    overlay.style.display = "block";
                    link.classList.add("active");
                }
            });
        }
    });

    // Overlay veya dış tıklama
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
});
