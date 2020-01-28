'use strict';
module.exports = (sequelize, DataTypes) => {
  const Table = sequelize.define('Table', {
    number: DataTypes.STRING
  }, {
  });
  Table.associate = function(models) {
    // associations can be defined here
  };
  return Table;
};