import React, { useState, useEffect } from "react";

import { dataBar } from "../utils/typeColors";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [tooltip, setTooltip] = useState("");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    const offset = window.scrollY;
    setIsScrolled(offset > 59);
  };

  const handleMouseEnter = (text) => {
    setTooltip(text);
  };

  const handleMouseLeave = () => {
    setTooltip("");
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full bg-gray-900 p-4 shadow-lg transition-all duration-300 ease-in-out ${
        isScrolled ? "h-16" : "h-24"
      }`}
    >
      <div className="flex h-full items-center justify-between">
        <div
          className={`origin-top-left rounded-lg p-2 text-white transition-all duration-300 ease-in-out hover:bg-slate-800 hover:text-cyan-200 ${
            isScrolled ? "text-2xl md:text-xl" : "text-5xl md:text-5xl"
          } font-bold`}
        >
          <a href="/">PokeDex</a>
        </div>

        <div className="hidden md:flex md:items-center md:space-x-6">
          <ul className="flex items-center space-x-6">
            {dataBar.map((op, index) => (
              <li
                key={index}
                className="relative"
                onMouseEnter={() => handleMouseEnter(op[1])}
                onMouseLeave={handleMouseLeave}
              >
                <a href={op[2]} className="block">
                  <div className="flex transform flex-col items-center rounded-lg p-1 text-center text-white transition-all duration-300 ease-in-out hover:bg-slate-800 hover:text-cyan-200">
                    <p className="text-lg">{op[0]}</p>
                    <p
                      className={`text-md ${
                        isScrolled
                          ? "absolute scale-0 opacity-0"
                          : "scale-100 opacity-100"
                      }`}
                    >
                      {op[1]}
                    </p>

                    {tooltip === op[1] && isScrolled && (
                      <div className="absolute bottom-0 mt-2 translate-y-full transform rounded bg-gray-700 px-2 py-1 text-white">
                        {op[1]}
                      </div>
                    )}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative md:hidden">
          <button onClick={toggleMenu} className="text-2xl text-white">
            {isOpen ? "✖" : "☰"}
          </button>

          <ul
            className={`absolute right-8 top-full mt-1 w-48 rounded-lg bg-slate-800 text-white shadow-lg transition-transform duration-300 ${
              isOpen ? "scale-100" : "scale-0"
            } origin-top-right transform`}
          >
            {dataBar.map((op, index) => (
              <li
                key={index}
                onMouseEnter={() => handleMouseEnter(op[1])}
                onMouseLeave={handleMouseLeave}
              >
                <a href={op[2]} className="block p-2">
                  <div className="hover:bg-primary hover:text-secondary flex flex-col rounded-md text-center">
                    <p className="text-sm">{op[0]}</p>
                    {tooltip === op[1] && (
                      <div className="absolute bottom-0 mt-2 translate-y-full transform rounded bg-gray-700 px-2 py-1 text-white">
                        {op[1]}
                      </div>
                    )}
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

/**
 otra opcion
import React, { useState, useEffect } from "react";
import { dataBar } from "../utils/typeColors";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
      className={`fixed top-0 z-50 w-full bg-gray-900 p-4 shadow-lg transition-all duration-300 ease-in-out ${
        isScrolled ? "h-16" : "h-24"
      }`}
    >
      <div className="flex h-full items-center justify-between">
        <div
          className={`origin-top-left rounded-lg p-2 text-white transition-all duration-300 ease-in-out hover:bg-slate-800 hover:text-cyan-200 ${
            isScrolled ? "text-2xl md:text-xl" : "text-5xl md:text-5xl"
          } font-bold`}
        >
          <a href="/">PokeDex</a>
        </div>

        <div className="hidden md:flex md:items-center md:space-x-6">
          <ul className="flex items-center space-x-6">
            {dataBar.map((op, index) => (
              <li key={index} className="relative group">
                <a href={op[2]} className="block">
                  <div className="flex transform flex-col items-center rounded-lg p-1 text-center text-white transition-all duration-300 ease-in-out hover:bg-slate-800 hover:text-cyan-200">
                    <p className="text-lg">{op[0]}</p>
                    <div className="absolute bottom-0 flex-col items-center hidden mb-6 group-hover:flex">
                      <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-800 shadow-lg rounded-md">
                        {op[1]}
                      </span>
                      <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-800"></div>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative md:hidden">
          <button onClick={toggleMenu} className="text-2xl text-white">
            {isOpen ? "✖" : "☰"}
          </button>

          <ul
            className={`absolute right-8 top-full mt-1 w-48 rounded-lg bg-slate-800 text-white shadow-lg transition-transform duration-300 ${
              isOpen ? "scale-100" : "scale-0"
            } origin-top-right transform`}
          >
            {dataBar.map((op, index) => (
              <li key={index} className="relative group">
                <a href={op[2]} className="block p-2">
                  <div className="hover:bg-primary hover:text-secondary flex flex-col rounded-md text-center">
                    <p className="text-sm">{op[0]}</p>
                    <div className="absolute bottom-0 flex-col items-center hidden mb-6 group-hover:flex">
                      <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-800 shadow-lg rounded-md">
                        {op[1]}
                      </span>
                      <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-800"></div>
                    </div>
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

 */
