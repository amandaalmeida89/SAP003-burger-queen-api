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
        references: { model: 'Tables', key: 'id'}
      },
      status: {
        type: Sequelize.ENUM(["pending", "done", "delivered"]),
        defaultValue: "pending",
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
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