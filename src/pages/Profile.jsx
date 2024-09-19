// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export default function Profile() {
  const [user, setUser] = useState(null);
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
          setUser(userData);
          setFormData({
            name: userData.name,
            email: userData.email,
            password: "",
            avatar: userData.avatar || "https://via.placeholder.com/150",
          });
        }
      } catch (error) {
        console.error("Error al cargar los datos del usuario:", error);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveClick = () => {
    console.log("Datos guardados:", formData);
    setUser({
      ...user,
      name: formData.name,
      email: formData.email,
      avatar: formData.avatar,
    });
  };

  const handleDeleteAccount = () => {
    console.log("Cuenta eliminada:", user);
    setUser(null);
  };

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="p-6 min-h-screen text-white bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex items-center space-x-4">
          <img
            src={formData.avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">
              {user.name} {user.lastname}
            </h1>
            <p className="text-gray-400">{user.email}</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">Detalles del Perfil</h2>
          <div className="mt-4">
            <Label htmlFor="avatar">Foto de perfil</Label>
            <Input
              id="avatar"
              name="avatar"
              value={formData.avatar}
              onChange={handleInputChange}
              className="bg-gray-700 text-white p-2 rounded-full"
            />
          </div>
          <div className="mt-4">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="bg-gray-700 text-white p-2 rounded-full"
            />
          </div>
          <div className="mt-4">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="bg-gray-700 text-white p-2 rounded-full"
            />
          </div>
          <div className="mt-4">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              className="bg-gray-700 text-white p-2 rounded-full"
            />
          </div>
          <Button
            onClick={handleSaveClick}
            className="mt-4 bg-green-700 hover:bg-green-800 rounded-full"
          >
            Guardar
          </Button>
          <Button
            onClick={handleDeleteAccount}
            className="mt-4 bg-red-700 hover:bg-red-800 rounded-full"
          >
            Eliminar Cuenta
          </Button>
        </div>
      </div>
    </div>
  );
}
