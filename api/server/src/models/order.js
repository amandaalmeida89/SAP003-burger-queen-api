'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    TableId: DataTypes.INTEGER,
    status: DataTypes.ENUM(["pending", "done", "delivered"])
  }, {
    deletedAt: 'deletedAt',
    paranoid: true,
    timestamps: true,
  });
  Order.associate = function (models) {
    Order.belongsTo(models.Table);
    Order.hasMany(models.OrderItem);
  };
  return Order;
};