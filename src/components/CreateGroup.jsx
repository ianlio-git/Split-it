// eslint-disable-next-line no-unused-vars
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

// eslint-disable-next-line react/prop-types
export default function CreateGroup({ onSubmit }) {
  const [newGroup, setNewGroup] = useState({
    name: "",
    type: "Viaje",
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e) => {
    setNewGroup({ ...newGroup, name: e.target.value });
  };

  const handleTypeChange = (type) => {
    setNewGroup({ ...newGroup, type });
  };

  const handleSubmit = () => {
    if (newGroup.name) {
      onSubmit(newGroup);
      setNewGroup({ name: "", type: "Viaje" });
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mt-6 mx-auto bg-green-700 hover:bg-green-800 block rounded-full">
          Crear un nuevo grupo
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
              value={newGroup.name}
              onChange={handleInputChange}
              className="bg-gray-700 text-white rounded-full"
            />
          </div>
          <div>
            <Label>Tipo</Label>
            <div className="flex space-x-2 mt-2">
              {["Viaje", "Hogar", "Pareja", "Otro"].map((type) => (
                <Button
                  key={type}
                  onClick={() => handleTypeChange(type)}
                  variant={newGroup.type === type ? "default" : "outline"}
                  className={
                    newGroup.type === type
                      ? "bg-blue-500 rounded-full"
                      : "bg-gray-700 rounded-full"
                  }
                >
                  {type}
                </Button>
              ))}
            </div>
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
