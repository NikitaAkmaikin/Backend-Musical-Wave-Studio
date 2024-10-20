
const express = require('express');
const path = require('path');
const { getMusicDirections, createMusicDirection, deleteMusicDirection } = require('../controllers/musicController');
const router = express.Router();
const multer = require('multer');

// Настраиваем multer для загрузки файлов
const upload = multer({ storage: multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
}) });

// Маршрут для получения всех направлений
router.get('/', getMusicDirections);

// Маршрут для создания музыкального направления
router.post('/', upload.single('image'), createMusicDirection);

// Маршрут для удаления музыкального направления
router.delete('/:id', deleteMusicDirection);

// Маршрут для доступа к загруженным изображениям
router.get('/image/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, '../uploads', imageName);

  // Проверяем, существует ли файл
  res.sendFile(imagePath, (err) => {
    if (err) {
      res.status(404).json({ message: 'Изображение не найдено' });
    }
  });
});

module.exports = router;
