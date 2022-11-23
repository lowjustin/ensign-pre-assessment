var express = require("express");
var router = express.Router();
var auth = require("../handlers/auth");

const { Product } = require("../models/Product");
const {
  createProductTable,
  createSampleProducts,
} = require("../controllers/Product");

// display all products (protected route)
router.get("/", auth, async (req, res) => {
  const { limit } = req.query;
  const products = await Product.findAll({ limit });
  res.json(products);
});

// create table
router.get("/createTable", async (req, res) => {
  if (createProductTable()) {
    res.send("The table for the Product model was just (re)created!");
  }
});

// load sample products
router.get("/createSampleProducts", async (req, res) => {
  if (createSampleProducts()) {
    res.send("Sample products loaded");
  }
});

// create table and load sample products
router.get("/syncProducts", async (req, res) => {
  await createProductsTable()
    .then(() => createSampleProducts())
    .catch((err) => console.log(err))
    .finally(res.send("Products table and sample products loaded"));
});

module.exports = router;
