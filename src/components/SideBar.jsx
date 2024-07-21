//Importacion de bibliotecas
import React from "react";
import { useState, useEffect } from "react";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const opcionesBar = [
    ["★", "PokeDex", "/home"],
    ["✪", "Cal de Daño", "/damageCalculator"],
    ["✰", "Cal de Captura", "/"],
    ["❂", "Quiz", "/"],
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-dvh${
        isOpen ? "w-48" : "w-20"
      } pt-16 bg-gray-800 transition-all duration-300 ease-in-out`}
    >
      <button 
      className="text-white text-2xl"
      onClick={toggleMenu}>
        ☰
      </button>

      <ul
        className={`flex flex-col justify-evenly h-full w-full bg-gray-800 text-white rounded-lg`}
      >
        {opcionesBar.map((op, index) => (
          <li>
            <a href={op[2]} className="block p-2">
              <div
                className={`flex ${
                  isOpen ? "flex-row justify-center" : "flex-col items-center"
                } rounded-md hover:bg-gray-500 text-center`}
              >
                <p className="text-4xl">{op[0]}</p>
                <p className={`${isOpen ? "my-auto ml-2" : "text-sm"}`}>
                  {op[1]}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
