import React from "react";
import { NavLink } from "react-router-dom";
import Navigation from "./Navigation";

export default function Header(props) {
  const { cartCount } = props;
  
  return (
    <header className="flex justify-between p-8">
      <h1>
        <NavLink to="/">Shopping Cart Demo</NavLink>
      </h1>
      <Navigation cartCount={cartCount} />
    </header>
  );
}