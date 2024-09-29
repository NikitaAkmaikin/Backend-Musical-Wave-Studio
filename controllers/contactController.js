const nodemailer = require('nodemailer');
require('dotenv').config();

// Настройка транспорта для отправки писем
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Можно использовать любой другой почтовый сервис
  auth: {
    user: process.env.EMAIL_USER,  // Твой email
    pass: process.env.EMAIL_PASS,  // Пароль приложения (или пароль)
  },
});

// Контроллер для отправки сообщений с формы
exports.sendContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,  // Email отправителя (пользователя)
    to: process.env.RECEIVER_EMAIL,  // Личный email для получения писем
    subject: `Сообщение от ${name} через контактную форму`,
    text: message,  // Текст сообщения
    html: `
      <h3>Детали сообщения</h3>
      <ul>
        <li>Имя: ${name}</li>
        <li>Email: ${email}</li>
        <li>Сообщение: ${message}</li>
      </ul>
    `,
  };

  try {
    console.log('Пробуем отправить письмо через Nodemailer...');
    await transporter.sendMail(mailOptions);  // Отправка письма
    console.log('Письмо успешно отправлено.');
    res.status(200).json({ message: 'Сообщение успешно отправлено' });
  } catch (error) {
    console.error('Ошибка при отправке письма через Nodemailer:', error);  // Логируем полную ошибку
    res.status(500).json({ message: 'Ошибка при отправке письма' });
  }
};
