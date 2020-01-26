'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    table_id: DataTypes.STRING,
    status: DataTypes.ENUM
  }, {});
  Orders.associate = function(models) {
    Order.hasOne(models.Table);
  };
  return Order;
};