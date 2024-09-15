import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Login from "../components/Login";

function Register() {
  return (
    <Dialog>
      <DialogTrigger className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Registrate
      </DialogTrigger>

      <DialogContent className="flex flex-col items-center justify-center p-6 w-full max-w-lg md:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Crea tu cuenta en Split-it
          </DialogTitle>
        </DialogHeader>

        <DialogDescription>
          <div className="text-center">
            <form className="space-y-4">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Nombre completo"
                className="w-full px-4 py-2  border rounded-3xl focus:outline-none shadow-md hover:border-blue-600"
                required
              />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Correo electrónico"
                className="w-full px-4 py-2 text-gray-700 border rounded-3xl focus:outline-none shadow-md hover:border-blue-600"
                required
              />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Contraseña"
                className="w-full px-4 py-2 text-gray-700 border rounded-3xl focus:outline-none shadow-md hover:border-blue-600"
                required
              />
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                placeholder="Confirmar contraseña"
                className="w-full px-4 py-2 text-gray-700 border rounded-3xl focus:outline-none shadow-md hover:border-blue-600"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                Registrarse
              </button>
            </form>
            <div className="mt-6">
              <p>
                ¿Ya tienes una cuenta?{" "}
                <span className="hover:underline hover:text-blue-500">
                  <Login />
                </span>
              </p>
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default Register;
