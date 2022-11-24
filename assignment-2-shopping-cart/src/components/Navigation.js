import { useAtom } from "jotai";
import { userAtom } from "../lib/atoms";
import { NavLink } from "react-router-dom";
import { CartCount } from "./CartFunctions";

export default function Navigation() {
  // shared state
  const [user, setUser] = useAtom(userAtom);

  return (
    <div>
      <nav className="nav-home">
        <ul className="flex gap-4">
          <li>
            <NavLink className="nav-item" to="/">
              Home
            </NavLink>
          </li>
        </ul>
      </nav>
      {user ? (
        <nav className="nav-main">
          <ul className="flex gap-4">
            <li>
              <NavLink className="nav-item" to="/products">
                Products
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-item" to="/orders">
                Orders
              </NavLink>
            </li>

            <li>
              <NavLink className="nav-item" to="/cart">
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
      ) : (
        ""
      )}
      {user ? (
        <nav className="nav-utils">
          <ul className="flex gap-4">
            <li>
              <NavLink className="nav-item" to="/logout">
                Logout
              </NavLink>
            </li>
          </ul>
        </nav>
      ) : (
        ""
      )}
    </div>
  );
}
