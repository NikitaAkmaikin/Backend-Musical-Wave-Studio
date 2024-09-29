const { DataTypes } = require('sequelize');
const db = require('../config/db');

const MusicDirection = db.define('MusicDirection', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  image: {
    type: DataTypes.STRING,  // Ссылка на изображение
  },
  details: {
    type: DataTypes.TEXT,    // Подробная информация
  },
});

module.exports = MusicDirection;
