import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");

if (import.meta.env.DEV && new URLSearchParams(location.search).has("copao-debug")) {
  import("./dev/copaoDiagnostics").then(({ startCopaoDiagnostics }) => startCopaoDiagnostics());
}

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
