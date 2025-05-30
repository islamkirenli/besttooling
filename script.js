document.addEventListener("DOMContentLoaded", function () {
    const companyLink = document.getElementById("company-link");
    const companyDropdown = document.getElementById("company-dropdown");
    const companyOptions = document.getElementById("company-options");
    const overlay = document.getElementById("overlay");

    if (companyLink && companyDropdown && overlay && companyOptions) {
        companyLink.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            const isVisible = companyDropdown.style.display === "block";

            if (isVisible) {
                companyDropdown.style.display = "none";
                overlay.style.display = "none";
                companyLink.classList.remove("active");
            } else {
                const rect = companyLink.getBoundingClientRect();
                companyOptions.style.setProperty("--company-offset", rect.left + "px");

                companyDropdown.style.display = "block";
                overlay.style.display = "block";
                companyLink.classList.add("active");
            }
        });

        document.addEventListener("click", function () {
            companyDropdown.style.display = "none";
            overlay.style.display = "none";
            companyLink.classList.remove("active");
        });
    }
});
