import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Gastos = ({ onAddGasto }) => {
  const [description, setDescription] = useState("");
  const [payment, setPayment] = useState("");
  const [state, setState] = useState("");
  const [date, setDate] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false); // Controlar la apertura del diálogo

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGasto = {
      description,
      payment,
      state,
      date,
    };
    onAddGasto(newGasto);
    // Reiniciar los campos
    setDescription("");
    setPayment("");
    setState("");
    setDate("");
    setDialogOpen(false); // Cerrar el diálogo
  };

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full">
          Añadir Gasto
        </DialogTrigger>
        <DialogContent className="p-0 overflow-hidden bg-transparent rounded-3xl shadow-2xl max-w-md w-full mx-auto backdrop-blur-md backdrop-filter border-0">
          <DialogHeader className="p-8 bg-gray-900 bg-opacity-40">
            <DialogTitle className="text-3xl font-bold text-center text-white mb-6">
              Añadir Gasto
            </DialogTitle>
            <DialogDescription>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Descripción"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border border-gray-400 rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="Pago"
                  value={payment}
                  onChange={(e) => setPayment(e.target.value)}
                  className="w-full p-2 border border-gray-400 rounded"
                  required
                />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2 border border-gray-400 rounded"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
                >
                  Añadir Gasto
                </button>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Gastos;
