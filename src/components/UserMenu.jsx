import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "../context/UserContext";
import { User, CreditCard, Users, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

function UserMenu() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center space-x-2 text-white font-bold py-2 px-4 transition-all duration-300 transform hover:scale-105">
        <User className="w-5 h-5" />
        <span className="text-sm md:text-lg">{user?.name || "Usuario"}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-blue-900 bg-opacity-40 backdrop-blur-md text-white border border-blue-400 border-opacity-50 rounded-xl shadow-xl">
        <DropdownMenuLabel className="text-white font-bold">
          Mi cuenta
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-blue-400 bg-opacity-50" />
        <DropdownMenuItem className="focus:bg-blue-800 focus:bg-opacity-70 rounded-lg transition-colors duration-200 flex items-center space-x-2">
          <User className="w-4 h-4" />
          <span>Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-blue-800 focus:bg-opacity-70 rounded-lg transition-colors duration-200 flex items-center space-x-2">
          <CreditCard className="w-4 h-4" />
          <span>Grupos</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-blue-800 focus:bg-opacity-70 rounded-lg transition-colors duration-200 flex items-center space-x-2">
          <Users className="w-4 h-4" />
          <span>Amigos</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-blue-400 bg-opacity-50" />
        <DropdownMenuItem
          className="focus:bg-red-600 focus:bg-opacity-70 rounded-lg transition-colors duration-200 flex items-center space-x-2 text-white"
          onSelect={handleLogout} // Usa handleLogout para manejar el logout
        >
          <LogOut className="w-4 h-4" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserMenu;
