const db = require("../db");
import { DataTypes } from "sequelize";

const Product = db.define("Product", {
  title: {
    type: DataTypes.STRING,
    trim: true,
    required: "Please enter a title",
  },
  price: {
    type: DataTypes.FLOAT,
    trim: true,
    required: "Please enter a price",
  },
  description: {
    type: DataTypes.TEXT,
    trim: true,
    required: "Please enter a description",
  },
  category: {
    type: DataTypes.STRING,
    trim: true,
    required: "Please enter a category",
  },
  image: {
    type: DataTypes.STRING,
    trim: true,
    required: "Please enter a image",
  },
});

exports.Product = Product;
