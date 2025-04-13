async function fetchData() {
    try {
        const apikey = "&apiKey=82caed26afe2467ca4813a20339b7a80";
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?cuisine=American&diet=glutenfree&intolerances=gluten&instructionsRequired=true&number=5${apikey}`);
        const data = await response.json();

        const apiResultDiv = document.getElementById('api-result');
        apiResultDiv.innerHTML = '';

        for (const recipe of data.results) {
            const info = await fetch(`https://api.spoonacular.com/recipes/${recipe.id}/information?includeNutrition=false${apikey}`);
            const recipeDetails = await info.json();
            console.log(recipeDetails);

            // Create a card for each recipe
            const card = document.createElement('div');
            card.className = 'w3-card-4 w3-margin w3-padding w3-hover-shadow';

            const img = document.createElement('img');
            img.src = recipeDetails.image;
            img.alt = recipeDetails.title;
            img.style.width = '100%';

            const title = document.createElement('h2');
            title.innerHTML = `<a href='recipe.html?id=${recipeDetails.id}'>${recipeDetails.title}</a>`; // Pass ID via URL
            
            const time = document.createElement('p');
            time.innerText = `Ready in ${recipeDetails.readyInMinutes} minutes`;

            const cuisine = document.createElement('p');
            cuisine.className = 'w3-small recipeInfo'
            cuisine.innerHTML = recipeDetails.cuisines.map(c => `<span class="w3-tag w3-light-grey">${c}</span>`).join(' ');

            const diets = document.createElement('p');
            diets.className = 'w3-small recipeInfo'
            diets.innerHTML = recipeDetails.diets.map(d => `<span class="w3-tag w3-light-blue">${d}</span>`).join(' ');

            const servings = document.createElement('p');
            servings.className = 'w3-small recipeInfo'
            servings.innerHTML = `Servings: ${recipeDetails.servings}`;

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

window.onload = function() {
    fetchData();
}