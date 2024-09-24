import React from "react";
import Footer from "../Layout/Footer";

const Privacy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">
          Política de Privacidad
        </h1>
        <p className="text-gray-700 mb-4">
          En Split-it, nos tomamos muy en serio la privacidad de nuestros
          usuarios. Esta política describe cómo recopilamos, utilizamos, y
          protegemos su información personal.
        </p>

        <h2 className="text-2xl font-semibold text-blue-800 mb-4">
          Información que Recopilamos
        </h2>
        <p className="text-gray-700 mb-4">
          Podemos recopilar información personal como su nombre, correo
          electrónico y otros datos relevantes cuando se registre en nuestra
          plataforma o utilice nuestros servicios.
        </p>

        <h2 className="text-2xl font-semibold text-blue-800 mb-4">
          Cómo Usamos Su Información
        </h2>
        <p className="text-gray-700 mb-4">
          Usamos su información para proporcionar y mejorar nuestros servicios,
          personalizar su experiencia y garantizar la seguridad de su cuenta.
        </p>

        <h2 className="text-2xl font-semibold text-blue-800 mb-4">
          Compartición de Información
        </h2>
        <p className="text-gray-700 mb-4">
          No compartimos su información personal con terceros sin su
          consentimiento, excepto cuando sea necesario para cumplir con la ley o
          mejorar la seguridad de nuestros servicios.
        </p>

        <h2 className="text-2xl font-semibold text-blue-800 mb-4">Seguridad</h2>
        <p className="text-gray-700 mb-4">
          Tomamos medidas razonables para proteger su información personal
          contra el acceso no autorizado y la divulgación.
        </p>

        <p className="text-gray-700 mb-4">
          Si tiene alguna pregunta sobre nuestra política de privacidad, puede
          contactarnos en support@split-it.com.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
