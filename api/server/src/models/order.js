'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    table_id: DataTypes.STRING,
    status: DataTypes.ENUM(["pending", "done", "delivered"])
  }, {});
  Order.associate = function(models) {
    Order.hasOne(models.Table);
    Order.belongsToMany(models.Product, {
      through: 'order_has_products',
      foreignKey: 'order_id',
      otherKey: 'product_id',
      as: 'products',
    });
  };
  return Order;
};