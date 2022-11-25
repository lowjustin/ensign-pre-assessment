import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { cartAtom, loadProductsAtom } from "../lib/atoms";
import { formatPrice } from "../helpers";

import Alert from "./Alert";
import LoadingError from "./LoadingError";
import LoadingSpinner from "./LoadingSpinner";

export default function Product() {
  // shared state
  const [products] = useAtom(loadProductsAtom);
  const [cart, setCart] = useAtom(cartAtom);

  // internal state
  const [addedToCart, setAddedToCart] = useState(false);

  const { productId } = useParams();

  const addToCart = () => {
    let newCart = { ...cart };
    newCart[productId] = cart[productId] + 1 || 1;
    setCart(newCart);
    setAddedToCart(true);
  }

  const renderProduct = (product) => {
    const { image, price, title, description } = product;
    return (
      <div className="product card w-3/4 mx-auto flex p-16 gap-8">
        <div className="product-image grow h-96 md:max-h-96 overflow-hidden mb-8 md:mb-0">
          <img
            className="object-contain object-center w-full h-full"
            src={image}
            alt=""
          />
        </div>
        <div className="product-data md:w-2/3 text-gray-dark flex flex-col">
          <div className="product-title text-3xl text-blue-dark mb-4">
            {title}
          </div>
          <div className="product-price text-xl text-gray mb-4">
            {formatPrice(price)}
          </div>
          <div className="product-description mb-4 grow">
            <p>{description}</p>
          </div>
          {addedToCart ? <Alert type="success" message="Added to cart" /> : ""}
          <div className="flex justify-between">
            <div className="product-cart-button">
              <button className="button" onClick={addToCart}>
                Add to cart
              </button>
            </div>
            <div className="back-to-products">
              <NavLink to="/products" className="button button-outline">
                  Back to products list
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (products.state) {
      case "hasData":
        const product = products.data.find((p) => p.id === parseInt(productId));
        return renderProduct(product);
      case "hasError":
        return <LoadingError message="Error loading products" />;
      default:
        return <LoadingSpinner />;
    }
  };

  return (
    <div>
      <h1 className="title-page">Product</h1>
      {renderContent()}
    </div>
  );
}
