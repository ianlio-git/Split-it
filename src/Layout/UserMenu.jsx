import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlignJustify,
  UserIcon,
  UsersIcon,
  HeartIcon,
  LogOutIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import FooterLayout from "./Footer";
import MenuItemButton from "../components/MenuItemButton";
import { Button } from "@/components/ui/button";

export default function UserMenu() {
  const navigate = useNavigate();
  const { user, logout } = useUser(); // Use the useUser hook to get user and logout

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  useEffect(() => {
    // Cargar datos del usuario desde el archivo JSON
    const fetchUser = async () => {
      try {
        const response = await fetch("/users.json");
        const data = await response.json();
        if (data.users.length > 0) {
          const userData = data.users[0];
          setFormData({
            name: userData.name,
            email: userData.email,
            password: "",
            avatar: userData.avatar,
          });
        }
      } catch (error) {
        console.error("Error al cargar los datos del usuario:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    { label: "Perfil", icon: UserIcon, onClick: () => navigate("/profile") },
    { label: "Grupos", icon: UsersIcon, onClick: () => navigate("/groups") },
    { label: "Amigos", icon: HeartIcon, onClick: () => navigate("/friends") },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative flex items-center space-xl-2 bg-transparent hover:bg-transparent">
          <AlignJustify />
        </button>
      </SheetTrigger>
      <SheetContent className="w-[300px] sm:w-[400px] mt-16 max-h-[calc(100vh-4rem)] overflow-auto bg-gray-900 text-white border-l border-blue-600">
        <SheetHeader className="text-center">
          <Avatar className="w-24 h-24 rounded-full">
            <AvatarImage
              src={formData.avatar || "/placeholder.svg?height=96&width=96"}
              alt={formData.name}
              className="w-full h-full object-cover rounded-full"
            />
            <AvatarFallback className="text-3xl">
              {formData.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <SheetTitle className="text-2xl font-bold text-white">
            Mi Cuenta
          </SheetTitle>
          <p className="text-lg text-gray-300">{formData.name}</p>
        </SheetHeader>

        <div className="border-b border-gray-700 my-6"></div>
        <div className="space-y-4">
          {menuItems.map((item, index) => (
            <MenuItemButton
              key={index}
              icon={item.icon}
              label={item.label}
              onClick={item.onClick}
            />
          ))}
        </div>
        <div className="border-b border-gray-700 my-6"></div>

        <Button
          variant="destructive"
          onClick={handleLogout}
          className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <LogOutIcon className="w-5 h-5" />
          <span>Cerrar Sesión</span>
        </Button>
        <SheetFooter className="mt-8">
          <FooterLayout />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
