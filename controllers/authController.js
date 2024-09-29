const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ email, password: hashedPassword });
  res.status(201).json({ message: 'Пользователь успешно зарегистрирован', user: newUser });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ message: 'Неверные учетные данные' });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ token });
};
