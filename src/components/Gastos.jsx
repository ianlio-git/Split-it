import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaPlus } from "react-icons/fa";

const Gastos = ({ onAddGasto }) => {
  const [description, setDescription] = useState("");
  const [payment, setPayment] = useState("");
  const [date, setDate] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGasto = {
      description,
      payment,
      date,
    };
    onAddGasto(newGasto);
    setDescription("");
    setPayment("");
    setDate("");
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="px-2 py-1">
          <FaPlus className="mr-1 h-3 w-3" />
          Añadir Gasto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Añadir Gasto</DialogTitle>
          <DialogDescription>
            Ingresa los detalles del nuevo gasto aquí.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Descripción
            </label>
            <Input
              id="description"
              type="text"
              placeholder="Descripción del gasto"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="payment" className="text-sm font-medium">
              Pago
            </label>
            <Input
              id="payment"
              type="number"
              placeholder="Monto del pago"
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="date" className="text-sm font-medium">
              Fecha
            </label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Añadir Gasto
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Gastos;
