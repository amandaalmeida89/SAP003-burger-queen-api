'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  }, {
    tableName: 'order_items',
  });
  OrderItem.associate = function(models) {
    OrderItem.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'product'
    });
  };
  return OrderItem;
};