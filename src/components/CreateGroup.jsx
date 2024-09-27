// CreateGroup.js
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
  // Cambiado a onCreateGroup
  const [isOpen, setIsOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupType, setGroupType] = useState("");

  const handleSubmit = () => {
    if (groupName.trim() && groupType.trim()) {
      // Validación mejorada
      const newGroup = {
        id: Date.now(), // Genera un ID único
        name: groupName.trim(),
        description: groupType.trim(),
        members: [], // Inicialmente vacío
      };
      onCreateGroup(newGroup); // Llama a la función del padre para añadir el grupo
      setGroupName("");
      setGroupType("");
      setIsOpen(false); // Cierra el diálogo
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
          Crear Grupo
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white text-black sm:max-w-[425px] rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            Crear un grupo
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="groupName" className="text-sm font-medium">
              Nombre del grupo
            </Label>
            <Input
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="border border-gray-300 text-black rounded-lg px-3 py-2"
              placeholder="Ingresa el nombre del grupo"
            />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <Label htmlFor="groupType" className="text-sm font-medium">
              Descripción
            </Label>
            <Input
              id="groupType"
              value={groupType}
              onChange={(e) => setGroupType(e.target.value)}
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
