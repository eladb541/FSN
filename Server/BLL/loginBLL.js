const { getPersonPermmisionsById } = require('../DAL/usersFile');
const User = require('../models/userModel');
const Sk = require('../models/sessionKey');
const jwt = require('jsonwebtoken');

const login = async (obj) => {
  const { username, password } = obj;

  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return { status: 404, msg: 'User not found' };
    }

    const userPer = await getPersonPermmisionsById(user.id);

    const session = await Sk.find({});
    if (!session || session.length === 0) {
      return { status: 500, msg: 'Session is not found' };
    }

    const accessToken = jwt.sign(
      { id: user.id, username: user.username, permissions: userPer },
      session[0].key
    );

    return { status: 200, token: accessToken };
  } catch (error) {
    console.error(error);
    return { status: 500, msg: 'Server error' };
  }
};

module.exports = { login };
