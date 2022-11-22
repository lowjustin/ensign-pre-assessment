const bcrypt = require("bcryptjs");
const { User } = require("../models/User");

const createUser = async (username, password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({
      username: username,
      password: hash,
    });
    return user;
  } catch (error) {
    return error;
  }
};

module.exports = { createUser };