const recipeGrid = document.getElementById("recipeGrid");
const recipeCardTemplate = document.getElementById("recipeCardTemplate");
const recipeSkeletonTemplate = document.getElementById("recipeSkeletonTemplate");
const pageLoader = document.getElementById("pageLoader");



async function fetchRecipes(searchTerm = "") {
    try {
        // API URL (with search text)
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
        
        recipeGrid.innerHTML = "";
        pageLoader.classList.remove("hidden");
        const response = await fetch(url);
        const data = await response.json();

        // Clear existing recipes

        if(data.meals) {
            // Create recipe cards
            data.meals.forEach(meal => {
                createRecipeCard(meal);
            });
        }
        else {
            recipeGrid.innerHTML = "<p>No recipes found.</p>";
        }
    } catch (error) {
        recipeGrid.innerHTML = "<p>Error loading recipes.</p>";
        console.error("Error fetching recipes:", error);
    } finally {
        pageLoader.classList.add("hidden");
    }

}


function createRecipeCard(meal) {
    const card = recipeCardTemplate.content.cloneNode(true);

    card.querySelector("[data-title]").textContent = meal.strMeal;

    card.querySelector("[data-description]").textContent =
        meal.strInstructions.slice(0, 80) + "...";

    // Set image
    const imageDiv = card.querySelector("[data-image]");
    imageDiv.style.backgroundImage = `url(${meal.strMealThumb})`;
    imageDiv.style.backgroundSize = "cover";
    imageDiv.style.backgroundPosition = "center";

    // Button click
    card.querySelector("[data-button]").addEventListener("click", () => {
        fetchIndividualRecipe(meal.idMeal);
    });

    // Add card to grid
    recipeGrid.appendChild(card);
}

function handleSearch() {
    const searchInput = document.getElementById("searchInput");
    const searchTerm = searchInput.value.trim();
    fetchRecipes(searchTerm);
}

async function fetchIndividualRecipe(id) {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

    // console.log(data);
    try {
        const response = await fetch(url);
        const data = await response.json();
        const modal = document.getElementById("recipeModal");
        
        if(data.meals && data.meals.length > 0) {
            const meal = data.meals[0];
            const modalTitle = modal.querySelector("#modalTitle");
            const modalDescription = modal.querySelector("#modalDescription");
            const modalImage = modal.querySelector("#modalImage");
            modalTitle.textContent = meal.strMeal;
            modalDescription.textContent = meal.strInstructions;
            modalImage.src = meal.strMealThumb;
            modal.classList.remove("hidden");
        }
        else {
            modal.innerHTML = "<p>Recipe details not found.</p>";
        }
    } catch (error) {
        modal.innerHTML = "<p>Error loading recipe details.</p>";
        console.error("Error fetching recipe details:", error);
    }   
}

function closeModal() {
    const modal = document.getElementById("recipeModal");
    modal.classList.add("hidden");
}

 
const modal = document.getElementById("recipeModal");
modal.addEventListener("click", (e) => {
        if(e.target === modal) {
            closeModal();
        }
    }); 

// Scroll to Top Button Functionality
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add("show");
    } else {
        scrollToTopBtn.classList.remove("show");
    }
});

scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

fetchRecipes();
