import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import LoadingSpinner from "./LoadingSpinner";
import { formatPrice } from "../helpers";

export default function Cart(props) {
  let { cart, removeFromCart, products, loading, getData } = props;

  const total = Object.keys(cart).reduce((prevTotal, key) => {
    const product = products.find(p => p.id == key);
    const count = cart[key];
    return prevTotal + count * product.price;
  }, 0);

  // if accessing the page directly, we will need to load the data
  if (!products.length) getData();
  
  const renderCart = () => {
    const cartKeys = Object.keys(cart);
    return (
      <table className="table">
        <thead>
          <tr>
            <td>Title</td>
            <td>Price</td>
            <td>Quantity</td>
          </tr>
        </thead>
        <tbody>
          {cartKeys.map((key) => (
            <CartItem
              key={key}
              index={key}
              cart={cart}
              product={products.find(p => p.id == key)}
              removeFromCart={removeFromCart}
            />
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="cart">
      <h2>Cart</h2>
      {/* show loader if products not loaded, else render product items */}
      {loading ? <LoadingSpinner /> : renderCart()}
      <h4>Total: {formatPrice(total)}</h4>
    </div>
  );
}
