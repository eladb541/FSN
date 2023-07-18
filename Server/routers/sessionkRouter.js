const express = require('express');
const sessionBLL = require('../BLL/sessionkBLL');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    
    const sk = await sessionBLL.getsessioonkey();
    res.json(sk);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch sessionk' });
  }
});




module.exports = router;
