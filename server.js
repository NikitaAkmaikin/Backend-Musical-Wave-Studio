const express = require('express'); 
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const musicRoutes = require('./routes/musicRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const contactRoutes = require('./routes/contactRoutes');
const path = require('path');

const app = express();

// Настройка CORS
app.use(cors({
  origin: 'http://62.113.110.34',  // Указываем домен фронтенда
}));

// Middleware для обработки JSON
app.use(express.json());

// Обслуживание статических файлов (загруженные изображения)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Маршрут для проверки работоспособности сервера
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Server is running' });
});

// Подключение маршрутов
app.use('/api/auth', authRoutes);
app.use('/api/music-directions', musicRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api', contactRoutes);

// Подключение к базе данных и запуск сервера
(async () => {
  try {
    await db.authenticate();  // Проверка подключения к базе данных
    console.log('Успешное подключение к базе данных');
    
    await db.sync({ alter: true });
    console.log('База данных синхронизирована');
    
    app.listen(5000, () => {
      console.log('Сервер запущен на порту 5000');
    });
  } catch (error) {
    console.error('Ошибка при синхронизации базы данных:', error);
  }
})();
