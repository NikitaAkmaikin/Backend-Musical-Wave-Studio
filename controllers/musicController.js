const MusicDirection = require('../models/MusicDirection');

exports.getMusicDirections = async (req, res) => {
  const directions = await MusicDirection.findAll();
  res.status(200).json(directions);
};

exports.createMusicDirection = async (req, res) => {
  const { title, description, image, details } = req.body;
  const newDirection = await MusicDirection.create({ title, description, image, details });
  res.status(201).json(newDirection);
};

exports.deleteMusicDirection = async (req, res) => {
  const { id } = req.params;  // Получаем ID из параметров
  const direction = await MusicDirection.findByPk(id);  // Ищем музыкальное направление по ID
  
  if (!direction) {
    return res.status(404).json({ message: 'Музыкальное направление не найдено' });  // Если не найдено
  }

  await direction.destroy();  // Удаляем музыкальное направление
  res.status(200).json({ message: 'Музыкальное направление удалено' });
};
