import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { FaPlus } from "react-icons/fa";

export default function CreateGroup({ className, onCreateGroup }) {
  // Estado para el diálogo
  const [isOpen, setIsOpen] = useState(false);
  // Estados para el nombre y descripción del grupo
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  const handleSubmit = async () => {
    if (groupName.trim() && groupDescription.trim()) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No hay token en el localStorage.");
          return;
        }

        // Hacer la solicitud POST a la API para crear el proyecto
        const response = await fetch(
          "http://localhost:4000/api/projects/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token, // Usamos el token desde el localStorage
            },
            body: JSON.stringify({
              name: groupName.trim(),
              description: groupDescription.trim(),
            }),
          }
        );

        // Verificar si la solicitud fue exitosa
        if (!response.ok) {
          throw new Error("No se pudo crear el proyecto");
        }

        const data = await response.json();

        // Llamar a la función para añadir el proyecto al estado del componente principal
        onCreateGroup(data); // Este callback debería actualizar el estado de los grupos

        // Limpiar los campos y cerrar el diálogo
        setGroupName("");
        setGroupDescription("");
        setIsOpen(false);
      } catch (error) {
        console.error("Error al crear el proyecto:", error);
        alert("Hubo un error al crear el proyecto");
      }
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className={`flex items-center px-2 py-1 text-black border-black border ${className}`}
        >
          <FaPlus className="mr-1 h-3 w-3" />
          Crear Proyecto
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white text-black sm:max-w-[425px] rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            Crear un proyecto
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="groupName" className="text-sm font-medium">
              Nombre del proyecto
            </Label>
            <Input
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="border border-gray-300 text-black rounded-lg px-3 py-2"
              placeholder="Ingresa el nombre del proyecto"
            />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <Label htmlFor="groupDescription" className="text-sm font-medium">
              Descripción
            </Label>
            <Input
              id="groupDescription"
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              className="border border-gray-300 text-black rounded-lg px-3 py-2"
              placeholder="Ingresa una descripción"
            />
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          className="mt-4 bg-black text-white w-full py-2 rounded-lg"
        >
          Listo
        </Button>
      </DialogContent>
    </Dialog>
  );
}
