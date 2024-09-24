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

  const [currentUserData, setCurrentUserData] = useState(null); // Para almacenar los datos actuales del usuario

  const navigate = useNavigate(); // Inicializa el hook de navegación

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/users.json");
        const data = await response.json();
        if (data.users.length > 0) {
          const userData = data.users[0];
          setCurrentUserData(userData); // Almacena los datos actuales del usuario
          // También actualizar el estado del formulario con los datos actuales
          setFormData({
            name: "",
            lastname: "",
            email: "",
            avatar: "",
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
    // Preparamos el objeto de datos a actualizar
    const updatedUser = { ...currentUserData }; // Comenzamos con los datos actuales
    let changes = []; // Array para almacenar los cambios realizados

    // Solo se pide la contraseña si se intenta cambiar el email o la contraseña
    if (formData.email || formData.newPassword) {
      if (formData.currentPassword !== "1234") {
        alert(
          "La contraseña actual es incorrecta. No se pueden realizar cambios en el correo electrónico o la contraseña."
        );
        return; // Salir del método si la contraseña no es correcta
      }
    }

    // Actualizamos solo si los campos del formulario tienen datos
    if (formData.name) {
      updatedUser.name = formData.name;
      changes.push(`Nombre: ${formData.name}`);
    }
    if (formData.lastname) {
      updatedUser.lastname = formData.lastname;
      changes.push(`Apellido: ${formData.lastname}`);
    }
    if (formData.email) {
      updatedUser.email = formData.email;
      changes.push(`Correo Electrónico: ${formData.email}`);
    }
    if (formData.avatar) {
      updatedUser.avatar = formData.avatar;
      changes.push(`Foto de perfil: ${formData.avatar}`);
    }
    if (formData.newPassword) {
      updatedUser.password = formData.newPassword; // Asegúrate de manejar la contraseña nueva adecuadamente
      changes.push(`Nueva Contraseña establecida`); // Mensaje genérico
    }

    // Si se realizaron cambios, actualizamos el usuario en el contexto
    if (changes.length > 0) {
      alert(
        `Datos guardados! Se han realizado los siguientes cambios: ${changes.join(
          ", "
        )}`
      );
      setUser(updatedUser); // Actualiza el usuario en el contexto
    } else {
      alert("No se realizaron cambios.");
    }
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

    console.log("Cuenta eliminada:", currentUserData);
    setUser(null); // Limpia el usuario
    logout(); // Llama a la función logout
    navigate("/"); // Redirige a la landing page
  };

  if (!currentUserData) {
    return <div>Cargando datos del usuario...</div>; // Mostrar un mensaje de carga
  }

  return (
    <div className="p-6 min-h-screen text-white bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex items-center space-x-4">
          <img
            src={currentUserData.avatar} // Mostrar el avatar actual
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">
              {currentUserData.name} {currentUserData.lastname}{" "}
              {/* Mostrar nombre y apellido actuales */}
            </h1>
            <p className="text-gray-400">{currentUserData.email}</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">Detalles del Perfil</h2>
          <InputField
            id="avatar"
            label="Foto de perfil"
            name="avatar"
            type="text"
            value={formData.avatar} // Mantener el campo vacío
            onChange={handleInputChange}
            placeholder="Ingrese la URL de su foto de perfil"
          />
          <InputField
            id="name"
            label="Nombre"
            name="name"
            type="text"
            value={formData.name} // Mantener el campo vacío
            onChange={handleInputChange}
            placeholder="Ingrese su nombre"
          />
          <InputField
            id="lastname"
            label="Apellido"
            name="lastname"
            type="text"
            value={formData.lastname} // Mantener el campo vacío
            onChange={handleInputChange}
            placeholder="Ingrese su apellido"
          />
          <InputField
            id="email"
            label="Correo Electrónico"
            name="email"
            type="email"
            value={formData.email} // Mantener el campo vacío
            onChange={handleInputChange}
            placeholder="Ingrese su correo electrónico"
          />
          <InputField
            id="currentPassword"
            label="Contraseña actual"
            name="currentPassword"
            type="password"
            value={formData.currentPassword} // Mantener el campo vacío
            onChange={handleInputChange}
            placeholder="Ingrese su contraseña actual"
          />
          <InputField
            id="newPassword"
            label="Nueva Contraseña"
            name="newPassword"
            type="password"
            value={formData.newPassword} // Mantener el campo vacío
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
