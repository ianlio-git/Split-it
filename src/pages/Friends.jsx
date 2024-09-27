import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaSpinner, FaUserPlus } from "react-icons/fa";
import InviteFriend from "../components/InviteFriend";

export default function Friends() {
  const [friends, setFriends] = useState([]);

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

  const renderFriendState = (state) => {
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
      return <span className="text-gray-400">{state}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">
          Mis Amigos
        </h1>

        <div className="space-y-4 mb-8">
          {friends.length > 0 ? (
            friends.map((friend) => (
              <div
                key={friend.id}
                className="bg-white rounded-3xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center space-x-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-white">
                    {friend.name[0]}
                  </span>
                </div>
                <div className="flex-grow">
                  <h2 className="font-semibold text-lg text-blue-800">
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

        <InviteFriend onInvite={handleInvite} />
      </div>
    </div>
  );
}
