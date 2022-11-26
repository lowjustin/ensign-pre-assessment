const db = require("../db");
import { DataTypes } from "sequelize";

const Order = db.define("Order", {
  userId: {
    type: DataTypes.INTEGER,
    required: true,
  },
  cart: {
    type: DataTypes.JSON,
    required: true,
  },
});

exports.Order = Order;
