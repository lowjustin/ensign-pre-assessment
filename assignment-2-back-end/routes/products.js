var express = require("express");
var router = express.Router();

const { Product } = require("../models/Product");
const sampleProducts = require("../sample/products");

// display all products
// switch to protected route later
router.get("/", async function (req, res, next) {
  const { limit } = req.query;
  const products = await Product.findAll({ limit });
  res.json(products);
});

// create table
router.get("/createTable", async function (req, res) {
  await Product.sync({ force: true });
  res.send("The table for the Product model was just (re)created!");
})

// load sample products
router.get("/createSampleProducts", async function (req, res, next) {
  await Product.bulkCreate(sampleProducts);
  res.send("Sample products loaded");
});

module.exports = router;
