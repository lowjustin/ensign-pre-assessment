import { NavLink } from "react-router-dom";
import Navigation from "./Navigation";

export default function Header(props) {
  return (
    <header className="flex justify-end p-8">
      {/* <h1>
        <NavLink to="/">Shopping Cart Demo</NavLink>
      </h1> */}
      <Navigation />
    </header>
  );
}
