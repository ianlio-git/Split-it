import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
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
  <div className="mt-4">
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

export default function PasswordRecovery() {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePasswordRecovery = async () => {
    const { newPassword, confirmPassword } = formData;

    if (!newPassword || !confirmPassword) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    setIsLoading(true);

    try {
      // Obtén el token directamente de la URL sin procesarlo manualmente
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      console.log(token);
      console.log(newPassword);
      if (!token) {
        throw new Error("Token no encontrado en la URL.");
      }

      const response = await fetch(
        "http://localhost:4000/api/users/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify({ newPassword }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar la contraseña.");
      }

      const data = await response.json();
      alert("¡Contraseña actualizada con éxito!");
      navigate("/groups");
    } catch (error) {
      console.error("Error en la actualización:", error);
      alert("Hubo un problema al actualizar la contraseña.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-6">
      <h1 className="text-3xl font-bold mb-6">Recuperar Contraseña</h1>
      <div className="w-full max-w-md p-8 bg-gray-100 rounded-lg shadow-md">
        <InputField
          id="newPassword"
          label="Nueva Contraseña"
          name="newPassword"
          type="password"
          value={formData.newPassword}
          onChange={handleInputChange}
          placeholder="Ingrese su nueva contraseña"
        />
        <InputField
          id="confirmPassword"
          label="Confirmar Contraseña"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirme su nueva contraseña"
        />
        <Button
          onClick={handlePasswordRecovery}
          disabled={isLoading}
          className={`bg-blue-600 hover:bg-blue-800 text-lg font-medium rounded-md text-white px-4 py-2 mt-6 w-full ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Guardando..." : "Guardar Nueva Contraseña"}
        </Button>
      </div>
    </div>
  );
}
