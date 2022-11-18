import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import LoadingSpinner from "./LoadingSpinner";
import { formatPrice } from "../helpers";

export default function Product(props) {
  const { productId } = useParams();
  const { addToCart, products, loading, getProductData } = props;

  // if accessing the page directly, we will need to load the data
  if (!products.length) getProductData();

  const product = products.find(p => p.id == productId);

  const renderProduct = (product, addToCart) => {
    const { id, image, price, title } = product;
    return (
      <div className="product">
        <div className="product-title">{title}</div>
        <div className="product-price">{formatPrice(price)}</div>
        {/* <div className="product-image"><img src={image} /></div> */}
        <button onClick={() => addToCart(id)}>Add to cart</button>
      </div>
    );
  };

  return (
    <div>
      <h2>Product</h2>
      {/* show loader if product not loaded, else render product item */}
      {loading ? <LoadingSpinner /> : renderProduct(product, addToCart)}
    </div>
  );
}
