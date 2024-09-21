import { Navigate } from "react-router-dom";
import { useUser } from "./UserContext"; // Ajusta la ruta según tu estructura

const ProtectedRoute = ({ element }) => {
  const { user } = useUser(); // Obtiene el contexto de usuario

  return user ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
