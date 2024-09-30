const nodemailer = require('nodemailer');

// Контроллер для отправки контактной формы
exports.sendContactForm = async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Проверяем, что все данные формы переданы
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ message: 'Пожалуйста, заполните все поля' });
  }

  try {
    // Настраиваем транспорт для отправки email
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Используем Gmail (или можно другой SMTP-сервер)
      auth: {
        user: process.env.EMAIL_USER, // Email с которого будут отправляться сообщения
        pass: process.env.EMAIL_PASSWORD, // Пароль от email
      },
    });

    // Настраиваем письмо
    const mailOptions = {
      from: email, // Отправитель (email пользователя)
      to: process.env.EMAIL_RECIPIENT, // Кому отправляем сообщение (ваш email)
      subject: 'Новое сообщение с контактной формы', // Тема письма
      text: `
        Имя: ${name}
        Email: ${email}
        Телефон: ${phone}
        Сообщение: ${message}
      `,
    };

    // Отправляем email
    await transporter.sendMail(mailOptions);
    console.log('Email успешно отправлен');
    
    // Ответ клиенту об успешной отправке
    res.status(200).json({ message: 'Сообщение отправлено успешно' });
  } catch (error) {
    console.error('Ошибка при отправке письма:', error);
    res.status(500).json({ message: 'Ошибка при отправке сообщения' });
  }
};
