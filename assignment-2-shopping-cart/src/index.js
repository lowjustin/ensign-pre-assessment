import React from "react";
import { createRoot } from "react-dom/client";
// import Router from './components/Router';
import App from "./components/App";
import "./css/style.css";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
