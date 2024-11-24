import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Si no hay token, redirige a la página de inicio de sesión
    return <Navigate to="/" replace />;
  }

  // Si hay token, renderiza el componente solicitado
  return element;
};

export default ProtectedRoute;
