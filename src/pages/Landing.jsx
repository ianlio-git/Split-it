// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import calculate from "../assets/png/calcular.png";
import tikets from "../assets/png/tikets.png";
import Divide from "../assets/png/dividir.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../Layout/Footer";

function Landing() {
  const { user } = useUser();
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [isContentVisible, setIsContentVisible] = useState(true);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    if (user) {
      setIsContentVisible(false);
      const timer = setTimeout(() => setIsButtonVisible(true), 300);
      return () => clearTimeout(timer);
    } else {
      setIsContentVisible(true);
      setIsButtonVisible(false);
    }
  }, [user]);

  const goToApp = () => {
    navigate("/groups");
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="flex-1 container mx-auto px-6 py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <motion.h1
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold text-blue-900 mb-4"
          >
            Bienvenido a Split-it!
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-600 mb-8"
          >
            La forma más fácil de dividir gastos con amigos y familia
          </motion.p>
        </motion.div>

        {!user && (
          <div
            className="text-center py-1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isContentVisible ? 1 : 0,
              scale: isContentVisible ? 1 : 0.8,
            }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl text-gray-600 mb-3">
              ¡Inicia sesión para comenzar!
            </p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isButtonVisible ? 1 : 0,
            scale: isButtonVisible ? 1 : 0.8,
          }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          {user && (
            <button
              onClick={goToApp}
              className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg transition-transform duration-300 transform hover:scale-105"
            >
              Comienza Ahora
            </button>
          )}
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-8 mb-8"
        >
          {[
            {
              title: "Sube Tickets",
              description:
                "Sube fácilmente fotos de tus tickets o ingresa los gastos manualmente.",
              image: tikets,
            },
            {
              title: "Divide Gastos",
              description:
                "Divide los gastos equitativamente o especifica porcentajes personalizados.",
              image: Divide,
            },
            {
              title: "Calcula",
              description:
                "Obtén cálculos automáticos de cuánto debe pagar o recibir cada miembro.",
              image: calculate,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <h2 className="text-2xl font-semibold mb-4 text-blue-900">
                {item.title}
              </h2>
              <p className="text-gray-700 mb-6">{item.description}</p>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto rounded-md shadow-sm"
              />
            </motion.div>
          ))}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

export default Landing;
