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
      <DialogTrigger className="text-white hover:text-blue-200 transition-all duration-300 transform hover:scale-105 text-sm md:text-lg  ">
        Registrate
      </DialogTrigger>
      <DialogContent className="p-0 overflow-hidden bg-transparent rounded-3xl shadow-2xl max-w-md w-full mx-auto backdrop-blur-md backdrop-filter border-0">
        <DialogHeader className="p-8 bg-gray-900 bg-opacity-40">
          <DialogTitle className=" text-3xl font-bold text-center text-white mb-6">
            Crea tu cuenta
          </DialogTitle>
          <DialogDescription>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nombre completo"
                  className="w-full px-6 py-3 text-white bg-blue-900 bg-opacity-30 border border-blue-400 border-opacity-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-blue-200 pr-10"
                  required
                />
                <svg
                  className="w-5 h-5 text-blue-300 absolute right-3 top-3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Correo electrónico"
                  className="w-full px-6 py-3 text-white bg-blue-900 bg-opacity-30 border border-blue-400 border-opacity-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-blue-200 pr-10"
                  required
                />
                <svg
                  className="w-5 h-5 text-blue-300 absolute right-3 top-3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Contraseña"
                  className="w-full px-6 py-3 text-white bg-blue-900 bg-opacity-30 border border-blue-400 border-opacity-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-blue-200 pr-10"
                  required
                />
                <svg
                  className="w-5 h-5 text-blue-300 absolute right-3 top-3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div className="relative">
                <input
                  type="password"
                  id="confirm-password"
                  name="confirm-password"
                  placeholder="Confirmar contraseña"
                  className="w-full px-6 py-3 text-white bg-blue-900 bg-opacity-30 border border-blue-400 border-opacity-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-blue-200 pr-10"
                  required
                />
                <svg
                  className="w-5 h-5 text-blue-300 absolute right-3 top-3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Registrarse
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-blue-200">
                ¿Ya tienes una cuenta?{" "}
                <span className="text-blue-300 hover:text-blue-100 transition-colors duration-200">
                  <Login />
                </span>
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default Register;
