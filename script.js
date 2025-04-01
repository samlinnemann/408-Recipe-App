document.addEventListener("DOMContentLoaded", function () {
    const preferencePage = document.getElementById("preferencePage");
    const suggestionPage = document.getElementById("suggestionPage");
    const preferenceButton = document.getElementById("preferencePageButton");
    const suggestionButton = document.getElementById("suggestionPageButton");

    function showPage(page) {
        if (page === "preference") {
            preferencePage.style.display = "block";
            suggestionPage.style.display = "none";
        } else if (page === "suggestion") {
            preferencePage.style.display = "none";
            suggestionPage.style.display = "block";
        }
    }

    preferenceButton.addEventListener("click", function () {
        showPage("preference");
    });

    suggestionButton.addEventListener("click", function () {
        showPage("suggestion");
    });

    // Set initial page view
    showPage("preference");

    function setupToggle(toggleId, optionsId) {
        const toggle = document.getElementById(toggleId);
        const options = document.getElementById(optionsId);

        toggle.addEventListener("change", function () {
            options.style.display = toggle.checked ? "block" : "none";
        });

        // Initialize options visibility
        options.style.display = toggle.checked ? "block" : "none";
    }

    setupToggle("cuisineToggle", "cusisineOptions");
    setupToggle("dietaryToggle", "dietaryOptions");
    setupToggle("intolerancesToggle", "intolerancesOptions");

    document.querySelectorAll('.cuisines, .dietary, .intolerances').forEach(button => {
        button.addEventListener('click', () => {
            const isSelected = button.getAttribute('data-selected') === 'true';
            button.setAttribute('data-selected', !isSelected);
        });
    });

    // Ensure full-screen mode on mobile
    window.addEventListener("load", () => {
        if ("scrollTo" in window) {
            window.scrollTo(0, 0);
        }
    });
});
