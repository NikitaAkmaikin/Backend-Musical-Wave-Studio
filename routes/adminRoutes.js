const express = require('express');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/dashboard', authMiddleware, adminMiddleware, (req, res) => {
  res.status(200).json({ message: 'Добро пожаловать в админ-панель' });
});

module.exports = router;
