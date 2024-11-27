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

export default function CreateTicket({ className, onCreateTicket, projectId }) {
  // Estado para el diálogo
  const [isOpen, setIsOpen] = useState(false);
  // Estados para los detalles del ticket
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [distribution, setDistribution] = useState(""); // Nuevo campo
  const [image, setImage] = useState(null); // Para la imagen (opcional)

  const handleSubmit = async () => {
    const id = projectId;

    // Imprimir los datos antes de enviarlos
    console.log("ID del proyecto:", id);
    console.log("Descripción:", description);
    console.log("Monto:", amount);
    console.log("Fecha:", date);
    console.log("Distribución:", distribution);
    console.log("Imagen:", image);

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

        // Crear el objeto con los datos a enviar
        const formData = new FormData();
        formData.append("projectId", id);
        formData.append("description", description);
        formData.append("date", date);
        formData.append("amount", parseFloat(amount));
        formData.append("distribution", parseFloat(distribution));

        // Si hay una imagen, añadirla al formData
        if (image) {
          formData.append("image", image);
        }

        // Hacer la solicitud POST para crear el ticket
        const response = await fetch(
          "http://localhost:4000/api/tickets/create",
          {
            method: "POST",
            headers: {
              "x-auth-token": token, // Usamos el token desde el localStorage
            },
            body: formData, // Usamos FormData para enviar archivos
          }
        );

        if (!response.ok) {
          throw new Error("No se pudo crear el ticket");
        }

        const data = await response.json();

        // Llamar a la función para añadir el ticket al estado del componente principal
        onCreateTicket(data); // Este callback debería actualizar el estado de los tickets

        // Limpiar los campos y cerrar el diálogo
        setDescription("");
        setAmount("");
        setDate("");
        setDistribution("");
        setImage(null); // Limpiar la imagen
        setIsOpen(false);
      } catch (error) {
        console.error("Error al crear el ticket:", error);
        alert("Hubo un error al crear el ticket");
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

        {/* Descripción del gasto */}
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
        </div>

        {/* Monto del gasto */}
        <div className="space-y-4">
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
        </div>

        {/* Fecha del gasto */}
        <div className="space-y-4">
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
        </div>

        {/* Distribución del gasto */}
        <div className="space-y-4">
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
              type="number"
            />
          </div>
        </div>

        {/* Subir imagen (opcional) */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="image" className="text-sm font-medium">
              Imagen (opcional)
            </Label>
            <Input
              id="image"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="border border-gray-300 text-black rounded-lg px-3 py-2"
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
