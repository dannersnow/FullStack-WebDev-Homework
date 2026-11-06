import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./App.css";

// find root element in index.html
const root = ReactDOM.createRoot(document.getElementById("root"));

// render app in root element
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
