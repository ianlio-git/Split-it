import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import UserMenu from "./UserMenu";
import Auth from "../components/Auth";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOutIcon } from "lucide-react";
import Profile from "../pages/Profile";

function Navbar() {
  const { user, setUser, logout } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState("");
  const goToProfile = () => {
    navigate("/profile");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(
          "http://localhost:4000/api/users/profile",
          {
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        );
        const data = await response.json();
        if (data) {
          setAvatar(data.photo);
          setUser({ name: data.name, email: data.email }); // Actualiza el estado del usuario en el contexto
        }
      } catch (error) {
        console.error("Error al cargar los datos del usuario:", error);
      }
    };

    fetchUserData();
  }, [setUser]);

  const isLanding =
    location.pathname === "/" ||
    location.pathname === "/privacy" ||
    location.pathname === "/terms";

  // Si estás en la página "landing"
  if (isLanding) {
    return (
      <header className="fixed top-0 left-0 w-full bg-blue-900 text-white shadow-md z-50 h-16 bg-opacity-90 backdrop-blur-md backdrop-filter">
        <nav className="container mx-auto px-6 h-full flex justify-between items-center">
          <div
            onClick={() => navigate("/")}
            className="text-2xl md:text-3xl font-bold text-white cursor-pointer"
          >
            Split-it!
          </div>
          <div className="space-x-2 md:space-x-4 flex items-center">
            {user ? (
              <>
                <Button className="relative flex items-center space-x-2 bg-transparent hover:bg-transparent">
                  <Avatar className="h-10 w-10" onClick={goToProfile}>
                    <AvatarImage
                      src={avatar || "/placeholder.svg?height=40&width=40"}
                      alt={user.name}
                      className="object-cover"
                    />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className="text-xl font-medium text-white hidden sm:inline"
                    onClick={goToProfile}
                  >
                    {user.name}
                  </span>
                  <span className="sr-only">Abrir menú de usuario</span>
                </Button>

                <Button
                  variant="destructive"
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105 text-sm md:text-l"
                >
                  <LogOutIcon className="w-5 h-5" />
                  <span>Cerrar Sesión</span>
                </Button>
              </>
            ) : (
              <Auth />
            )}
          </div>
        </nav>
      </header>
    );
  }

  // Si no estás en la página "landing"
  return (
    <header className="fixed top-0 left-0 w-full bg-blue-900 text-white shadow-md z-50 h-16 bg-opacity-90 backdrop-blur-md backdrop-filter">
      <nav className="container mx-auto px-6 h-full flex justify-between items-center">
        <div
          className="text-2xl md:text-3xl font-bold text-white cursor-pointer"
          onClick={() => navigate("/")}
        >
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

export default Navbar;
