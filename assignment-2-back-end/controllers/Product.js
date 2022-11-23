const { Product } = require("../models/Product");
const sampleProducts = require("../sample/products");

const createProductTable = async () => {
  try {
    const data = await Product.sync({ force: true });
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

const createSampleProducts = async () => {
  try {
    const data = await Product.bulkCreate(sampleProducts);
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { createProductTable, createSampleProducts };
