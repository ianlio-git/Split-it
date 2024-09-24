// eslint-disable-next-line no-unused-vars
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
      onInvite(newFriend);
      setNewFriend({ name: "", email: "" });
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mt-6 mx-auto bg-green-700 hover:bg-green-800 block rounded-full">
          Invitar a un amigo
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-center">Invitar a un amigo</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="friendName">Nombre del amigo</Label>
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
