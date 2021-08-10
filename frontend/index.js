import React, { useContext } from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./src/components/App";
import Home from "./src/components/Home";

import { AuthProvider } from "./src/contexts/auth";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
