var express = require("express");
var router = express.Router();

const { Order } = require("../models/Order");
// const sampleOrders = require("../sample/Orders");

// display all Orders
// switch to protected route later
router.get("/", async function (req, res, next) {
  const { limit } = req.query;
  const Orders = await Order.findAll({ limit });
  res.json(Orders);
});

// create table
router.get("/createTable", async function (req, res) {
  await Order.sync({ force: true });
  res.send("The table for the Order model was just (re)created!");
})

// load sample Orders
router.get("/createSampleOrders", async function (req, res, next) {
  await Order.bulkCreate(sampleOrders);
  res.send("Sample Orders loaded");
});

module.exports = router;
