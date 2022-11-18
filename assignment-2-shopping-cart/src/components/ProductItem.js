import React from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../helpers";

export default function ProductItem(props) {
  const { id, image, price, title } = props.product;
  return (
    <li className="product-item" key={props.index}>
      <div className="product-title">{title}</div>
      <div className="product-price">{formatPrice(price)}</div>
      {/* <div className="product-image"><img src={image} /></div> */}
      <div className="product-link">
        <Link to={`product/${id}`}>Read more</Link>
      </div>
    </li>
  );
}
