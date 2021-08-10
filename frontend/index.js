import React, { useContext } from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./components/App";
import Home from "./components/Home";

import { AuthProvider } from "./contexts/auth";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
