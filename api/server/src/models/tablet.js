'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tablet = sequelize.define('Tablet', {
    number: DataTypes.STRING
  }, {});
  Tablet.associate = function(models) {
    // associations can be defined here
  };
  return Tablet;
};