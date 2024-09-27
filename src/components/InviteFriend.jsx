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
      const friendWithState = { ...newFriend, state: "Pending" }; // Ensure "Pending" state
      onInvite(friendWithState); // Pass the new friend with the state
      setNewFriend({ name: "", email: "" }); // Clear the form
      setIsOpen(false); // Close the dialog
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="bg-white rounded-3xl p-4 shadow-lg backdrop-blur-md backdrop-filter flex justify-center items-center cursor-pointer">
          <h2 className="text-2xl font-semibold text-blue-800 flex items-center">
            <FaUserPlus className="mr-2 text-blue-600" />
            Invitar Amigo
          </h2>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-center">Invitar a un amigo</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="friendName">¿Cómo se llama tu amigo?</Label>
            <Input
              id="friendName"
              name="name"
              value={newFriend.name}
              onChange={handleInputChange}
              className="bg-gray-700 text-white rounded-full"
            />
          </div>
          <div>
            <Label htmlFor="friendEmail">Correo electrónico</Label>
            <Input
              id="friendEmail"
              name="email"
              value={newFriend.email}
              onChange={handleInputChange}
              className="bg-gray-700 text-white rounded-full"
            />
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          className="mt-4 bg-green-700 hover:bg-green-800 w-full rounded-full"
        >
          Añadir amigo
        </Button>
      </DialogContent>
    </Dialog>
  );
}
