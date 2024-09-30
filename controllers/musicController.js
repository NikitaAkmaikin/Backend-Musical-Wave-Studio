const MusicDirection = require('../models/MusicDirection');

// Экспорт всех функций как именованных
exports.getMusicDirections = async (req, res) => {
  const directions = await MusicDirection.findAll();
  res.status(200).json(directions);
};

exports.createMusicDirection = async (req, res) => {
  console.log('Request body:', req.body);  // Логируем тело запроса
  console.log('Uploaded file:', req.file); // Логируем файл

  const { title, description, details } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!title) {
    return res.status(400).json({ message: 'Заголовок обязателен' });
  }

  try {
    const newDirection = await MusicDirection.create({
      title,
      description,
      image,
      details,
    });

    res.status(201).json(newDirection);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании музыкального направления', error });
  }
};

exports.deleteMusicDirection = async (req, res) => {
  const { id } = req.params;
  const direction = await MusicDirection.findByPk(id);

  if (!direction) {
    return res.status(404).json({ message: 'Музыкальное направление не найдено' });
  }

  await direction.destroy();
  res.status(200).json({ message: 'Музыкальное направление удалено' });
};
