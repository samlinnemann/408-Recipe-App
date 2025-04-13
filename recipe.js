async function fetchRecipe() {
    try {
        // Get the recipe ID from the URL
        const params = new URLSearchParams(window.location.search);
        const recipeId = params.get('id');

        if (!recipeId) {
            console.error('No recipe ID found in the URL.');
            return;
        }

        const apikey = "&apiKey=82caed26afe2467ca4813a20339b7a80";
        const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false${apikey}`);
        const recipeDetails = await response.json();

        document.getElementById('recipe-image').src = recipeDetails.image;
        document.getElementById('recipe-title').innerText = recipeDetails.title;
        document.getElementById('recipe-time').innerText = `Ready in ${recipeDetails.readyInMinutes} minutes`;
        document.getElementById('recipe-servings').innerText = `Servings: ${recipeDetails.servings}`;

         // Display ingredients
         const ingredientsList = document.getElementById('ingredients-list');
         for (const ingredient of recipeDetails.extendedIngredients) {
             const listItem = document.createElement('li');
             listItem.innerText = ingredient.amount + ' ' + ingredient.unit + ' ' + ingredient.name; 
             ingredientsList.appendChild(listItem);
         }

          // Display instructions
        const instructionsDiv = document.getElementById('instructions');
        if (recipeDetails.analyzedInstructions.length > 0) {
            for (const step of recipeDetails.analyzedInstructions[0].steps) {
                const stepParagraph = document.createElement('p');
                stepParagraph.innerText = `${step.number}. ${step.step}`; // Display step number and instruction
                instructionsDiv.appendChild(stepParagraph);
            }
        } else {
            instructionsDiv.innerText = 'No instructions available.';
        }


    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

window.onload = function() {
    fetchRecipe();
}
