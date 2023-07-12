const express = require('express');
const router = express.Router();
const adminbll = require("../BLL/adminBLL");
const axios = require("axios");


router.post('/', async (req, res) => { // Update the HTTP method to 'POST'
  try {
    const params = req.body;
    const result = await adminbll.getOne(params.username);
    if (result) {
      res.json(result); // Return the user if it exists
    } else {
      res.json(null); // Return null if the user doesn't exist
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;
