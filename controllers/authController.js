const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  // Создаём нового пользователя
  const newUser = await User.create({ email, password: hashedPassword, isAdmin: false });
  res.status(201).json({ message: 'Пользователь зарегистрирован', user: newUser });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ message: 'Неверные учетные данные' });
  }

  // Создаём JWT с информацией о том, является ли пользователь админом
  const token = jwt.sign({ id: user.id, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ token });
};
