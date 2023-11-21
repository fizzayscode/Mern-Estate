import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Authcontext from "./context/Authcontext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Authcontext>
        <Toaster position="top-center" />
        <App />
      </Authcontext>
    </BrowserRouter>
  </React.StrictMode>
);
