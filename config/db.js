const { Sequelize } = require('sequelize');
require('dotenv').config();

const db = new Sequelize(process.env.MYSQL_DB_NAME, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
  logging: false,  // Отключение логов SQL-запросов
});

module.exports = db;
