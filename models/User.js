const { DataTypes } = require('sequelize');
const db = require('../config/db');

const User = db.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,  // По умолчанию пользователь не админ
  },
});

module.exports = User;
