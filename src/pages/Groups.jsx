// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import CreateGroupDialog from "../components/CreateGroup";

export default function Groups() {
  const [groups, setGroups] = useState([]);

  // Cargar grupos desde el archivo JSON al cargar el componente
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

    fetchGroups();
  }, []);

  const handleAddGroup = (newGroup) => {
    setGroups([...groups, { ...newGroup, id: Date.now(), balance: 0 }]);
  };

  return (
    <div className="p-4 min-h-screen text-blue-900 bg-gradient-to-b from-blue-50 to-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Mis Grupos</h1>

      <div className="max-w-3xl mx-auto space-y-4 text-white ">
        {groups.map((group) => (
          <div
            key={group.id}
            className="flex items-center space-x-4 bg-gray-700 p-4 rounded-xl"
          >
            {group.image ? (
              <img
                src={group.image}
                alt={group.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold">{group.name[0]}</span>
              </div>
            )}
            <div>
              <h2 className="font-semibold">{group.name}</h2>
              <p className="text-sm text-gray-400">{group.type}</p>
            </div>
            <div className="ml-auto">
              <p className="font-semibold text-red-600">
                ARS {group.balance.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <CreateGroupDialog onSubmit={handleAddGroup} />
    </div>
  );
}
