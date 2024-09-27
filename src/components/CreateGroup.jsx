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
          className={`flex items-center ${className}`}
        >
          <FaPlus className="mr-1" />
          Crear Grupo
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-center">Crear un grupo</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="groupName">Nombre del grupo</Label>
            <Input
              id="groupName"
              name="name"
              value={newGroup.name}
              onChange={handleInputChange}
              className="bg-gray-700 text-white rounded-full"
            />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <Label htmlFor="groupType">Descripción</Label>
            <Input
              id="groupType"
              name="type"
              value={newGroup.type}
              onChange={handleInputChange}
              className="bg-gray-700 text-white rounded-full"
            />
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          className="mt-4 bg-green-700 hover:bg-green-800 w-full rounded-full"
        >
          Listo
        </Button>
      </DialogContent>
    </Dialog>
  );
}
