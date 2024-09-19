// index.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import LandingPage from "./pages/Landing";
import Main from "./pages/Main";
import Groups from "./pages/Groups";
import Profile from "./pages/Profile";
import Friends from "./pages/Friends";
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
            <Route path="/groups" element={<Groups />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/friends" element={<Friends />} />
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
