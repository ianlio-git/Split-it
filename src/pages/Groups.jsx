import React, { useState, useEffect } from "react";
import CreateGroupDialog from "../components/CreateGroup";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [friends, setFriends] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch("/groups.json");
        const data = await response.json();
        setGroups(data);
      } catch (error) {
        console.error("Error al cargar los grupos:", error);
      }
    };

    const fetchFriends = async () => {
      try {
        const response = await fetch("/friends.json");
        const data = await response.json();
        setFriends(data);
      } catch (error) {
        console.error("Error al cargar los amigos:", error);
      }
    };

    fetchGroups();
    fetchFriends();
  }, []);

  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
  };

  const handleAddFriendToGroup = (friendId) => {
    console.log(`Añadir amigo con ID ${friendId} al grupo seleccionado`);
    // Lógica para añadir amigo al grupo
  };

  return (
    <div className="flex min-h-screen text-blue-900 bg-gradient-to-b from-blue-50 to-white">
      {/* Lista de amigos a la izquierda */}
      <div className="w-1/4 p-4 bg-gray-100">
        <h2 className="text-xl font-bold mb-4">Mis Amigos</h2>
        <ul>
          {friends.map((friend) => (
            <li key={friend.id} className="mb-2 flex justify-between items-center">
              <span>{friend.name}</span>
              <button
                onClick={() => handleAddFriendToGroup(friend.id)}
                className="text-sm text-blue-500 underline"
              >
                Añadir al grupo
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Descripción del grupo seleccionado en el centro */}
      <div className="w-2/4 p-4">
        {selectedGroup ? (
          <div>
            <h2 className="text-3xl font-bold">{selectedGroup.name}</h2>
            <p className="text-lg text-gray-700">{selectedGroup.type}</p>
            <p className="text-lg font-semibold">
              Balance: ARS {selectedGroup.balance.toFixed(2)}
            </p>
            {selectedGroup.image && (
              <img
                src={selectedGroup.image}
                alt={selectedGroup.name}
                className="w-32 h-32 rounded-full mt-4"
              />
            )}
          </div>
        ) : (
          <p className="text-xl text-gray-500">Selecciona un grupo para ver los detalles.</p>
        )}
      </div>

      {/* Lista de grupos a la derecha */}
      <div className="w-1/4 p-4 bg-gray-100">
        <h2 className="text-xl font-bold mb-4">Mis Grupos</h2>
        <ul>
          {groups.map((group) => (
            <li
              key={group.id}
              onClick={() => handleSelectGroup(group)}
              className="cursor-pointer mb-2 p-2 bg-gray-700 text-white rounded-xl"
            >
              <span>{group.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

