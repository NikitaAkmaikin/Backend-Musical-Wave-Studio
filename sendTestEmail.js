const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,  // Используем STARTTLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: process.env.RECEIVER_EMAIL,
  subject: 'Тест Nodemailer',
  text: 'Это тестовое письмо с использованием STARTTLS',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Ошибка при отправке письма:', error);
  }
  console.log('Письмо успешно отправлено:', info.response);
});
