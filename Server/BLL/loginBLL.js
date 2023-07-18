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

    const session = await Sk.findOne({});
    if (!session || session.length === 0) {
      return { status: 500, msg: 'Session is not found' };
    }

    const sessionTO = user.sessionTO; // 12 minutes

    // Calculate the expiration time in milliseconds (12 minutes * 60,000 milliseconds per minute)
    const expirationTimeInMilliseconds1 = sessionTO * 60000;

    // Create the payload for the token with the sessionTO property
    const accessToken = jwt.sign(
      { id: user.id, username: user.username, permissions: userPer },
      session.key,
      { expiresIn: sessionTO * 60 } // Convert minutes to seconds
    );

    return { status: 200, token: accessToken, msg: 'login succeed', sto: Date.now() + expirationTimeInMilliseconds1 };
  } catch (error) {
    console.error(error);
    return { status: 500, msg: 'Server error' };
  }
};

module.exports = { login };
