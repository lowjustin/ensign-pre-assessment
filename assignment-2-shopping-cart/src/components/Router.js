import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./Products";
import Product from "./Product";
import Cart from "./Cart";
import NotFound from "./NotFound";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/product/:productId" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
