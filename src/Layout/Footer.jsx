import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

function Footer() {
  const socialLinks = [
    { name: "Facebook", icon: FaFacebookF, url: "https://facebook.com" },
    { name: "Twitter", icon: FaTwitter, url: "https://twitter.com" },
    { name: "Instagram", icon: FaInstagram, url: "https://instagram.com" },
    { name: "LinkedIn", icon: FaLinkedinIn, url: "https://linkedin.com" },
  ];

  return (
    <footer className="w-full bg-gradient-to-b from-gray-800 to-gray-900 text-gray-300 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-2">Split-It!</h2>
            <p className="text-sm text-gray-400">
              Divide gastos fácilmente con amigos
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <p className="font-semibold text-white mb-2">Síguenos en:</p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={`Visita nuestro perfil de ${social.name}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <hr className="border-gray-700 my-6" />
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-500 mb-4 md:mb-0">
            © 2024 Split-It!. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4">
            <a
              href="/privacy"
              className="text-gray-500 hover:text-white transition duration-200"
            >
              Política de Privacidad
            </a>
            <a
              href="/terms"
              className="text-gray-500 hover:text-white transition duration-200"
            >
              Términos de Servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
