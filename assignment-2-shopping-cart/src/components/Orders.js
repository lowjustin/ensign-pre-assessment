import { useState, useEffect } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { tokenAtom, loadProductsAtom } from "../lib/atoms";
import LoadingError from "./LoadingError";
import LoadingSpinner from "./LoadingSpinner";
import OrderItem from "./OrderItem";
import { calcTotal } from "./CartFunctions";
import { formatPrice } from "../helpers";

export default function Orders() {
  const [token] = useAtom(tokenAtom);
  const [products] = useAtom(loadProductsAtom);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    try {
      const config = {
        headers: {
          Authorization: `token ${token}`,
        },
      };
      const response = await axios.get(`http://localhost:4000/orders`, config);
      setOrders(response.data);
      setError("");
    } catch (err) {
      setOrders([]);
      setError(err);
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const renderOrders = () => {
    console.log(orders);
    if (orders.length === 0) {
      return <div className="orders-empty">You have no orders</div>;
    }

    return (
      <ul className="orders-list">
        {Object.keys(orders).map((key) => (
          <li className="order-item" orderkey={key}>
            <h4>Order ID: {orders[key].id}</h4>
            <h5>Order date: {orders[key].createdAt}</h5>
            <h6>Items</h6>
            <table className="order-item-items table">
              <thead>
                <tr>
                  <td>Product name</td>
                  <td>Price</td>
                  <td>Quantity</td>
                </tr>
              </thead>
              <tbody>
                {Object.keys(orders[key].cart).map((cartKey) => (
                  <OrderItem
                    key={cartKey}
                    index={cartKey}
                    product={products.data.find((p) => p.id === parseInt(cartKey))}
                    quantity={orders[key].cart[cartKey]}
                  />
                ))}
              </tbody>
            </table>
            <h5>Total: {formatPrice(calcTotal(orders[key].cart, products.data))}</h5>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="orders">
      <h1 className="title-page">Orders</h1>
      {error ? <LoadingError /> : ""}
      {loading ? <LoadingSpinner /> : renderOrders()}
    </div>
  );
}
