import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import { useAtom } from "jotai";

import Header from "./Header";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import Products from "./Products";
import Product from "./Product";
import Cart from "./Cart";
import NotFound from "./NotFound";

import { tokenAtom, cartAtom } from "../lib/atoms";

export default function App() {
  const [token, setToken] = useAtom(tokenAtom);
  const [cart, setCart] = useAtom(cartAtom);
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
    // console.log(localStorage.getItem("userToken"));
    // setToken(localStorage.getItem("userToken"));
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

  const renderGetProductsError = (error) => {
    return (
      <div className="container py-4">
        <h1 className="error text-2xl text-red">
          Could not load products: {error}
        </h1>
      </div>
    );
  };

  if (error) return renderGetProductsError(error);

  return (
    <BrowserRouter>
      {(token) ? "successfully logged in" : ""}
      <div className="container mb-2">
        <Header />
      </div>
      <div className="container mb-8">
        <Routes>
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/logout"
            element={<Logout />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/products"
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
