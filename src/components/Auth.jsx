import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InputField from "../components/InputField";

function Auth() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [forgotPasswordDialogOpen, setForgotPasswordDialogOpen] =
    useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const resetInputs = () => {
    setEmail("");
    setPassword("");
    setPassword2("");
    setName("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al iniciar sesión");
      }

      const data = await response.json();
      console.log("Login successful:", data);
      localStorage.setItem("token", data.token);
      setIsLogin(true);
      setDialogOpen(false);
      navigate("/groups");
      window.location.reload();
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError(error.message || "Error al iniciar sesión");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, password2 }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
      resetInputs();
      alert("Usuario registrado correctamente, ¡Bienvenido a Split-it!");
      setDialogOpen(false);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    console.log("Recuperar contraseña para el email:", email);
    setForgotPasswordDialogOpen(false);
  };

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger
          className="text-white hover:text-blue-200 transition-all duration-300 transform hover:scale-105 text-sm md:text-lg"
          onClick={() => {
            setIsLogin(true);
            setDialogOpen(true);
          }}
        >
          Iniciar Sesión
        </DialogTrigger>
        <DialogTrigger
          className="text-white hover:text-blue-200 transition-all duration-300 transform hover:scale-105 text-sm md:text-lg"
          onClick={() => {
            setIsLogin(false);
            setDialogOpen(true);
          }}
        >
          Registrate
        </DialogTrigger>
        <DialogContent className="p-0 overflow-hidden bg-transparent rounded-3xl shadow-2xl max-w-md w-full mx-auto backdrop-blur-md backdrop-filter border-0">
          <DialogHeader className="p-8 bg-gray-900 bg-opacity-40">
            <DialogTitle className="text-3xl font-bold text-center text-white mb-6">
              {isLogin ? "¡Bienvenido!" : "Crea tu cuenta"}
            </DialogTitle>
            <DialogDescription>
              <form
                className="space-y-6"
                onSubmit={isLogin ? handleLogin : handleRegister}
              >
                {!isLogin && (
                  <InputField
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre completo"
                  />
                )}
                <InputField
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Correo electrónico"
                />
                <InputField
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                />
                {!isLogin && (
                  <InputField
                    type="password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    placeholder="Confirmar contraseña"
                  />
                )}
                {error && (
                  <p className="text-red-400 text-center text-sm">{error}</p>
                )}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {isLogin ? "Iniciar Sesión" : "Registrarse"}
                </button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-blue-200">
                  {isLogin
                    ? "¿Todavía no te registraste?"
                    : "¿Ya tienes una cuenta?"}{" "}
                  <span
                    className="text-blue-300 hover:text-blue-100 transition-colors duration-200 cursor-pointer"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? "Registrate" : "Iniciar Sesión"}
                  </span>
                </p>
                {isLogin && (
                  <p
                    className="text-blue-300 mt-2 cursor-pointer"
                    onClick={() => setForgotPasswordDialogOpen(true)}
                  >
                    ¿Olvidaste tu contraseña?
                  </p>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog
        open={forgotPasswordDialogOpen}
        onOpenChange={setForgotPasswordDialogOpen}
      >
        <DialogContent className="p-0 overflow-hidden bg-transparent rounded-3xl shadow-2xl max-w-md w-full mx-auto backdrop-blur-md backdrop-filter border-0">
          <DialogHeader className="p-8 bg-gray-900 bg-opacity-40">
            <DialogTitle className="text-3xl font-bold text-center text-white mb-6">
              Recuperar Contraseña
            </DialogTitle>
            <DialogDescription>
              <form className="space-y-6" onSubmit={handleForgotPassword}>
                <InputField
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Introduce tu correo electrónico"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Enviar
                </button>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Auth;
