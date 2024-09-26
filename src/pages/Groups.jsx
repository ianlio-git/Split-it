import React, { useState, useEffect } from "react";
import { FaHome, FaTicketAlt } from "react-icons/fa";
import CreateGroupDialog from "../components/CreateGroup";
import Gastos from "../components/Gastos";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [friends, setFriends] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [gastos, setGastos] = useState([]);

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
  };

  const handleAddGasto = (newGasto) => {
    setGastos((prevGastos) => [...prevGastos, newGasto]);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen text-blue-900 bg-gray-300">
      <div className="w-full md:w-1/4 p-4 bg-gray-100 border-b md:border-b-0 border-gray-300">
        <h2 className="text-xl font-bold mb-4">Mis Amigos</h2>
        <ul>
          {friends.map((friend) => (
            <li
              key={friend.id}
              className="flex items-center justify-between cursor-pointer mb-2 p-2 bg-gray-700 text-white rounded-xl"
            >
              <span>{friend.name}</span>
              <button
                onClick={() => handleAddFriendToGroup(friend.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 ml-auto"
              >
                Añadir
              </button>
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-4">Mis Grupos</h2>
        <ul>
          {groups.map((group) => (
            <li
              key={group.id}
              onClick={() => handleSelectGroup(group)}
              className="cursor-pointer mb-2 p-2 bg-gray-700 text-white rounded-xl"
            >
              <span>
                {group.name.charAt(0).toUpperCase() +
                  group.name.slice(1).toLowerCase()}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full md:w-2/4 p-4 text-center bg-white">
        {selectedGroup ? (
          <div>
            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md mb-4 shadow-md">
              <div className="flex items-center">
                <FaHome
                  className="text-gray-600 mr-2"
                  style={{ fontSize: "2em" }}
                />
                <h2 className="text-xl font-bold text-gray-800">
                  {selectedGroup.name}
                </h2>
              </div>
              <Gastos onAddGasto={handleAddGasto} />
            </div>

            <div className="mt-4">
              {gastos.map((gasto, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-center border p-4 mt-2 bg-gray-100 rounded-lg shadow-md transition-transform transform hover:scale-105"
                >
                  <FaTicketAlt
                    className="text-gray-800 mr-2"
                    style={{ fontSize: "5em" }}
                  />
                  <div className="flex-1">
                    <p className="font-bold text-lg">
                      Descripción: {gasto.description}
                    </p>
                    <p className="text-gray-600">Pago: ${gasto.payment}</p>
                    <p className="text-gray-600">Estado: "Pendiente"</p>
                    <p className="text-gray-600">Fecha: {gasto.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-xl text-gray-500">
            Selecciona un grupo para ver los detalles.
          </p>
        )}
      </div>

      <div className="w-full md:w-1/4 p-4 bg-gray-300">
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-bold">Saldos del Grupo</h2>
        </div>
        {selectedGroup ? (
          <ul>
            {selectedGroup.members.map((member) => (
              <li key={member.id} className="flex items-center mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <span className="font-bold">{member.name}</span>
                  <p
                    className={
                      member.balance < 0 ? "text-red-500" : "text-green-800"
                    }
                  >
                    {member.balance < 0 ? "Debe" : "Recupera"} ${" "}
                    {Math.abs(member.balance).toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xl text-gray-500">
            Selecciona un grupo para ver los saldos de los miembros.
          </p>
        )}
      </div>
    </div>
  );
}
