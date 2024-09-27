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
  const [image, setImage] = useState(null); // Estado para la imagen
  const [percentage, setPercentage] = useState(""); // Estado para el porcentaje
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGasto = {
      description,
      payment,
      date,
      image, // Incluir la imagen en el objeto
      percentage: parseFloat(percentage), // Incluir el porcentaje
    };
    onAddGasto(newGasto);
    setDescription("");
    setPayment("");
    setDate("");
    setImage(null); // Reiniciar el estado de la imagen
    setPercentage(""); // Reiniciar el estado del porcentaje
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="px-2 py-1">
          <FaPlus className="mr-1 h-3 w-3" />
          Añada un gasto
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
          <div className="space-y-2">
            <label htmlFor="image" className="text-sm font-medium">
              Cargar Imagen
            </label>
            <Input
              id="image"
              type="file"
              accept="image/*" // Solo aceptar imágenes
              onChange={(e) => setImage(e.target.files[0])} // Guardar la imagen seleccionada
              className="cursor-pointer transition duration-200 ease-in-out hover:outline hover:outline-2 focus:outline-none focus:ring-2 focus:ring-gray-300" // Estilos para el hover y focus
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="percentage" className="text-sm font-medium">
              Dividir en Porcentajes
            </label>
            <Input
              id="percentage"
              type="number"
              placeholder="Introduce el porcentaje"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              min="0"
              max="100"
              step="0.01"
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
