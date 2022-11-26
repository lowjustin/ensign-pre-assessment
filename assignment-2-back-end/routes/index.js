var express = require("express");
var router = express.Router();

const { Order } = require("../models/Order");
const { Product } = require("../models/Product");
const { User } = require("../models/User");

const sampleProducts = require("../sample/products");

/* GET home page. */
router.get("/", function (req, res) {
  res.send("Home");
});

router.get("/setupData", async function (req, res) {
  await Promise.all([
    Order.sync({ force: true }),
    Product.sync({ force: true }),
    User.sync({ force: true }),
  ])
    .then(() => {
      Product.bulkCreate(sampleProducts);
    })
    .then(() => {
      res.send("Tables created, sample products imported");
    })
    .catch((err) => console.error(err));
});

module.exports = router;
