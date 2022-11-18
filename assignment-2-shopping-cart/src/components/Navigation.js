import React from "react";
import { NavLink } from "react-router-dom";

export default function Navigation(props) {
  const { cartCount } = props;
  
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/cart">Cart {cartCount()}</NavLink>
        </li>
      </ul>
    </nav>
  );
}
