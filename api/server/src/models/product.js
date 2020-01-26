'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    image: DataTypes.STRING,
    is_breakfast: DataTypes.BOOLEAN,
    category: DataTypes.STRING
  }, {
    tableName: 'products'
  });
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};