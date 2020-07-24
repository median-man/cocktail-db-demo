const db = require("./models");

seedDb(findCocktailWithIngredients);

// add some ingredients and one cocktail
function seedDb(cb) {
  db.sequelize
    .sync({ force: true })
    .then(createCocktails)
    .then(console.log)
    .catch((error) => {
      console.log(error);
    });

  function createCocktails() {
    return db.Ingredient.bulkCreate([
      { name: "tequila", category: "alcohol" },
      { name: "orange juice", category: "sweetener" },
      { name: "grenadine", category: "sweetener" },
    ]).then((ingredients) => {
      const newCocktailRecord = new db.Cocktail({
        name: "Tequila Sunrise",
        recipe:
          "Pour the tequila and orange juice into glass over ice. Add the grenadine, which will sink to the bottom. Do not stir. Garnish and serve.",
        imageUrl:
          "https://www.acouplecooks.com/wp-content/uploads/2020/04/Tequila-Sunrise-003s.jpg",
      });
      return newCocktailRecord
        .save()
        .then((cocktail) => cocktail.setIngredients(ingredients))
        .then(cb);
    });
  }
}

function findCocktailWithIngredients() {
  db.Cocktail.findAll({
    include: [db.Ingredient],
  }).then(results => results.forEach(cocktail => console.log(cocktail.toJSON())));
}
