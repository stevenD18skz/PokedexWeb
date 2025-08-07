//Importacion de bibliotecas
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const dataBar = [
    ["⌂", "Home", "/Home"],
    ["★", "PokeDex", "/pokedex"],
    ["✪", "Cal de Daño", "/damageCalculator"],
    ["✰", "Cal de Captura", "/captureCalculator"],
    ["❂", "Quiz", "/quiz"],
  ];

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
            <Link to={op[2]} className="block p-2">
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
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
