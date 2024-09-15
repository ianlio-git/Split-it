import calculate from "../assets/png/calcular.png";
import tikets from "../assets/png/tikets.png";
import Divide from "../assets/png/dividir.png";
import Login from "../components/Login";
import Register from "../components/Register";

function Landing() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold text-gray-700">Split-it</div>
            <div className="space-x-4">
              <Login />
              <Register />
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Bienvenido a Split-it!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            La forma más fácil de dividir gastos con amigos y familia
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Sube Tickets</h2>
            <p className="text-gray-600">
              Sube fácilmente fotos de tus tickets o ingresa los gastos
              manualmente.
            </p>
            <img
              src={tikets}
              alt="Subir tickets"
              className="mt-4 w-full h-auto"
            />
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Divide Gastos</h2>
            <p className="text-gray-600">
              Divide los gastos equitativamente o especifica porcentajes
              personalizados.
            </p>
            <img
              src={Divide}
              alt="Dividir gastos"
              className="mt-4 w-full h-auto"
            />
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              Calcula Contribuciones
            </h2>
            <p className="text-gray-600">
              Obtén cálculos automáticos de cuánto debe pagar o recibir cada
              miembro del grupo.
            </p>
            <img
              src={calculate}
              alt="Calcular contribuciones"
              className="mt-4 w-full h-auto"
            />
          </div>
        </div>

        <div className="text-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-xl">
            Comienza Ahora
          </button>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-6 text-center">
          <p>
            &copy; {new Date().getFullYear()} Split-it. Todos los derechos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
