import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { BlockchainProvider } from "./context/BlockchainProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <BlockchainProvider>
      <App />
      </BlockchainProvider>
    </Router>
  </React.StrictMode>
);
