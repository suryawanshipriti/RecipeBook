document.addEventListener("DOMContentLoaded", () => {
    initializeRecipes();
    loadRecipes();
});


function initializeRecipes() {
    if (!localStorage.getItem("recipes")) {
        const defaultRecipes = [
            {
                name: "Spaghetti Carbonara",
                description: "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
                instructions: "1. Boil pasta. 2. Cook pancetta. 3. Mix eggs and cheese. 4. Combine all together.",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXsMDOhnwuBvl0pcN14PofKJWPFM0tJHWfJg&s"
            },
            {
                name: "Chocolate Cake",
                description: "A rich and moist chocolate cake perfect for any occasion.",
                instructions: "1. Mix flour, sugar, and cocoa. 2. Add eggs and milk. 3. Bake for 30 mins at 180°C.",
                image: "https://sugargeekshow.com/wp-content/uploads/2023/10/easy_chocolate_cake_slice.jpg"
            },
            {
                name: "Classic Pancakes",
                description: "Fluffy and delicious pancakes, perfect for breakfast.",
                instructions: "1. Mix flour, milk, and eggs. 2. Cook on a pan until golden brown.",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj5a1DPb4xCst_GQwDkFt3m_3j2Q0GeZ_TNw&s"
            },
            {
                name: "Chicken Biryani",
                description: "A flavorful and aromatic Indian rice dish made with marinated chicken and spices.",
                instructions: "1. Marinate chicken with yogurt and spices. 2. Cook rice separately. 3. Layer chicken and rice, cook on low heat.",
                image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/12/chicken-biryani-recipe.jpg"
            },
            {
                name: "Veggie Pizza",
                description: "A homemade pizza topped with fresh vegetables and cheese.",
                instructions: "1. Prepare pizza dough. 2. Add sauce, veggies, and cheese. 3. Bake at 200°C for 15-20 mins.",
                image: "https://www.vegrecipesofindia.com/wp-content/uploads/2013/06/veg-pizza-recipe-1.jpg"
            }
        ];
        localStorage.setItem("recipes", JSON.stringify(defaultRecipes));
    }
}


function loadRecipes() {
    const recipeList = document.getElementById("recipe-list");
    const savedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];

    recipeList.innerHTML = "";  

    savedRecipes.forEach((recipe, index) => {
        const newRecipe = document.createElement("div");
        newRecipe.classList.add("recipe-card");
        newRecipe.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}" onclick="viewRecipe(${index})">
            <h3 onclick="viewRecipe(${index})">${recipe.name}</h3>
            <p>${recipe.description}</p>
        `;
        recipeList.appendChild(newRecipe);
    });
}


function viewRecipe(index) {
    window.location.href = `recipe-details.html?recipeId=${index}`;
}


function loadRecipeDetails() {
    const params = new URLSearchParams(window.location.search);
    const recipeId = params.get("recipeId");
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    if (recipeId === null || recipeId >= recipes.length) {
        document.getElementById("recipe-content").innerHTML = "<p>Recipe not found.</p>";
        return;
    }

    const recipe = recipes[recipeId];

    document.getElementById("recipe-content").innerHTML = `
        <h2>${recipe.name}</h2>
        <img src="${recipe.image}" alt="${recipe.name}">
        <p><strong>Description:</strong> ${recipe.description}</p>
        <p><strong>Instructions:</strong> ${recipe.instructions}</p>
    `;
}


function saveRecipe() {
    const name = document.getElementById("recipe-name").value;
    const description = document.getElementById("recipe-description").value;
    
    const image = document.getElementById("recipe-image").value;

    if (!name || !description || !image) {
        alert("Please fill all fields!");
        return;
    }

    const newRecipe = { name, description, image };
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    recipes.push(newRecipe);
    localStorage.setItem("recipes", JSON.stringify(recipes));

    alert("Recipe added successfully!");
    window.location.href = "index.html";
}


function searchRecipe() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const recipeCards = document.querySelectorAll(".recipe-card");

    recipeCards.forEach(card => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        const description = card.querySelector("p").textContent.toLowerCase();
        card.style.display = title.includes(searchTerm) || description.includes(searchTerm) ? "block" : "none";
    });
}
