const express = require('express');
const { sendContactForm } = require('../controllers/contactController');
const router = express.Router();

router.post('/send', sendContactForm);  // Маршрут для отправки формы

module.exports = router;
