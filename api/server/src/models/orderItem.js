'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    OrderId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    extras: DataTypes.STRING,
  }, {});
  OrderItem.associate = function(models) {
    OrderItem.belongsTo(models.Product);
  };
  return OrderItem;
};