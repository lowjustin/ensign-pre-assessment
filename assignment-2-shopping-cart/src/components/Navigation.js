import React from "react";
import { NavLink } from "react-router-dom";

export default function Navigation(props) {
  const { cartCount } = props;
  
  return (
    <nav>
      <ul className="flex gap-4">
        <li className="p-2 px-4 rounded-full bg-brown-light text-brown">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="p-2 px-4 rounded-full bg-brown-light text-brown">
          <NavLink to="/cart">Cart {(cartCount()) ? <span className="p-1 rounded bg-brown text-white">{cartCount()}</span> : '' }</NavLink>
        </li>
      </ul>
    </nav>
  );
}
