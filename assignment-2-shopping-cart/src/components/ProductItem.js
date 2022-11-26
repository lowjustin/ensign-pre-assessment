import { Link } from "react-router-dom";
import { formatPrice } from "../helpers";

export default function ProductItem({ product, index }) {
  const { id, image, price, title } = product;
  return (
    <li className="product-item outline-card p-8" key={index}>
      <Link to={`/product/${id}`} className="flex flex-col h-full">
        <div className="product-image p-4 h-80 overflow-hidden">
          <img
            className="object-contain object-center w-full h-full"
            src={image}
            alt=""
          />
        </div>
        <div className="product-data text-center flex flex-col grow">
          <div className="product-title text-lg font-bold mb-2">{title}</div>
          <div className="product-price mb-4 grow">{formatPrice(price)}</div>
          <div className="product-link button">Read more</div>
        </div>
      </Link>
    </li>
  );
}
