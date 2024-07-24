//Importacion de bibliotecas
import React from "react";
import { useState, useEffect } from "react";
import { dataBar } from "../utils/typeColors";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`fixed left-0 top-0 h-dvh ${isOpen ? "w-48" : "w-20"} bg-gray-800 pt-16 transition-all duration-300 ease-in-out`}
    >
      <div className="m-auto hidden text-center">
        <button className="text-5xl text-white" onClick={toggleMenu}>
          ☰
        </button>
      </div>

      <ul
        className={`flex h-full w-full flex-col justify-evenly rounded-lg bg-gray-800 text-white`}
      >
        {dataBar.map((op, index) => (
          <li key={index}>
            <a href={op[2]} className="block p-2">
              <div
                className={`flex ${
                  isOpen ? "flex-row justify-center" : "flex-col items-center"
                } rounded-md text-center hover:bg-gray-500`}
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
