const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Subscription = db.define('Subscription', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.STRING,  // Цена
  },
  details: {
    type: DataTypes.TEXT,    // Подробная информация
  },
});

module.exports = Subscription;
