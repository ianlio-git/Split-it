function Footer() {
  return (
    <div className="w-full text-center text-sm text-gray-400">
      <p>Síguenos en:</p>
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
        © 2024 TuMarca. Todos los derechos reservados.
      </p>
    </div>
  );
}
export default Footer;
