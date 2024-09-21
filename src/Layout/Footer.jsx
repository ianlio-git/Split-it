function Footer() {
  return (
    <div className="w-full text-center text-sm text-gray-400 py-6 bg-gray-800">
      <p className="font-semibold text-gray-200">Síguenos en:</p>
      <div className="flex justify-center space-x-4 mt-2">
        {["Facebook", "Twitter", "Instagram"].map((social) => (
          <a
            key={social}
            href={`https://${social.toLowerCase()}.com`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
          >
            {social}
          </a>
        ))}
      </div>
      <p className="mt-4 text-gray-500">
        © 2024 SplitIt. Todos los derechos reservados.
      </p>
      <div className="mt-4 text-gray-500">
        <a
          href="/privacy"
          className="hover:text-blue-400 transition duration-200"
        >
          Política de Privacidad
        </a>{" "}
        |
        <a
          href="/terms"
          className="hover:text-blue-400 transition duration-200"
        >
          {" "}
          Términos de Servicio
        </a>
      </div>
    </div>
  );
}

export default Footer;
