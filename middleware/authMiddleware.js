const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(403).json({ message: 'Доступ запрещен' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Декодированные данные пользователя
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Неверный токен' });
  }
};

module.exports = authMiddleware;
