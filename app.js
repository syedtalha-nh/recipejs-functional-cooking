(() => {
  /* ---------- Recipe Data ---------- */
  const recipes = [
    {
      id: 1,
      title: "Pasta Alfredo",
      time: 25,
      difficulty: "easy",
      description: "Creamy Italian pasta with garlic and cheese.",
      category: "pasta",
      ingredients: ["Pasta", "Cream", "Garlic", "Cheese"],
      steps: [
        "Boil pasta",
        "Prepare sauce",
        ["Mix cream", "Add cheese"],
        "Combine pasta and sauce"
      ]
    },
    {
      id: 2,
      title: "Chicken Curry",
      time: 60,
      difficulty: "medium",
      description: "Spicy Indian-style chicken curry.",
      category: "curry",
      ingredients: ["Chicken", "Onion", "Spices"],
      steps: ["Marinate chicken", "Cook onions", "Add chicken", "Simmer"]
    },
    {
      id: 3,
      title: "Caesar Salad",
      time: 15,
      difficulty: "easy",
      description: "Fresh salad with creamy dressing.",
      category: "salad",
      ingredients: ["Lettuce", "Croutons", "Dressing"],
      steps: ["Chop lettuce", "Prepare dressing", "Mix together"]
    },
    {
      id: 4,
      title: "Beef Stroganoff",
      time: 75,
      difficulty: "hard",
      description: "Classic beef dish with rich sauce.",
      category: "beef",
      ingredients: ["Beef", "Mushroom", "Cream"],
      steps: [
        "Slice beef",
        ["Cook beef", ["Add mushrooms", "Add cream"]],
        "Simmer"
      ]
    },
    {
      id: 5,
      title: "Vegetable Stir Fry",
      time: 20,
      difficulty: "easy",
      description: "Quick and healthy veggies.",
      category: "vegetarian",
      ingredients: ["Vegetables", "Soy sauce"],
      steps: ["Heat pan", "Add vegetables", "Stir fry"]
    },
    {
      id: 6,
      title: "Fish Tikka",
      time: 40,
      difficulty: "medium",
      description: "Grilled spicy fish.",
      category: "seafood",
      ingredients: ["Fish", "Spices", "Yogurt"],
      steps: ["Marinate fish", "Grill fish"]
    },
    {
      id: 7,
      title: "Lamb Biryani",
      time: 90,
      difficulty: "hard",
      description: "Traditional layered rice dish.",
      category: "rice",
      ingredients: ["Rice", "Lamb", "Spices"],
      steps: [
        "Cook rice",
        ["Prepare lamb", ["Add spices", "Slow cook"]],
        "Layer and steam"
      ]
    },
    {
      id: 8,
      title: "Tomato Soup",
      time: 35,
      difficulty: "medium",
      description: "Warm and comforting soup.",
      category: "soup",
      ingredients: ["Tomatoes", "Cream"],
      steps: ["Cook tomatoes", "Blend", "Simmer"]
    }
  ];

  const recipeContainer = document.querySelector("#recipe-container");

  let currentFilter = "all";
  let currentSort = null;

  /* ---------- Recursive Steps Renderer ---------- */
  const renderSteps = steps =>
    `<ul>${steps
      .map(step =>
        Array.isArray(step)
          ? `<li>${renderSteps(step)}</li>`
          : `<li>${step}</li>`
      )
      .join("")}</ul>`;

  /* ---------- Card Creator ---------- */
  const createRecipeCard = recipe => `
    <div class="recipe-card" data-id="${recipe.id}">
      <h3>${recipe.title}</h3>
      <div class="recipe-meta">
        <span>⏱️ ${recipe.time} min</span>
        <span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
      </div>
      <p>${recipe.description}</p>

      <button class="toggle-btn" data-action="steps">Show Steps</button>
      <div class="steps hidden">
        ${renderSteps(recipe.steps)}
      </div>

      <button class="toggle-btn" data-action="ingredients">Show Ingredients</button>
      <ul class="ingredients hidden">
        ${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
      </ul>
    </div>
  `;

  /* ---------- Render ---------- */
  const renderRecipes = list => {
    recipeContainer.innerHTML = list.map(createRecipeCard).join("");
  };

  /* ---------- Update Display ---------- */
  const updateDisplay = () => {
    let updated = [...recipes];

    if (currentFilter === "quick") {
      updated = updated.filter(r => r.time < 30);
    } else if (currentFilter !== "all") {
      updated = updated.filter(r => r.difficulty === currentFilter);
    }

    if (currentSort === "name") {
      updated = [...updated].sort((a, b) => a.title.localeCompare(b.title));
    }

    if (currentSort === "time") {
      updated = [...updated].sort((a, b) => a.time - b.time);
    }

    renderRecipes(updated);
  };

  /* ---------- Events ---------- */
  document.addEventListener("click", e => {
    if (e.target.dataset.filter) {
      currentFilter = e.target.dataset.filter;
      updateDisplay();
    }

    if (e.target.dataset.sort) {
      currentSort = e.target.dataset.sort;
      updateDisplay();
    }

    if (e.target.classList.contains("toggle-btn")) {
      const section =
        e.target.nextElementSibling;
      section.classList.toggle("hidden");
      e.target.textContent =
        section.classList.contains("hidden")
          ? e.target.dataset.action === "steps"
            ? "Show Steps"
            : "Show Ingredients"
          : "Hide";
    }
  });

  /* ---------- Init ---------- */
  renderRecipes(recipes);
})();
