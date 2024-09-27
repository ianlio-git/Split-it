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

export default function CreateGroup({ onSubmit, className }) {
  const [newGroup, setNewGroup] = useState({
    name: "",
    type: "",
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGroup((prevGroup) => ({ ...prevGroup, [name]: value }));
  };

  const handleSubmit = () => {
    if (newGroup.name && newGroup.type) {
      onSubmit(newGroup);
      setNewGroup({ name: "", type: "" });
      setIsOpen(false);
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
              name="name"
              value={newGroup.name}
              onChange={handleInputChange}
              className="border border-gray-300 text-black rounded-lg px-3 py-2"
              placeholder="Ingresa el nombre del grupo"
              required
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
              name="type"
              value={newGroup.type}
              onChange={handleInputChange}
              className="border border-gray-300 text-black rounded-lg px-3 py-2"
              placeholder="Ingresa una descripción"
              required
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
