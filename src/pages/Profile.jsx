import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useUser } from "../context/UserContext"; // Importa el contexto
import { useNavigate } from "react-router-dom"; // Importa useNavigate

const InputField = ({
  id,
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
}) => (
  <div className="mt-4">
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      name={name}
      type={type}
      value={value} // Mantener el valor actualizado
      onChange={onChange}
      placeholder={placeholder}
      className="bg-gray-700 text-white p-2 rounded-full"
    />
  </div>
);

export default function Profile() {
  const { user, setUser, logout } = useUser(); // Asegúrate de obtener setUser
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    avatar: "",
    currentPassword: "",
    newPassword: "",
  });

  const navigate = useNavigate(); // Inicializa el hook de navegación

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/users.json");
        const data = await response.json();
        if (data.users.length > 0) {
          const userData = data.users[0];
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
    const updatedUser = {};
    for (const key in formData) {
      if (formData[key] && formData[key] !== user[key]) {
        updatedUser[key] = formData[key];
      }
    }

    console.log("Datos guardados:", updatedUser);
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedUser,
    }));
  };

  const handleDeleteAccount = () => {
    if (formData.currentPassword === "") {
      alert("Por favor, introduzca la contraseña actual.");
      return;
    }

    if (formData.currentPassword !== "1234") {
      alert("La contraseña actual es incorrecta.");
      return;
    }

    console.log("Cuenta eliminada:", user);
    setUser(null); // Limpia el usuario
    logout(); // Llama a la función logout
    navigate("/"); // Redirige a la landing page
  };

  if (!user) {
    return <div>Eliminando cuenta</div>;
  }

  return (
    <div className="p-6 min-h-screen text-white bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex items-center space-x-4">
          <img
            src={user.avatar}
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
          <InputField
            id="avatar"
            label="Foto de perfil"
            name="avatar"
            type="text"
            value={formData.avatar}
            onChange={handleInputChange}
            placeholder="Ingrese la URL de su foto de perfil"
          />
          <InputField
            id="name"
            label="Nombre"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Ingrese su nombre"
          />
          <InputField
            id="lastname"
            label="Apellido"
            name="lastname"
            type="text"
            value={formData.lastname}
            onChange={handleInputChange}
            placeholder="Ingrese su apellido"
          />
          <InputField
            id="email"
            label="Correo Electrónico"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Ingrese su correo electrónico"
          />
          <InputField
            id="currentPassword"
            label="Contraseña actual"
            name="currentPassword"
            type="password"
            value={formData.currentPassword}
            onChange={handleInputChange}
            placeholder="Ingrese su contraseña actual"
          />
          <InputField
            id="newPassword"
            label="Nueva Contraseña"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleInputChange}
            placeholder="Ingrese su nueva contraseña"
          />

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
