const { Sequelize } = require('sequelize');
require('dotenv').config();

const db = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',  // Файл базы данных SQLite
  logging: false,  // Отключение логов SQL-запросов
});

module.exports = db;
