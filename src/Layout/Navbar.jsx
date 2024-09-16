import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

function Navbar() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="text-xl font-semibold text-gray-700">Split-it</div>
          <div className="space-x-4">
            {user ? (
              <>
                <span className="text-gray-700">Hola, {user.name}</span>
                <button onClick={handleLogout} className="text-red-500">
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Login onLogin={handleLogin} />
                <Register />
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
