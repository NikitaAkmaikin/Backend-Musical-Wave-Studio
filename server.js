const express = require('express');
const cors = require('cors');  // Импортируем CORS
require('dotenv').config();
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const musicRoutes = require('./routes/musicRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const contactRoutes = require('./routes/contactRoutes');
const path = require('path');

const app = express();
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Настройка CORS
app.use(cors({
  origin: 'http://localhost:5173', // origin: ['http://localhost:5173', 'http://90.156.170.115'],
}));

// Middleware для обработки JSON
app.use(express.json());

// Обслуживание статических файлов (загруженные изображения)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Подключение маршрутов
app.use('/api/auth', authRoutes);
app.use('/api/products', musicRoutes);

app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api', contactRoutes);

// Подключение к базе данных и запуск сервера
(async () => {
  try {
    await db.sync({ alter: true });
    console.log('База данных синхронизирована');
    
    app.listen(5000, '::', () => {
      console.log('Сервер запущен на порту 5000');
    });
    
  } catch (error) {
    console.error('Ошибка при синхронизации базы данных:', error);
  }
})();
