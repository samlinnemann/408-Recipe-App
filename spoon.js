// Global query parameters object
let queryParams = {
  cuisine: '',
  diet: '',          // Comma-separated string for dietary selections
  intolerances: '',  // Comma-separated string for intolerance selections
  type: '',
  maxCalories: '',
  minCalories: '',
  minServings: '',
  maxServings: '',
};

// ----------------- FETCH RECIPES FUNCTION -----------------

async function fetchRecipes() {
  const apiKey = '82caed26afe2467ca4813a20339b7a80';
  const url = `https://api.spoonacular.com/recipes/complexSearch?` +
    `cuisine=${encodeURIComponent(queryParams.cuisine)}` +
    `&diet=${encodeURIComponent(queryParams.diet)}` +
    `&intolerances=${encodeURIComponent(queryParams.intolerances)}` +
    `&addRecipeInformation=true&apiKey=${apiKey}`;
    
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Recipes:', data);
    
    const apiResultDiv = document.getElementById('suggestionPage');
      apiResultDiv.innerHTML = '';

      for (const recipe of data.results) {

          // Create a card for each recipe
          const card = document.createElement('div');
          card.className = 'w3-card-4 w3-margin w3-padding w3-hover-shadow recipeCard';

          const img = document.createElement('img');
          img.src = recipe.image;
          img.alt = recipe.title;
          img.style.width = '100%';

          const title = document.createElement('h2');
          title.innerHTML = `<a href='recipe.html?id=${recipe.id}'>${recipe.title}</a>`; // Pass ID via URL
          
          const time = document.createElement('p');
          time.innerText = `Ready in ${recipe.readyInMinutes} minutes`;

          const cuisine = document.createElement('p');
          cuisine.className = 'w3-small recipeInfo'
          cuisine.innerHTML = recipe.cuisines.map(c => `<span class="w3-tag w3-light-grey">${c}</span>`).join(' ');

          const diets = document.createElement('p');
          diets.className = 'w3-small recipeInfo'
          diets.innerHTML = recipe.diets.map(d => `<span class="w3-tag w3-light-blue">${d}</span>`).join(' ');

          const servings = document.createElement('p');
          servings.className = 'w3-small recipeInfo'
          servings.innerHTML = `Servings: ${recipe.servings}`;

          card.appendChild(img);
          card.appendChild(title);
          card.appendChild(cuisine);
          card.appendChild(diets);
          card.appendChild(time);
          card.appendChild(servings);
          

          // Append the card to the main container
          apiResultDiv.appendChild(card);
      }
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

// ----------------- CUISINE SECTION (ONLY ONE SELECTED) -----------------

const cuisines = ["Asian", "American", "European", "Italian", "Mexican", "Southern"];

function updateCuisineUI(selectedCuisine) {
  cuisines.forEach(cuisine => {
    const btn = document.getElementById(cuisine.toLowerCase() + "Button");
    if (btn) {
      if (selectedCuisine === cuisine) {
        btn.classList.add("active");
        btn.setAttribute("data-selected", "true");
      } else {
        btn.classList.remove("active");
        btn.setAttribute("data-selected", "false");
      }
    }
  });
}

function handleCuisineButtonClick(cuisineName) {
  if (queryParams.cuisine === cuisineName) {
    queryParams.cuisine = "";
    console.log(`Removed ${cuisineName} Cuisine`);
  } else {
    queryParams.cuisine = cuisineName;
    console.log(`Added ${cuisineName} Cuisine`);
  }
  updateCuisineUI(queryParams.cuisine);
  console.log("Current queryParams:", queryParams);
}

// Attach event listeners for cuisine buttons
cuisines.forEach(cuisine => {
  const btnId = cuisine.toLowerCase() + "Button";
  const btn = document.getElementById(btnId);
  if (btn) {
    btn.addEventListener("click", () => handleCuisineButtonClick(cuisine));
  } else {
    console.warn(`Button with ID "${btnId}" not found.`);
  }
});

// ----------------- DIETARY SECTION (MULTIPLE SELECTIONS) -----------------

const diets = ["Vegetarian", "Vegan", "Pescetarian", "Paleo"];

function updateDietUI() {
  diets.forEach(diet => {
    const btn = document.getElementById(diet.toLowerCase() + "Button");
    if (btn) {
      // Check if the diet appears in the comma-separated string
      if (queryParams.diet.split(',').map(d => d.trim()).includes(diet)) {
        btn.classList.add("active");
        btn.setAttribute("data-selected", "true");
      } else {
        btn.classList.remove("active");
        btn.setAttribute("data-selected", "false");
      }
    }
  });
}

function handleDietButtonClick(dietName) {
  // Convert current diet string to an array for easier manipulation
  let dietArr = queryParams.diet ? queryParams.diet.split(',').map(d => d.trim()) : [];
  
  if (dietArr.includes(dietName)) {
    dietArr = dietArr.filter(d => d !== dietName);
    console.log(`Removed ${dietName} Diet`);
  } else {
    dietArr.push(dietName);
    console.log(`Added ${dietName} Diet`);
  }
  queryParams.diet = dietArr.join(',');
  updateDietUI();
  console.log("Current queryParams:", queryParams);
}

// Attach event listeners for diet buttons
diets.forEach(diet => {
  const btnId = diet.toLowerCase() + "Button";
  const btn = document.getElementById(btnId);
  if (btn) {
    btn.addEventListener("click", () => handleDietButtonClick(diet));
  } else {
    console.warn(`Diet button with ID "${btnId}" not found.`);
  }
});

// ----------------- INTOLERANCES SECTION (MULTIPLE SELECTIONS) -----------------

document.getElementById("minServingSize")?.addEventListener("input", function() {
  const value = this.value;
  if (value) {
    queryParams.minServings = value;
    console.log(`Set Min Servings to ${value}`);
  } else {
    queryParams.minServings = '';
    console.log("Min Servings input is empty");
  }
});

document.getElementById("maxServingSize")?.addEventListener("input", function() {
  const value = this.value;
  if (value) {
    queryParams.maxServings = value;
    console.log(`Set Max Servings to ${value}`);
  } else {
    queryParams.maxServings = '';
    console.log("Max Servings input is empty");
  }
});

document.getElementById("minCalories")?.addEventListener("input", function() {
  const value = this.value;
  if (value) {
    queryParams.minCalories = value;
    console.log(`Set Min Calories to ${value}`);
  } else {
    queryParams.minCalories = '';
    console.log("Min Calories input is empty");
  }
});

document.getElementById("maxCalories")?.addEventListener("input", function() {
  const value = this.value;
  if (value) {
    queryParams.maxCalories = value;
    console.log(`Set Max Calories to ${value}`);
  } else {
    queryParams.maxCalories = '';
    console.log("Max Calories input is empty");
  }
});

// ----------------- MEAL TYPE SECTION (ONLY ONE SELECTED) -----------------

const mealTypes = ["Breakfast", "Main Course", "Side Dish", "Dessert", "Appetizer", "Soup"];

function updateMealTypeUI(selectedType) {
  mealTypes.forEach(type => {
    const btnId = type.toLowerCase().replace(/ /g, "") + "Button"; 
    // e.g., "Main Course" becomes "maincourseButton"
    const btn = document.getElementById(btnId);
    if (btn) {
      if (selectedType === type) {
        btn.classList.add("active");
        btn.setAttribute("data-selected", "true");
      } else {
        btn.classList.remove("active");
        btn.setAttribute("data-selected", "false");
      }
    }
  });
}

function handleMealTypeButtonClick(typeName) {
  if (queryParams.type === typeName) {
    queryParams.type = "";
    console.log(`Removed ${typeName}`);
  } else {
    queryParams.type = typeName;
    console.log(`Added ${typeName}`);
  }
  updateMealTypeUI(queryParams.type);
  console.log("Current queryParams:", queryParams);
}

// Attach event listeners for meal type buttons
mealTypes.forEach(type => {
  const btnId = type.toLowerCase().replace(/ /g, "") + "Button";
  const btn = document.getElementById(btnId);
  if (btn) {
    btn.addEventListener("click", () => handleMealTypeButtonClick(type));
  } else {
    console.warn(`Meal type button with ID "${btnId}" not found.`);
  }
});

// ----------------- SUBMIT BUTTON HANDLER -----------------
document.getElementById("submitButton").addEventListener("click", function () {
  console.log("Submitting query with params:", queryParams);
  fetchRecipes();
  // Automatically navigate to the suggestionPage
  const preferencePage = document.getElementById("preferencePage");
  const suggestionPage = document.getElementById("suggestionPage");

  // Hide the preferencePage and show the suggestionPage
  preferencePage.style.display = "none";
  suggestionPage.style.display = "block";

  // Optionally, update the active button styling
  const preferenceButton = document.getElementById("preferencePageButton");
  const suggestionButton = document.getElementById("suggestionPageButton");
  if (preferenceButton && suggestionButton) {
      preferenceButton.classList.remove("active");
      suggestionButton.classList.add("active");
  }
});

// ----------------- NUMERIC INPUTS FOR CALORIES AND SERVINGS -----------------

// Assuming you have buttons with these IDs in your HTML
document.getElementById("minCaloriesSubmit")?.addEventListener("click", function() {
  const value = document.getElementById("minCalorie").value;
  if (value) {
    queryParams.minCalories = value;
    console.log(`Set Min Calories to ${value}`);
  } else {
    console.log("Min Calories input is empty");
  }
});

document.getElementById("maxCaloriesSubmit")?.addEventListener("click", function() {
  const value = document.getElementById("maxCalorie").value;
  if (value) {
    queryParams.maxCalories = value;
    console.log(`Set Max Calories to ${value}`);
  } else {
    console.log("Max Calories input is empty");
  }
});

document.getElementById("minServingsSubmit")?.addEventListener("click", function() {
  const value = document.getElementById("minServingSize").value;
  if (value) {
    queryParams.minServings = value;
    console.log(`Set Min Servings to ${value}`);
  } else {
    console.log("Min Servings input is empty");
  }
});

document.getElementById("maxServingsSubmit")?.addEventListener("click", function() {
  const value = document.getElementById("maxServingSize").value;
  if (value) {
    queryParams.maxServings = value;
    console.log(`Set Max Servings to ${value}`);
  } else {
    console.log("Max Servings input is empty");
  }
});

// ----------------- DROPDOWN TOGGLING AND PAGE NAVIGATION -----------------

document.addEventListener("DOMContentLoaded", function () {
  function setupToggle(toggleId, optionsId) {
    const toggle = document.getElementById(toggleId);
    const options = document.getElementById(optionsId);
    toggle.addEventListener("change", function () {
      if (toggle.checked) {
        options.classList.remove("hidden");
        options.style.display = "block";
        options.style.animation = "fadeDown 0.5s ease-out";
      } else {
        options.style.animation = "fadeUp 0.5s ease-out";
        setTimeout(() => {
          options.style.display = "none";
          options.classList.add("hidden");
        }, 300);
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

  setupToggle("cuisineToggle", "cuisineOptions");
  setupToggle("dietaryToggle", "dietaryOptions");
  setupToggle("intolerancesToggle", "intolerancesOptions");
  setupToggle("typeToggle", "typeOptions");

  // Page navigation (assuming the HTML contains the page select buttons)
  const preferencePage = document.getElementById("preferencePage");
  const suggestionPage = document.getElementById("suggestionPage");
  const preferenceButton = document.getElementById("preferencePageButton");
  const suggestionButton = document.getElementById("suggestionPageButton");
  const pageButtons = document.querySelectorAll(".pageSelectButton");
  const pageSelection = document.querySelector(".pageSelection");

  function showPage(page) {
    if (page === "preference") {
      preferencePage.style.display = "block";
      suggestionPage.style.display = "none";
    } else if (page === "suggestion") {
      preferencePage.style.display = "none";
      suggestionPage.style.display = "block";
    }
  }
  
  function setActivePageButton(activeButton) {
    pageButtons.forEach(button => button.classList.remove("active"));
    activeButton.classList.add("active");
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
  setActivePageButton(preferenceButton);
});
