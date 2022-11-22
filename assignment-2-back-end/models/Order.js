const db = require("../db");
const { DataTypes } = require("sequelize");

const Order = db.define(
  "Order",
  {
    userId: {
      type: DataTypes.STRING,
      required: true,
    },
    cart: {
      type: DataTypes.JSON,
      required: true,
    },
  }
);

Order.associate = (models) => {
  Order.belongsTo(models.users, {
      foreignKey: "userId"
  });
}

exports.Order = Order;