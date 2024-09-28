import React from "react";
import Footer from "../Layout/Footer";
import {
  FaShieldAlt,
  FaUserCircle,
  FaExclamationTriangle,
  FaPencilAlt,
} from "react-icons/fa";

const TermsSection = ({ icon, title, children }) => (
  <div className="mb-8">
    <div className="flex items-center mb-4">
      {icon}
      <h2 className="text-2xl font-semibold text-blue-800 ml-3">{title}</h2>
    </div>
    <div className="pl-10">{children}</div>
  </div>
);

const Terms = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-600 px-6 py-4">
            <h1 className="text-3xl font-bold text-white">
              Términos de Servicio
            </h1>
          </div>
          <div className="px-6 py-8">
            <p className="text-gray-600 mb-8 leading-relaxed">
              Bienvenido a Split-it. Al utilizar nuestra plataforma, usted
              acepta los siguientes términos y condiciones. Por favor, lea
              atentamente.
            </p>

            <TermsSection
              icon={<FaShieldAlt className="text-blue-500 text-2xl" />}
              title="Uso de la Plataforma"
            >
              <p className="text-gray-700 mb-4 leading-relaxed">
                Split-it le permite dividir gastos entre amigos y familiares.
                Usted se compromete a utilizar la plataforma de manera legal y
                conforme a nuestras políticas. Cualquier uso indebido resultará
                en la suspensión de su cuenta.
              </p>
            </TermsSection>

            <TermsSection
              icon={<FaUserCircle className="text-blue-500 text-2xl" />}
              title="Cuentas de Usuario"
            >
              <p className="text-gray-700 mb-4 leading-relaxed">
                Usted es responsable de mantener la confidencialidad de su
                cuenta y contraseña, así como de todas las actividades que
                ocurran bajo su cuenta. Notifíquenos inmediatamente si sospecha
                de cualquier uso no autorizado de su cuenta.
              </p>
            </TermsSection>

            <TermsSection
              icon={
                <FaExclamationTriangle className="text-blue-500 text-2xl" />
              }
              title="Limitación de Responsabilidad"
            >
              <p className="text-gray-700 mb-4 leading-relaxed">
                Split-it no será responsable de ningún daño indirecto, especial
                o consecuente que surja del uso de nuestra plataforma.
                Utilizamos medidas de seguridad estándar de la industria, pero
                no podemos garantizar la seguridad absoluta de su información.
              </p>
            </TermsSection>

            <TermsSection
              icon={<FaPencilAlt className="text-blue-500 text-2xl" />}
              title="Modificaciones a los Términos"
            >
              <p className="text-gray-700 mb-4 leading-relaxed">
                Nos reservamos el derecho de modificar estos términos en
                cualquier momento. Cualquier cambio será efectivo una vez
                publicado en esta página. Le recomendamos revisar estos términos
                periódicamente.
              </p>
            </TermsSection>

            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
              <p className="text-gray-600 text-sm">
                Si tiene alguna pregunta sobre nuestros términos de servicio,
                por favor contáctenos en{" "}
                <a
                  href="mailto:legal@split-it.com"
                  className="text-blue-600 hover:underline"
                >
                  legal@split-it.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
