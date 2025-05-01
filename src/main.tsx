
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import initializeTheme from "./theme-init";

// Initialize theme before rendering the app
initializeTheme();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
