const express = require('express');
const transporter = require('../config/mail');
const router = express.Router();

router.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.RECEIVER_EMAIL,
    subject: `Сообщение от ${name}`,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Ошибка при отправке письма' });
    }
    res.status(200).json({ message: 'Письмо успешно отправлено' });
  });
});

module.exports = router;
