'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      table_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tables',
          key: 'id',
        }
      },
      status: {
        type: Sequelize.ENUM(["pending", "done", "delivered"]),
        defaultValue: "pending",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('order_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_id: {
        allowNull: false,
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
        references: {
          model: 'orders',
          key: 'id',
        }
      },
      product_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'id',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('order_items');
    await queryInterface.dropTable('orders');
  }
};