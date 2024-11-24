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
    photo: "",
    currentPassword: "",
    newPassword: "",
  });

  const [currentUserData, setCurrentUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No hay token en el localStorage.");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:4000/api/users/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setCurrentUserData(data);
          setFormData({
            name: data.name,
            lastname: data.lastname,
            email: data.email,
            photo: data.photo, // Use 'photo' instead of 'avatar'
            currentPassword: "",
            newPassword: "",
          });
        } else {
          console.error("Error al obtener los datos:", response.statusText);
        }
      } catch (error) {
        console.error("Error al conectar con el backend:", error);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveClick = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No se encontró un token válido.");
      return;
    }

    try {
      const body = {
        name: formData.name,
        lastname: formData.lastname,
        email: formData.email,
        password: formData.newPassword || undefined, // Solo enviar si hay una nueva contraseña
        photo: formData.photo, // Use 'photo' instead of 'avatar'
      };

      const response = await fetch("http://localhost:4000/api/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(body),
      });

      console.log("Enviando datos al backend:", body);
      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        alert("Datos guardados exitosamente.");
        if (formData.newPassword) {
          localStorage.removeItem("token");
          navigate("/Main");
          window.location.reload();
        } else {
          window.location.reload();
        }
      } else {
        const errorData = await response.json();
        alert(`Error al guardar datos: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error al guardar los datos:", error);
      alert("Ocurrió un error inesperado.");
    }
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No se encontró un token válido.");
      return;
    }

    if (!formData.currentPassword) {
      alert("Introduzca la contraseña actual.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/users/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ password: formData.currentPassword }),
      });

      if (response.ok) {
        setUser(null);
        logout();
        navigate("/");
      } else {
        const errorData = await response.json();
        alert(`Error al eliminar la cuenta: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error al eliminar la cuenta:", error);
      alert("Ocurrió un error inesperado.");
    }
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
            src={currentUserData.photo} // Use 'photo' instead of 'avatar'
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
          id="photo"
          label="Foto de perfil"
          name="photo"
          type="text"
          value={formData.photo}
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
            className="bg-gray-600 hover:bg-gray-800 text-lg font-medium rounded-md text-white px-4 py-2"
          >
            Guardar
          </Button>
          <Button
            onClick={handleDeleteAccount}
            className="bg-red-600 hover:bg-red-700 text-lg font-medium rounded-md text-white px-4 py-2"
          >
            Eliminar Cuenta
          </Button>
        </div>
      </div>
    </div>
  );
}
