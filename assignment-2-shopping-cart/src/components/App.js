import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../lib/atoms";

import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Logout from "./Logout";
import Products from "./Products";
import Product from "./Product";
import ProtectedRoute from "./ProtectedRoute";
import Orders from "./Orders";
import Cart from "./Cart";
import NotFound from "./NotFound";

export default function App() {
  // shared state
  const [user] = useAtom(userAtom);

  return (
    <BrowserRouter>
      <div className="container mb-2">
        <Header />
      </div>
      <div className="container mb-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/products" element={<Products />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
