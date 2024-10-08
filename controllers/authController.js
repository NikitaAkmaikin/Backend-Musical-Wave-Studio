const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Регулярное выражение для проверки email
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Функция регистрации
exports.register = async (req, res) => {
  const { email, password } = req.body;

  // Шаг 1: Валидация входных данных
  if (!email || !validateEmail(email)) {
    return res.status(400).json({ message: 'Некорректный email' });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ message: 'Пароль должен содержать минимум 6 символов' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      isAdmin: false  // Обычный пользователь
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, isAdmin: newUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ message: 'Пользователь успешно зарегистрирован', token });
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    res.status(500).json({ message: 'Ошибка на сервере при регистрации' });
  }
};

// Функция входа
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Шаг 1: Валидация входных данных
  if (!email || !validateEmail(email)) {
    return res.status(400).json({ message: 'Некорректный email' });
  }

  if (!password) {
    return res.status(400).json({ message: 'Пароль обязателен' });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Неверные учетные данные' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Вход выполнен успешно', token });
  } catch (error) {
    console.error('Ошибка при входе:', error);
    res.status(500).json({ message: 'Ошибка на сервере при входе' });
  }
};
