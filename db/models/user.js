const { DataTypes, sequelize } = require('sequelize');
const sequelizeConnection = require('../../src/db/config');

const User = sequelizeConnection.define('user', {
  balance: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10000
  }
});

module.exports = User;