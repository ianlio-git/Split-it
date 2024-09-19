// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

  const { login } = useUser();

  // Carga los datos desde el archivo JSON ubicado en public
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/users.json");
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Error al cargar el archivo JSON:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      login({ name: user.name });
    } else {
      setError("El correo electrónico o la contraseña son incorrectos.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="text-white hover:text-blue-200 transition-all duration-300 transform hover:scale-105 text-sm md:text-lg  ">
        Iniciar Sesión
      </DialogTrigger>
      <DialogContent className="p-0 overflow-hidden bg-transparent rounded-3xl shadow-2xl max-w-md w-full mx-auto backdrop-blur-md backdrop-filter border-0">
        <DialogHeader className="p-8 bg-gray-900 bg-opacity-40">
          <DialogTitle className="text-3xl font-bold text-center text-white mb-6">
            ¡Bienvenido!
          </DialogTitle>
          <DialogDescription>
            <form className="space-y-6" onSubmit={handleLogin}>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-3 text-white bg-blue-900 bg-opacity-30 border border-blue-400 border-opacity-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-blue-200 pr-10"
                  placeholder="Correo electrónico"
                  required
                />
                <svg
                  className="w-5 h-5 text-blue-300 absolute right-3 top-3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-3 text-white bg-blue-900 bg-opacity-30 border border-blue-400 border-opacity-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-blue-200 pr-10"
                  placeholder="Contraseña"
                  required
                />
                <svg
                  className="w-5 h-5 text-blue-300 absolute right-3 top-3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              {error && (
                <p className="text-red-400 text-center text-sm">{error}</p>
              )}
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-300 rounded bg-blue-900 bg-opacity-30"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="ml-2 block text-blue-200"
                  >
                    Recuérdame
                  </label>
                </div>
                <a
                  href="#"
                  className="text-blue-300 hover:text-blue-200 transition-colors duration-200"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Iniciar Sesión
              </button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default Login;
