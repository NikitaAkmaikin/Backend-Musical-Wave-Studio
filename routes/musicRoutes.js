const express = require('express');
const { getMusicDirections, createMusicDirection, deleteMusicDirection } = require('../controllers/musicController');
const router = express.Router();

router.get('/', getMusicDirections);
router.post('/', createMusicDirection);
router.delete('/:id', deleteMusicDirection);

module.exports = router;
