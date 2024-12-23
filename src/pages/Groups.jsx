import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import {
  FaHome,
  FaTicketAlt,
  FaUsers,
  FaUserPlus,
  FaMoneyBillWave,
  FaChevronDown,
  FaChevronUp,
  FaTrash,
} from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/ui/collapsible";
import CreateGroup from "../components/CreateGroup";
import Gastos from "../components/Gastos";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [friends, setFriends] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isGroupsOpen, setIsGroupsOpen] = useState(false);
  const [isFriendsOpen, setIsFriendsOpen] = useState(false);
  const [projectId, setProjectId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  //funcion para obtener los grupos y amigos
  useEffect(() => {
    const fetchGroups = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No hay token en el localStorage.");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:4000/api/projects/get-all",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.projects && Array.isArray(data.projects)) {
            setGroups(data.projects); // Usamos "projects" en lugar de "groups"
          } else if (data.projects) {
            setGroups([data.projects]); // Por si acaso "projects" no es un array
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

    const fetchFriends = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No hay token en el localStorage.");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:4000/api/users/friends",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("data", data);
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

    const savedGroupId = localStorage.getItem("selectedGroupId");

    // Si hay un ID guardado, seleccionamos automáticamente ese grupo
    if (savedGroupId) {
      setProjectId(savedGroupId);

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No hay token en el localStorage.");
        return;
      }

      const fetchGroupDetails = async () => {
        try {
          const response = await fetch(
            "http://localhost:4000/api/projects/post-details",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-auth-token": token,
              },
              body: JSON.stringify({
                projectId: savedGroupId,
              }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            setSelectedGroup(data.project);
            console.log(
              "Proyecto seleccionado desde localStorage:",
              savedGroupId
            );
          }
        } catch (error) {
          console.error("Error al conectar con el backend:", error);
        }
      };

      fetchGroupDetails();
    }

    fetchGroups();
    fetchFriends();
  }, []);

  //maneja la creacion de un grupo
  const handleCreateGroup = (newGroup) => {
    setGroups((prevGroups) => [...prevGroups, newGroup]);
  };

  //maneja la seleccion de un grupo
  const handleSelectGroup = async (group) => {
    console.log("ID del grupo seleccionado:", group.id);
    setProjectId(group.id);

    // Guardamos el ID del grupo en el localStorage
    localStorage.setItem("selectedGroupId", group.id);

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No hay token en el localStorage.");
      return;
    }
    console.log("x-auth-token :", token);
    try {
      const response = await fetch(
        "http://localhost:4000/api/projects/post-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify({
            projectId: group.id, // Aquí pasamos el ID del grupo como projectId
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setSelectedGroup(data.project);
        console.log("Proyecto seleccionado:", projectId);
      }
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
    }
  };

  //maneja la eliminacion de un grupo
  const handleDeleteGroup = async (groupId) => {
    // Confirmación antes de eliminar
    if (!window.confirm("¿Estás seguro de que deseas eliminar este grupo?"))
      return;

    try {
      // Obtener el token del localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        alert(
          "Error: Token de autenticación no encontrado. Por favor, inicia sesión."
        );
        return;
      }

      // Hacer la llamada DELETE a la API
      const response = await fetch(
        "http://localhost:4000/api/projects/delete-project",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token, // Aquí usamos el token extraído
          },
          body: JSON.stringify({ projectId: groupId }),
        }
      );

      if (!response.ok) {
        // Intentar obtener el mensaje de error desde la respuesta del backend
        const errorData = await response.json();
        const errorMessage =
          errorData.message || "Error desconocido al eliminar el grupo.";
        alert(`No se pudo eliminar el grupo: ${errorMessage}`);
        return;
      }

      // Si la eliminación es exitosa, actualizamos el estado local
      setGroups((prevGroups) =>
        prevGroups.filter((group) => group.id !== groupId)
      );

      // Si el grupo eliminado estaba seleccionado, lo limpiamos
      if (selectedGroup && selectedGroup.id === groupId) {
        setSelectedGroup(null);
      }

      alert("Grupo eliminado con éxito.");
      console.log("Grupo eliminado con éxito");
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar el grupo:", error.message);
      alert("Error al eliminar el grupo: " + error.message);
    }
  };

  //maneja la adicion de un amigo a un grupo
  const handleAddFriendToGroup = async (friend) => {
    const token = localStorage.getItem("token");
    const projectId = localStorage.getItem("selectedGroupId");
    console.log("projectId", projectId);
    console.log("token", token);
    if (!selectedGroup) {
      alert("Por favor, selecciona un grupo primero.");
      return;
    }

    if (!token || !projectId) {
      alert("Faltan datos necesarios en el localStorage.");
      return;
    }

    const isAlreadyInGroup = selectedGroup.members.some(
      (member) => member.id === friend._id
    );

    if (isAlreadyInGroup) {
      alert(`El amigo ya está en el grupo.`);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:4000/api/projects/add-members",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify({
            projectId: projectId,
            memberId: friend._id,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Error al añadir el miembro al grupo."
        );
      }

      // Si la solicitud es exitosa, actualizamos el grupo localmente
      const newMember = {
        id: friend._id,
        name: friend.name, // Si tienes el nombre disponible, úsalo aquí
        balance: 0,
        image: "https://via.placeholder.com/40",
      };

      const updatedGroup = {
        ...selectedGroup,
        members: [...selectedGroup.members, newMember],
      };

      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.id === selectedGroup.id ? updatedGroup : group
        )
      );

      setSelectedGroup(updatedGroup);

      alert(`El amigo fue añadido al grupo ${selectedGroup.name}`);
    } catch (error) {
      console.error("Error al añadir el miembro:", error.message);
      alert(`Error al añadir el miembro: ${error.message}`);
    }
  };

  //maneja la creacion de un gasto
  const handleAddGasto = (newGasto) => {
    if (!selectedGroup) {
      alert(
        "Por favor, selecciona un grupo con miembros para añadir un gasto."
      );
      return;
    }

    const totalMembers = selectedGroup.members.length;
    const expensePerMember = newGasto.payment / totalMembers;

    const updatedMembers = selectedGroup.members.map((member) => ({
      ...member,
      balance: member.balance - expensePerMember,
    }));

    const updatedGroup = {
      ...selectedGroup,
      members: updatedMembers,
    };

    setSelectedGroup(updatedGroup);
    setGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === selectedGroup.id ? updatedGroup : group
      )
    );
  };

  //maneja la eliminacion de un miembro
  const handleDeleteMember = async (memberId) => {
    if (!selectedGroup) {
      alert("No hay un grupo seleccionado.");
      return;
    }

    // Confirmar acción
    if (!window.confirm("¿Estás seguro de que deseas eliminar a este miembro?"))
      return;

    try {
      // Obtener el token del localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        alert(
          "Error: Token de autenticación no encontrado. Por favor, inicia sesión."
        );
        return;
      }

      // Obtener el ID del proyecto desde el localStorage
      const projectId = localStorage.getItem("selectedGroupId");
      if (!projectId) {
        alert(
          "Error: ID del proyecto no encontrado. Por favor, selecciona un grupo."
        );
        return;
      }

      // Hacer la llamada DELETE a la API
      const response = await fetch(
        "http://localhost:4000/api/projects/delete-member",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token, // Aquí usamos el token extraído
          },
          body: JSON.stringify({
            projectId: projectId, // ID del proyecto
            memberId: memberId, // ID del miembro a eliminar
          }),
        }
      );

      if (!response.ok) {
        // Intentar obtener el mensaje de error desde la respuesta del backend
        const errorData = await response.json();
        const errorMessage =
          errorData.message || "Error desconocido al eliminar el miembro.";
        alert(`No se pudo eliminar al miembro: ${errorMessage}`);
        return;
      }

      // Actualizar el estado local si la eliminación fue exitosa
      const updatedMembers = selectedGroup.members.filter(
        (member) => member.id !== memberId
      );

      const updatedGroup = {
        ...selectedGroup,
        members: updatedMembers,
      };

      setSelectedGroup(updatedGroup);
      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.id === selectedGroup.id ? updatedGroup : group
        )
      );

      alert("Miembro eliminado con éxito.");
      console.log("Miembro eliminado con éxito");
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar al miembro:", error.message);
      alert("Error al eliminar al miembro:", error.message);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  // Maneja la apertura del modal
  const handleOpenModal = (imageSrc) => {
    setCurrentImage(imageSrc || "https://via.placeholder.com/150"); // Imagen por defecto si no hay imagen
    setIsModalOpen(true);
  };

  // Maneja el cierre del modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentImage("");
  };

  // Función que procesa los tickets y actualiza los saldos
  // Función que procesa los tickets y actualiza los saldos acumulados
  function processTickets(group) {
    const updatedMembers = [...group.members]; // Hacemos una copia de los miembros para no modificar el array original

    // Inicializamos los saldos de cada miembro en 0 si no están definidos
    updatedMembers.forEach((member) => {
      member.balance = 0;
    });
    console.log(group.tickets.length);

    // Iteramos sobre los tickets
    group.tickets.forEach((ticket) => {
      const amountPaid = ticket.amount * (ticket.distribution / 100); // El monto que paga el miembro
      const amountToDistribute = ticket.amount - amountPaid; // El resto del ticket que se distribuye entre los otros miembros
      const finalAmountPaid = ticket.amount - amountPaid; // El monto que se distribuye entre los otros miembros
      // Distribuir el monto entre los otros miembros
      const sharePerMember = amountToDistribute / (group.members.length - 1); // Cada miembro debe esta cantidad
      console.log("Share per member:", sharePerMember);
      console.log("final amount paid:", finalAmountPaid);
      updatedMembers.forEach((member) => {
        if (member._id !== ticket.uploader.id) {
          // Los miembros que no subieron el ticket deben dinero
          member.balance -= sharePerMember;
        } else {
          // El miembro que sube el ticket recibe el monto que pagó
          member.balance += finalAmountPaid;
        }
      });
    });
    return updatedMembers; // Devolvemos los miembros con los saldos actualizados
  }

  //main return
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* aca se mapean los grupos y los amigos */}
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
              handleDeleteGroup={handleDeleteGroup}
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

        <div className="md:hidden mb-4">
          <CreateGroup className="w-full" onCreateGroup={handleCreateGroup} />
        </div>

        <div className="hidden md:block">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Mis Grupos</h2>
              <CreateGroup className="ml-4" onCreateGroup={handleCreateGroup} />
            </div>
            <GroupsList
              groups={groups}
              selectedGroup={selectedGroup}
              handleSelectGroup={handleSelectGroup}
              handleDeleteGroup={handleDeleteGroup}
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

      {/*selecciona un grupo */}
      <div className="w-full md:w-2/4 p-4 bg-white shadow-md">
        {selectedGroup ? (
          <div>
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-4 shadow-sm">
              <div className="flex items-center">
                <FaHome className="text-gray-600 mr-2 text-2xl" />
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedGroup.name} {/* Muestra el nombre del grupo */}
                </h2>
              </div>
              {/* ---------------------------------------------------------------------------------------- */}
              <Gastos projectId={projectId} onCreateGasto={handleAddGasto} />
            </div>

            {/* se mapean los tikets */}

            <div className="mt-4 space-y-6">
              {selectedGroup.tickets && selectedGroup.tickets.length > 0 ? (
                selectedGroup.tickets.map((ticket, index) => (
                  <div
                    key={index}
                    onClick={() => handleOpenModal(ticket.image)}
                    className="flex items-center border p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    {/* Icono de ticket */}
                    <div className="text-indigo-600 mr-4 text-5xl transform hover:scale-110 transition-transform duration-200">
                      <FaTicketAlt />
                    </div>

                    {/* Contenedor de descripción e información */}
                    <div className="flex flex-1 justify-between items-center">
                      {/* Descripción */}
                      <div className="flex-1">
                        <p className="font-semibold text-xl text-gray-800 mb-2">
                          {ticket.description}
                        </p>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-700">
                            <span className="font-medium text-gray-900">
                              Cargado por:
                            </span>{" "}
                            {ticket.uploader.name} {ticket.uploader.lastname}
                          </p>
                          <p className="text-sm text-gray-700">
                            <span className="font-medium text-gray-900">
                              Fecha:
                            </span>{" "}
                            {new Date(ticket.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Precios */}
                      <div className="flex flex-col items-end ml-6">
                        <p className="text-lg text-gray-800 font-semibold">
                          <span className="font-medium text-gray-900">
                            Pago total:
                          </span>{" "}
                          ${ticket.amount}
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-medium text-gray-900">
                            Porcentaje:
                          </span>{" "}
                          {ticket.distribution}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center text-lg">
                  No hay tickets disponibles.
                </p>
              )}

              {/* Modal */}
              {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                    <button
                      onClick={handleCloseModal}
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                    <h2 className="text-lg font-semibold text-center mb-4">
                      Imagen del Ticket
                    </h2>
                    <div className="flex justify-center">
                      <img
                        src={currentImage}
                        alt="Imagen del ticket"
                        className="max-w-full h-auto rounded-lg border"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="text-xl text-gray-500 text-center">
            Selecciona un grupo para ver los detalles.
          </p>
        )}
      </div>

      {/* aca se mapean los miembros del grupo */}
      <div className="w-full md:w-1/4 p-4 bg-white shadow-md">
        {/* Título */}
        <div className="flex items-center justify-center mb-4">
          <FaMoneyBillWave className="text-gray-600 mr-2 text-2xl" />
          <h2 className="text-2xl font-bold text-gray-800">
            Miembros del Grupo
          </h2>
        </div>

        {/* Verifica si hay un grupo seleccionado */}
        {selectedGroup ? (
          <div>
            <ul className="space-y-4">
              {console.log("Selected Group:", selectedGroup)}
              {/* Procesa los tickets y obtiene los saldos actualizados */}
              {processTickets(selectedGroup).map((member) => (
                <li
                  key={member._id}
                  className={`flex items-center justify-between p-3 rounded-lg shadow-sm ${
                    member._id === selectedGroup.owner._id
                      ? "bg-blue-50" // Color de fondo si es el propietario
                      : "bg-gray-50" // Color de fondo si no es el propietario
                  }`}
                >
                  {/* Información del miembro */}
                  <div className="flex items-center">
                    <img
                      src={member.photo}
                      className="w-10 h-10 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <span
                        className={`font-bold ${
                          member._id === selectedGroup.owner._id
                            ? "text-blue-800" // Texto en otro color si es el propietario
                            : "text-gray-800"
                        }`}
                      >
                        {member.name} {member.lastname}
                      </span>
                      <p
                        className={`${
                          member.balance < 0 ? "text-red-500" : "text-green-600"
                        } font-semibold`}
                      >
                        {member.balance < 0 ? "Debe" : "Recupera"} ${" "}
                        {Math.abs(member.balance).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Mostrar "Propietario" si es el propietario, si no, mostrar el botón de eliminar */}
                  {member._id === selectedGroup.owner._id ? (
                    <span className="text-blue-600 font-semibold">
                      -Propietario-
                    </span>
                  ) : (
                    <button
                      onClick={() => handleDeleteMember(member._id)}
                      className="text-gray-500 hover:text-red-500 transition-colors duration-200"
                    >
                      <FaTrash />
                    </button>
                  )}
                </li>
              ))}
            </ul>

            {/* Botón para abrir el modal */}
            <button
              onClick={() => setShowModal(true)}
              className="mt-6 px-4 py-2 text-blue-600 hover:text-blue-800 font-semibold text-lg flex justify-center items-center mx-auto"
            >
              Ver más información del grupo
            </button>

            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full relative">
                  {/* Título del Modal */}
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                    Deudas y Créditos
                  </h2>

                  {/* Lista de Deudas y Créditos */}
                  <div className="space-y-4">
                    {(() => {
                      const positiveBalances = [];
                      const negativeBalances = [];

                      processTickets(selectedGroup).forEach((member) => {
                        if (member.balance > 0) {
                          positiveBalances.push(member);
                        } else {
                          negativeBalances.push(member);
                        }
                      });

                      const compensation = [];
                      negativeBalances.forEach((negativeMember) => {
                        let debt = Math.abs(negativeMember.balance); // Deuda del miembro
                        const debtorName = negativeMember.name;

                        // Intentamos saldar la deuda con los miembros con saldo positivo
                        positiveBalances.forEach((positiveMember) => {
                          if (debt <= 0) return;

                          const amountToPay = Math.min(
                            debt,
                            positiveMember.balance
                          );
                          debt -= amountToPay;

                          positiveMember.balance -= amountToPay;

                          compensation.push({
                            debtor: debtorName,
                            creditor: positiveMember.name,
                            amount: amountToPay,
                          });
                        });
                      });

                      const result = [];

                      // Mostrar miembros con saldo positivo
                      positiveBalances.forEach((member) => {
                        if (member.balance > 0) {
                          result.push(
                            <div
                              key={member._id}
                              className="flex justify-between items-center text-green-600"
                            >
                              <div className="flex items-center">
                                <span className="font-semibold">
                                  {member.name}
                                </span>
                                <span className="ml-2 text-sm text-gray-500">
                                  te debe
                                </span>
                              </div>
                              <span className="text-lg font-semibold">
                                ${member.balance.toFixed(2)}
                              </span>
                            </div>
                          );
                        }
                      });

                      // Mostrar compensaciones
                      compensation.forEach(({ debtor, creditor, amount }) => {
                        result.push(
                          <div
                            key={`${debtor}-${creditor}`}
                            className="flex justify-between items-center text-red-600"
                          >
                            <div className="flex items-center">
                              <span className="font-semibold">{debtor}</span>
                              <span className="ml-2 text-sm text-gray-500">
                                le debe a
                              </span>
                              <span className="ml-2 font-semibold text-blue-600">
                                {creditor}
                              </span>
                            </div>
                            <span className="text-lg font-semibold">
                              ${amount.toFixed(2)}
                            </span>
                          </div>
                        );
                      });

                      return result;
                    })()}
                  </div>

                  {/* Botón de Cierre del Modal */}
                  <button
                    onClick={() => setShowModal(false)}
                    className="absolute top-4 right-4 text-3xl font-semibold text-gray-700 hover:text-gray-900"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Mensaje si no hay grupo seleccionado
          <p className="text-xl text-gray-500">
            Selecciona un grupo para ver los saldos de los miembros.
          </p>
        )}
      </div>
    </div>
  );
}

//muestra los grupos
function GroupsList({
  groups,
  selectedGroup,
  handleSelectGroup,
  handleDeleteGroup,
}) {
  return (
    <div>
      {groups.length === 0 ? (
        <p className="text-center text-gray-600">
          Todavía no tienes grupos. Por favor, agrega uno.
        </p>
      ) : (
        <ul className="space-y-3 mb-6">
          {groups.map((group) => (
            <li
              key={group.id}
              className={`cursor-pointer p-3 rounded-lg shadow-sm transition-all flex items-center justify-between ${
                selectedGroup?.id === group.id
                  ? "bg-blue-100 text-blue-800"
                  : "bg-white hover:bg-gray-100 text-gray-800"
              }`}
            >
              <div
                className="flex items-center flex-grow"
                onClick={() => handleSelectGroup(group)}
              >
                <FaUsers className="mr-2" />
                <span className="font-medium">
                  {group.name.charAt(0).toUpperCase() +
                    group.name.slice(1).toLowerCase()}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteGroup(group.id);
                }}
                className="text-gray-500 hover:text-red-500"
              >
                <FaTrash />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
//prop types de grupos para que no rompa
GroupsList.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedGroup: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  handleSelectGroup: PropTypes.func.isRequired,
  handleDeleteGroup: PropTypes.func.isRequired,
};

//muestra los amigos
function FriendsList({ friends, handleAddFriendToGroup }) {
  return (
    <div>
      {friends.length === 0 ? (
        <p className="text-center text-gray-600">
          Aún no tienes amigos. ¡Añade algunos para empezar!
        </p>
      ) : (
        <ul className="space-y-2">
          {friends.map((friend) => (
            <li
              key={friend.id}
              className="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm"
            >
              <span className="text-gray-700">{friend.name}</span>
              <Button
                onClick={() => handleAddFriendToGroup(friend)}
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
      )}
    </div>
  );
}
//prop types de amigos para que no rompa
FriendsList.propTypes = {
  friends: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleAddFriendToGroup: PropTypes.func.isRequired,
};
