const db = require("../models");

db.sequelize
  .sync()
  .then(populateDb)
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

async function populateDb() {
  const ingredients = await db.Ingredient.bulkCreate([
    { name: "tequila", category: "alcohol" },
    { name: "orange juice", category: "sweetener" },
    { name: "grenadine", category: "sweetener" },
    { name: "gin", category: "alcohol" },
    { name: "vermouth", category: "other" },
    { name: "olive", category: "other" },
  ]);

  const cocktails = await db.Cocktail.bulkCreate([
    {
      name: "Tequila Sunrise",
      recipe:
        "Pour the tequila and orange juice into glass over ice. Add the grenadine, which will sink to the bottom. Do not stir. Garnish and serve.",
      imageUrl:
        "https://www.acouplecooks.com/wp-content/uploads/2020/04/Tequila-Sunrise-003s.jpg",
    },
    {
      name: "Martini",
      recipe: `1 Fill a mixing glass with ice cubes: Combine the gin and vermouth, pouring more or less vermouth to your taste.
      2 Stir for 30 seconds: Then strain into a chilled cocktail glass.
      3 Add a dash of bitters, if desired.
      4 Garnish: with a lemon twist, or add olives to make a dirty martini. 
      `,
      imageUrl:
        "https://www.thespruceeats.com/thmb/OevcAqV-nURBs51XZpzg5gVp5rE=/3870x2580/filters:fill(auto,1)/vodka-martini-recipe-760983-Hero-5bd771cd4cedfd0026121758.jpg",
    },
  ]);

  await db.CocktailIngredient.bulkCreate([
    { CocktailId: 1, IngredientId: 1 },
    { CocktailId: 1, IngredientId: 2 },
    { CocktailId: 1, IngredientId: 3 },
    { CocktailId: 2, IngredientId: 4 },
    { CocktailId: 2, IngredientId: 5 },
    { CocktailId: 2, IngredientId: 6 },
  ]);

  console.log(
    `Added ${ingredients.length} ingredients and ${cocktails.length} cocktails`
  );
}
