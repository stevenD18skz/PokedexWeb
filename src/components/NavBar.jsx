//Importacion de bibliotecas
import React from "react";
import { useState } from "react";

import { dataBar } from "../utils/typeColors";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-gray-900 p-4 shadow-lg transition-all duration-300 ease-in-out">
      <div className="flex items-center justify-between">
        <div className="text-5xl font-bold text-white">
          <a href="/">PokeDex</a>
        </div>

        <div className="hidden md:flex md:items-center md:space-x-6">
          <ul className="flex items-center space-x-6">
            {dataBar.map((op, index) => (
              <li key={index}>
                <a href={op[2]} className="block">
                  <div className="flex flex-col items-center text-center text-white hover:bg-gray-500 hover:text-gray-400">
                    <p className="text-lg">{op[0]}</p>
                    <p className="text-md">{op[1]}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <button onClick={toggleMenu} className="text-5xl text-white">
            {isOpen ? "✖" : "☰"}
          </button>

          {/* Menu desplegable */}
          <ul
            className={`absolute right-8 top-full mt-1 w-48 rounded-lg bg-gray-700 text-white shadow-lg transition-transform duration-300 ${
              isOpen ? "scale-100" : "scale-0"
            } origin-top-right transform`}
          >
            {dataBar.map((op, index) => (
              <li key={index}>
                <a href={op[2]} className="block p-2">
                  <div className="flex flex-col rounded-md text-center hover:bg-gray-500">
                    <p className="text-xl">{op[0]}</p>
                    <p className="text-sm">{op[1]}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
