const express = require('express');
const router = express.Router();
const registerBLL = require('../BLL/registerBLL');
const axios = require('axios');

router.post('/', async (req, res) => {
  try {
    let msg = null;
    const { username, password } = req.body;
    const obj = { username, password };
    console.log('Router');
    console.log('username', username, 'password', password);

    if (obj.password === null || obj.password === '') {
      msg = 'The password cannot be empty';
      return res.status(404).json({ msg });
    }

    // Password validation criteria
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[!@#$%^&*)(\-_=+.\\\/\[\]{}:;"?><+|]).{8,}$/;

    if (!passwordRegex.test(obj.password)) {
        msg = 'The password does not meet the requirements pay attention is needs include camel and capital Englishh chars digit and one special char from !@#$%^&*)(\-_=+.\\\/\[\]{}:;"?><+|] and minimum 8 chars';

        return res.status(400).json({ msg });
    }

    const resp = await registerBLL.register(obj);
    return res.json(resp);
  } catch (error) {
    const msg = 'Server error';
    return res.status(500).json({ msg });
  }
});

module.exports = router;
