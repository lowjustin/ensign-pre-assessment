const db = require("../db");
const { DataTypes } = require("sequelize");

const User = db.define(
  "User",
  {
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
  }
);

User.associate = (models) => {
  User.hasMany(models.orders, {
      foreignKey: "userId"
  });
}

exports.User = User;