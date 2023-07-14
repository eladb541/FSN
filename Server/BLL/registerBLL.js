const User = require('../models/userModel');

const register = async (obj) => {
  const { username, password } = obj;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return { status: 404, msg: 'The visitor does not exist, please contact the administrator' };
    }

    if (user.password !== null && user.password !== '') {
      return { status: 400, msg: 'The user already exists, please go to the login page' };
    }

    user.password = password;
    await user.save();

    return { status: 200, msg: 'Registration successfully completed' };
  } catch (error) {
    console.error(error);
    return { status: 500, msg: 'Server error' };
  }
};

module.exports = { register };
