import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./Header";
import Products from "./Products";
import Product from "./Product";
import Cart from "./Cart";
import NotFound from "./NotFound";

export default function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    const initialValue = JSON.parse(saved);
    return initialValue || {};
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProductData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/products?limit=12`
      );
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (key) => {
    let newCart = { ...cart };
    newCart[key] = cart[key] + 1 || 1;
    setCart(newCart);
  };

  const decrementCart = (key) => {
    let newCart = { ...cart };
    newCart[key] = cart[key] - 1 || 0;
    if (newCart[key] <= 0) delete newCart[key];
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
  };

  const renderGetProductsError = (error) => {
    return (
      <div className="container py-4">
        <h1 className="error text-2xl text-red">Could not load products: {error}</h1>
      </div>
    )
  }

  if (error) return renderGetProductsError(error);

  return (
    <BrowserRouter>
      <div className="container mb-2">
        <Header cartCount={cartCount} />
      </div>
      <div className="container mb-8">
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
                getProductData={getProductData}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                cartCount={cartCount}
                addToCart={addToCart}
                decrementCart={decrementCart}
                removeFromCart={removeFromCart}
                products={products}
                loading={loading}
                getProductData={getProductData}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
