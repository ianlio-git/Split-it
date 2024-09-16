function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-6 text-center">
        <p>
          &copy; {new Date().getFullYear()} Split-it. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
export default Footer;
