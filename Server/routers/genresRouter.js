const express = require('express');
const genresBll = require('../BLL/genresBLL');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const genres = await genresBll.getAllGenres();
    res.json(genres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch genres' });
  }
});

module.exports = router;
