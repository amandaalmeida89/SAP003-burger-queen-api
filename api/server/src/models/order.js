'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    TableId: DataTypes.INTEGER,
    status: DataTypes.ENUM(["pending", "done", "delivered"])
  }, {
  });
  Order.associate = function(models) {
    Order.belongsTo(models.Table);
    Order.hasMany(models.OrderItem);
  };
  return Order;
};