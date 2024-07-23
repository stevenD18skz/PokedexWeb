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
      className={`h-25 sticky top-0 z-50 w-full origin-top-left bg-gray-900 p-4 transition-all duration-300 ease-in-out ${isScrolled ? "-translate-y-24" : ""} `}
    >
      <div
        className={`container mx-auto flex justify-${
          isScrolled ? "center" : "between"
        } items-center`}
      >
        {!isScrolled ? (
          <div className="text-xl font-bold text-white">
            <a href="/">PokeDex</a>
          </div>
        ) : (
          ""
        )}

        <div className={`relative ${isScrolled ? "block" : "md:hidden"}`}>
          <button onClick={toggleMenu} className="text-2xl text-white">
            ☰
          </button>

          {/* Menu desplegable */}
          <ul
            className={`absolute top-full mt-1 w-48 rounded-lg bg-gray-700 text-white shadow-lg transition-transform duration-300 ${
              isOpen ? "scale-100" : "scale-0"
            } ${
              isScrolled ? "right origin-top-left" : "right-0 origin-top-right"
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
            <ul className="flex md:items-center md:space-x-6">
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
