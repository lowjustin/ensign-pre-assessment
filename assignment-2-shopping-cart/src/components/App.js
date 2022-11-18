import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./Header";
import Products from "./Products";
import Product from "./Product";
import Cart from "./Cart";
import NotFound from "./NotFound";

export default function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products?limit=10`
      );
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setProducts(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const addToCart = (key) => {
    let newCart = { ...cart };
    newCart[key] = cart[key] + 1 || 1;
    setCart(newCart);
  };

  const removeFromCart = (key) => {
    let newCart = { ...cart };
    delete newCart[key];
    setCart(newCart);
  };

  const cartCount = () => {
    return Object.keys(cart).reduce((prevCount, key) => {
      const count = cart[key];
      return prevCount + count;
    }, 0);
  }

  return (
    <BrowserRouter>
      <div className="container">
        <Header cartCount={cartCount} />
      </div>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={<Products products={products} loading={loading} />}
          />
          <Route
            path="/product/:productId"
            element={
              <Product
                addToCart={addToCart}
                products={products}
                loading={loading}
                getData={getData}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                products={products}
                loading={loading}
                getData={getData}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
