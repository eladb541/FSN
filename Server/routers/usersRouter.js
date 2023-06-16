const express = require('express');
const usersBLL = require('../BLL/usersBLL');

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await usersBLL.getAllUsers();
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const person = await usersBLL.getUserById(Number(id));
  res.json(person);
});

router.post('/', async (req, res) => {
  const obj = req.body;
  const result = await usersBLL.addUser(obj);
  res.json(result);
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await usersBLL.updateuser(Number(id), obj);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await usersBLL.deleteuser(Number(id));
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
