// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import InviteFriend from "../components/InviteFriend";

export default function Friends() {
  const [friends, setFriends] = useState([]);

  // Cargar amigos desde el archivo JSON
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch("/friends.json");
        const data = await response.json();
        setFriends(data);
      } catch (error) {
        console.error("Error al cargar los amigos:", error);
      }
    };

    fetchFriends();
  }, []);

  const handleInvite = (newFriend) => {
    setFriends([...friends, { ...newFriend, id: Date.now() }]);
  };

  return (
    <div className="p-4 min-h-screen text-blue-900 bg-gradient-to-b from-blue-50 to-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Mis Amigos</h1>

      <div className="max-w-3xl mx-auto space-y-4 text-white ">
        {friends.length > 0 ? (
          friends.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center space-x-4 bg-gray-700 p-4 rounded-xl"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold">{friend.name[0]}</span>
              </div>
              <div>
                <h2 className="font-semibold">{friend.name}</h2>
                <p className="text-sm text-gray-400">{friend.email}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Aún no tienes amigos agregados.</p>
        )}
      </div>
      <InviteFriend onInvite={handleInvite} />
    </div>
  );
}
