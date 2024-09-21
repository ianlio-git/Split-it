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
import ProtectedRoute from "./context/ProtectedRoute"; // Importa el componente

import "./index.css";

const App = () => {
  return (
    <UserProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 mt-[4rem]">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/main"
              element={<ProtectedRoute element={<Main />} />}
            />
            <Route
              path="/groups"
              element={<ProtectedRoute element={<Groups />} />}
            />
            <Route
              path="/profile"
              element={<ProtectedRoute element={<Profile />} />}
            />
            <Route
              path="/friends"
              element={<ProtectedRoute element={<Friends />} />}
            />
          </Routes>
        </main>
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
