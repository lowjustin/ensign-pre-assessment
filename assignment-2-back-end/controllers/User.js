const bcrypt = require("bcryptjs");
const { User } = require("../models/User");

const createUserTable = () => {
  const data = User.sync({ force: true });
  return data;
};

const createUser = async (username, password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = User.create({
    username,
    password: hash,
  });
  return user;
};

module.exports = { createUserTable, createUser };
