/* 
Id - primary key, unique identifier
Name - string
Recipe - text describing how to make it
ImageUrl - string url
Has many Ingredients

*/

module.exports = (sequelize, DataTypes) => {
  const Cocktail = sequelize.define("Cocktail", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    recipe: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
  });

  Cocktail.associate = (models) => {
    Cocktail.belongsToMany(models.Ingredient, {
      through: "CocktailIngredient",
    });
  };
  return Cocktail;
};
