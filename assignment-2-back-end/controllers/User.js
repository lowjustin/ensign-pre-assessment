const bcrypt = require("bcryptjs");
const { User } = require("../models/User");

const createUserTable = async () => {
  try {
    const data = await User.sync({ force: true });
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

const createUser = async (username, password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({
      username,
      password: hash,
    });
    return user;
  } catch (err) {
    return err;
  }
};

module.exports = { createUserTable, createUser };
