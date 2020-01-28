'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    table_id: DataTypes.INTEGER,
    status: DataTypes.ENUM(["pending", "done", "delivered"])
  }, {
    tableName: 'orders',
  });
  Order.associate = function(models) {
    Order.belongsTo(models.Table, {
      foreignKey: 'table_id',
      as: 'table',
    });
    Order.hasMany(models.OrderItem, {
      foreignKey: 'order_id',
      otherKey: 'product_id',
      as: 'items',
    });
  };
  return Order;
};