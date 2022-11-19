import React from "react";
import CartItem from "./CartItem";
import LoadingSpinner from "./LoadingSpinner";
import { formatPrice } from "../helpers";

export default function Cart(props) {
  let {
    cart,
    cartCount,
    addToCart,
    decrementCart,
    removeFromCart,
    products,
    loading,
    getProductData,
  } = props;

  // if accessing the page directly, we will need to load the data
  if (!products.length) getProductData();

  let total = 0.0;
  if (loading === false) {
    total = Object.keys(cart).reduce((prevTotal, key) => {
      const product = products.find((p) => p.id === parseInt(key));
      const count = cart[key];
      return prevTotal + count * product.price;
    }, 0);
  }

  const renderCart = () => {
    const cartKeys = Object.keys(cart);
    return (
      <table className="table table-auto w-full ">
        <thead>
          <tr>
            <td className="py-4 border-b border-blue font-bold">Title</td>
            <td className="py-4 border-b border-blue font-bold">Price</td>
            <td className="py-4 border-b border-blue font-bold" colSpan="3">
              Quantity
            </td>
            {/* <td className="font-bold">Subtotal</td> */}
            <td className="py-4 border-b border-blue"></td>
          </tr>
        </thead>
        <tbody>
          {cartKeys.map((key) => (
            <CartItem
              key={key}
              index={key}
              addToCart={addToCart}
              decrementCart={decrementCart}
              removeFromCart={removeFromCart}
              cart={cart}
              product={products.find((p) => p.id === parseInt(key))}
            />
          ))}
        </tbody>
      </table>
    );
  };

  const renderSummary = () => {
    return (
      <div className="order-summary">
        <h4>Number of items: <span className="font-bold">{cartCount()}</span></h4>
        <h4>Total: <span className="font-bold">{formatPrice(total)}</span></h4>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2 className="text-2xl mb-4 text-gray">Cart</h2>
      <div className="md:flex border border-blue rounded">
        {/* show loader if products not loaded, else render product items */}
        <div className="grow p-8">
          {loading ? <LoadingSpinner /> : renderCart()}
        </div>
        <div className="md:w-1/3 bg-blue-light p-8 text-gray-dark">
          <h3 className="text-lg font-bold mb-2">Order summary</h3>
          {loading ? <LoadingSpinner /> : renderSummary()}
        </div>
      </div>
    </div>
  );
}
