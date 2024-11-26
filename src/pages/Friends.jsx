import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";
import InviteFriend from "../components/InviteFriend";

export default function Friends() {
  const [friends, setFriends] = useState([]);

  // Función para obtener amigos desde el backend
  useEffect(() => {
    const fetchFriends = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No hay token en el localStorage.");
        return;
      }

      try {
        const response = await fetch("http://localhost:4000/api/users/friends", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.friends && Array.isArray(data.friends)) {
            setFriends(data.friends); // Si el backend envía un array de amigos
          } else if (data.friend) {
            setFriends([data.friend]); // Si el backend envía un solo amigo
          } else {
            console.warn("El formato de la respuesta no es válido.");
          }
        } else {
          console.error("Error al obtener los datos:", response.statusText);
        }
      } catch (error) {
        console.error("Error al conectar con el backend:", error);
      }
    };

    fetchFriends();
  }, []);

  // Maneja la invitación de un nuevo amigo y actualiza la lista
  const handleInvite = (newFriend) => {
    setFriends((prevFriends) => [...prevFriends, { ...newFriend }]);
  };

  // Renderiza el estado del amigo
  const renderFriendState = (state) => {
    <span>Accepted</span>
    state = "Accepted"
    if (state === "Pending") {
      return (
        <span className="text-yellow-500 flex items-center justify-end">
          <FaSpinner className="animate-spin mr-2" />
          <span>Pending</span>
        </span>
      );
    } else if (state === "Accepted") {
      return (
        <span className="text-green-500 flex items-center justify-end">
          <FaCheckCircle className="mr-2" />
          <span>Accepted</span>
        </span>
      );
    } else {
      return <span className="text-gray-400">{state || "Unknown"}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-black">
          Mis Amigos
        </h1>

        <div className="space-y-4 mb-8">
          {friends.length > 0 ? (
            friends.map((friend) => (
              <div
                key={friend._id} // Asegúrate de usar `_id` como clave única
                className="bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center space-x-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-white">
                    {friend.name[0]?.toUpperCase() || "?"}
                  </span>
                </div>
                <div className="flex-grow">
                  <h2 className="font-semibold text-lg text-black">
                    {friend.name}
                  </h2>
                  <p className="text-sm text-gray-600">{friend.email}</p>
                </div>
                <div className="text-sm">{renderFriendState(friend.state)}</div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">
              Aún no tienes amigos agregados.
            </p>
          )}
        </div>

        {/* Componente para invitar amigos */}
        <InviteFriend onInvite={handleInvite} />
      </div>
    </div>
  );
}
