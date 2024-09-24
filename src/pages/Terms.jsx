import React from "react";
import Footer from "../Layout/Footer";

const Terms = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">
          Términos de Servicio
        </h1>
        <p className="text-gray-700 mb-4">
          Bienvenido a Split-it. Al utilizar nuestra plataforma, usted acepta
          los siguientes términos y condiciones.
        </p>

        <h2 className="text-2xl font-semibold text-blue-800 mb-4">
          Uso de la Plataforma
        </h2>
        <p className="text-gray-700 mb-4">
          Split-it le permite dividir gastos entre amigos y familiares. Usted se
          compromete a utilizar la plataforma de manera legal y conforme a
          nuestras políticas.
        </p>

        <h2 className="text-2xl font-semibold text-blue-800 mb-4">
          Cuentas de Usuario
        </h2>
        <p className="text-gray-700 mb-4">
          Usted es responsable de mantener la confidencialidad de su cuenta y
          contraseña, así como de todas las actividades que ocurran bajo su
          cuenta.
        </p>

        <h2 className="text-2xl font-semibold text-blue-800 mb-4">
          Limitación de Responsabilidad
        </h2>
        <p className="text-gray-700 mb-4">
          Split-it no será responsable de ningún daño indirecto, especial o
          consecuente que surja del uso de nuestra plataforma.
        </p>

        <h2 className="text-2xl font-semibold text-blue-800 mb-4">
          Modificaciones a los Términos
        </h2>
        <p className="text-gray-700 mb-4">
          Nos reservamos el derecho de modificar estos términos en cualquier
          momento. Cualquier cambio será efectivo una vez publicado en esta
          página.
        </p>

        <p className="text-gray-700 mb-4">
          Si tiene alguna pregunta sobre nuestros términos de servicio, por
          favor contáctenos en legal@split-it.com.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
