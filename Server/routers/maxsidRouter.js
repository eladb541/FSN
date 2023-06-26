const express = require('express');
const maxsidBll = require('../BLL/maxsIdBLL');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const maxsid = await maxsidBll.getAllmaxsid();
    res.json(maxsid);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch maxsid' });
  }
});

module.exports = router;
