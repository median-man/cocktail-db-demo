const db = require("./models");
const lodash = require("lodash");
const { Op } = require("sequelize");

// findCocktailWithIngredients();


cocktailIngredientSearch("gin,vermouth,olive").then((cocktails) =>
  cocktails.forEach((c) => console.log(c.toJSON()))
);

function findCocktailWithIngredients() {
  db.Cocktail.findAll({
    include: [db.Ingredient],
  }).then((results) =>
    results.forEach((cocktail) => console.log(cocktail.toJSON()))
  );
}

function cocktailIngredientSearch(ingredients) {
  const mustHaveIngredients = ingredients.split(",");
  return db.Cocktail.findAll({
    include: db.Ingredient,
  }).then((cocktails) => {
    const filteredCocktails = cocktails.filter((c) => {
      const cocktailIngredients = c.Ingredients.map((i) => i.name);
      return mustHaveIngredients.every((iname) =>
        cocktailIngredients.includes(iname)
      );
    });
    return filteredCocktails;
  });
}
