import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./fonts.css";
import App from "./App.tsx";
import { HashRouter } from "react-router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
