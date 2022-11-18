import React from "react";
import Navigation from "./Navigation";

export default function Header(props) {
  const { cartCount } = props;
  
  return (
    <header>
      <h1>
        Shopping cart demo
      </h1>
      <Navigation cartCount={cartCount} />
    </header>
  );
}