import React from "react";
import { useLocation } from "react-router-dom"; // Para detectar la ruta actual
import { useUser } from "../context/UserContext";
import Login from "../components/Login";
import Register from "../components/Register";
import UserMenu from "../components/UserMenu"; // Asegúrate de importar el componente

function Navbar() {
  const { user, logout } = useUser();
  const location = useLocation();

  const isMainPage = location.pathname === "/main";

  // Si estás en la página "Main"
  if (isMainPage) {
    return (
      <header className="fixed top-0 left-0 w-full bg-blue-900 text-white shadow-md z-50 h-16">
        <nav className="container mx-auto px-6 h-full flex justify-between items-center">
          <div className="text-2xl md:text-3xl font-bold text-white">
            Split-it!
          </div>
          {user && (
            <div className="space-x-2 md:space-x-4 flex items-center">
              <UserMenu />
            </div>
          )}
        </nav>
      </header>
    );
  }

  // Si no estás en la página "Main"
  return (
    <header className="fixed top-0 left-0 w-full bg-blue-900 text-white shadow-md z-50 h-16">
      <nav className="container mx-auto px-6 h-full flex justify-between items-center">
        <div className="text-2xl md:text-3xl font-bold text-white">
          Split-it!
        </div>
        <div className="space-x-2 md:space-x-4 flex items-center">
          {user ? (
            <>
              <span className="text-sm md:text-xl font-bold text-white">
                Hola, {user.name}
              </span>

              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105 text-sm md:text-l"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Login />
              <Register />
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
