//Importacion de bibliotecas
import React from "react";

export default function TypeSquare({ types }) {
  const datos = {
    normal: ["bg-emerald-400", "text-black"],
    grass: ["bg-emerald-400", "text-black"],
    fire: ["bg-red-500", "text-white"],
    water: ["bg-blue-500", "text-white"],
    electric: ["bg-yellow-400", "text-black"],
    ice: ["bg-cyan-300", "text-black"],
    fighting: ["bg-red-700", "text-white"],
    ground: ["bg-yellow-800", "text-black"],
    flying: ["bg-blue-300", "text-black"],
    psychic: ["bg-pink-500", "text-white"],
    bug: ["bg-green-600", "text-white"],
    rock: ["bg-gray-700", "text-white"],
    ghost: ["bg-purple-700", "text-white"],
    poison: ["bg-indigo-800", "text-white"],
    dragon: ["bg-indigo-600", "text-white"],
    dark: ["bg-gray-900", "text-white"],
    steel: ["bg-gray-500", "text-black"],
    fairy: ["bg-pink-300", "text-black"],
  };

  const typesLower = types.map((type)   => type.toLowerCase());
  const bgClass = typesLower.map((type) => datos[type][0] || "bg-default");
  const txColor = typesLower.map((type) => datos[type][1] || "bg-default");

  return (
    <div className="text-center">
      {types.map((type, index) => (
        <div key={index} className="inline-block"> {/* Added key prop */}
          <h1 className={`px-5 m-1 ${bgClass[index]} rounded-3xl ${txColor[index]} text-center font-mono capitalize`}>
            {type}
          </h1>
        </div>
      ))}
    </div>
  );
}
