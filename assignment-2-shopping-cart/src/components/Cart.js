import axios from "axios";
import { useAtom } from "jotai";
import { cartAtom, loadProductsAtom, userAtom } from "../lib/atoms";
import { formatPrice } from "../helpers";
import CartItem from "./CartItem";
import { CartCount, calcTotal } from "./CartFunctions";
import LoadingError from "./LoadingError";
import LoadingSpinner from "./LoadingSpinner";

export default function Cart() {
  // shared state
  const [user] = useAtom(userAtom);
  const [cart, setCart] = useAtom(cartAtom);
  const [products] = useAtom(loadProductsAtom);

  const saveOrder = async () => {
    try {
      const config = {
        headers: {
          Authorization: `token ${user.token}`,
        },
      };
      const data = { cart };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/orders`,
        data,
        config
      );
      setCart({});
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };

  const renderCart = (productsArr) => {
    const cartKeys = Object.keys(cart);

    if (cartKeys.length === 0) {
      return <div className="cart-empty">Your cart is empty</div>;
    }

    return (
      <table className="cart-items table table-auto w-full">
        <thead>
          <tr>
            <td>Title</td>
            <td>Price</td>
            <td colSpan="3">Quantity</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {cartKeys.map((key) => (
            <CartItem
              key={key}
              index={key}
              product={productsArr.find((p) => p.id === parseInt(key))}
            />
          ))}
        </tbody>
      </table>
    );
  };

  const renderSummary = (productsArr) => {
    return (
      <div className="order-summary flex flex-col">
        <h4>
          <span className="cart-data-title">Number of items</span>
          <span className="font-bold">
            <CartCount />
          </span>
        </h4>
        <h4>
          <span className="cart-data-title">Total</span>
          <span className="font-bold">
            {formatPrice(calcTotal(cart, productsArr))}
          </span>
        </h4>
        <button className="button" onClick={saveOrder}>
          Check out
        </button>
      </div>
    );
  };

  const renderContent = () => {
    switch (products.state) {
      case "hasData":
        return (
          <div className="flex gap-8">
            <div className="card p-8 grow">
              <h3 className="title-section">Items</h3>
              {renderCart(products.data)}
            </div>
            <div className="card p-8 w-1/4">
              <h3 className="title-section">Order summary</h3>
              {renderSummary(products.data)}
            </div>
          </div>
        );
      case "hasError":
        return <LoadingError message="Error loading products" />;
      default:
        return <LoadingSpinner />;
    }
  };

  return (
    <div className="cart">
      <h1 className="title-page">Cart</h1>
      {renderContent()}
    </div>
  );
}
