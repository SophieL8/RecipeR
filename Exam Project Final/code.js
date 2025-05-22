var mealIdeas = [
  { name: "Spaghetti with meat sauce", ingredients: ["spaghetti", "meat", "tomato sauce"] },
  { name: "Fried rice", ingredients: ["rice", "egg", "vegetables", "soy sauce"] },
  { name: "Taco salad", ingredients: ["lettuce", "ground beef", "tomatoes", "cheese", "taco seasoning"] },
  { name: "Vegetable stir-fry", ingredients: ["vegetables", "soy sauce", "garlic"] },
  { name: "Vegetable soup", ingredients: ["vegetables", "broth", "herbs"] },
  { name: "Baked chicken", ingredients: ["chicken", "herbs", "olive oil"] },
  { name: "Beef stew", ingredients: ["beef", "potatoes", "carrots", "onions", "beef broth"] },
  { name: "Veggie burgers", ingredients: ["vegetables", "beans", "breadcrumbs", "spices"] },
  { name: "Chili con carne", ingredients: ["ground beef", "beans", "tomatoes", "chili powder"] },
  { name: "Grilled salmon", ingredients: ["salmon", "lemon", "herbs"] },
  { name: "Pesto pasta", ingredients: ["pasta", "pesto", "tomatoes", "parmesan cheese"] },
  { name: "Chicken Caesar salad", ingredients: ["lettuce", "chicken", "croutons", "parmesan cheese", "Caesar dressing"] },
  { name: "Egg fried rice", ingredients: ["rice", "egg", "vegetables", "soy sauce", "sesame oil"] },
  { name: "Sweet and sour pork", ingredients: ["pork", "pineapple", "bell peppers", "sweet and sour sauce"] },
  { name: "Mushroom risotto", ingredients: ["arborio rice", "mushrooms", "white wine", "chicken broth", "parmesan cheese"] },
  { name: "Spinach and feta stuffed chicken", ingredients: ["chicken breasts", "spinach", "feta cheese", "breadcrumbs", "olive oil"] },
  { name: "Beef and broccoli stir-fry", ingredients: ["beef", "broccoli", "soy sauce", "garlic", "ginger"] },
  { name: "Vegetarian chili", ingredients: ["beans", "tomatoes", "bell peppers", "onions", "chili powder"] },
  { name: "Baked ziti", ingredients: ["ziti pasta", "ground beef", "tomato sauce", "ricotta cheese", "mozzarella cheese"] },
  { name: "Shrimp scampi", ingredients: ["shrimp", "linguine", "garlic", "white wine", "lemon"] },
  { name: "Turkey meatballs with spaghetti", ingredients: ["turkey", "spaghetti", "tomato sauce", "herbs", "parmesan cheese"] },
  { name: "Beef and mushroom stroganoff", ingredients: ["beef", "mushrooms", "sour cream", "beef broth", "egg noodles"] },
  { name: "Roast chicken with root vegetables", ingredients: ["chicken", "carrots", "potatoes", "onions", "rosemary"] },
  { name: "Black bean soup", ingredients: ["black beans", "tomatoes", "onions", "chili powder", "cumin"] },
  { name: "Butternut squash risotto", ingredients: ["arborio rice", "butternut squash", "white wine", "chicken broth", "parmesan cheese"] },
  { name: "Lemon garlic shrimp skewers", ingredients: ["shrimp", "lemon", "garlic", "olive oil", "thyme"] },
  { name: "Tuna salad", ingredients: ["tuna", "lettuce", "tomatoes", "cucumbers", "avocado"] },
  { name: "Broiled steak with roasted vegetables", ingredients: ["steak", "potatoes", "carrots", "onions", "olive oil"] },
  { name: "Beef and bean burritos", ingredients: ["ground beef", "refried beans", "tortillas", "cheese", "salsa"] },
  { name: "Fettuccine Alfredo with broccoli", ingredients: ["fettuccine pasta", "butter", "heavy cream", "parmesan cheese", "broccoli"] }
];

function generateMealIdeas(ingredients, numMeals) {
  // format ingredients to compare it with those in array
  ingredients = ingredients.join(',').split(/[\s,]+/);

  var suggestedMeals = [];

  // loop through the meal ideas array
  for (var i = 0; i < mealIdeas.length; i++) {
    var meal = mealIdeas[i];
    var hasAtLeastOneIngredient = false;

    // loop through the ingredients array
    for (var j = 0; j < ingredients.length; j++) {
      var ingredient = ingredients[j];

      // check if the meal contains at least one of the ingredients
      if (meal.ingredients.indexOf(ingredient) !== -1) {
        hasAtLeastOneIngredient = true;
      }
    }

    // if the meal contains at least one of the ingredients, add it to the suggested meals array
    if (hasAtLeastOneIngredient) {
      suggestedMeals = suggestedMeals.concat(meal.name);
    }

    // if the suggested meals array has reached the desired number of meals, break out of the loop
    if (suggestedMeals.length === numMeals) {
      break;
    }
  }

  // if the suggested meals array has not reached the desired number of meals, display an error message
  if (suggestedMeals.length < numMeals) {
    setText("mealIdeasLabel", "Not enough ingredients to generate " + numMeals + " meals.");
  }

  // display the suggested meals to the user
  setText("mealIdeasLabel", "Suggested meals:\n\n" + suggestedMeals.join("\n"));
}

//add suggestions
function addRecipe(name, ingredients) {
  if (name === "" || ingredients.length === 0) {
    setText("mealIdeasLabel", "Data not complete. Please fill both boxes.");
  }
  
  // check if the recipe already exists
  for (var i = 0; i < mealIdeas.length; i++) {
    if (mealIdeas[i].name.toLowerCase() === name.toLowerCase()) {
      setText("mealIdeasLabel", "Recipe already exists!");
    }
  }

  // add the new recipe to the mealIdeas array
  mealIdeas.concat({name: name, ingredients: ingredients});

  setText("mealIdeasLabel", "Recipe added successfully!");
}

onEvent("generateMealIdeasButton", "click", function() {
  var ingredients = getText("ingredientsInput").split(",");
  var numMeals = getNumber("numMealsInput");
  generateMealIdeas(ingredients, numMeals);
});

onEvent("addRecipe", "click", function() {
  var name = getText("name");
  var ingredients = getText("ingredientsString");
  addRecipe(name, ingredients);
});

//create account
var users = [];

// function to check if username/password combination exists
function checkCredentials(username, password) {
  // loop through all users and check if the username/password match
  for (var i = 0; i < users.length; i++) {
    if (users[i].username === username && users[i].password === password) {
      setScreen("screen2");
    }
  }
  // if no match is found, show error message
  console.log("Invalid username/password combination!");
}

// function to add new username/password combination to the users array
function createUser(username, password) {
  // check if username already exists
  for (var i = 0; i < users.length; i++) {
    if (users[i].username === username) {
      console.log("Username already exists!");
    }
  }
  // if username doesn't exist, add new user to array
  users = users.concat({ username: username, password: password });
  console.log("User created successfully!");
}

//account screens
onEvent("login","click", function(){
  setScreen("screen3");
});

onEvent("button4", "click", function(){
  setScreen("screen1");
});

onEvent("button2", "click", function(){
  setScreen("screen2");
});

onEvent("signup", "click", function(){
  setScreen("screen4");
});

onEvent("button5", "click", function(){
  var username = getText("name");
  var password = getText("password");
  checkCredentials(username, password);
});

onEvent("newaccountsubmit", "click", function(){
  var username = getText("newuser");
  var password = getText("newpaswd");
  createUser(username, password);
  setScreen("screen2");
});