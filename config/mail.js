const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',  // Используем smtp.gmail.com для Gmail
  port: 587,  // Порт для STARTTLS
  secure: false,  // Используем STARTTLS, а не SSL
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = transporter;
