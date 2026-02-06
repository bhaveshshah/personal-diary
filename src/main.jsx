// We import StrictMode (it helps React warn us about bad patterns)
import React from "react";

// We import ReactDOM so React can "draw" our app into the real browser page
import ReactDOM from "react-dom/client";

// We import our main App component (this is the boss component)
import App from "./App.jsx";

// We import our Tailwind CSS file so styles work everywhere
import "./index.css";

// We find the HTML element with id="root" and tell React: "Put the app here"
ReactDOM.createRoot(document.getElementById("root")).render(
  // StrictMode runs some checks in development (it does NOT break your final app)
  <React.StrictMode>
    {/* App is the main UI of our diary */}
    <App />
  </React.StrictMode>
);
