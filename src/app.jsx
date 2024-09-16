import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/Landing";
import Main from "./pages/Main";
import Navbar from "./Layout/Navbar";
import Footer from "./Layout/Footer";
import "./index.css";

const App = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/blank"
            element={<div style={{ background: "#fff", height: "100vh" }} />}
          />
          <Route path="/main" element={<Main />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);
