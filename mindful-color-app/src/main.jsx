// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // I commented out the <React.StrictMode> tag because in dev mode useEffects run twice on start up which is dumb
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
