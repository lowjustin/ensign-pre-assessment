import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../lib/atoms";

import Header from "./Header";
import Home from "./Home";
import Logout from "./Logout";
import Products from "./Products";
import Product from "./Product";
import Orders from "./Orders";
import Cart from "./Cart";
import NotFound from "./NotFound";

const ProtectedRoute = ({ user, redirectPath = "/" }) => {
  // temporary, still need to check if token is valid
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default function App() {
  const [user, setUser] = useAtom(userAtom);

  return (
    <BrowserRouter>
      <div className="container mb-2">
        <Header />
      </div>
      <div className="container mb-8">
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/logout"
            element={<Logout />}
          />
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
