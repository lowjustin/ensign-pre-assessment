const db = require("../db");
import { DataTypes } from "sequelize";

const User = db.define("User", {
  username: {
    type: DataTypes.STRING,
    unique: true,
    lowercase: true,
    trim: true,
    required: "Please enter a username",
  },
  password: {
    type: DataTypes.STRING,
  },
});

exports.User = User;
