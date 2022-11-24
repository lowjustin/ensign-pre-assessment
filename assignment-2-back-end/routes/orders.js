var express = require("express");
var router = express.Router();

const { User } = require("../models/User");
const { Order } = require("../models/Order");
const { verifyToken } = require("../helpers");
var auth = require("../handlers/auth");
// const sampleOrders = require("../sample/Orders");

// display all Orders
router.get("/", auth, async (req, res) => {
  const user = await req.user;
  console.log(user);
  if (user) {
    const orders = await Order.findAll({ where: { userId: user.userId } });
    console.log(orders);
    return res.json(orders);
  }
});

router.post("/", auth, async (req, res) => {
  const { cart } = req.body;
  const user = await req.user;
  if (user) {
    const data = await Order.create({
      userId: user.userId,
      cart,
    });

    console.log({ cart, user, data });
    return res.json({ cart, user, data });
  }
  return res.json({ error: "error" });
});

// create table
router.get("/createTable", async (req, res) => {
  await Order.sync({ force: true });
  res.send("The table for the Order model was just (re)created!");
});

// load sample Orders
// router.get("/createSampleOrders", async (req, res) => {
//   await Order.bulkCreate(sampleOrders);
//   res.send("Sample Orders loaded");
// });

module.exports = router;
