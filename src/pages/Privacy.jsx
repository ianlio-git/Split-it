import React from "react";
import Footer from "../Layout/Footer";
import { FaUserShield, FaDatabase, FaShareAlt, FaLock } from "react-icons/fa";

const PrivacySection = ({ icon, title, children }) => (
  <div className="mb-8">
    <div className="flex items-center mb-4">
      {icon}
      <h2 className="text-2xl font-semibold text-blue-800 ml-3">{title}</h2>
    </div>
    <div className="pl-10">{children}</div>
  </div>
);

const Privacy = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-600 px-6 py-4">
            <h1 className="text-3xl font-bold text-white">
              Política de Privacidad
            </h1>
          </div>
          <div className="px-6 py-8">
            <p className="text-gray-600 mb-8 leading-relaxed">
              En Split-it, nos tomamos muy en serio la privacidad de nuestros
              usuarios. Esta política describe cómo recopilamos, utilizamos, y
              protegemos su información personal. Por favor, lea atentamente.
            </p>

            <PrivacySection
              icon={<FaUserShield className="text-blue-500 text-2xl" />}
              title="Información que Recopilamos"
            >
              <p className="text-gray-700 mb-4 leading-relaxed">
                Podemos recopilar información personal como su nombre, correo
                electrónico y otros datos relevantes cuando se registre en
                nuestra plataforma o utilice nuestros servicios. Esta
                información es esencial para proporcionar una experiencia
                personalizada y segura.
              </p>
            </PrivacySection>

            <PrivacySection
              icon={<FaDatabase className="text-blue-500 text-2xl" />}
              title="Cómo Usamos Su Información"
            >
              <p className="text-gray-700 mb-4 leading-relaxed">
                Usamos su información para proporcionar y mejorar nuestros
                servicios, personalizar su experiencia y garantizar la seguridad
                de su cuenta. Esto incluye:
              </p>
              <ul className="list-disc pl-5 text-gray-700 mb-4 leading-relaxed">
                <li>
                  Facilitar la división de gastos entre amigos y familiares
                </li>
                <li>Mejorar nuestros algoritmos de cálculo y sugerencias</li>
                <li>
                  Enviar notificaciones importantes sobre su cuenta y
                  transacciones
                </li>
                <li>Prevenir fraudes y abusos en nuestra plataforma</li>
              </ul>
            </PrivacySection>

            <PrivacySection
              icon={<FaShareAlt className="text-blue-500 text-2xl" />}
              title="Compartición de Información"
            >
              <p className="text-gray-700 mb-4 leading-relaxed">
                No compartimos su información personal con terceros sin su
                consentimiento, excepto cuando sea necesario para cumplir con la
                ley o mejorar la seguridad de nuestros servicios. En caso de que
                sea necesario compartir información, le notificaremos y
                solicitaremos su consentimiento explícito.
              </p>
            </PrivacySection>

            <PrivacySection
              icon={<FaLock className="text-blue-500 text-2xl" />}
              title="Seguridad"
            >
              <p className="text-gray-700 mb-4 leading-relaxed">
                Tomamos medidas razonables para proteger su información personal
                contra el acceso no autorizado y la divulgación. Esto incluye:
              </p>
              <ul className="list-disc pl-5 text-gray-700 mb-4 leading-relaxed">
                <li>Encriptación de datos sensibles</li>
                <li>Monitoreo constante de nuestros sistemas</li>
                <li>Actualizaciones regulares de seguridad</li>
                <li>
                  Acceso restringido a la información personal dentro de nuestra
                  organización
                </li>
              </ul>
            </PrivacySection>

            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
              <p className="text-gray-600 text-sm">
                Si tiene alguna pregunta sobre nuestra política de privacidad,
                puede contactarnos en{" "}
                <a
                  href="mailto:support@split-it.com"
                  className="text-blue-600 hover:underline"
                >
                  support@split-it.com
                </a>
                . Nos comprometemos a responder a sus inquietudes lo antes
                posible.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
