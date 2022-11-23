// import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useAtom } from "jotai";
import { tokenAtom } from "../lib/atoms";

import Header from "./Header";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import Products from "./Products";
import Product from "./Product";
import Orders from "./Orders";
import Cart from "./Cart";
import NotFound from "./NotFound";

const ProtectedRoute = ({ token, redirectPath = "/login" }) => {
  // temporary, still need to check if token is valid
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default function App() {
  const [token, setToken] = useAtom(tokenAtom);

  return (
    <BrowserRouter>
      {token ? "successfully logged in" : ""}
      <div className="container mb-2">
        <Header />
      </div>
      <div className="container mb-8">
        <Routes>
          <Route path="/login" element={<Login token={token} setToken={setToken} />} />
          <Route path="/logout" element={<Logout token={token} setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute token={token} />}>
            <Route path="/products" element={<Products />} />
            <Route
              path="/product/:productId"
              element={<Product />}
            />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
