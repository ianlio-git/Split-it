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
import PropTypes from "prop-types";

export default function CreateTicket({ className, onCreateGasto, projectId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [distribution, setDistribution] = useState("");
  const [image, setImage] = useState("");
  const handleSubmit = async () => {
    if (
      description.trim() &&
      amount.trim() &&
      date.trim() &&
      distribution.trim()
    ) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No hay token en el localStorage.");
          return;
        }

        const ticketData = {
          projectId,
          description,
          date,
          image, // Mantener como string vacío si no se usa
          amount: parseFloat(amount),
          distribution,
        };

        // Realizar la solicitud POST
        const response = await fetch(
          "http://localhost:4000/api/tickets/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
            body: JSON.stringify(ticketData),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "No se pudo crear el ticket");
        }

        const data = await response.json();

        // Callback para actualizar el estado del componente principal
        onCreateGasto(data);

        // Limpiar campos y cerrar el diálogo
        setDescription("");
        setAmount("");
        setDate("");
        setDistribution("");
        setImage("");
        setIsOpen(false);
        window.location.reload();
      } catch (error) {
        console.error("Error al crear el ticket:", error);
        alert("Hubo un error al crear el ticket: " + error.message);
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
          Añadir Ticket
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white text-black sm:max-w-[425px] rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            Crear un Ticket
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="description" className="text-sm font-medium">
              Descripción del gasto
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 text-black rounded-lg px-3 py-2"
              placeholder="Ingresa la descripción del gasto"
            />
          </div>
          <div>
            <Label htmlFor="payment" className="text-sm font-medium">
              Monto del gasto
            </Label>
            <Input
              id="payment"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border border-gray-300 text-black rounded-lg px-3 py-2"
              placeholder="Ingresa el monto"
              type="number"
            />
          </div>
          <div>
            <Label htmlFor="date" className="text-sm font-medium">
              Fecha
            </Label>
            <Input
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-gray-300 text-black rounded-lg px-3 py-2"
              type="date"
            />
          </div>
          <div>
            <Label htmlFor="distribution" className="text-sm font-medium">
              Distribución (%) del gasto
            </Label>
            <Input
              id="distribution"
              value={distribution}
              onChange={(e) => setDistribution(e.target.value)}
              className="border border-gray-300 text-black rounded-lg px-3 py-2"
              placeholder="Ingresa la distribución"
            />
          </div>
          <div>
            <Label htmlFor="image" className="text-sm font-medium">
              Imagen (opcional)
            </Label>
            <Input
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="border border-gray-300 text-black rounded-lg px-3 py-2"
              placeholder="URL de la imagen (opcional)"
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
CreateTicket.propTypes = {
  className: PropTypes.string,
  onCreateGasto: PropTypes.func.isRequired,
  projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};
