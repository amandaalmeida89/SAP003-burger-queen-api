'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TableId: {
        type: Sequelize.INTEGER,
        references: { model: 'tables', key: 'id'}
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
  },
  down: (queryInterface, Sequelize) => {
   return queryInterface.dropTable('Orders');
  }
};