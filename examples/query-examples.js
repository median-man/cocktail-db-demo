const db = require("../models");
const { Op } = require("sequelize");
const { Sequelize } = require("../models");

// sync the database first
db.sequelize.sync().then(() => {
  // findCocktailWithIngredients();

  // cocktailIngredientSearch("gin,vermouth,olive").then((cocktails) =>
  //   cocktails.forEach((c) => console.log(c.toJSON()))
  // );

  findAllCocktailsHavingAllIngredients(["gin", "vermouth"])
    .then((cocktails) => {
      // format cocktails and ingredients for printing to console
      return cocktails.map((c) => {
        const res = c.toJSON();
        res.Ingredients = c.Ingredients.map((i) => i.name);
        return res;
      });
    })
    .then(console.log)
    .catch(console.log)
    .then(() => process.exit(0));
});

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

// This performs a raw mysql query to find Cocktails which contain each
// ingredient in ingredients parameter. The ingredients parameter must be
// an array of strings.
async function findAllCocktailsHavingAllIngredients(ingredients) {
  const sqlString = `
  SELECT c.id, c.name, c.recipe, c.imageUrl
    FROM cocktails c
    JOIN cocktailingredients ci ON ci.CocktailId = c.id
    JOIN ingredients i ON i.id = ci.IngredientId
  WHERE i.name IN (:ingredients)
  GROUP BY c.id
  HAVING COUNT(DISTINCT i.name) = 2`;
  const replacements = { ingredients };
  let cocktails = await db.sequelize.query(sqlString, {
    type: db.sequelize.QueryTypes.SELECT,
    replacements,
    model: db.Cocktail,
  });
  cocktails = await Promise.all(
    cocktails.map(async (c) => {
      c.Ingredients = await c.getIngredients();
      return c;
    })
  );
  return cocktails;
}
