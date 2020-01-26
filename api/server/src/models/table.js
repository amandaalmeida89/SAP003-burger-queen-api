'use strict';
module.exports = (sequelize, DataTypes) => {
  const Table = sequelize.define('Table', {
    number: DataTypes.STRING
  }, {
    tableName: 'tables'
  });
  Table.associate = function(models) {
    // associations can be defined here
  };
  return Table;
};