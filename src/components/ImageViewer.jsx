import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { FaImage } from "react-icons/fa";

export default function ImageDialog({ imageSrc }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center border p-4 bg-white rounded-lg shadow-sm transition-all hover:shadow-md cursor-pointer"
      >
        <FaImage className="mr-1 h-3 w-3" />
        <span>Ver Imagen</span>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-white text-black sm:max-w-[425px] rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-semibold">
              Imagen
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <img
              src={imageSrc}
              alt="Descripción de la imagen"
              className="max-w-full h-auto border rounded shadow-md"
            />
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="mt-4 bg-black text-white w-full py-2 rounded-lg"
          >
            Cerrar
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}
