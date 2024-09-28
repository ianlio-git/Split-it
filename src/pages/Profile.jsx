import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const InputField = ({
  id,
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
}) => (
  <div className="mt-6">
    <Label htmlFor={id} className="text-lg font-medium">
      {label}
    </Label>
    <Input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="p-3 rounded-lg border border-gray-300 w-full"
    />
  </div>
);

export default function Profile() {
  const { user, setUser, logout } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    avatar: "",
    currentPassword: "",
    newPassword: "",
  });

  const [currentUserData, setCurrentUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/users.json");
        const data = await response.json();
        if (data.users.length > 0) {
          const userData = data.users[0];
          setCurrentUserData(userData);
          setFormData({
            name: userData.name,
            lastname: userData.lastname,
            email: userData.email,
            avatar: userData.avatar,
            currentPassword: "",
            newPassword: "",
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
    const updatedUser = { ...currentUserData };
    let changes = [];

    if (formData.email || formData.newPassword) {
      if (formData.currentPassword !== "1234") {
        alert("La contraseña actual es incorrecta.");
        return;
      }
    }

    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        updatedUser[key] = formData[key];
        changes.push(
          `${key.charAt(0).toUpperCase() + key.slice(1)}: ${formData[key]}`
        );
      }
    });

    if (changes.length > 0) {
      alert(`Datos guardados! Cambios: ${changes.join(", ")}`);
      setUser(updatedUser);
    } else {
      alert("No se realizaron cambios.");
    }
  };

  const handleDeleteAccount = () => {
    if (formData.currentPassword === "") {
      alert("Introduzca la contraseña actual.");
      return;
    }

    if (formData.currentPassword !== "1234") {
      alert("Contraseña actual incorrecta.");
      return;
    }

    setUser(null);
    logout();
    navigate("/");
  };

  if (!currentUserData) {
    return <div>Cargando datos del usuario...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-6">
      <h1 className="text-3xl font-bold mb-8">Perfil</h1>
      <div className="w-full max-w-3xl p-8 bg-gray-200 rounded-lg shadow-md mb-6">
        <div className="flex items-center mb-4">
          <img
            src={currentUserData.avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
          />
          <div className="ml-6">
            <h1 className="text-2xl font-bold">
              {currentUserData.name} {currentUserData.lastname}
            </h1>
            <p className="text-gray-700">{currentUserData.email}</p>
            <p className="text-gray-600">{currentUserData.phone}</p>
            <p className="text-gray-600">{currentUserData.address}</p>
          </div>
        </div>
      </div>
      <div className="w-full max-w-3xl p-8 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Detalles del Perfil</h2>
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

        <div className="mt-6 flex flex-col space-y-4">
          <Button
            onClick={handleSaveClick}
            className="bg-gray-600 hover:bg-gray-800 text-lg font-medium rounded-md text-white px-4 py-2" // Ajuste de tamaño
          >
            Guardar
          </Button>
          <Button
            onClick={handleDeleteAccount}
            className="bg-red-600 hover:bg-red-700 text-lg font-medium rounded-md text-white px-4 py-2" // Ajuste de tamaño
          >
            Eliminar Cuenta
          </Button>
        </div>
      </div>
    </div>
  );
}
