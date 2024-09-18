// index.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import LandingPage from "./pages/Landing";
import Main from "./pages/Main";
import Navbar from "./Layout/Navbar";
import Footer from "./Layout/Footer";
import "./index.css";

const App = () => {
  return (
    <UserProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 mt-[4rem]">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/main" element={<Main />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </UserProvider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);
