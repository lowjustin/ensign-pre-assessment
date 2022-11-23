import axios from "axios";
import { useAtom } from "jotai";
import { cartAtom, loadProductsAtom } from "../lib/atoms";
import { formatPrice } from "../helpers";
import CartItem from "./CartItem";
import { CartCount, calcTotal } from "./CartFunctions";
import LoadingError from "./LoadingError";
import LoadingSpinner from "./LoadingSpinner";

export default function Cart(props) {
  const { user } = props;
  const [cart] = useAtom(cartAtom);
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
        `http://localhost:4000/orders`,
        data,
        config
      );
      console.log(response.data);
    } catch (err) {
      throw new Error(err);
    }
  };

  const renderCart = (productsArr) => {
    const cartKeys = Object.keys(cart);

    if (cartKeys.length === 0) {
      return <div className="cart-empty">Your cart is empty</div>;
    }

    return (
      <table className="cart-items table table-auto w-full ">
        <thead>
          <tr>
            <td className="py-4 border-b border-blue font-bold">Title</td>
            <td className="py-4 border-b border-blue font-bold">Price</td>
            <td className="py-4 border-b border-blue font-bold" colSpan="3">
              Quantity
            </td>
            <td className="py-4 border-b border-blue"></td>
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
      <div className="order-summary">
        <h4>
          Number of items:{" "}
          <span className="font-bold">
            <CartCount />
          </span>
        </h4>
        <h4>
          Total:{" "}
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
          <div className="md:flex border border-blue rounded">
            <div className="grow p-8">
              <h3 className="title-section">Items</h3>
              {renderCart(products.data)}
            </div>
            <div className="md:w-1/3 bg-blue-light p-8 text-gray-dark">
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
