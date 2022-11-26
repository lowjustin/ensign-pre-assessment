const { Product } = require("../models/Product");
const sampleProducts = require("../sample/products");

const createProductTable = () => {
  const data = Product.sync({ force: true });
  return data;
};

const createSampleProducts = () => {
  const data = Product.bulkCreate(sampleProducts);
  return data;
};

const getAllProducts = (limit) => {
  const data = Product.findAll({ limit });
  return data;
}

module.exports = { createProductTable, createSampleProducts, getAllProducts };
