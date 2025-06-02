import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import PlayIQMath, { TokenProvider } from "./PlayIQMath";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TokenProvider>
    <PlayIQMath />
  </TokenProvider>
);
