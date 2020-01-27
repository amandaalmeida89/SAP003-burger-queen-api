'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    table_id: DataTypes.STRING,
    status: DataTypes.ENUM(["pending", "done", "delivered"])
  }, {
    tableName: 'orders',
  });
  Order.associate = function(models) {
    Order.belongsTo(models.Table, {
      foreignKey: 'table_id',
      as: 'table',
    });
    Order.belongsToMany(models.Product, {
      through: 'order_has_products',
      foreignKey: 'order_id',
      timestamps: false,
      otherKey: 'product_id',
      as: 'products',
    });
  };
  return Order;
};