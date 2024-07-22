//Importacion de bibliotecas
import React from "react";
import { useState, useEffect } from "react";

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    const offset = window.scrollY;
    setIsScrolled(offset > 59);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  
  return (
    <nav
      className={`bg-gray-800 p-4 sticky top-0 z-50 origin-top-left h-25
      transition-all duration-500 ease-in-out
      ${isScrolled ? "rounded-3xl w-1/12 top-4 m-4" : ""}
    `}
    >
      <div
        className={`container mx-auto flex justify-${
          isScrolled ? "center" : "between"
        } items-center`}
      >
        {!isScrolled ? (
          <div className="text-white text-xl font-bold">
            <a href="/">PokeDex</a>
          </div>
        ) : (
          ""
        )}

        <div className={`relative ${isScrolled ? "block" : "md:hidden"}`}>
          <button onClick={toggleMenu} className="text-white text-2xl">
            ☰
          </button>

          {/* Menu desplegable */}
          <ul
            className={`absolute top-full mt-1 w-48 bg-gray-700 text-white rounded-lg shadow-lg transition-transform duration-300 ${
              isOpen ? "scale-100" : "scale-0"
            } ${
              isScrolled ? "origin-top-left right" : "origin-top-right right-0"
            }`}
          >
            <li>
              <a href="/home" className="block px-4 py-2 hover:bg-gray-600">
                Inicio
              </a>
            </li>
            <li>
              <a href="/about" className="block px-4 py-2 hover:bg-gray-600">
                Acerca de
              </a>
            </li>
            <li>
              <a href="/services" className="block px-4 py-2 hover:bg-gray-600">
                Servicios
              </a>
            </li>
            <li>
              <a href="/contact" className="block px-4 py-2 hover:bg-gray-600">
                Contacto
              </a>
            </li>
          </ul>
        </div>

        {isScrolled ? null : (
          <div className="hidden md:flex md:items-center md:space-x-6">
            <ul className="flex md:items-center md:space-x-6 ">
              <li>
                <a href="/home" className="text-white hover:text-gray-400">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/abou" className="text-white hover:text-gray-400">
                  Acerca de
                </a>
              </li>
              <li>
                <a href="/seri" className="text-white hover:text-gray-400">
                  Servicios
                </a>
              </li>
              <li>
                <a href="/cont" className="text-white hover:text-gray-400">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
