import express from "express";
const router = express.Router();
const auth = require("../handlers/auth");
const {
  createProductTable,
  createSampleProducts,
  getAllProducts,
} = require("../controllers/Product");

// display all products (protected route)
router.get("/", auth, async (req, res) => {
  const { limit } = req.query;

  try {
    const products = await getAllProducts(limit);
    res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({
      error: "Could not retrieve products",
    });
  }
});

// create table
router.get("/createProductTable", async (req, res) => {
  try {
    await createProductTable();
    res.send("The table for the Product model was just created");
  } catch (err) {
    console.error(err);
  }
});

// load sample products
router.get("/createSampleProducts", async (req, res) => {
  try {
    await createSampleProducts();
    res.send("Sample products loaded");
  } catch (err) {
    console.error(err);
  }
});

// create table and load sample products
router.get("/syncProducts", async (req, res) => {
  await createProductTable()
    .then(() => createSampleProducts())
    .catch((err: Error) => console.error(err))
    .finally(res.send("Products table and sample products loaded"));
});

module.exports = router;
