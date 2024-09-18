import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Avatar = ({ children, className = "" }) => (
  <div
    className={`inline-flex items-center justify-center rounded-full bg-gray-200 ${className}`}
  >
    {children}
  </div>
);

const AvatarFallback = ({ children }) => (
  <span className="text-gray-600">{children}</span>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow ${className}`}>{children}</div>
);

const CardHeader = ({ children }) => (
  <div className="p-4 border-b">{children}</div>
);

const CardTitle = ({ children }) => (
  <h3 className="text-lg font-semibold">{children}</h3>
);

const CardContent = ({ children }) => <div className="p-4">{children}</div>;

const CustomButton = ({ children, className = "", onClick = () => {} }) => (
  <button
    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default function Main() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [groups, setGroups] = useState([
    { id: 1, name: "ass" },
    { id: 2, name: "Pipis en San Martín" },
    { id: 3, name: "prueba" },
  ]);
  const [friends, setFriends] = useState([
    { id: 1, name: "Diego" },
    { id: 2, name: "Lili Cicive" },
    { id: 3, name: "Sofia Giuliana Tacca" },
  ]);
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      description: "Dinner",
      amount: 45,
      paidBy: "You",
      date: "2023-06-15",
    },
    {
      id: 2,
      description: "Movie tickets",
      amount: 30,
      paidBy: "Alice",
      date: "2023-06-14",
    },
    {
      id: 3,
      description: "Groceries",
      amount: 65,
      paidBy: "Bob",
      date: "2023-06-13",
    },
  ]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col h-screen bg-gray-100 lg:flex-row">
      {/* Sidebar */}
      <div
        className={`lg:w-64 bg-white border-r overflow-y-auto ${
          isSidebarOpen ? "block" : "hidden"
        } lg:block`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <CustomButton
            className="lg:hidden bg-gray-200 hover:bg-gray-300"
            onClick={toggleSidebar}
          >
            Menu
          </CustomButton>
        </div>

        <div className="p-4 border-t">
          <h2 className="font-semibold mb-2">GRUPOS</h2>
          <ul className="space-y-1">
            {groups.map((group) => (
              <li key={group.id}>
                <CustomButton className="w-full justify-start text-left text-sm hover:bg-gray-100">
                  <span className="truncate">{group.name}</span>
                </CustomButton>
              </li>
            ))}
            <li>
              <CustomButton className="w-full justify-start text-left text-sm text-teal-500 hover:bg-gray-100">
                añadir
              </CustomButton>
            </li>
          </ul>
        </div>
        <div className="p-4 border-t">
          <h2 className="font-semibold mb-2">AMIGOS</h2>
          <ul className="space-y-1">
            {friends.map((friend) => (
              <li key={friend.id}>
                <CustomButton className="w-full justify-start text-left text-sm hover:bg-gray-100">
                  <span className="truncate">{friend.name}</span>
                </CustomButton>
              </li>
            ))}
            <li>
              <CustomButton className="w-full justify-start text-left text-sm text-teal-500 hover:bg-gray-100">
                añadir
              </CustomButton>
            </li>
          </ul>
        </div>
        <div className="p-4 border-t">
          <CustomButton className="w-full bg-white border border-gray-300 hover:bg-gray-100">
            Invitar a amigos
          </CustomButton>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white p-4 flex justify-between items-center border-b">
          <div className="flex items-center">
            <CustomButton
              className="mr-2 lg:hidden bg-gray-200 hover:bg-gray-300"
              onClick={toggleSidebar}
            >
              Menu
            </CustomButton>
            <h2 className="text-2xl font-semibold">Panel de control</h2>
          </div>
          <div className="space-x-2 flex-shrink-0">
            <CustomButton className="bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm">
              Añadir un gasto
            </CustomButton>
            <CustomButton className="bg-teal-500 hover:bg-teal-600 text-white text-xs sm:text-sm">
              Liquidar deudas
            </CustomButton>
          </div>
        </header>
        <main className="p-4 sm:p-6">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Resumen de gastos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
                <div>
                  <p className="text-sm text-gray-500">saldo total</p>
                  <p className="text-xl sm:text-2xl font-bold text-green-500">
                    + $4520.00*
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">debes</p>
                  <p className="text-xl sm:text-2xl font-bold">$0.00*</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">se te debe</p>
                  <p className="text-xl sm:text-2xl font-bold text-green-500">
                    $4520.00*
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                * Tienes saldos en varias monedas.
              </p>
            </CardContent>
          </Card>

          <div className="flex space-x-4 mb-4 overflow-x-auto">
            <CustomButton className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100">
              ver como una lista
            </CustomButton>
            <CustomButton className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100">
              ver gráfico
            </CustomButton>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Deudas y créditos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {friends.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{friend.name}</p>
                        <p className="text-sm text-green-500">
                          te debe $100.00
                        </p>
                      </div>
                    </div>
                    <span className="text-gray-500">▼</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
