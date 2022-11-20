import React from "react";
import { NavLink } from "react-router-dom";

export default function Navigation(props) {
  const { cartCount } = props;

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
            to="/cart"
          >
            Cart{" "}
            {cartCount() ? (
              <span className="p-1 rounded bg-brown text-white">
                {cartCount()}
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
