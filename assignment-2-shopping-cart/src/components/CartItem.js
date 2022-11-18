import React from "react";
import { formatPrice } from "../helpers";

export default function CartItem(props) {
  const { index, cart, removeFromCart, product } = props;
  
  return (
    <tr className="cart-item" key={index}>
      <td className="cart-item-title">{product.title}</td>
      <td className="cart-item-price">{formatPrice(product.price)}</td>
      <td className="cart-item-quantity">{cart[index]}</td>
      <td>
        <button onClick={() => removeFromCart(index)}>&times;</button>
      </td>
    </tr>
  );
}
