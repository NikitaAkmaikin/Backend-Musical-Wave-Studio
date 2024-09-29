// Этот код можно поместить в скрипт и выполнить один раз
const User = require('./models/User');
const bcrypt = require('bcryptjs');

(async () => {
  const hashedPassword = await bcrypt.hash('admin134', 10);  // Задаём пароль для админа
  await User.create({ email: 'nikitaakmaikin@gmail.com', password: hashedPassword, isAdmin: true });
  console.log('Администратор создан');
})();
