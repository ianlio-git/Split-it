import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaTicketAlt,
  FaUsers,
  FaUserPlus,
  FaPlus,
  FaMoneyBillWave,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/ui/collapsible";
import CreateGroupDialog from "../components/CreateGroup";
import Gastos from "../components/Gastos";
import CreateGroup from "../components/CreateGroup";
import ImageViewer from "../components/ImageViewer";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [friends, setFriends] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [gastos, setGastos] = useState([]);
  const [isGroupsOpen, setIsGroupsOpen] = useState(false);
  const [isFriendsOpen, setIsFriendsOpen] = useState(false);

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

  const handleAddFriendToGroup = (friendName) => {
    alert(`${friendName} fue añadido al grupo seleccionado`);
  };

  const handleAddGasto = (newGasto) => {
    setGastos((prevGastos) => [...prevGastos, newGasto]);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div className="w-full md:w-1/4 p-4 bg-white shadow-md">
        <Collapsible
          open={isGroupsOpen}
          onOpenChange={setIsGroupsOpen}
          className="md:hidden mb-4"
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              className="w-full flex justify-between items-center"
            >
              <span>Mis Grupos</span>
              {isGroupsOpen ? <FaChevronUp /> : <FaChevronDown />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <GroupsList
              groups={groups}
              selectedGroup={selectedGroup}
              handleSelectGroup={handleSelectGroup}
            />
          </CollapsibleContent>
        </Collapsible>

        <Collapsible
          open={isFriendsOpen}
          onOpenChange={setIsFriendsOpen}
          className="md:hidden"
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              className="w-full flex justify-between items-center"
            >
              <span>Mis Amigos</span>
              {isFriendsOpen ? <FaChevronUp /> : <FaChevronDown />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <FriendsList
              friends={friends}
              handleAddFriendToGroup={handleAddFriendToGroup}
            />
          </CollapsibleContent>
        </Collapsible>

        {/* Botón Agregar Grupo en Móvil */}
        <div className="md:hidden mb-4">
          <CreateGroup className="w-full" />
        </div>

        <div className="hidden md:block">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Mis Grupos</h2>
              <CreateGroup className="ml-4" />
            </div>
            <GroupsList
              groups={groups}
              selectedGroup={selectedGroup}
              handleSelectGroup={handleSelectGroup}
            />
            <h2 className="text-xl font-bold mb-4 mt-6 text-gray-800">
              Mis Amigos
            </h2>
            <FriendsList
              friends={friends}
              handleAddFriendToGroup={handleAddFriendToGroup}
            />
          </div>
        </div>
      </div>

      <div className="w-full md:w-2/4 p-4 bg-white shadow-md">
        {selectedGroup ? (
          <div>
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-4 shadow-sm">
              <div className="flex items-center">
                <FaHome className="text-gray-600 mr-2 text-2xl" />
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedGroup.name}
                </h2>
              </div>
              <Gastos onAddGasto={handleAddGasto} />
            </div>

            <div className="mt-4 space-y-4">
              {gastos.map((gasto, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-center border p-4 bg-white rounded-lg shadow-sm transition-all hover:shadow-md"
                >
                  <FaTicketAlt className="text-gray-800 mr-4 text-4xl mb-2 md:mb-0" />
                  <div className="flex-1">
                    <p className="font-bold text-lg text-gray-800">
                      {gasto.description}
                    </p>
                    <p className="text-gray-600">
                      Pago total: ${gasto.payment}
                    </p>
                    <p className="text-gray-600">Estado: Pendiente</p>
                    <p className="text-gray-600">Fecha: {gasto.date}</p>
                    <p className="text-gray-600">
                      Diego pagó: {gasto.payment / 2}
                    </p>
                    <p className="text-gray-600">
                      Tú debes: {gasto.payment / 2}
                    </p>
                  </div>
                  <div className="flex justify-center items-center ml-4">
                    <ImageViewer imageSrc="https://media.infocielo.com/p/780432ea548b27cfd7e58f79c482f43c/adjuntos/299/imagenes/001/385/0001385644/1200x675/smart/ticket-comprajpg.jpg" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-xl text-gray-500 text-center">
            Selecciona un grupo para ver los detalles.
          </p>
        )}
      </div>

      <div className="w-full md:w-1/4 p-4 bg-white shadow-md">
        <div className="flex items-center mb-4">
          <FaMoneyBillWave className="text-gray-600 mr-2 text-2xl" />
          <h2 className="text-2xl font-bold text-gray-800">Saldos del Grupo</h2>
        </div>
        {selectedGroup ? (
          <ul className="space-y-4">
            {selectedGroup.members.map((member) => (
              <li
                key={member.id}
                className="flex items-center p-3 bg-gray-50 rounded-lg shadow-sm"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <span className="font-bold text-gray-800">{member.name}</span>
                  <p
                    className={`${
                      member.balance < 0 ? "text-red-500" : "text-green-600"
                    } font-semibold`}
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

function GroupsList({ groups, selectedGroup, handleSelectGroup }) {
  return (
    <ul className="space-y-3 mb-6">
      {groups.map((group) => (
        <li
          key={group.id}
          onClick={() => handleSelectGroup(group)}
          className={`cursor-pointer p-3 rounded-lg shadow-sm transition-all flex items-center ${
            selectedGroup?.id === group.id
              ? "bg-blue-100 text-blue-800"
              : "bg-white hover:bg-gray-100 text-gray-800"
          }`}
        >
          <FaUsers className="mr-2" />
          <span className="font-medium">
            {group.name.charAt(0).toUpperCase() +
              group.name.slice(1).toLowerCase()}
          </span>
        </li>
      ))}
    </ul>
  );
}

function FriendsList({ friends, handleAddFriendToGroup }) {
  return (
    <ul className="space-y-2">
      {friends.map((friend) => (
        <li
          key={friend.id}
          className="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm"
        >
          <span className="text-gray-700">{friend.name}</span>
          <Button
            onClick={() => handleAddFriendToGroup(friend.name)}
            size="sm"
            variant="outline"
            className="ml-2"
          >
            <FaUserPlus className="mr-1" />
            Añadir
          </Button>
        </li>
      ))}
    </ul>
  );
}
