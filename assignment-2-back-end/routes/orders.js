var express = require("express");
var router = express.Router();

var {
  createOrder,
  createOrderTable,
  getOrdersByUser,
} = require("../controllers/Order");
var auth = require("../handlers/auth");

// display all orders
router.get("/", auth, async (req, res) => {
  const user = await req.user;
  try {
    if (user) {
      const orders = await getOrdersByUser(user);
      return res.status(200).json(orders);
    }
  } catch (err) {
    return res.status(500).json({
      error: "Could not retrieve orders",
    });
  }
});

// create order
router.post("/", auth, async (req, res) => {
  const { cart } = req.body;
  const user = await req.user;

  try {
    if (user) {
      const data = await createOrder(user.userId, cart);
      return res.status(200).json({ cart, user, data });
    }
  } catch (err) {
    return res.status(500).json({
      error: "Could not create order",
    });
  }
});

// create table
router.get("/createOrderTable", async (req, res) => {
  try {
    await createOrderTable();
    res.send("The table for the Order model was just created");
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
