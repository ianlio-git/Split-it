import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function Login() {
  return (
    <Dialog>
      <DialogTrigger className="text-black-500">Iniciar Sesion</DialogTrigger>
      <DialogContent className="flex items-center justify-center p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center justify-center">
            Bienvenido a Split-it!
          </DialogTitle>

          <DialogDescription>
            <form className="mt-4 space-y-4">
              <input
                type="email"
                className="w-full px-4 py-2 text-gray-700 border rounded-3xl focus:outline-none shadow-md hover:border-blue-600"
                placeholder="Correo electrónico"
                required
              />
              <input
                type="password"
                className="w-full px-4 py-2 text-gray-700 border rounded-3xl focus:outline-none shadow-md hover:border-blue-600"
                placeholder="Contraseña"
                required
              />
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Recuérdame
                  </label>
                </div>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                Iniciar Sesión
              </button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default Login;
