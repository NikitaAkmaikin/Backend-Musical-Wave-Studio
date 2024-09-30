const express = require('express');
const cors = require('cors');  // Импортируем CORS
require('dotenv').config();
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const musicRoutes = require('./routes/musicRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Настройка CORS
app.use(cors({
  origin: 'http://localhost:5173',  // Указываем домен фронтенда
}));

app.use(express.json());

// Подключение маршрутов
app.use('/api/auth', authRoutes);
app.use('/api/music-directions', musicRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
// app.use('/api/contact', contactRoutes);
app.use('/api', contactRoutes);

// Подключение к базе данных и запуск сервера
db.sync().then(() => {
  console.log('База данных синхронизирована');
  app.listen(5000, () => {
    console.log('Сервер запущен на порту 5000');
  });
}).catch(err => console.log('Ошибка подключения к базе данных:', err));

(async () => {
  try {
    await db.sync({ alter: true });  // Обновляет структуру таблиц в соответствии с моделями (добавит поле isAdmin)
    console.log('База данных синхронизирована');
  } catch (error) {
    console.error('Ошибка при синхронизации базы данных:', error);
  }
})();