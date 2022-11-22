import { useParams } from "react-router-dom";

import LoadingSpinner from "./LoadingSpinner";
import { formatPrice } from "../helpers";

export default function Product(props) {
  const { productId } = useParams();
  const { addToCart, products, loading, getProductData } = props;

  // if accessing the page directly, we will need to load the data
  if (!products.length) getProductData();

  const product = products.find((p) => p.id === parseInt(productId));

  const renderProduct = (product, addToCart) => {
    const { id, image, price, title, description } = product;
    return (
      <div className="product md:flex border border-blue rounded p-8 gap-4">
        <div className="product-image grow h-96 md:max-h-96 overflow-hidden mb-8 md:mb-0">
          <img
            className="object-contain object-center w-full h-full"
            src={image}
          />
        </div>
        <div className="product-data md:w-2/3 text-gray-dark">
          <div className="product-title text-3xl text-blue-dark mb-4">
            {title}
          </div>
          <div className="product-price text-xl text-gray mb-4">
            {formatPrice(price)}
          </div>
          <div className="product-description mb-4">
            <p>{description}</p>
          </div>
          <button
            onClick={() => addToCart(id)}
            className="rounded p-4 px-8 font-bold bg-brown text-white leading-none hover:bg-brown-light hover:text-brown transition"
          >
            Add to cart
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-2xl text-gray mb-4">Product</h2>
      {/* show loader if product not loaded, else render product item */}
      {loading ? <LoadingSpinner /> : renderProduct(product, addToCart)}
    </div>
  );
}
