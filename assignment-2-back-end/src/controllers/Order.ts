import { Cart, UserFromToken } from "../types/custom";

const { Order } = require("../models/Order");

const createOrder = (userId: number, cart: Cart) => {
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

const getOrdersByUser = (user: UserFromToken) => {
  const data = Order.findAll({
    where: { userId: user.userId },
    order: [["createdAt", "DESC"]],
  });
  return data;
}

module.exports = { createOrder, createOrderTable, getOrdersByUser };
