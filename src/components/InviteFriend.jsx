import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { FaUserPlus } from "react-icons/fa";

export default function InviteFriend({ onInvite }) {
  const [newFriend, setNewFriend] = useState({
    name: "",
    email: "",
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFriend((prevFriend) => ({ ...prevFriend, [name]: value }));
  };

  const handleSubmit = () => {
    if (newFriend.name && newFriend.email) {
      const friendWithState = { ...newFriend, state: "Pending" }; // Asegurar el estado "Pending"
      onInvite(friendWithState); // Pasar el nuevo amigo con el estado
      setNewFriend({ name: "", email: "" }); // Limpiar el formulario
      setIsOpen(false); // Cerrar el diálogo
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="bg-white rounded-lg p-4 shadow-lg flex justify-center items-center cursor-pointer">
          <h2 className="text-2xl font-semibold text-black flex items-center">
            <FaUserPlus className="mr-2 text-black" />
            Invitar Amigo
          </h2>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-white text-black sm:max-w-[425px] rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            Invitar a un amigo
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="friendName" className="text-sm font-medium">
              ¿Cómo se llama tu amigo?
            </Label>
            <Input
              id="friendName"
              name="name"
              value={newFriend.name}
              onChange={handleInputChange}
              className="border border-gray-300 text-black rounded-lg px-3 py-2"
              placeholder="Ingresa el nombre de tu amigo"
              required
            />
          </div>
          <div>
            <Label htmlFor="friendEmail" className="text-sm font-medium">
              Correo electrónico
            </Label>
            <Input
              id="friendEmail"
              name="email"
              value={newFriend.email}
              onChange={handleInputChange}
              className="border border-gray-300 text-black rounded-lg px-3 py-2"
              placeholder="Ingresa el correo electrónico"
              required
            />
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          className="mt-4 bg-black text-white w-full py-2 rounded-lg"
        >
          Añadir amigo
        </Button>
      </DialogContent>
    </Dialog>
  );
}
