import React from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../helpers";

export default function ProductItem(props) {
  const { id, image, price, title } = props.product;
  return (
    <li className="product-item rounded border border-blue" key={props.index}>
      <Link to={`product/${id}`} className="flex flex-col h-full">
        <div className="product-image p-4 h-80 overflow-hidden border-b border-blue">
          <img
            className="object-contain object-center w-full h-full"
            src={image}
          />
        </div>
        <div className="product-data p-4 text-center flex flex-col grow bg-blue-light">
          <div className="product-title text-lg text-blue-dark font-bold mb-2">
            {title}
          </div>
          <div className="product-price text-gray-dark mb-4 grow">
            {formatPrice(price)}
          </div>
          <div className="product-link block rounded p-4 font-bold bg-brown text-white hover:bg-brown-light hover:text-brown transition">
            Read more
          </div>
        </div>
      </Link>
    </li>
  );
}
