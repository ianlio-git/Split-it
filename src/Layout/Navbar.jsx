import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Login from "../components/Login";
import Register from "../components/Register";
import UserMenu from "./UserMenu";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOutIcon } from "lucide-react";

function Navbar() {
  const { user, logout } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const isLanding = location.pathname === "/";

  // Si estás en la página "landing"
  if (isLanding) {
    return (
      <header className="fixed top-0 left-0 w-full bg-blue-900 text-white shadow-md z-50 h-16 bg-opacity-90 backdrop-blur-md backdrop-filter">
        <nav className="container mx-auto px-6 h-full flex justify-between items-center">
          <div className="text-2xl md:text-3xl font-bold text-white cursor-pointer">
            Split-it!
          </div>
          <div className="space-x-2 md:space-x-4 flex items-center">
            {user ? (
              <>
                <Button className="relative flex items-center space-x-2 bg-transparent hover:bg-transparent">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={
                        user.avatarUrl || "/placeholder.svg?height=40&width=40"
                      }
                      alt={user.name}
                    />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xl font-medium text-white hidden sm:inline">
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
