const { Order } = require("../models/Order");

const createOrder = (userId, cart) => {
  const data = Order.create({
    userId,
    cart,
  });
  return data;
}

const createOrderTable = () => {
  const data = Order.sync({ force: true });
  return data;
};

const getOrdersByUser = (user) => {
  const data = Order.findAll({
    where: { userId: user.userId },
    order: [["createdAt", "DESC"]],
  });
  return data;
}

module.exports = { createOrder, createOrderTable, getOrdersByUser };
