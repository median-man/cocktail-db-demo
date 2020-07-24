const db = require("./models");

db.sequelize
  .sync({ force: true })
  .then(createIngredients)
  .catch((error) => {
    console.log(error);
  });

function createIngredients() {
  /*
    Teqelia Sunrise
    grenadine,
    orange juice,
    tequila

    Martini
    vermouth,
    gin,
    olive
  */
  const ingredients = [
    {
      name: "grenadine",
      category: "sweetener",
    },
    {
      name: "orange juice",
      category: "sweetener",
    },
    {
      name: "tequila",
      category: "alcohol",
    },
  ];

  Promise.all(
    ingredients.map((ingredient) => db.Ingredient.create(ingredient))
  ).then(console.log);
}
