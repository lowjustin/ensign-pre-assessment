import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import axios from "axios";
import { useAtom } from "jotai";
import { loadProductsAtom, userAtom } from "../lib/atoms";
import LoadingError from "./LoadingError";
import LoadingSpinner from "./LoadingSpinner";
import OrderItem from "./OrderItem";
import { calcTotal } from "./CartFunctions";
import { formatPrice } from "../helpers";

export default function Orders() {
  // shared state
  const [user] = useAtom(userAtom);
  const [products] = useAtom(loadProductsAtom);

  // internal state
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    try {
      const config = {
        headers: {
          Authorization: `token ${user.token}`,
        },
      };
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/orders`,
        config
      );
      setOrders(response.data);
      setError("");
    } catch (error) {
      setOrders([]);
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const renderOrders = () => {
    if (orders.length === 0) {
      return <div className="orders-empty">You have no orders</div>;
    }

    return (
      <ul className="orders-list grid grid-cols-2 gap-8">
        {Object.keys(orders).map((key) => (
          <li className="order card p-8" key={key}>
            <h3 className="title-section">Order ID: {orders[key].id}</h3>
            <div className="flex">
              <div className="order-data w-1/4">
                <h5>
                  <span className="order-data-title">Order date</span>
                  {format(parseISO(orders[key].createdAt), "yyyy/MM/dd")}
                </h5>
                <h5>
                  <span className="order-data-title">Total</span>
                  {formatPrice(calcTotal(orders[key].cart, products.data))}
                </h5>
              </div>
              <div className="order-items w-3/4">
                <table className="order-items-table table table-auto w-full">
                  <thead>
                    <tr>
                      <td>Product name</td>
                      <td>Price</td>
                      <td className="text-right">Quantity</td>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(orders[key].cart).map((cartKey) => (
                      <OrderItem
                        key={cartKey}
                        index={cartKey}
                        product={products.data.find(
                          (p) => p.id === parseInt(cartKey)
                        )}
                        quantity={orders[key].cart[cartKey]}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
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
