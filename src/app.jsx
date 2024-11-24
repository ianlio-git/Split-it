import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Landing from "./pages/Landing";
import Main from "./pages/Main";
import Groups from "./pages/Groups";
import Profile from "./pages/Profile";
import Friends from "./pages/Friends";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Navbar from "./Layout/Navbar";
import PasswordRecovery from "./pages/PasswordRecovery";
import ProtectedRoute from "./context/ProtectedRoute"; // Importa el componente

import "./index.css";

const App = () => {
  return (
    <UserProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 mt-[4rem]">
          <Routes>
            <Route path="/" element={<Landing />} />
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
            {/* Corregido: Asignar rutas únicas a Privacy y Terms */}
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/recovery" element={<PasswordRecovery />} />
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
