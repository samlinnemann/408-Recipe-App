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

    const pageButtons = document.querySelectorAll(".pageSelectButton");
    const pageSelection = document.querySelector(".pageSelection");

    function setActivePageButton(activeButton) {
        pageButtons.forEach(button => button.classList.remove("active"));
        activeButton.classList.add("active");

        // Highlight the pageSelection container
        pageSelection.classList.add("active");
    }

    preferenceButton.addEventListener("click", function () {
        showPage("preference");
        setActivePageButton(preferenceButton);
    });

    suggestionButton.addEventListener("click", function () {
        showPage("suggestion");
        setActivePageButton(suggestionButton);
    });

    // Set initial page view
    showPage("preference");

    // Set initial active button and highlight
    setActivePageButton(preferenceButton);

    function setupToggle(toggleId, optionsId) {
        const toggle = document.getElementById(toggleId);
        const options = document.getElementById(optionsId);

        toggle.addEventListener("change", function () {
            if (toggle.checked) {
                options.classList.remove("hidden");
                options.style.display = "block";
                options.style.animation = "fadeDown 0.5s ease-out"; // Apply fade-down animation
            } else {
                options.style.animation = "fadeUp 0.5s ease-out"; // Apply fade-up animation
                setTimeout(() => {
                    options.style.display = "none";
                    options.classList.add("hidden");
                }, 300); // Wait for the animation to complete
            }
        });

        // Initialize options visibility
        if (toggle.checked) {
            options.style.display = "block";
        } else {
            options.style.display = "none";
            options.classList.add("hidden");
        }
    }

    setupToggle("cuisineToggle", "cusisineOptions");
    setupToggle("dietaryToggle", "dietaryOptions");
    setupToggle("intolerancesToggle", "intolerancesOptions");
    setupToggle("typeToggle", "typeOptions");
    setupToggle("servingSizeToggle", "servingSizeOptions");

    document.querySelectorAll('.optionSelect').forEach(button => {
        button.addEventListener('click', () => {
            const isSelected = button.getAttribute('data-selected') === 'true';
            button.setAttribute('data-selected', !isSelected);
        });
    });
});

