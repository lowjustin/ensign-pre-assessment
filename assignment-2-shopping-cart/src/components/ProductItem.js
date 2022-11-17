import React from "react";
import { Link } from "react-router-dom";

export default function ProductItem(props) {
  const { id, image, price, title } = props.product;
  return (
    <article>
      {/* <div><img src={image} /></div> */}
      <div>{price}</div>
      <div>{title}</div>
      <Link to={`product/${id}`}>Read more</Link>
    </article>
  );
}
