import { NavLink } from "react-router-dom";
import CartCount from "./CartCount";

export default function Navigation() {
  return (
    <nav>
      <ul className="flex gap-4">
        <li>
          <NavLink
            className="p-2 px-4 rounded-full bg-brown-light text-brown hover:bg-brown hover:text-brown-light transition"
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className="p-2 px-4 rounded-full bg-brown-light text-brown hover:bg-brown hover:text-brown-light transition"
            to="/register"
          >
            Register
          </NavLink>
        </li>
        <li>
          <NavLink
            className="p-2 px-4 rounded-full bg-brown-light text-brown hover:bg-brown hover:text-brown-light transition"
            to="/login"
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            className="p-2 px-4 rounded-full bg-brown-light text-brown hover:bg-brown hover:text-brown-light transition"
            to="/logout"
          >
            Logout
          </NavLink>
        </li>
        <li>
          <NavLink
            className="p-2 px-4 rounded-full bg-brown-light text-brown hover:bg-brown hover:text-brown-light transition"
            to="/products"
          >
            Products
          </NavLink>
        </li>
        <li>
          <NavLink
            className="p-2 px-4 rounded-full bg-brown-light text-brown hover:bg-brown hover:text-brown-light transition"
            to="/cart"
          >
            Cart
            {<CartCount /> ? (
              <span className="p-1 rounded bg-brown text-white">
                <CartCount />
              </span>
            ) : (
              ""
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
